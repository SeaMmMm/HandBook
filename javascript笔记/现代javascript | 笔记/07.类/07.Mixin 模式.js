/* 
在 JavaScript 中，我们只能继承单个对象。每个对象只能有一个 [[Prototype]]。并且每个类只可以扩展另外一个类。

但是有些时候这种设定（译注：单继承）会让人感到受限制。例如，我有一个 StreetSweeper 类和一个 Bicycle 类，现在想要一个它们的 mixin：StreetSweepingBicycle 类。

或者，我们有一个 User 类和一个 EventEmitter 类来实现事件生成（event generation），并且我们想将 EventEmitter 的功能添加到 User 中，以便我们的用户可以触发事件（emit event）。

有一个概念可以帮助我们，叫做 “mixins”。

根据维基百科的定义，mixin 是一个包含可被其他类使用而无需继承的方法的类。

换句话说，mixin 提供了实现特定行为的方法，但是我们不单独使用它，而是使用它来将这些行为添加到其他类中。

*/

// 在 JavaScript 中构造一个 mixin 最简单的方式就是构造一个拥有实用方法的对象，以便我们可以轻松地将这些实用的方法合并到任何类的原型中。
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`)
  },
  sayBye() {
    console.log(`Bye ${this.name}`)
  },
}

class User {
  constructor(name) {
    this.name = name
  }
}

Object.assign(User.prototype, sayHiMixin)
new User('Dude').sayHi()
