function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

let curriedSum = curry(sum)
console.log(curriedSum(1)(2)(3))
console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2, 3))
console.log(curriedSum(1, 2)(3))

//************************************************************** */

function add(...nums) {
  let args = Array.from(arguments)

  let inner = function () {
    args.push(...arguments)
    return inner
  }

  inner.toString = function () {
    return args.reduce((pre, cur) => pre + cur, 0)
  }

  return inner
}

//************************************************************** */

function compose(...fn) {
  return function (arr) {
    for (const func of fn) {
      func(arr)
    }
    return arr
  }
}

function addOne(arr) {
  for (const idx in arr) {
    arr[idx]++
  }
}

function plusTwo(arr) {
  for (const idx in arr) {
    arr[idx] *= 2
  }
}

function deleteOne(arr) {
  for (const idx in arr) {
    arr[idx]--
  }
}

const arr = [1, 2, 3, 4]
console.log(compose(addOne, plusTwo, deleteOne)(arr))
