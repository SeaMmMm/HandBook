// 数组可以存储任何类型的元素。
let arr = [
  'Apple',
  { name: 'John' },
  true,
  function (x) {
    console.log(`you put ${x}`)
  },
]
console.log(arr[1].name)
arr[3](2)

// 使用 “at” 获取最后一个元素
let fruits = ['Apple', 'Orange', 'Plum']
console.log(fruits.at(-1))
/* 
换句话说，arr.at(i)：

如果 i >= 0，则与 arr[i] 完全相同。
对于 i 为负数的情况，它则从数组的尾部向前数。
*/

// pop/push, shift/unshift 方法

// pop
console.log(fruits.pop())
console.log(fruits)

// push
console.log(fruits.push('Pear'))
console.log(fruits)

// shift
console.log(fruits.shift())
console.log(fruits)

// unshift
console.log(fruits.unshift('Apple'))
console.log(fruits)

// push 和 unshift 方法都可以一次添加多个元素：
fruits = ['Apple']
fruits.push('Orange', 'Peach')
fruits.unshift('Pineapple', 'Lemon')
console.log(fruits)

// 内部
// 数组是一种特殊的对象。使用方括号来访问属性 arr[0] 实际上是来自于对象的语法。它其实与 obj[key] 相同，其中 arr 是对象，而数字用作键（key）。
// 它们扩展了对象，提供了特殊的方法来处理有序的数据集合以及 length 属性。但从本质上讲，它仍然是一个对象。
fruits = ['Banana']
arr = fruits
console.log(arr === fruits)
arr.push('Pear')
console.log(fruits)

// 循环
// 最古老的就是 for 循环了
arr = fruits = ['Apple', 'Orange', 'Pear']

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// 现在还有另外一种方式：for...of：只不过无法获取到下标值
for (const fruit of fruits) {
  console.log(fruit)
}

// 要获取下标值要用 for...in
for (let key in arr) {
  console.log(arr[key])
}
/* 
但这其实是一个很不好的想法。会有一些潜在问题存在：

1. for..in 循环会遍历 所有属性，不仅仅是这些数字属性。

在浏览器和其它环境中有一种称为“类数组”的对象，它们 看似是数组。也就是说，它们有 length 和索引属性，但是也可能有其它的非数字的属性和方法，这通常是我们不需要的。for..in 循环会把它们都列出来。所以如果我们需要处理类数组对象，这些“额外”的属性就会存在问题。

2. for..in 循环适用于普通对象，并且做了对应的优化。但是不适用于数组，因此速度要慢 10-100 倍。当然即使是这样也依然非常快。只有在遇到瓶颈时可能会有问题。但是我们仍然应该了解这其中的不同。

通常来说，我们不应该用 for..in 来处理数组。
*/

const fakeArr = [1, 2, 3, { name: 'John', age: 12 }]
for (let key in fakeArr) {
  console.log(fakeArr[key])
}

// 关于 length

fruits = []
fruits[123] = 'Apple'
console.log(fruits.length)

// 并且，length 是可写的，但是不可逆
arr = [1, 2, 3, 4, 5]

arr.length = 2
console.log(arr)

arr.length = 5
console.log(arr[3])
// 所以，清空数组最简单的方法就是：arr.length = 0;。

// 我们试试运行一下这个：
console.log([] + 1)
console.log([1] + 1)
console.log([1, 2] + 1)

/*
数组没有 Symbol.toPrimitive，也没有 valueOf，它们只能执行 toString 进行转换，所以这里 [] 就变成了一个空字符串，[1] 变成了 "1"，[1,2] 变成了 "1,2"。

当 "+" 运算符把一些项加到字符串后面时，加号后面的项也会被转换成字符串，所以下一步就会是这样：
*/
console.log('' + 1)
console.log('1' + 1)
console.log('1,2' + 1)

