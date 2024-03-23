// Promise 链
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000) // (*)
})
  .then(function (result) {
    // (**)

    console.log(result)
    return result * 2
  })
  .then(function (result) {
    // (***)

    console.log(result)
    return result * 2
  })
  .then(function (result) {
    console.log(result)
    return result * 2
  })

// 通过 .then 处理程序（handler）链进行传递 result。
/* 
运行流程如下：

1. 初始 promise 在 1 秒后 resolve (*)，
2. 然后 .then 处理程序被调用 (**)，它又创建了一个新的 promise（以 2 作为值 resolve）。
3. 下一个 then (***) 得到了前一个 then 的值，对该值进行处理（*2）并将其传递给下一个处理程序。
4. ……依此类推。

*/

// 更复杂的示例：fetch

/* 
为了读取完整的响应，我们应该调用 response.text() 方法：当全部文字内容从远程服务器下载完成后，它会返回一个 promise，该 promise 以刚刚下载完成的这个文本作为 result 进行 resolve。

下面这段代码向 user.json 发送请求，并从服务器加载该文本：

fetch('/article/promise-chaining/user.json')
  // 当远程服务器响应时，下面的 .then 开始执行
  .then(function(response) {
    // 当 user.json 加载完成时，response.text() 会返回一个新的 promise
    // 该 promise 以加载的 user.json 为 result 进行 resolve
    return response.text();
  })
  .then(function(text) {
    // ……这是远程文件的内容
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });

从 fetch 返回的 response 对象还包含 response.json() 方法，该方法可以读取远程数据并将其解析为 JSON。在我们的例子中，这更加方便，所以我们用这个方法吧。

为了简洁，我们还将使用箭头函数：

// 同上，但使用 response.json() 将远程内容解析为 JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan，获取到了用户名

*/
