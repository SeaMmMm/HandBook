import { Countdown, CountdownEventName, fillZero } from './countdownEvent'

// 使用
const countdown = new Countdown(Date.now() + 60 * 60 * 1000, 500)

countdown.on(CountdownEventName.RUNNING, (remainTimeData) => {
  const { days, hours, mintes, seconds, count } = remainTimeData

  console.log([days, hours, mintes, seconds, count].map(fillZero).join(':'))
})
