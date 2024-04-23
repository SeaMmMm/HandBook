import { EventEmitter } from 'eventemitter3'
// 状态（枚举）
export enum CountdownEventName {
  START = 'start',
  STOP = 'stop',
  RUNNING = 'running',
}

enum CountdownStatus {
  running,
  paused,
  stoped,
}

// 工具
export function fillZero(num: number) {
  return `0${num}`.slice(-2)
}

// 核心
export interface RemainTimeData {
  days: number
  hours: number
  mintes: number
  seconds: number
  count: number
}

interface countdownEventMap {
  [CountdownEventName.RUNNING]: [RemainTimeData]
  [CountdownEventName.START]: []
  [CountdownEventName.STOP]: []
}

export class Countdown extends EventEmitter<countdownEventMap> {
  private static COUNT_IN_MILLSECOND: number = 1 * 100
  private static SECOND_IN_MILLSECOND: number =
    10 * Countdown.COUNT_IN_MILLSECOND
  private static MINUTE_IN_MILLSECOND: number =
    60 * Countdown.SECOND_IN_MILLSECOND
  private static HOUR_IN_MILLSECOND: number =
    60 * Countdown.MINUTE_IN_MILLSECOND
  private static DAY_IN_MILLSECOND: number = 24 * Countdown.HOUR_IN_MILLSECOND

  private endTime: number
  private step: number
  private remainTime: number
  private status: CountdownStatus = CountdownStatus.stoped

  // 初始化
  constructor(endTime: number, step = 1e3) {
    super()

    this.endTime = endTime
    this.step = step
    this.remainTime = 0

    this.start()
  }

  public start() {
    this.emit(CountdownEventName.START)
    this.status = CountdownStatus.running

    this.countdown()
  }

  public stop() {
    this.emit(CountdownEventName.STOP)
    this.status = CountdownStatus.stoped
  }

  public countdown() {
    if (this.status !== CountdownStatus.running) {
      return
    }

    this.remainTime = Math.max(this.endTime - Date.now(), 0)
    this.emit(CountdownEventName.RUNNING, this.parseRemainTime(this.remainTime))

    if (this.remainTime > 0) {
      setTimeout(() => this.countdown(), this.step)
    } else {
      this.stop()
    }
  }

  private parseRemainTime(remainTime: number): RemainTimeData {
    let time = remainTime

    const days = Math.floor(time / Countdown.DAY_IN_MILLSECOND)
    time = time % Countdown.DAY_IN_MILLSECOND

    const hours = Math.floor(time / Countdown.HOUR_IN_MILLSECOND)
    time = time % Countdown.HOUR_IN_MILLSECOND

    const mintes = Math.floor(time / Countdown.MINUTE_IN_MILLSECOND)
    time = time % Countdown.MINUTE_IN_MILLSECOND

    const seconds = Math.floor(time / Countdown.SECOND_IN_MILLSECOND)
    time = time % Countdown.SECOND_IN_MILLSECOND

    const count = Math.floor(time / Countdown.COUNT_IN_MILLSECOND)

    return {
      days,
      hours,
      mintes,
      seconds,
      count,
    }
  }
}
