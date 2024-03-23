'use strict'
class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(this.name)
  }
}

let user = new User('John')
user.sayHi()

/* 
当 new User("John") 被调用：

1. 一个新对象被创建。
2. constructor 使用给定的参数运行，并将其赋值给 this.name。

……然后我们就可以调用对象方法了，例如 user.sayHi。
*/

// 在 JavaScript 中，类是一种函数。
console.log(typeof User)

/* 
class User {...} 构造实际上做了如下的事儿：

1. 创建一个名为 User 的函数，该函数成为类声明的结果。该函数的代码来自于 constructor 方法（如果我们不编写这种方法，那么它就被假定为空）。
2. 存储类中的方法，例如 User.prototype 中的 sayHi。

当 new User 对象被创建后，当我们调用其方法时，它会从原型中获取对应的方法，正如我们在 F.prototype 一章中所讲的那样。因此，对象 new User 可以访问类中的方法。
*/
console.log(User === User.prototype.constructor)
console.log(User.prototype.sayHi)
console.log(Object.getOwnPropertyNames(User.prototype))

// 1. 首先，通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true。因此，它与手动创建并不完全相同。编程语言会在许多地方检查该属性。例如，与普通函数不同，必须使用 new 来调用它：
// User() // Error

// 此外，大多数 JavaScript 引擎中的类构造器的字符串表示形式都以 “class…” 开头

/* 
2. 类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false。

这很好，因为如果我们对一个对象调用 for..in 方法，我们通常不希望 class 方法出现。

3. 类总是使用 use strict。 在类构造中的所有代码都将自动进入严格模式。
*/

{
  // 类表达模式
  // 就像函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等。
  // 这是一个类表达式的例子：

  let User = class {
    sayHi() {
      console.log('Hello')
    }
  }

  // 如果类表达式有名字，那么该名字仅在类内部可见：

  User = class MyClass {
    sayHi() {
      console.log(MyClass)
    }
  }
  new User().sayHi()
}

// 我们甚至可以动态地“按需”创建类，就像这样：
function makeClass(phrase) {
  return class {
    sayHi() {
      console.log(phrase)
    }
  }
}
User = makeClass('Hello')
new User().sayHi()

// Getters/setters
// 就像对象字面量，类可能包括 getters/setters，计算属性（computed properties）等。
{
  class User {
    constructor(name) {
      // 调用 setter
      this.name = name
    }

    get name() {
      return this._name
    }

    set name(value) {
      if (value.length < 4) {
        console.log('Name is too short.')
        return
      }
      this._name = value
    }
  }
  let user = new User('John')
  console.log(user.name) // John

  user = new User('')
}

// 计算属性名称 […]
class Admin {
  ['say' + 'hi']() {
    console.log('Hello')
  }
}

new Admin().sayhi()

class Button {
  constructor(value) {
    this.value = value
  }

  click() {
    console.log(this.value)
  }
  /* best practice
  click = () => {
    console.log('Hello')
  }
  */
}

let button = new Button('Hello')
setTimeout(button.click.bind(button), 100)

// 总结
/* 
基本的类语法看起来像这样：

class MyClass {
  prop = value; // 属性

  constructor(...) { // 构造器
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
技术上来说，MyClass 是一个函数（我们提供作为 constructor 的那个），而 methods、getters 和 setters 都被写入了 MyClass.prototype。
*/
