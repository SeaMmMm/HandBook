try {
  lalala
} catch (error) {
  console.log(error.name)
  console.log(error.message)
  console.log(error.stack)
  console.log(error)
}

// “throw” 操作符
let json = '{ "age": 30 }'
try {
  let user = JSON.parse(json)

  if (!user.name) {
    throw new SyntaxError('数据不全：没有 name')
  }
} catch (err) {
  console.log(err.name)
  console.log(err.message)
}

// 再次抛出（Rethrowing）
// 在上面的例子中，我们使用 try...catch 来处理不正确的数据。但是在 try {...} 块中是否可能发生 另一个预料之外的 error？例如编程错误（未定义变量）或其他错误，而不仅仅是这种“不正确的数据”。
/* 
下面这个示例演示了这种类型的 error 是如何被另外一级 try...catch 捕获的：

function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // error!
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
      throw err; // 再次抛出（不知道如何处理它）
    }
  }
}

try {
  readData();
} catch (err) {
  alert( "External catch got: " + err ); // 捕获了它！
}
*/

// 全局 catch
/* 
设想一下，在 try...catch 结构外有一个致命的 error，然后脚本死亡了。这个 error 就像编程错误或其他可怕的事儿那样。

有什么办法可以用来应对这种情况吗？我们可能想要记录这个 error，并向用户显示某些内容（通常用户看不到错误信息）等。

规范中没有相关内容，但是代码的执行环境一般会提供这种机制，因为它确实很有用。例如，Node.JS 有 process.on("uncaughtException")。在浏览器中，我们可以将一个函数赋值给特殊的 window.onerror 属性，该函数将在发生未捕获的 error 时执行。
*/

/* 语法如下：
window.onerror = function (message, url, line, col, error) {
  // ...
}

message
error 信息。

url
发生 error 的脚本的 URL。

line，col
发生 error 处的代码的行号和列号。

error
error 对象。
*/
