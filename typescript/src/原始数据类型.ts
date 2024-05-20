/* boolean */

let isDone: boolean = false

// 使用构造函数 Boolean 创造的对象不是布尔值：
let createdByNewBoolean = new Boolean(1)
console.log(typeof createdByNewBoolean) // object

// 直接调用 Boolean 也可以返回一个 boolean 类型：
let createdByBoolean: boolean = Boolean(1)

/* number */

let decLiteral: number = 6
let hexLiteral: number = 0xf00d
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010
// ES6 中的八进制表示法
let octalLiteral: number = 0o744
let notANumber: number = NaN
let infinityNumber: number = Infinity

/* string */

let myName: string = 'Tom'
let myAge: number = 25

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`

/* void */

// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
function alertName(): void {
  console.log('My name is Tom')
}

/* Null 和 Undefined */
let u: undefined = undefined
let n: null = null

/* any */

// 如果是 any 类型，则允许被赋值为任意类型。
let myFavoriteNumber: any = 'seven'
myFavoriteNumber = 7

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something
something = 'seven'
something = 7
