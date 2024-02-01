'use strict'
// splice
// arr.splice 方法可以说是处理数组的瑞士军刀。它可以做所有事情：添加，删除和插入元素。
/* 
语法是：
arr.splice(start[, deleteCount, elem1, ..., elemN])
它从索引 start 开始修改 arr：删除 deleteCount 个元素并在当前位置插入 elem1, ..., elemN。最后返回被删除的元素所组成的数组。
*/

let arr = ['I', 'study', 'JavaScript']
arr.splice(1, 1)
console.log(arr)

arr.splice(0, 2, "Let's", 'dance')
console.log(arr)

// 我们可以将 deleteCount 设置为 0，splice 方法就能够插入元素而不用删除任何元素：
arr = ['I', 'study', 'JavaScript']
arr.splice(2, 0, 'complex', 'language')
console.log(arr)

// slice
arr = ['t', 'e', 's', 't']
console.log(arr.slice(1, 3))
console.log(arr.slice(-2))
console.log(arr.slice(1))

// 我们也可以不带参数地调用它：arr.slice() 会创建一个 arr 的副本。其通常用于获取副本，以进行不影响原始数组的进一步转换。
let clone = arr.slice()
let clone2 = arr

console.log(clone)
console.log(clone === arr, clone2 === arr)

// contact
arr = [1, 2]
console.log(arr.concat([3, 4]))
console.log(arr.concat([3, 4], [5, 6]))
console.log(arr.concat([3, 4], 5, 6))

// 通常，它只复制数组中的元素。其他对象，即使它们看起来像数组一样，但仍然会被作为一个整体添加：
arr = [1, 2]
let arrayLike = {
  0: 'something',
  length: 1,
}
console.log(arr.concat(arrayLike))

// ……但是，如果类数组对象具有 Symbol.isConcatSpreadable 属性，那么它就会被 concat 当作一个数组来处理：此对象中的元素将被添加：
arrayLike = {
  0: 'something',
  1: 'else',
  [Symbol.isConcatSpreadable]: true,
  length: 2,
}
console.log(arr.concat(arrayLike))

// forEach
arr = ['Bilbo', 'Gandalf', 'Nazgul']
arr.forEach(function (item, index, array) {
  console.log(item)
  console.log(index)
  console.log(array)
})

// 在数组中搜索
/* 
arr.indexOf(item, from) —— 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。
arr.includes(item, from) —— 从索引 from 开始搜索 item，如果找到则返回 true（译注：如果没找到，则返回 false）。
*/
arr = [1, 0, false]

console.log(arr.indexOf(0))
console.log(arr.indexOf(false))
console.log(arr.indexOf(null))

console.log(arr.includes(1))

// 方法 includes 可以正确的处理 NaN
arr = [NaN]
console.log(arr.indexOf(NaN)) // -1（错，应该为 0）
console.log(arr.includes(NaN)) //

// find 和 findIndex/findLastIndex
/* 
语法：
arr.find(function(item, index, array) {
  // 如果返回 true，则返回 item 并停止迭代
  // 对于假值（falsy）的情况，则返回 undefined
});
- item 是元素。
- index 是它的索引。
- array 是数组本身。
*/
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Pete' },
  { id: 3, name: 'Mary' },
]
let user = users.find((item) => item.id === 1)
console.log(user)

/* 
arr.findIndex 方法（与 arr.find）具有相同的语法，但它返回找到的元素的索引，而不是元素本身。如果没找到，则返回 -1。

arr.findLastIndex 方法类似于 findIndex，但从右向左搜索，类似于 lastIndexOf。
*/

// filter map sort reverse -> 常见的，不多说222
let names = 'Bilbo, Gandalf, Nazgul'
arr = names.split(', ')
console.log(arr)

// split 方法有一个可选的第二个数字参数 —— 对数组长度的限制。如果提供了，那么额外的元素会被忽略。但实际上它很少使用：
arr = names.split(', ', 2)
console.log(arr)

// arr.join(glue) 与 split 相反。它会在它们之间创建一串由 glue 粘合的 arr 项。
arr = ['Bilbo', 'Gandalf', 'Nazgul']
let str = arr.join(';')
console.log(str)

// reduce/reduceRight
/*
arr.reduce 方法和 arr.reduceRight 方法和上面的种类差不多，但稍微复杂一点。它们用于根据数组计算单个值。

语法是：

let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
该函数一个接一个地应用于所有数组元素，并将其结果“搬运（carry on）”到下一个调用。

参数：

- accumulator —— 是上一个函数调用的结果，第一次等于 initial（如果提供了 initial 的话）。
- item —— 当前的数组元素。
- index —— 当前索引。
- arr —— 数组本身。

应用函数时，上一个函数调用的结果将作为第一个参数传递给下一个函数。

因此，第一个参数本质上是累加器，用于存储所有先前执行的组合结果。最后，它成为 reduce 的结果。
*/

arr = [1, 2, 3, 4, 5]
let result = arr.reduce((sum, current) => sum + current, 0)
console.log(result)

// 像上面那种情况后面不加零对结果也不会造成什么影响，但是看看下面这个例子：
arr = []
// Error: Reduce of empty array with no initial value
// 如果初始值存在，则 reduce 将为空 arr 返回它（即这个初始值）。
// arr.reduce((sum, current) => sum + current)

// Array.isArray
console.log(typeof [])
console.log(Array.isArray({}))
console.log(Array.isArray([]))

