// Promise 对象的构造器（constructor）语法如下：
let promise = new Promise(function (resolve, reject) {
  // executor（生产者代码，“歌手”）
})

/* 
传递给 new Promise 的函数被称为 executor。当 new Promise 被创建，executor 会自动运行。它包含最终应产出结果的生产者代码。按照上面的类比：executor 就是“歌手”。

它的参数 resolve 和 reject 是由 JavaScript 自身提供的回调。我们的代码仅在 executor 的内部。

当 executor 获得了结果，无论是早还是晚都没关系，它应该调用以下回调之一：

- resolve(value) —— 如果任务成功完成并带有结果 value。
- reject(error) —— 如果出现了 error，error 即为 error 对象。

所以总结一下就是：executor 会自动运行并尝试执行一项工作。尝试结束后，如果成功则调用 resolve，如果出现 error 则调用 reject。

由 new Promise 构造器返回的 promise 对象具有以下内部属性：

- state —— 最初是 "pending"，然后在 resolve 被调用时变为 "fulfilled"，或者在 reject 被调用时变为 "rejected"。
- result —— 最初是 undefined，然后在 resolve(value) 被调用时变为 value，或者在 reject(error) 被调用时变为 error。
*/

promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('done!')
  }, 1000)
})

// 消费者：then，catch

/* 
最重要最基础的一个就是 .then。

语法如下：

promise.then(
  function(result) { // handle a successful result  },
  function(error) { // handle an error  }
);
.then 的第一个参数是一个函数，该函数将在 promise resolved 且接收到结果后执行。

.then 的第二个参数也是一个函数，该函数将在 promise rejected 且接收到 error 信息后执行。
*/

promise.then(
  (result) => console.log(result),
  (error) => console.log(error)
)

// 清理：finally
/* 
就像常规 try {...} catch {...} 中的 finally 子句一样，promise 中也有 finally。

调用 .finally(f) 类似于 .then(f, f)，因为当 promise settled 时 f 就会执行：无论 promise 被 resolve 还是 reject。

finally 的功能是设置一个处理程序在前面的操作完成后，执行清理/终结。

例如，停止加载指示器，关闭不再需要的连接等。

把它想象成派对的终结者。无论派对是好是坏，有多少朋友参加，我们都需要（或者至少应该）在它之后进行清理。
*/