// 不要使用 == 比较数组
/* 上原文：
JavaScript 中的数组与其它一些编程语言的不同，不应该使用 == 运算符比较 JavaScript 中的数组。

该运算符不会对数组进行特殊处理，它会像处理任意对象那样处理数组。

让我们回顾一下规则：

- 仅当两个对象引用的是同一个对象时，它们才相等 ==。
- 如果 == 左右两个参数之中有一个参数是对象，另一个参数是原始类型，那么该对象将会被转换为原始类型，转换规则如 对象 —— 原始值转换 一章所述。
- ……null 和 undefined 相等 ==，且各自不等于任何其他的值。

严格比较 === 更简单，因为它不会进行类型转换。

所以，如果我们使用 == 来比较数组，除非我们比较的是两个引用同一数组的变量，否则它们永远不相等。

例如：

alert( [] == [] ); // false
alert( [0] == [0] ); // false

从技术上讲，这些数组是不同的对象。所以它们不相等。== 运算符不会进行逐项比较。

与原始类型的比较也可能会产生看似很奇怪的结果：

alert( 0 == [] ); // true

alert('0' == [] ); // false

在这里的两个例子中，我们将原始类型和数组对象进行比较。因此，数组 [] 被转换为原始类型以进行比较，被转换成了一个空字符串 ''。

然后，接下来的比较就是原始类型之间的比较，如 类型转换 一章所述：

// 在 [] 被转换为 '' 后
alert( 0 == '' ); // true，因为 '' 被转换成了数字 0

alert('0' == '' ); // false，没有进一步的类型转换，是不同的字符串

那么，我们应该如何对数组进行比较呢？
很简单，不要使用 == 运算符。而是，可以在循环中或者使用下一章中我们将介绍的迭代方法逐项地比较它们。
*/

// 任务

/*
数组被拷贝了吗?
重要程度: 3
下面的代码将会显示什么？

let fruits = ["Apples", "Pear", "Orange"];

// 在“副本”里 push 了一个新的值
let shoppingCart = fruits;
shoppingCart.push("Banana");

// fruits 里面是什么？
alert( fruits.length ); // ?
*/
// easy game

/*
数组操作。
重要程度: 5
我们试试下面的 5 个数组操作。

创建一个数组 styles，里面存储有 “Jazz” 和 “Blues”。
将 “Rock-n-Roll” 从数组末端添加进去。
用 “Classics” 替换掉数组最中间的元素。查找数组最中间的元素的代码应该适用于任何奇数长度的数组。
去掉数组的第一个值并显示它。
在数组前面添加 Rap 和 Reggae。
过程中的数组：

Jazz, Blues
Jazz, Blues, Rock-n-Roll
Jazz, Classics, Rock-n-Roll
Classics, Rock-n-Roll
Rap, Reggae, Classics, Rock-n-Roll
*/
const styles = ['Jazz', 'Blues']
styles.push('Pock-n-Roll')
console.log(styles)

function replaceMid(arr) {
  if (arr.length % 2 === 0) {
    throw new Error('请给奇数个的数组')
  }

  const mid = Math.floor(arr.length / 2)
  console.log(mid)

  arr[mid] = 'Classics'
}

replaceMid(styles)
console.log(styles)
console.log(styles.shift())
styles.unshift('Rap', 'Reggae')
console.log(styles)

/* 
在数组上下文调用
重要程度: 5
结果是什么？为什么？

let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
*/

/*
最大子数组
重要程度: 2
输入是以数字组成的数组，例如 arr = [1, -2, 3, 4, -9, 6].

任务是：找出所有项的和最大的 arr 数组的连续子数组。

写出函数 getMaxSubSum(arr)，用其找出并返回最大和。

例如：

getMaxSubSum([-1, 2, 3, -9]) == 5（高亮项的加和）
getMaxSubSum([2, -1, 2, 3, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, 11]) == 11
getMaxSubSum([-2, -1, 1, 2]) == 3
getMaxSubSum([100, -9, 2, -3, 5]) == 100
getMaxSubSum([1, 2, 3]) == 6（所有项的和）
如果所有项都是负数，那就一个项也不取（子数组是空的），所以返回的是 0：

getMaxSubSum([-1, -2, -3]) = 0
请尝试想出一个快速的解决方案：复杂度可以是 O(n2)，有能力达到 O(n) 则更好。
*/

// 纯度动态规划
function getMaxSubSum(nums) {
  if (nums.length === 0) return 0

  const dp = new Array(nums.length)
  dp[0] = nums[0] // base case
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
  }
  return Math.max(...dp, 0)
}

/* -----------------看看耗时------------------------ */

const test = [
  2, 3, 4, -2, 0, 0, 3, 3, 3, 2, -4, -4, 5, 6, 7, 8, 1, 2, 2, 2, 111, 23, 4344,
  -9998, 99876, 23, 23, -2234, 231, 213, 213, 21, 3, 432, 3, 3, 3, 0, 0, 0, 22,
  2, 2, 2, 4343, 998, -9987,
]
let start = performance.now()
console.log(getMaxSubSum(test))
let end = performance.now()
console.log(end - start)
