// Promise API

// Promise.all
/* 
假设我们希望并行执行多个 promise，并等待所有 promise 都准备就绪。

例如，并行下载几个 URL，并等到所有内容都下载完毕后再对它们进行处理。

这就是 Promise.all 的用途。

语法：

let promise = Promise.all(iterable);
*/
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then((result) => {
  console.log(result)
})

// Promise.all(iterable) 允许在 iterable 中使用非 promise 的“常规”值
/* 
通常，Promise.all(...) 接受含有 promise 项的可迭代对象（大多数情况下是数组）作为参数。但是，如果这些对象中的任何一个不是 promise，那么它将被“按原样”传递给结果数组。

例如，这里的结果是 [1, 2, 3]：
*/
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3,
]).then((result) => {
  console.log(result)
})

// Promise.allSettled
/* 
Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：

- {status:"fulfilled", value:result} 对于成功的响应，
- {status:"rejected", reason:error} 对于 error。
*/
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url',
]

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == 'fulfilled') {
      console.log(`${urls[num]}: ${result.value.status}`)
    }
    if (result.status == 'rejected') {
      console.log(`${urls[num]}: ${result.reason}`)
    }
  })
})
/* 上面的 (*) 行中的 results 将会是：
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
*/

// Promise.race
/* 
与 Promise.all 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）。

语法：

let promise = Promise.race(iterable);
*/
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Whoops!')), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then((result) => {
  console.log(result)
})

// Promise.any
/* 
与 Promise.race 类似，区别在于 Promise.any 只等待第一个 fulfilled 的 promise，并将这个 fulfilled 的 promise 返回。如果给出的 promise 都 rejected，那么返回的 promise 会带有 AggregateError —— 一个特殊的 error 对象，在其 errors 属性中存储着所有 promise error。

语法如下：

let promise = Promise.any(iterable);
*/
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Whoops!')), 200)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then((result) => {
  console.log(result)
})
// 这里的第一个 promise 是最快的，但 rejected 了，所以第二个 promise 则成为了结果。在第一个 fulfilled 的 promise “赢得比赛”后，所有进一步的结果都将被忽略。

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Ouch!')), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Error!')), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name) // AggregateError
  console.log(error.errors[0]) // Error: Ouch!
  console.log(error.errors[1]) // Error: Error!
})

// Promise.resolve/reject
/* 
在现代的代码中，很少需要使用 Promise.resolve 和 Promise.reject 方法，因为 async/await 语法（我们会在 稍后 讲到）使它们变得有些过时了。

完整起见，以及考虑到那些出于某些原因而无法使用 async/await 的人，我们在这里对它们进行介绍。

Promise.resolve
Promise.resolve(value) 用结果 value 创建一个 resolved 的 promise。

如同：
let promise = new Promise(resolve => resolve(value));

当一个函数被期望返回一个 promise 时，这个方法用于兼容性。（译注：这里的兼容性是指，我们直接从缓存中获取了当前操作的结果 value，但是期望返回的是一个 promise，所以可以使用 Promise.resolve(value) 将 value “封装”进 promise，以满足期望返回一个 promise 的这个需求。）

例如，下面的 loadCached 函数获取（fetch）一个 URL 并记住其内容。以便将来对使用相同 URL 的调用，它能立即从缓存中获取先前的内容，但使用 Promise.resolve 创建了一个该内容的 promise，所以返回的值始终是一个 promise。
*/
let cache = new Map()

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)) // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text)
      return text
    })
}

/* 
Promise.reject
Promise.reject(error) 用 error 创建一个 rejected 的 promise。

如同：

let promise = new Promise((resolve, reject) => reject(error));
实际上，这个方法几乎从未被使用过。
*/

// 总结
/* 
Promise 类有 6 种静态方法：

1. Promise.all(promises) —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 Promise.all 的 error，所有其他 promise 的结果都会被忽略。

2. Promise.allSettled(promises)（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
  - status: "fulfilled" 或 "rejected"
  - value（如果 fulfilled）或 reason（如果 rejected）。

3. Promise.race(promises) —— 等待第一个 settle 的 promise，并将其 result/error 作为结果返回。

4. Promise.any(promises)（ES2021 新增方法）—— 等待第一个 fulfilled 的 promise，并将其结果作为结果返回。如果所有 promise 都 rejected，Promise.any 则会抛出 AggregateError 错误类型的 error 实例。

5. Promise.resolve(value) —— 使用给定 value 创建一个 resolved 的 promise。

6. Promise.reject(error) —— 使用给定 error 创建一个 rejected 的 promise。

以上所有方法，Promise.all 可能是在实战中使用最多的。
*/
