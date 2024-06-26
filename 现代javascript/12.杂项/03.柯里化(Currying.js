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

我们可以更进一步，为当前的调试日志（debug log）提供便捷函数：
let debugNow = logNow("DEBUG");
debugNow("message"); // [HH:mm] DEBUG message
*/

/* 
1. 柯里化之后，我们没有丢失任何东西：log 依然可以被正常调用。
2. 我们可以轻松地生成部分应用函数，例如用于生成今天的日志的部分应用函数。
*/

// 高级柯里化实现
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

/* 
新的 curry 可能看上去有点复杂，但是它很容易理解。

curry(func) 调用的结果是如下所示的包装器 curried：

// func 是要转换的函数
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
当我们运行它时，这里有两个 if 执行分支：

1. 如果传入的 args 长度与原始函数所定义的（func.length）相同或者更长，那么只需要使用 func.apply 将调用传递给它即可。
2. 否则，获取一个部分应用函数：我们目前还没调用 func。取而代之的是，返回另一个包装器 pass，它将重新应用 curried，将之前传入的参数与新的参数一起传入。

然后，如果我们再次调用它，我们将得到一个新的部分应用函数（如果没有足够的参数），或者最终的结果。
*/

/* 
只允许确定参数长度的函数
柯里化要求函数具有固定数量的参数。
使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化。
*/

// 总结
/* 
柯里化 是一种转换，将 f(a,b,c) 转换为可以被以 f(a)(b)(c) 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回部分应用函数。

柯里化让我们能够更容易地获取部分应用函数。就像我们在日志记录示例中看到的那样，普通函数 log(date, importance, message) 在被柯里化之后，当我们调用它的时候传入一个参数（如 log(date)）或两个参数（log(date, importance)）时，它会返回部分应用函数。
*/
