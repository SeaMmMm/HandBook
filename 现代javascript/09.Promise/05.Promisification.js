// 其实就是 Promise 化

// 在 简介：回调 一章中我们有 loadScript(src, callback)。
function loadScript(src, callback) {
  let script = document.createElement('script')
  script.src = src

  script.onload = () => callback(null, script)
  script.onerror = () => callback(new Error(`Script load error for ${src}`))

  document.head.append(script)
}

// 用法：
// loadScript('path/script.js', (err, script) => {...})
/* 
该函数通过给定的 src 加载脚本，然后在出现错误时调用 callback(err)，或者在加载成功时调用 callback(null, script)。这是大家对于使用回调函数的共识，我们之前也学习过。

现在，让我们将其 promise 化吧。

我们将创建一个新的函数 loadScriptPromise(src)，与上面的函数作用相同（加载脚本），只是我们创建的这个函数会返回一个 promise 而不是使用回调。

换句话说，我们仅向它传入 src（没有 callback）并通过该函数的 return 获得一个 promise，当脚本加载成功时，该 promise 将以 script 为结果 resolve，否则将以出现的 error 为结果 reject。
*/

let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script)
    })
  })
}

// 用法：
// loadScriptPromise('path/script.js').then(...)

// 在实际开发中，我们可能需要 promise 化很多函数，所以使用一个 helper（辅助函数）很有意义。
// 我们将其称为 promisify(f)：它接受一个需要被 promise 化的函数 f，并返回一个包装（wrapper）函数。
function promisify(f) {
  return function (...args) {
    // 返回一个包装函数（wrapper-function） (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // 我们对 f 的自定义的回调 (**)
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }

      args.push(callback) // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args) // 调用原始的函数
    })
  }
}
/* 
在这里，promisify 假设原始函数期望一个带有两个参数 (err, result) 的回调。这就是我们最常遇到的形式。那么我们自定义的回调的格式是完全正确的，在这种情况下 promisify 也可以完美地运行。

但是如果原始的 f 期望一个带有更多参数的回调 callback(err, res1, res2, ...)，该怎么办呢？

我们可以继续改进我们的辅助函数。让我们写一个更高阶版本的 promisify。

- 当它被以 promisify(f) 的形式调用时，它应该以与上面那个版本的实现的工作方式类似。
- 当它被以 promisify(f, true) 的形式调用时，它应该返回以回调函数数组为结果 resolve 的 promise。这就是具有很多个参数的回调的结果。
*/
// promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // 我们自定义的 f 的回调
        if (err) {
          reject(err)
        } else {
          // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
          resolve(manyArgs ? results : results[0])
        }
      }

      args.push(callback)

      f.call(this, ...args)
    })
  }
}
