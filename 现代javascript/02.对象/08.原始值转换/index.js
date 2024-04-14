// 转换规则 - hint。类型转换在各种情况下有三种变体。它们被称为 “hint”
// https://zh.javascript.info/object-toprimitive

// ! 这节看的有点懵，我还会回来的

/*
1. 没有转换为布尔值。所有的对象在布尔上下文（context）中均为 true，就这么简单。只有字符串和数字转换。
2. 数字转换发生在对象相减或应用数学函数时。例如，Date 对象（将在 日期和时间 一章中介绍）可以相减，date1 - date2 的结果是两个日期之间的差值。
3. 至于字符串转换 —— 通常发生在我们像 alert(obj) 这样输出一个对象和类似的上下文中。
*/
const obj = {}
if (obj) console.log('Obj转换为 true 的布尔值')

console.log(new Date('2022-01-05') - new Date('2022-01-01'))

obj.name = 'Jack'
console.log(obj)

// hint
// 类型转换在各种情况下有三种变体。它们被称为 “hint”，在 规范 所述：

// string 对象到字符串的转换，当我们对期望一个字符串的对象执行操作时

console.log(obj)
const anotherObj = {}
anotherObj[obj] = 'sword new new'
console.log(anotherObj)
console.log(anotherObj[obj])

// number 对象到数字的转换，例如当我们进行数学运算时

// 显式转换
let number = Number(obj)
console.log(number)

// 数学运算(除了二元加法)
let n = +obj // 一元加法
console.log(n)
console.log(new Date('2022-01-05') - new Date('2022-01-01'))

// 大于小于的比较
let greater = { name: 'jack' } > { name: 'john' }
console.log(greater)

// default
// 在少数情况下发生，当运算符“不确定”期望值的类型时。例如，二元加法 + 可用于字符串（连接），也可以用于数字（相加）。因此，当二元加法得到对象类型的参数时，它将依据 "default" hint 来对其进行转换。
// 此外，如果对象被用于与字符串、数字或 symbol 进行 == 比较，这时到底应该进行哪种转换也不是很明确，因此使用 "default" hint。

// 二元加法使用默认 hint
let obj1 = {},
  obj2 = { name: 'jack' }
let total = obj1 + obj2
console.log(total)

if (obj2 == 1) console.log('hello world')

// 像 < 和 > 这样的小于/大于比较运算符，也可以同时用于字符串和数字。不过，它们使用 “number” hint，而不是 “default”。这是历史原因。

/*
  除了一种情况（Date 对象，我们稍后会讲到）之外，所有内建对象都以和 "number" 相同的方式实现 "default" 转换。我们也可以这样做。
  尽管如此，了解上述的 3 个 hint 还是很重要的，很快你就会明白为什么这样说。
  为了进行转换，JavaScript 尝试查找并调用三个对象方法：
  1. 调用 obj[Symbol.toPrimitive](hint) —— 带有 symbol 键 Symbol.toPrimitive（系统 symbol）的方法，如果这个方法存在的话，
  2. 否则，如果 hint 是 "string" —— 尝试调用 obj.toString() 或 obj.valueOf()，无论哪个存在。
  3. 否则，如果 hint 是 "number" 或 "default" —— 尝试调用 obj.valueOf() 或 obj.toString()，无论哪个存在。
*/

// Symbol.toPrimitive
// 我们从第一个方法开始。有一个名为 Symbol.toPrimitive 的内建 symbol，它被用来给转换方法命名，像这样：

obj[Symbol.toPrimitive] = function (hint) {
  // 这里是将此对象转换为原始值的代码
  // 它必须返回一个原始值
  // hint = "string"、"number" 或 "default" 中的一个
}

