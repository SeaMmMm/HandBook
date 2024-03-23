// async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用。

// async function
async function f() {
  return 1
}
f().then((data) => {
  console.log(data)
})

// ……我们也可以显式地返回一个 promise，结果是一样的：
async function f() {
  return Promise.resolve(1)
}

// 所以说，async 确保了函数返回一个 promise，也会将非 promise 的值包装进去。很简单，对吧？但不仅仅这些。还有另外一个叫 await 的关键词，它只在 async 函数内工作，也非常酷。

// await
/* 
语法如下：

// 只在 async 函数内工作
let value = await promise;
关键字 await 让 JavaScript 引擎等待直到 promise 完成（settle）并返回结果。

这里的例子就是一个 1 秒后 resolve 的 promise：
*/

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 400)
  })

  let result = await promise // 等待，直到 promise resolve (*)

  console.log(result)
}

f()

/* 
这个函数在执行的时候，“暂停”在了 (*) 那一行，并在 promise settle 时，拿到 result 作为结果继续往下执行。所以上面这段代码在一秒后显示 “done!”。

让我们强调一下：await 实际上会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。

相比于 promise.then，它只是获取 promise 的结果的一个更优雅的语法。并且也更易于读写。
*/

// 现代浏览器在 modules 里允许顶层的 await
/* 
在现代浏览器中，当我们处于一个 module 中时，那么在顶层使用 await 也是被允许的。

例如：

// 我们假设此代码在 module 中的顶层运行
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);

如果我们没有使用 modules，或者必须兼容 旧版本浏览器 ，那么这儿还有一个通用的方法：包装到匿名的异步函数中。

像这样：

(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
*/

/* 
await 接受 “thenables”
像 promise.then 那样，await 允许我们使用 thenable 对象（那些具有可调用的 then 方法的对象）。这里的想法是，第三方对象可能不是一个 promise，但却是 promise 兼容的：如果这些对象支持 .then，那么就可以对它们使用 await。

这有一个用于演示的 Thenable 类，下面的 await 接受了该类的实例：
*/

class Thenable {
  constructor(num) {
    this.num = num
  }
  then(resolve, reject) {
    console.log(resolve)
    // 1000ms 后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000) // (*)
  }
}

async function f2() {
  // 等待 1 秒，之后 result 变为 2
  let result = await new Thenable(1)
  console.log(result)
}

f2()

// 如果 await 接收了一个非 promise 的但是提供了 .then 方法的对象，它就会调用这个 .then 方法，并将内建的函数 resolve 和 reject 作为参数传入（就像它对待一个常规的 Promise executor 时一样）。然后 await 等待直到这两个函数中的某个被调用（在上面这个例子中发生在 (*) 行），然后使用得到的结果继续执行后续任务。

// Error 处理
/* 
在真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 await 抛出（throw）一个 error 之前会有一个延时。

我们可以用 try..catch 来捕获上面提到的那个 error，与常规的 throw 使用的是一样的方式：
*/

async function f3() {
  try {
    let response = await fetch('http://no-such-url')
  } catch (err) {
    console.log(err)
  }
}
f3()

// 如果我们没有 try..catch，那么由异步函数 f() 的调用生成的 promise 将变为 rejected。我们可以在函数调用后面添加 .catch 来处理这个 error：

async function f4() {
  let response = await fetch('http://no-such-url')
}

// f4() 变成了一个 rejected 的 promise
f4().catch((err) => {
  console.log(err)
})

// 总结
/* 
函数前面的关键字 async 有两个作用：

1. 让这个函数总是返回一个 promise。
2. 允许在该函数内使用 await。

Promise 前的关键字 await 使 JavaScript 引擎等待该 promise settle，然后：

1. 如果有 error，就会抛出异常 —— 就像那里调用了 throw error 一样。
2. 否则，就返回结果。

这两个关键字一起提供了一个很好的用来编写异步代码的框架，这种代码易于阅读也易于编写。

有了 async/await 之后，我们就几乎不需要使用 promise.then/catch，但是不要忘了它们是基于 promise 的，因为有些时候（例如在最外层作用域）我们不得不使用这些方法。并且，当我们需要同时等待需要任务时，Promise.all 是很好用的。
*/
