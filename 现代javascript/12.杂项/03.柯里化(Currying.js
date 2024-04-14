// 柯里化（Currying）
/* 
柯里化（Currying）是一种关于函数的高阶技术。它不仅被用于 JavaScript，还被用于其他编程语言。

柯里化是一种函数的转换，它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)。

柯里化不会调用函数。它只是对函数进行转换。

让我们先来看一个例子，以更好地理解我们正在讲的内容，然后再进行一个实际应用。

我们将创建一个辅助函数 curry(f)，该函数将对两个参数的函数 f 执行柯里化。换句话说，对于两个参数的函数 f(a, b) 执行 curry(f) 会将其转换为以 f(a)(b) 形式运行的函数： 
*/

function curry(f) {
  // curry(f) 执行柯里化转换
  return function (a) {
    return function (b) {
      return f(a, b)
    }
  }
}

// 用法
function sum(a, b) {
  return a + b
}

let curriedSum = curry(sum)

console.log(curriedSum(1)(2)) // 3

/* 
实现非常简单：只有两个包装器（wrapper）。

- curry(func) 的结果就是一个包装器 function(a)。
- 当它被像 curriedSum(1) 这样调用时，它的参数会被保存在词法环境中，然后返回一个新的包装器 function(b)。
- 然后这个包装器被以 2 为参数调用，并且，它将该调用传递给原始的 sum 函数。

柯里化更高级的实现，例如 lodash 库的 _.curry，会返回一个包装器，该包装器允许函数被正常调用或者以部分应用函数（partial）的方式调用：
*/

// 柯里化？目的是什么？
/* 
要了解它的好处，我们需要一个实际中的例子。

例如，我们有一个用于格式化和输出信息的日志（logging）函数 log(date, importance, message)。在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志（log），在这儿我们仅使用 alert：
*/
function log(date, importance, message) {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`
  )
}
/* 
让我们将它柯里化！

log = _.curry(log);
柯里化之后，log 仍正常运行：

log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
……但是也可以以柯里化形式运行：

log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
现在，我们可以轻松地为当前日志创建便捷函数：

// logNow 会是带有固定第一个参数的日志的部分应用函数
let logNow = log(new Date());

// 使用它
logNow("INFO", "message"); // [HH:mm] INFO message
现在，logNow 是具有固定第一个参数的 log，换句话说，就是更简短的“部分应用函数（partially applied function）”或“部分函数（partial）”。

*/