let user = {
  name: 'John',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`)
    return hint == 'string' ? `{name: "${this.name}"}` : this.money
  },
}

console.log(user)
console.log(+user)
console.log(user + 500)

// toString/valueOf
/*
如果没有 Symbol.toPrimitive，那么 JavaScript 将尝试寻找 toString 和 valueOf 方法：

1. 对于 "string" hint：调用 toString 方法，如果它不存在，则调用 valueOf 方法（因此，对于字符串转换，优先调用 toString）。
2. 对于其他 hint：调用 valueOf 方法，如果它不存在，则调用 toString 方法（因此，对于数学运算，优先调用 valueOf 方法）。

toString 和 valueOf 方法很早己有了。它们不是 symbol（那时候还没有 symbol 这个概念），而是“常规的”字符串命名的方法。它们提供了一种可选的“老派”的实现转换的方法。

这些方法必须返回一个原始值。如果 toString 或 valueOf 返回了一个对象，那么返回值会被忽略（和这里没有方法的时候相同）。

默认情况下，普通对象具有 toString 和 valueOf 方法：

- toString 方法返回一个字符串 "[object Object]"。
- valueOf 方法返回对象自身。
*/

console.log(user)
console.log(user.valueOf())
console.log(user.valueOf() === user)

// 让我们实现一下这些方法来自定义转换。
let user2 = {
  name: 'John',
  money: 1000,

  // 对于 hint="string"
  toString() {
    return `{name: "${this.name}"}`
  },

  // 对于 hint="number" 或 "default"
  valueOf() {
    return this.money
  },
}
console.log(user2)
console.log(+user2)
console.log(user + 500)

// 通常我们希望有一个“全能”的地方来处理所有原始转换。在这种情况下，我们可以只实现 toString，就像这样：
user2 = {
  name: 'John',
  toString() {
    return this.name
  },
}

console.log(user2)
console.log(user2 + 500)
// 如果没有 Symbol.toPrimitive 和 valueOf，toString 将处理所有原始转换。

// 转换可以返回任何原始类型
/*
关于所有原始转换方法，有一个重要的点需要知道，就是它们不一定会返回 “hint” 的原始值。

没有限制 toString() 是否返回字符串，或 Symbol.toPrimitive 方法是否为 "number" hint 返回数字。

唯一强制性的事情是：这些方法必须返回一个原始值，而不是对象。

历史原因
由于历史原因，如果 toString 或 valueOf 返回一个对象，则不会出现 error，但是这种值会被忽略（就像这种方法根本不存在）。这是因为在 JavaScript 语言发展初期，没有很好的 “error” 的概念。

相反，Symbol.toPrimitive 更严格，它 必须 返回一个原始值，否则就会出现 error。
*/

// 进一步转换
/*
我们已经知道，许多运算符和函数执行类型转换，例如乘法 * 将操作数转换为数字。

如果我们将对象作为参数传递，则会出现两个运算阶段：

对象被转换为原始值（通过前面我们描述的规则）。
如果还需要进一步计算，则生成的原始值会被进一步转换。
*/

let testObj = {
  toString() {
    return '2'
  },
}

/*
乘法 obj * 2 首先将对象转换为原始值（字符串 “2”）。
之后 "2" * 2 变为 2 * 2（字符串被转换为数字）。
*/
console.log(testObj * 2)

/*
二元加法在同样的情况下会将其连接成字符串，因为它更愿意接受字符串
*/
console.log(testObj + 2)

// 总结
/* 
对象到原始值的转换，是由许多期望以原始值作为值的内建函数和运算符自动调用的。

这里有三种类型（hint）：

- "string"（对于 alert 和其他需要字符串的操作）
- "number"（对于数学运算）
- "default"（少数运算符，通常对象以和 "number" 相同的方式实现 "default" 转换）
规范明确描述了哪个运算符使用哪个 hint。

转换算法是：

1. 调用 obj[Symbol.toPrimitive](hint) 如果这个方法存在，
2.否则，如果 hint 是 "string"
  - 尝试调用 obj.toString() 或 obj.valueOf()，无论哪个存在。
3. 否则，如果 hint 是 "number" 或者 "default"
  - 尝试调用 obj.valueOf() 或 obj.toString()，无论哪个存在。

所有这些方法都必须返回一个原始值才能工作（如果已定义）。

在实际使用中，通常只实现 obj.toString() 作为字符串转换的“全能”方法就足够了，该方法应该返回对象的“人类可读”表示，用于日志记录或调试。
*/
