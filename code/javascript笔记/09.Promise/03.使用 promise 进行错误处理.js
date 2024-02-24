// promise 链在错误（error）处理中十分强大。当一个 promise 被 reject 时，控制权将移交至最近的 rejection 处理程序。这在实际开发中非常方便。
// .catch 不必是立即的。它可能在一个或多个 .then 之后出现。

// 或者，可能该网站一切正常，但响应不是有效的 JSON。捕获所有 error 的最简单的方法是，将 .catch 附加到链的末尾：

fetch('/article/promise-chaining/user.json')
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement('img')
        img.src = githubUser.avatar_url
        img.className = 'promise-avatar-example'
        document.body.append(img)

        setTimeout(() => {
          img.remove()
          resolve(githubUser)
        }, 3000)
      })
  )
  .catch((error) => {
    console.log(error.message)
  })

// 通常情况下，这样的 .catch 根本不会被触发。但是如果上述任意一个 promise rejected（网络问题或者无效的 json 或其他），.catch 就会捕获它。

// 隐式 try…catch
// promise 的执行者（executor）和 promise 的处理程序周围有一个“隐式的 try..catch”。如果发生异常，它就会被捕获，并被视为 rejection 进行处理。

new Promise((resolve, reject) => {
  throw new Error('Whoops!')
}).catch(function (err) {
  console.log(err)
})

// ……与下面这段代码工作上完全相同：
new Promise((resolve, reject) => {
  reject(new Error('Whoops!'))
}).catch((err) => {
  console.log(err)
})

/* 
在 executor 周围的“隐式 try..catch”自动捕获了 error，并将其变为 rejected promise。

这不仅仅发生在 executor 函数中，同样也发生在其处理程序中。如果我们在 .then 处理程序中 throw，这意味着 promise rejected，因此控制权移交至最近的 error 处理程序。
*/

// 再次抛出（Rethrowing）
/* 
在常规的 try..catch 中，我们可以分析 error，如果我们无法处理它，可以将其再次抛出。对于 promise 来说，这也是可以的。

如果我们在 .catch 中 throw，那么控制权就会被移交到下一个最近的 error 处理程序。如果我们处理该 error 并正常完成，那么它将继续到最近的成功的 .then 处理程序。
*/
// 执行流：catch -> catch
new Promise((resolve, reject) => {
  throw new Error('Whoops!')
})
  .catch(function (error) {
    // (*)

    if (error instanceof URIError) {
      // 处理它
    } else {
      console.log("Can't handle such error")

      throw error // 再次抛出此 error 或另外一个 error，执行将跳转至下一个 catch
    }
  })
  .then(function () {
    /* 不在这里运行 */
  })
  .catch((error) => {
    // (**)

    console.log(`The unknown error has occurred: ${error}`)
    // 不会返回任何内容 => 执行正常进行
  })

// 未处理的 rejection
new Promise(function () {
  noSuchFunction() // 这里出现 error（没有这个函数）
}).then(() => {
  // 一个或多个成功的 promise 处理程序
}) // 尾端没有 .catch！

/* 
如果出现 error，promise 的状态将变为 “rejected”，然后执行应该跳转至最近的 rejection 处理程序。但上面这个例子中并没有这样的处理程序。因此 error 会“卡住”。没有代码来处理它。

在实际开发中，就像代码中常规的未处理的 error 一样，这意味着某些东西出了问题。

当发生一个常规的 error 并且未被 try..catch 捕获时会发生什么？脚本死了，并在控制台中留下了一个信息。对于在 promise 中未被处理的 rejection，也会发生类似的事。

JavaScript 引擎会跟踪此类 rejection，在这种情况下会生成一个全局的 error。如果你运行上面这个代码，你可以在控制台中看到。

在浏览器中，我们可以使用 unhandledrejection 事件来捕获这类 error：
*/
