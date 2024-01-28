'use strict'
// 方法中的 this
/*
通常，对象方法需要访问对象中存储的信息才能完成其工作。

例如，user.sayHi() 中的代码可能需要用到 user 的 name 属性。

为了访问该对象，方法中可以使用 this 关键字。

this 的值就是在点之前的这个对象，即调用该方法的对象。
*/
let user = {
  name: 'John',
  age: 30,

  sayHi() {
    // "this" 指的是“当前的对象”
    console.log(this.name)
  },
}

user.sayHi() // John

// 如果 sayHi 函数变成了这样:
user.sayHi = function () {
  console.log(user.name)
}
let admin = user
user = null
// admin.sayHi() 报错

// this 不受限制
// js 中的 this 可以用于任何函数
function sayHi() {
  console.log(this.name)
}

// this 的值是在代码运行时计算出来的，它取决于代码上下文。在没有对象调用的情况下, this === undefined
// sayHi() 报错

// 箭头函数没有自己的 this

// 任务

/*
在对象字面量中使用 "this"
重要程度: 5
这里 makeUser 函数返回了一个对象。

访问 ref 的结果是什么？为什么？

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

console.log( user.ref.name ); // 结果是什么？
*/

function makeUser() {
  return {
    name: 'John',
    ref: this,
  }
}

let user2 = makeUser()
console.log(user2.ref)

// 反例
function makeUser() {
  return {
    name: 'John',
    ref() {
      return this
    },
  }
}

let user3 = makeUser()

console.log(user3.ref()) // John
