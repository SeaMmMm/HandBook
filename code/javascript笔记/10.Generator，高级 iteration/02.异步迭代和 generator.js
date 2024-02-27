// 异步迭代和 generator
/* 
异步迭代允许我们对按需通过异步请求而得到的数据进行迭代。例如，我们通过网络分段（chunk-by-chunk）下载数据时。异步生成器（generator）使这一步骤更加方便。

首先，让我们来看一个简单的示例以掌握语法，然后再看一个实际用例。
*/

// 这是可迭代的 range 的一个实现：
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        } else {
          return { done: true }
        }
      },
    }
  },
}
for (const val of range) {
  console.log(val)
}

// 异步可迭代对象
/* 
要使对象异步迭代：

1. 使用 Symbol.asyncIterator 取代 Symbol.iterator。
2. next() 方法应该返回一个 promise（带有下一个值，并且状态为 fulfilled）。
  - 关键字 async 可以实现这一点，我们可以简单地使用 async next()。
3. 我们应该使用 for await (let item of iterable) 循环来迭代这样的对象。
  - 注意关键字 await。

作为开始的示例，让我们创建一个可迭代的 range 对象，与前面的那个类似，不过现在它将异步地每秒返回一个值。

我们需要做的就是对上面代码中的部分代码进行替换：
*/
range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    // (1)
    return {
      current: this.from,
      last: this.to,

      async next() {
        // (2)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        } else {
          return { done: true }
        }
      },
    }
  },
}
;(async () => {
  for await (let value of range) {
    // (4)
    console.log(value) // 1,2,3,4,5
  }
})()

/* 
1. 为了使一个对象可以异步迭代，它必须具有方法 Symbol.asyncIterator (1)。

2. 这个方法必须返回一个带有 next() 方法的对象，next() 方法会返回一个 promise (2)。

3. 这个 next() 方法可以不是 async 的，它可以是一个返回值是一个 promise 的常规的方法，但是使用 async 关键字可以允许我们在方法内部使用 await，所以会更加方便。这里我们只是用于延迟 1 秒的操作 (3)。

4. 我们使用 for await(let value of range) (4) 来进行迭代，也就是在 for 后面添加 await。它会调用一次 range[Symbol.asyncIterator]() 方法一次，然后调用它的 next() 方法获取值。
*/

// 异步 generator (finally)
/* 
对于大多数的实际应用程序，当我们想创建一个异步生成一系列值的对象时，我们都可以使用异步 generator。

语法很简单：在 function* 前面加上 async。这即可使 generator 变为异步的。

然后使用 for await (...) 来遍历它，像这样：
*/
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // 哇，可以使用 await 了！
    await new Promise((resolve) => setTimeout(resolve, 1000))

    yield i
  }
}

;(async () => {
  let generator = generateSequence(1, 5)
  for await (let value of generator) {
    console.log(value) // 1，然后 2，然后 3，然后 4，然后 5（在每个  之间有延迟）
  }
})()

/* 
引擎盖下的差异
如果你还记得我们在前面章节中所讲的关于 generator 的细节知识，那你应该知道，从技术上讲，异步 generator 和常规的 generator 在内部是有区别的。

对于异步 generator，generator.next() 方法是异步的，它返回 promise。

在一个常规的 generator 中，我们使用 result = generator.next() 来获得值。但在一个异步 generator 中，我们应该添加 await 关键字，像这样：

result = await generator.next(); // result = {value: ..., done: true/false}

这就是为什么异步 generator 可以与 for await...of 一起工作。
*/

// 实际的例子：分页的数据
/* 
到目前为止，我们已经了解了一些基本示例，以加深理解。现在，我们来看一个实际的用例。

目前，有很多在线服务都是发送的分页的数据（paginated data）。例如，当我们需要一个用户列表时，一个请求只返回一个预设数量的用户（例如 100 个用户）—— “一页”，并提供了指向下一页的 URL。

这种模式非常常见。不仅可用于获取用户列表，这种模式还可以用于任意东西。

例如，GitHub 允许使用相同的分页提交（paginated fashion）的方式找回 commit：

- 我们应该以 https://api.github.com/repos/<repo>/commits 格式创建进行 fetch 的网络请求。
- 它返回一个包含 30 条 commit 的 JSON，并在返回的 Link header 中提供了指向下一页的链接。
- 然后我们可以将该链接用于下一个请求，以获取更多 commit，以此类推。
对于我们的代码，我们希望有一种更简单的获取 commit 的方式。

让我们创建一个函数 fetchCommits(repo)，用来在任何我们有需要的时候发出请求，来为我们获取 commit。并且，该函数能够关注到所有分页内容。对于我们来说，它将是一个简单的 for await..of 异步迭代。

因此，其用法将如下所示：

for await (let commit of fetchCommits("username/repository")) {
  // 处理 commit
}
*/

async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`

  while (url) {
    const response = await fetch(url, {
      // (1)
      headers: { 'User-Agent': 'Our script' }, // github 需要任意的 user-agent header
    })

    const body = await response.json() // (2) 响应的是 JSON（array of commits）

    // (3) 前往下一页的 URL 在 header 中，提取它
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/)
    nextPage = nextPage?.[1]

    url = nextPage

    for (let commit of body) {
      // (4) 一个接一个地 yield commit，直到最后一页
      yield commit
    }
  }
}

/* 
关于其工作原理的进一步解释：

1. 我们使用浏览器的 fetch 方法来下载 commit。

  - 初始 URL 是 https://api.github.com/repos/<repo>/commits，并且下一页的 URL 将在响应的 Link header 中。
  - fetch 方法允许我们提供授权和其他 header，如果需要 —— 这里 GitHub 需要的是 User-Agent。

2. commit 被以 JSON 的格式返回。

3. 我们应该从响应（response）的 Link header 中获取前往下一页的 URL。它有一个特殊的格式，所以我们对它使用正则表达式（我们将在 正则表达式 一章中学习它）。

  - 前往下一页的 URL 看起来可能就像这样 https://api.github.com/repositories/93253246/commits?page=2。这是由 GitHub 自己生成的。

4.   然后，我们将接收到的所有 commit 一个一个地 yield 出来，当所有 commit 都 yield 完成时，将触发下一个 while(url) 迭代，并发出下一个请求。
*/

;(async () => {
  let count = 0

  for await (const commit of fetchCommits(
    'javascript-tutorial/en.javascript.info'
  )) {
    console.log(commit.author.login)

    if (++count == 100) {
      // 让我们在获取了 100 个 commit 时停止
      break
    }
  }
})()
