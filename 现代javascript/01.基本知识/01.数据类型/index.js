// number 类型

let n = 123
// number 的特殊值 :Infinity、-Infinity 和 NaN(Not a Number)。

console.log(1 / 0) // Infinity
console.log(-1 / 0) // -Infinity
console.log(0 / 0) // NaN

// 对于 NAN 有个例外， NaN ** 0 = 1
// a ** b 是指数运算，在 js 规定 NaN 的 0 次方等于 1
console.log(NaN ** 0)

// BigInt 类型

let fake = 2 ** 53
console.log(fake)
console.log(fake + 1) // 9007199254740992

// js 无法安全表达 2 的 53 次方以上的数字，这时候就需要 BigInt 类型了
let BigInt = 1234567890123456789012345678901234567890n
console.log(BigInt)

// BigInt 类型的数字不能和 number 类型的数字混合运算
// console.log(BigInt + 1) // 会报错

// String 类型
// Boolean 类型

// null 和 undefined
// null 表示一个空值， undefined 表示未定义。因此定义一个变量，但是没有赋值，那么这个变量的值就该设成 null 而不是 undefined。

/* 
  以上的是原始类型
  除了原始类型，还有对象类型，比如数组、函数、对象等
  
  原始类型：number、string、boolean、null、undefined、symbol、bigint
  对象类型：object 、function、array、date、regexp、error

  对象内容后面单独说
 */

// typeof 操作符
// 类型检验，返回一个字符串，表示未经计算的操作数的类型
console.log(typeof 123) // number
console.log(typeof '123') // string
console.log(typeof true) // boolean
console.log(typeof undefined) // undefined
console.log(typeof null) // object
console.log(typeof {}) // object
console.log(typeof []) // object
console.log(typeof function () {}) // function
console.log(typeof Symbol()) // symbol
console.log(typeof 123n) // bigint
console.log(typeof NaN, typeof Infinity, typeof -Infinity) // number
console.log(typeof typeof 123) // string

// 为什么 null 的 typeof 是 object？
// 因为在 js 最初版本中，使用的是 32 位系统，为了性能考虑，使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object。
// 虽然现在已经不这么干了，但是对于这个错误的判断，却一直流传下来。

// 上面有几个 object 类型的判断，为什么有的是 object，有的是 function？
// 因为 function 是 object 的子类型，所以 typeof 会判断为 function

// instanceof 也可以判断类型，但是 instanceof 不能判断基本类型，因为基本类型不是对象
console.log([] instanceof Array) // true
console.log([] instanceof Object) // true
console.log(function () {} instanceof Function) // true
console.log(function () {} instanceof Object) // true
console.log({} instanceof Object) // true
console.log({} instanceof Array) // false

// instanceof 的原理是通过原型链来判断的，如果一个对象的原型链上能找到对应的构造函数的 prototype，那么就返回 true，否则返回 false
// 但是 instanceof 也有问题，因为它是通过原型链来判断的，所以如果原型链上有两个相同的构造函数，那么 instanceof 也会判断为 true
// 比如下面的例子
function Foo() {}
function Bar() {}
Bar.prototype = Foo.prototype
let b = new Bar()
console.log(b instanceof Foo) // true
