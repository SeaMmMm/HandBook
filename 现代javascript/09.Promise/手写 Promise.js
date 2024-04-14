const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #result = undefined
  #handlers = []

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return

    this.#state = state
    this.#result = result
    this.#run()
  }

  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === 'objevt' || typeof value === 'function')
    ) {
      return typeof value.then === 'function'
    }

    return false
  }

  #runMicroTask(func) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func)
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func)
      const textNode = document.createTextNode('1')
      ob.observe(textNode, {
        characterData: true,
      })
      textNode.data = '2'
    } else {
      setTimeout(func, 0)
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result)
        return
      } else {
        try {
          const data = callback(this.#result)
          if (this.#isPromiseLike(data)) {
            data.then(resolve, reject)
          } else {
            resolve(data)
          }
        } catch (err) {
          reject(err)
        }
      }
    })
  }

  #run() {
    if (this.#state === PENDING) return

    while (this.#handlers.length) {
      const { onFullfilled, onRejected, resolve, reject } =
        this.#handlers.shift()

      if (this.#state === FULFILLED) {
        this.#runOne(onFullfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFullfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally()
        return data
      },
      (err) => {
        onFinally()
        throw err
      }
    )
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value

    let _reslove, _reject
    const p = new MyPromise((resolve, reject) => {
      _reslove = resolve
      _reject = reject
    })

    if (p.#isPromiseLike(value)) {
      value.then(_reslove, _reject)
    } else {
      _reslove(value)
    }
    return p
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}
