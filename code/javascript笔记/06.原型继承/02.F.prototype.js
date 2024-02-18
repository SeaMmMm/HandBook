let animal = {
  eats: true,
}

function Rabbit(name) {
  this.name = name
}

Rabbit.prototype = animal

let rabbit = new Rabbit('White Rabbit')
console.log(rabbit.eats)

/* 
F.prototype 仅用在 new F 时
F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值。

如果在创建之后，F.prototype 属性有了变化（F.prototype = <another object>），那么通过 new F 创建的新对象也将随之拥有新的对象作为 [[Prototype]]，但已经存在的对象将保持旧有的值。
*/

// 每个函数都有 "prototype" 属性，即使我们没有提供它。
// 默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。
function Rats() {}
console.log(Rats.prototype.constructor == Rats)

/* 
当我们有一个对象，但不知道它使用了哪个构造器（例如它来自第三方库），并且我们需要创建另一个类似的对象时，用这种方法就很方便。

但是，关于 "constructor" 最重要的是……

……JavaScript 自身并不能确保正确的 "constructor" 函数值。

是的，它存在于函数的默认 "prototype" 中，但仅此而已。之后会发生什么 —— 完全取决于我们。

特别是，如果我们将整个默认 prototype 替换掉，那么其中就不会有 "constructor" 了。
*/
console.log(rabbit.constructor === Rabbit)
