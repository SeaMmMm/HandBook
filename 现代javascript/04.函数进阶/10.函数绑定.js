'use strict'
// 函数绑定
// 当将对象方法作为回调进行传递，例如传递给 setTimeout，这儿会存在一个常见的问题：“丢失 this”。

// 丢失 this
// 我们已经看到了丢失 this 的例子。一旦方法被传递到与对象分开的某个地方 —— this 就丢失。
let user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello ${this.firstName}`)
  },
}

setTimeout(user.sayHi, 500)

// 这是因为 setTimeout 获取到了函数 user.sayHi，但它和对象分离开了。最后一行可以被重写为：
let f = user.sayHi
setTimeout(f, 500)

// 浏览器中的 setTimeout 方法有些特殊：它为函数调用设定了 this=window（对于 Node.js，this 则会变为计时器（timer）对象，但在这儿并不重要）。所以对于 this.firstName，它其实试图获取的是 window.firstName，这个变量并不存在。在其他类似的情况下，通常 this 会变为 undefined。

// 解决方案 1：包装器
setTimeout(() => {
  user.sayHi()
}, 500)

// 看起来不错，但是我们的代码结构中出现了一个小漏洞。
// 如果在 setTimeout 触发之前（有一秒的延迟！）user 的值改变了怎么办？那么，突然间，它将调用错误的对象！

setTimeout(() => {
  user.sayHi()
}, 1000)

user = {
  sayHi() {
    console.log('another user in setTimeOut')
  },
}

// 解决方案 2：bind
// 函数提供了一个内建方法 bind，它可以绑定 this。
/* 
// 稍后将会有更复杂的语法
let boundFunc = func.bind(context);
*/

{
  let user = {
    firstName: 'John',
  }

  function func() {
    console.log(this.firstName)
  }

  let funcUser = func.bind(user)

  funcUser()
}

// 如果一个对象有很多方法，并且我们都打算就按他们传递出去，那么我们可以在一个循环中完成所有方法的绑定
/*
for (let key in user) {
  if(yupeof user[key] == 'function') user[key] = user[key].bind(user)
}
*/

// 部分（应用）函数（Partial functions）
/* 
到现在为止，我们只在谈论绑定 this。让我们再深入一步。

我们不仅可以绑定 this，还可以绑定参数（arguments）。虽然很少这么做，但有时它可以派上用场。

bind 的完整语法如下：

let bound = func.bind(context, [arg1], [arg2], ...);
它允许将上下文绑定为 this，以及绑定函数的部分参数。
*/

{
  function mul(a, b) {
    return a * b
  }
  let triple = mul.bind(null, 3)
  console.log(triple(3))
  console.log(triple(4))
  console.log(triple(5))
}

// 在没有上下文情况下的 partial
/* 
当我们想绑定一些参数（arguments），但是不想绑定上下文 this，应该怎么办？例如，对于一个对象方法。

原生的 bind 不允许这种情况。我们不可以省略上下文直接跳到参数（arguments）。

幸运的是，仅绑定参数（arguments）的函数 partial 比较容易实现。
*/

{
  function partial(func, ...argsBound) {
    return function (...args) {
      // (*)
      return func.call(this, ...argsBound, ...args)
    }
  }

  // 用法：
  let user = {
    firstName: 'John',
    say(time, phrase) {
      console.log(`[${time}] ${this.firstName}: ${phrase}!`)
    },
  }

  // 添加一个带有绑定时间的 partial 方法
  user.sayNow = partial(
    user.say,
    new Date().getHours() + ':' + new Date().getMinutes()
  )

  user.sayNow('Hello')
  // 类似于这样的一些内容：
  // [10:00] John: Hello!
}

/* 
partial(func[, arg1, arg2...]) 调用的结果是一个包装器 (*)，它调用 func 并具有以下内容：

- 与它获得的函数具有相同的 this（对于 user.sayNow 调用来说，它是 user）
- 然后给它 ...argsBound —— 来自于 partial 调用的参数（"10:00"）
- 然后给它 ...args —— 给包装器的参数（"Hello"）

使用 spread 可以很容易实现这些操作，对吧？

此外，还有来自 lodash 库的现成的 _.partial 实现。
*/

// 总结
/* 
方法 func.bind(context, ...args) 返回函数 func 的“绑定的（bound）变体”，它绑定了上下文 this 和 ...args 参数。

通常我们应用 bind 来绑定对象方法的 this，这样我们就可以把它们传递到其他地方使用。例如，传递给 setTimeout。

当我们绑定一个现有的函数的某些参数时，绑定后的（不太通用的）函数被称为 partially applied 或 partial。

当我们不想一遍又一遍地重复相同的参数时，部分应用函数非常有用。就像我们有一个 send(from, to) 函数，并且对于我们的任务来说，from 应该总是一样的，那么我们就可以使用它的一个部分应用函数。 
*/

// 任务
/* 
作为方法的绑定函数
重要程度: 5
输出将会是什么？

function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
*/

{
  function f() {
    console.log(this) // null
  }

  let user = {
    g: f.bind(null),
  }

  user.g()
}
/* 
绑定函数的上下文是硬绑定（hard-fixed）的。没有办法再修改它。

所以即使我们执行 user.g()，源方法调用时还是 this=null。
*/

/* 
二次 bind
重要程度: 5
我们可以通过额外的绑定改变 this 吗？

输出将会是什么？

function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
*/

{
  function f() {
    console.log(this.name)
  }

  f = f.bind({ name: 'John' }).bind({ name: 'Ann' })

  f()
}
/* 
f.bind(...) 返回的外来（exotic）绑定函数 对象仅在创建的时候记忆上下文（以及参数，如果提供了的话）。

一个函数不能被重绑定（re-bound）
*/

/* 
bind 后的函数属性
重要程度: 5
函数的属性中有一个值。bind 之后它会改变吗？为什么，阐述一下？

function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // 输出将会是什么？为什么
*/
//  => undefined

/* 
修复丢失了 "this" 的函数
重要程度: 5
下面代码中对 askPassword() 的调用将会检查 password，然后基于结果调用 user.loginOk/loginFail。

但是它导致了一个错误。为什么？

修改高亮的行，以使所有内容都能正常工作（其它行不用修改）。

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk, user.loginFail);
*/
// 变成这样：askPassword(user.loginOk,bind(user), user.loginFail.bind(user));

/* 
偏函数在登录中的应用
重要程度: 5
这个任务是比 修复丢失了 "this" 的函数 略微复杂的变体。

user 对象被修改了。现在不是两个函数 loginOk/loginFail，现在只有一个函数 user.login(true/false)。

在下面的代码中，我们应该向 askPassword 传入什么参数，以使得 user.login(true) 结果是 ok，user.login(fasle) 结果是 fail？

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword(?, ?); // ?
*/
