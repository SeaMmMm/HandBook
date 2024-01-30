/*
在现代 JavaScript 中，数字（number）有两种类型：

1. JavaScript 中的常规数字以 64 位的格式 IEEE-754 存储，也被称为“双精度浮点数”。这是我们大多数时候所使用的数字，我们将在本章中学习它们。

2. BigInt 用于表示任意长度的整数。有时会需要它们，因为正如我们在前面的章节 数据类型 中提到的，常规整数不能安全地超过 (2^53-1) 或小于 -(2^53-1)。由于仅在少数特殊领域才会用到 BigInt，因此我们在特殊的章节 BigInt 中对其进行了介绍。
*/

// 编写数字的更多方法
let billion = 1000000000
billion = 1_000_000_000

// toString(base)
let num = 255

console.log(num.toString(16))
console.log(num.toString(2))

/*
Math.floor
向下舍入：3.1 变成 3，-1.1 变成 -2。

Math.ceil
向上舍入：3.1 变成 4，-1.1 变成 -1。

Math.round
向最近的整数舍入：3.1 变成 3，3.6 变成 4，中间值 3.5 变成 4。

Math.trunc（IE 浏览器不支持这个方法）
移除小数点后的所有内容而没有舍入：3.1 变成 3，-1.1 变成 -1。
*/

console.log(0.1 + 0.2)
let sum = 0.1 + 0.2
console.log(+sum.toFixed(2))

console.log(NaN === NaN)
console.log(isNaN(NaN))

console.log(Object.is(NaN, NaN))
console.log(Object.is(0, -0))

console.log(parseInt('100px'))
console.log(parseInt('12.5em'))
console.log(parseFloat('12.5em'))
console.log(parseInt('a123'))

const arr = [2, 4, 5, 1, 7]
console.log(Math.max(...arr))

// 任务
/*
来自访问者的数字的总和
重要程度: 5
创建一个脚本，提示访问者输入两个数字，然后显示它们的总和。

运行 demo

P.S. 有一个类型陷阱。
*/
// let a = +prompt('The first number?', '')
// let b = +prompt('The second number?', '')
// console.log(a + b)

/*
为什么 6.35.toFixed(1) == 6.3？
重要程度: 4
根据文档，Math.round 和 toFixed 都将数字舍入到最接近的数字：0..4 会被舍去，而 5..9 会进一位。

例如：

alert( 1.35.toFixed(1) ); // 1.4
在下面这个类似的示例中，为什么 6.35 被舍入为 6.3 而不是 6.4？

alert( 6.35.toFixed(1) ); // 6.3
如何以正确的方式来对 6.35 进行舍入？
*/

// 在内部，6.35 的小数部分是一个无限的二进制。在这种情况下，它的存储会造成精度损失。
console.log((6.35).toFixed(20))

// 精度损失可能会导致数字的增加和减小。在这种特殊的情况下，数字变小了一点，这就是它向下舍入的原因。
// 那么 1.35 会怎样呢？
console.log((1.35).toFixed(20))

// 在这里，精度损失使得这个数字稍微大了一些，因此其向上舍入。

console.log((6.35 * 10).toFixed(20))

// 请注意，63.5 完全没有精度损失。这是因为小数部分 0.5 实际上是 1/2。以 2 的整数次幂为分母的小数在二进制数字系统中可以被精确地表示，现在我们可以对它进行舍入：
console.log(Math.round(6.35 * 10) / 10)

/*
重复，直到输入的是一个数字
重要程度: 5
创建一个函数 readNumber，它提示输入一个数字，直到访问者输入一个有效的数字为止。

结果值必须以数字形式返回。

访问者也可以通过输入空行或点击“取消”来停止该过程。在这种情况下，函数应该返回 null。
*/
function readNumber() {
  let num
  do {
    num = prompt('Enter a number please?', 0)
  } while (!isFinite(num))

  if (num === null || num === '') return null

  return +num
}

function random(min, max) {
  return min + Math.random() * (max - min)
}

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}
