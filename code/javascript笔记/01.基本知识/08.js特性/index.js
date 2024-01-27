// 代码结构

// 大多数代码风格指南都认为我们应该在每个语句后面都加上分号。
// JavaScript 允许我们省略分号，因为它会自动在每个语句后面补上分号。
// ……但即使我们在某处添加了「额外的」分号，这也不是错误。分号会被忽略的。

// 下面这种情况下,没有分号会报错
const sayHello = function () {
  console.log('Hello')
}
;[(1, 2)].forEach(sayHello)

// 变量
/*
let
const（不变的，不能被改变）
var（旧式的，稍后会看到）

一个变量名可以由以下组成：

字母和数字，但是第一个字符不能是数字。
字符 $ 和 _ 是允许的，用法同字母。
非拉丁字母和象形文字也是允许的，但通常不会使用。

有 8 种数据类型：
number — 可以是浮点数，也可以是整数，
bigint — 用于任意长度的整数，
string — 字符串类型，
boolean — 逻辑值：true/false，
null — 具有单个值 null 的类型，表示“空”或“不存在”，
undefined — 具有单个值 undefined 的类型，表示“未分配（未定义）”，
object 和 symbol — 对于复杂的数据结构和唯一标识符，我们目前还没学习这个类型。
*/

// 这里再次解释一下 null 以及 undefined 的区别

// null 你可以把它当成一个变量的值,此时这个变量已经有定义了,只是值为 null,跟其他的如 boolean,number,string 一样,只是 null 是一个特殊值
let gender = null
console.log(gender)

// undefined 表示这个变量没有赋值,仅仅是声明了
let age
console.log(age) // undefined

// 函数
/*
函数可能具有局部变量：在函数内部声明的变量，或在其参数列表中。这类变量只在函数内部可见。
参数可以有默认值：function sum(a = 1, b = 2) {...}。
函数总是返回一些东西。如果没有 return 语句，那么返回的结果是 undefined。
*/