/*
大多数方法都支持 “thisArg”
几乎所有调用函数的数组方法 —— 比如 find，filter，map，除了 sort 是一个特例，都接受一个可选的附加参数 thisArg。

上面的部分中没有解释该参数，因为该参数很少使用。但是为了完整性，我们需要讲讲它。

以下是这些方法的完整语法：

arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg 是可选的最后一个参数

thisArg 参数的值在 func 中变为 this。
*/
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge
  },
}
users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }]
let soldiers = users.filter(army.canJoin, army)
console.log(soldiers)
/* 
如果在上面的示例中我们使用了 users.filter(army.canJoin)，那么 army.canJoin 将被作为独立函数调用，并且这时 this=undefined，从而会导致即时错误。

可以用 users.filter(user => army.canJoin(user)) 替换对 users.filter(army.canJoin, army) 的调用。前者的使用频率更高，因为对于大多数人来说，它更容易理解。

*/

// 任务

/* 
将 border-left-width 转换成 borderLeftWidth
重要程度: 5
编写函数 camelize(str) 将诸如 “my-short-string” 之类的由短划线分隔的单词变成骆驼式的 “myShortString”。

即：删除所有短横线，并将短横线后的每一个单词的首字母变为大写。

示例：

camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
提示：使用 split 将字符串拆分成数组，对其进行转换之后再 join 回来。
*/

function upperFirst(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function camelize(str) {
  const arr = str.split('-')
  let result = arr[0]

  for (let i = 1; i < arr.length; i++) {
    result += upperFirst(arr[i])
  }
  return result
}

console.log(camelize('background-color'))
console.log(camelize('list-style-image'))
console.log(camelize('-webkit-transition'))

/*
过滤范围
重要程度: 4
写一个函数 filterRange(arr, a, b)，该函数获取一个数组 arr，在其中查找数值大于或等于 a，且小于或等于 b 的元素，并将结果以数组的形式返回。

该函数不应该修改原数组。它应该返回新的数组。

例如：

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1（匹配值）

alert( arr ); // 5,3,8,1（未修改）
*/
arr = [5, 3, 8, 1]
function filterRange(arr, a, b) {
  return arr.filter((item) => item >= a && item < b)
}
console.log(filterRange(arr, 1, 4))
console.log(arr)

/* 
原位（in place）过滤范围
重要程度: 4
写一个函数 filterRangeInPlace(arr, a, b)，该函数获取一个数组 arr，并删除其中介于 a 和 b 区间以外的所有值。检查：a ≤ arr[i] ≤ b。

该函数应该只修改数组。它不应该返回任何东西。

例如：

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 删除了范围在 1 到 4 之外的所有值

alert( arr ); // [3, 1]
*/
function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i]

    // 如果超出范围，则删除
    if (val < a || val > b) {
      arr.splice(i, 1)
      i-- // 值得注意
    }
  }
}
arr = [5, 3, 8, 1]
filterRangeInPlace(arr, 1, 4) // 删除 1 到 4 范围之外的值
console.log(arr)

/* 
创建一个可扩展的 calculator
重要程度: 5
创建一个构造函数 Calculator，以创建“可扩展”的 calculator 对象。

该任务由两部分组成。

首先，实现 calculate(str) 方法，该方法接受像 "1 + 2" 这样格式为“数字 运算符 数字”（以空格分隔）的字符串，并返回结果。该方法需要能够理解加号 + 和减号 -。

用法示例：

let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10
然后添加方法 addMethod(name, func)，该方法教 calculator 进行新操作。它需要运算符 name 和实现它的双参数函数 func(a,b)。

例如，我们添加乘法 *，除法 / 和求幂 **：

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert( result ); // 8
此任务中没有括号或复杂的表达式。
数字和运算符之间只有一个空格。
你可以自行选择是否添加错误处理功能。
*/
function Calculator() {
  this.methods = {
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
  }

  this.calculate = function (str) {
    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2]

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN
    }

    return this.methods[op](a, b)
  }

  this.addMethod = function (name, func) {
    this.methods[name] = func
  }
}

let powerCalc = new Calculator()
powerCalc.addMethod('*', (a, b) => a * b)
powerCalc.addMethod('/', (a, b) => a / b)
powerCalc.addMethod('**', (a, b) => a ** b)

result = powerCalc.calculate('2 ** 3')
console.log(result)

/* 
随机排列数组
重要程度: 3
编写函数 shuffle(array) 来随机排列数组的元素。

多次运行 shuffle 可能导致元素顺序的不同。例如：

let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
所有元素顺序应该具有相等的概率。例如，可以将 [1,2,3] 重新排序为 [1,2,3] 或 [1,3,2] 或 [3,1,2] 等，每种情况的概率相等。
*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) // 从 0 到 i 的随机索引

    // 交换元素 array[i] 和 array[j]
    // 我们使用“解构分配（destructuring assignment）”语法来实现它
    // 你将在后面的章节中找到有关该语法的更多详细信息
    // 可以写成：
    // let t = array[i]; array[i] = array[j]; array[j] = t
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

/* 
数组去重
重要程度: 4
arr 是一个数组。

创建一个函数 unique(arr)，返回去除重复元素后的数组 arr。

例如：

function unique(arr) {
  // your code
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
*/
function unique(arr) {
  let result = []

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str)
    }
  }

  return result
}
/* !
代码有效，但其中存在潜在的性能问题。

方法 result.includes(str) 在内部遍历数组 result，并将每个元素与 str 进行比较以找到匹配项。

所以如果 result 中有 100 个元素，并且没有任何一项与 str 匹配，那么它将遍历整个 result 并进行 100 次比较。如果 result 很大，比如 10000，那么就会有 10000 次的比较。

这本身并不是问题，因为 JavaScript 引擎速度非常快，所以遍历一个有 10000 个元素的数组只需要几微秒。

但是我们在 for循环中对 arr 的每个元素都进行了一次检测。

因此，如果 arr.length 是 10000，我们会有 10000 * 10000 = 1 亿次的比较。那真的太多了。

所以该解决方案仅适用于小型数组。
*/
