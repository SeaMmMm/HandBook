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

/*
创建一个计算器
重要程度: 5
创建一个有三个方法的 calculator 对象：

read() 提示输入两个值，并将其保存为对象属性，属性名分别为 a 和 b。
sum() 返回保存的值的和。
mul() 将保存的值相乘并返回计算结果。
let calculator = {
  // ……你的代码……
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
*/
let calculator = {
  sum() {
    return this.a + this.b
  },

  mul() {
    return this.a * this.b
  },

  read() {
    this.a = +prompt('a?', 0)
    this.b = +prompt('b?', 0)
  },
}

/*
链式（调用）
重要程度: 2
有一个可以上下移动的 ladder 对象：

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // 显示当前的 step
    alert( this.step );
  }
};
现在，如果我们要按顺序执行几次调用，可以这样做：

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
修改 up，down 和 showStep 的代码，让调用可以链接，就像这样：

ladder.up().up().down().showStep().down().showStep(); // 展示 1，然后 0
这种方法在 JavaScript 库中被广泛使用。
*/

let ladder = {
  step: 0,
  up() {
    this.step++
    return this
  },
  down() {
    this.step--
    return this
  },
  showStep: function () {
    // 显示当前的 step
    alert(this.step)
    return this
  },
}
