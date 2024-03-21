'use strict'
// name
function sayHi() {
  console.log('Hi')
}
console.log(sayHi.name)

function f(sayHi = function () {}) {
  console.log(sayHi.name)
}
f()

// length
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}
console.log(f1.length, f2.length, many.length)

// 自定义属性
{
  function sayHi() {
    console.log('Hi')

    sayHi.counter++
  }

  sayHi.counter = 0

  sayHi()
  sayHi()
  console.log(`Called ${sayHi.counter} times`)
}
// 属性不是变量
// 两者最大的不同就是如果 count 的值位于外层（函数）变量中，那么外部的代码无法访问到它，只有嵌套的那些函数可以修改它。而如果它是绑定到函数的，那么就可以这样
function makeCounter() {
  function counter() {
    return counter.count++
  }

  counter.count = 0

  return counter
}

let counter = makeCounter()

counter.count = 10
console.log(counter())
// 所以，选择哪种实现方式取决于我们的需求是什么

// 命名函数表达式
sayHi = function func(who) {
  console.log(`Hello, ${who}`)
}
/* 
关于名字 func 有两个特殊的地方，这就是添加它的原因：

1. 它允许函数在内部引用自己。
2. 它在函数外是不可见的。
*/

sayHi = function func(who) {
  if (who) console.log(`Hello ${who}`)
  else func('Guest')
}
sayHi()

// 总结
/* 
函数的类型是对象。

我们介绍了它们的一些属性：

name —— 函数的名字。通常取自函数定义，但如果函数定义时没设定函数名，JavaScript 会尝试通过函数的上下文猜一个函数名（例如把赋值的变量名取为函数名）。
length —— 函数定义时的入参的个数。Rest 参数不参与计数。
如果函数是通过函数表达式的形式被声明的（不是在主代码流里），并且附带了名字，那么它被称为命名函数表达式（Named Function Expression）。这个名字可以用于在该函数内部进行自调用，例如递归调用等。

此外，函数可以带有额外的属性。很多知名的 JavaScript 库都充分利用了这个功能。

它们创建一个“主”函数，然后给它附加很多其它“辅助”函数。例如，jQuery 库创建了一个名为 $ 的函数。lodash 库创建一个 _ 函数，然后为其添加了 _.add、_.keyBy 以及其它属性（想要了解更多内容，参查阅 docs）。实际上，它们这么做是为了减少对全局空间的污染，这样一个库就只会有一个全局变量。这样就降低了命名冲突的可能性。

所以，一个函数本身可以完成一项有用的工作，还可以在自身的属性中附带许多其他功能。
*/

// 任务

/* 
为 counter 添加 set 和 decrease 方法
重要程度: 5
修改 makeCounter() 代码，使得 counter 可以进行减一和设置值的操作：

counter() 应该返回下一个数字（与之前的逻辑相同）。
counter.set(value) 应该将 count 设置为 value。
counter.decrease() 应该把 count 减 1。
查看沙箱中的代码获取完整使用示例。

P.S. 你可以使用闭包或者函数属性来保持当前的计数，或者两种都写。
*/

function makeCounter() {
  let count = 0

  function counter() {
    return count++
  }
  counter.set = (val) => (count = val)
  counter.decrease = () => count--

  return counter
}

/* 
任意数量的括号求和
重要程度: 2
写一个函数 sum，它有这样的功能：

sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
P.S. 提示：你可能需要创建自定义对象来为你的函数提供基本类型转换。
*/

function sum(a = 0) {
  let currentSum = a

  function f(b = 0) {
    currentSum += b
    return f
  }

  f.toString = function () {
    return currentSum
  }

  // f.toString = function () {
  //   return currentSum
  // }

  return f
}

console.log(sum().toString())
