// 内建函数 eval 允许执行一个代码字符串。
// 语法如下：
// let result = eval(code);

let code = 'console.log("Hello")'
eval(code) // Hello

/* 
代码字符串可能会比较长，包含换行符、函数声明和变量等。

eval 的结果是最后一条语句的结果。
*/

let value = eval('1+1')
console.log(value) // 2

value = eval('let i = 0;++i')
console.log(value) // 1

// eval 内的代码在当前词法环境（lexical environment）中执行，因此它能访问外部变量：
let a = 1
function f() {
  let a = 2
  eval('console.log(a)') // 2
}
f()

// 它也可以更改外部变量：
let x = 1
eval('x = 2')
console.log(x) // 2

// 严格模式下，eval 有属于自己的词法环境。因此我们不能从外部访问在 eval 中声明的函数和变量：
eval('let y = 3')
// console.log(y) // ReferenceError: y is not defined

/* 
现代编程中，已经很少使用 eval 了。人们经常说“eval 是魔鬼”。

原因很简单：很久很久以前，JavaScript 是一种非常弱的语言，很多东西只能通过 eval 来完成。不过那已经是十年前的事了。

如今几乎找不到使用 eval 的理由了。如果有人在使用它，那这是一个很好的使用现代语言结构或 JavaScript Module 来替换它们的机会。

请注意，eval 访问外部变量的能力会产生副作用。

代码压缩工具（在把 JS 投入生产环境前对其进行压缩的工具）将局部变量重命名为更短的变量（例如 a 和 b 等），以使代码体积更小。这通常是安全的，但在使用了 eval 的情况下就不一样了，因为局部变量可能会被 eval 中的代码访问到。因此压缩工具不会对所有可能会被从 eval 中访问的变量进行重命名。这样会导致代码压缩率降低。

在 eval 中使用外部局部变量也被认为是一个坏的编程习惯，因为这会使代码维护变得更加困难。
*/
