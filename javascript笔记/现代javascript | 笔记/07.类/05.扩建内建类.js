// 内建的类，例如 Array，Map 等也都是可以扩展的（extendable）。
// 例如，这里有一个继承自原生 Array 的类 PowerArray：
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0
  }
}

let arr = new PowerArray(1, 2, 3, 4, 5, 50, 100)
console.log(arr.isEmpty())

let filterdArr = arr.filter((item) => item >= 10)
console.log(filterdArr, filterdArr.isEmpty())

// 请注意一个非常有趣的事儿。内建的方法例如 filter，map 等 —— 返回的正是子类 PowerArray 的新对象。它们内部使用了对象的 constructor 属性来实现这一功能。

/* 
在上面的例子中，
arr.constructor === PowerArray 
*/

/* 
当 arr.filter() 被调用时，它的内部使用的是 arr.constructor 来创建新的结果数组，而不是使用原生的 Array。这真的很酷，因为我们可以在结果数组上继续使用 PowerArray 的方法。

甚至，我们可以定制这种行为。

我们可以给这个类添加一个特殊的静态 getter Symbol.species。如果存在，则应返回 JavaScript 在内部用来在 map 和 filter 等方法中创建新实体的 constructor。

如果我们希望像 map 或 filter 这样的内建方法返回常规数组，我们可以在 Symbol.species 中返回 Array，就像这样：
*/

{
  class PowerArray extends Array {
    isEmpty() {
      return this.length === 0
    }

    // 内建方法将使用这个作为 constructor
    static get [Symbol.species]() {
      return Array
    }
  }

  let arr = new PowerArray(1, 2, 5, 10, 50)
  console.log(arr.isEmpty()) // false

  // filter 使用 arr.constructor[Symbol.species] 作为 constructor 创建新数组
  let filteredArr = arr.filter((item) => item >= 10)

  // filteredArr 不是 PowerArray，而是 Array
  // console.log(filteredArr.isEmpty()) // Error
}
