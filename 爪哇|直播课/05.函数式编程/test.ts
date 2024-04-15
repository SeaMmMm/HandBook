function add(...nums: number[]) {
  const args = Array.from(arguments)
  const inner = function (...nums: number[]) {
    args.push(...arguments)
    return inner
  }
  inner.toString = function () {
    return args.reduce((prev, curr) => prev + curr)
  }

  return inner
}

console.log(add(1)(2).toString())
console.log(add(1)(2)(3).toString())
console.log(add(1)(2)(3)(4).toString())
