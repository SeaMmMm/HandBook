// Rest参数 ...

function sumAll(...args) {
  let sum = 0

  for (let arg of args) sum += arg

  return sum
}
console.log(sumAll(1, 2, 3, 4))

/* 
我们也可以选择将第一个参数获取为变量，并将剩余的参数收集起来。

下面的例子把前两个参数获取为变量，并把剩余的参数收集到 titles 数组中：
*/

function showName(firstName, lastName, ...titles) {
  console.log(firstName + ' ' + lastName)

  // 剩余的参数被放入 titles 数组中
  // i.e. titles = ["Consul", "Imperator"]
  console.log(titles[0])
  console.log(titles[1])
  console.log(titles.length)
}
showName('Julius', 'Caesar', 'Consul', 'Imperator')

// Rest 参数必须放到参数列表的末尾

// “arguments” 变量
// 有一个名为 arguments 的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。

// 例如：
function showName() {
  console.log(arguments.length)
  console.log(arguments[0])
  console.log(arguments[1])

  // 它是可遍历的
  // for(let arg of arguments) console.log(arg);
}

// 依次显示：2，Julius，Caesar
showName('Julius', 'Caesar')

// 依次显示：1，Ilya，undefined（没有第二个参数）
showName('Ilya')

/* 
在过去，JavaScript 中不支持 rest 参数语法，而使用 arguments 是获取函数所有参数的唯一方法。现在它仍然有效，我们可以在一些老代码里找到它。

但缺点是，尽管 arguments 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 arguments.map(...) 等方法。

此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取参数的一部分。

因此，当我们需要这些功能时，最好使用 rest 参数。
*/
// 箭头函数没有这个参数

const show = () => console.log(arguments)
console.log(show())

// Spread 语法内部使用了迭代器来收集元素，与 for..of 的方式相同。
// 因此，对于一个字符串，for..of 会逐个返回该字符串中的字符，...str 也同理会得到 "H","e","l","l","o" 这样的结果。随后，字符列表被传递给数组初始化器 [...str]。
// 对于这个特定任务，我们还可以使用 Array.from 来实现，因为该方法会将一个可迭代对象（如字符串）转换为数组：

let str = 'Hello'
// Array.from 将可迭代对象转换为数组
console.log(Array.from(str)) // H,e,l,l,o

// 运行结果与 [...str] 相同。
// 不过 Array.from(obj) 和 [...obj] 存在一个细微的差别：
// Array.from 适用于类数组对象也适用于可迭代对象。
// Spread 语法只适用于可迭代对象。
// 因此，对于将一些“东西”转换为数组的任务，Array.from 往往更通用。

// 总结
/* 
当我们在代码中看到 "..." 时，它要么是 rest 参数，要么是 spread 语法。

有一个简单的方法可以区分它们：

若 ... 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
若 ... 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。
使用场景：

Rest 参数用于创建可接受任意数量参数的函数。
Spread 语法用于将数组传递给通常需要含有许多参数的函数。
我们可以使用这两种语法轻松地互相转换列表与参数数组。

旧式的 arguments（类数组且可迭代的对象）也依然能够帮助我们获取函数调用中的所有参数。 
*/
