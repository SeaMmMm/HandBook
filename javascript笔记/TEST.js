// 同步写法完成异步方法

const sleep = (a) => a

function* func() {
  const res1 = yield sleep(1)
  console.log(res1)

  const res2 = yield sleep(2)
  console.log(res2)

  const res3 = yield sleep(3)
  console.log(res3)

  return
}

function run(gen) {
  const g = gen()

  function next(data) {
    const result = g.next(data)
    if (result.done) return
    result.value.then((data) => next(data))
  }

  next()
}
