// 箭头函数没有 “this”
// 箭头函数没有 this。如果访问 this，则会从外部获取。

let group = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach((student) => {
      console.log(this.title + ': ' + student)
    })
  },
}

group.showList()

// 不能对箭头函数进行 new 操作
// 不具有 this 自然也就意味着另一个限制：箭头函数不能用作构造器（constructor）。不能用 new 调用它们。

/* 
箭头函数 VS bind
箭头函数 => 和使用 .bind(this) 调用的常规函数之间有细微的差别：

.bind(this) 创建了一个该函数的“绑定版本”。
箭头函数 => 没有创建任何绑定。箭头函数只是没有 this。this 的查找与常规变量的搜索方式完全相同：在外部词法环境中查找。
*/

// 箭头函数没有 “arguments”
/* 
箭头函数也没有 arguments 变量。

当我们需要使用当前的 this 和 arguments 转发一个调用时，这对装饰器（decorators）来说非常有用。

例如，defer(f, ms) 获得了一个函数，并返回一个包装器，该包装器将调用延迟 ms 毫秒：
*/

function defer(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms)
  }
}

function sayHi(who) {
  console.log('Hello, ' + who)
}

let sayHiDeferred = defer(sayHi, 2000)
sayHiDeferred('John')

// 不用箭头函数的话，可以这么写：

function defer(f, ms) {
  return function (...args) {
    let ctx = this
    setTimeout(function () {
      return f.apply(ctx, args)
    }, ms)
  }
}

// 总结
/* 
箭头函数：

- 没有 this
- 没有 arguments
- 不能使用 new 进行调用
- 它们也没有 super，但目前我们还没有学到它。我们将在 类继承 一章中学习它
*/
