/* 
instanceof 操作符用于检查一个对象是否属于某个特定的 class。同时，它还考虑了继承。

在许多情况下，可能都需要进行此类检查。例如，它可以被用来构建一个 多态性（polymorphic） 的函数，该函数根据参数的类型对参数进行不同的处理。
*/

/* 
语法：

obj instanceof Class

如果 obj 隶属于 Class 类（或 Class 类的衍生类），则返回 true。
*/
class Rabbit {}
let rabbit = new Rabbit()
console.log(rabbit instanceof Rabbit, new Rabbit() instanceof Rabbit)

// 有一点需要留意，arr 同时还隶属于 Object 类。因为从原型上来讲，Array 是继承自 Object 的。
// 通常，instanceof 在检查中会将原型链考虑在内。此外，我们还可以在静态方法 Symbol.hasInstance 中设置自定义逻辑。

// 1. 如果这儿有静态方法 Symbol.hasInstance，那就直接调用这个方法：
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true
  }
}

let obj = { canEat: true }
console.log(obj instanceof Animal)

// 2. 大多数 class 没有 Symbol.hasInstance。在这种情况下，标准的逻辑是：使用 obj instanceOf Class 检查 Class.prototype 是否等于 obj 的原型链中的原型之一。换句话说就是，一个接一个地比较：
/* 
obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...
// 如果任意一个的答案为 true，则返回 true
// 否则，如果我们已经检查到了原型链的尾端，则返回 false
*/

/* 
这里还要提到一个方法 objA.isPrototypeOf(objB)，如果 objA 处在 objB 的原型链中，则返回 true。所以，可以将 obj instanceof Class 检查改为 Class.prototype.isPrototypeOf(obj)。

这很有趣，但是 Class 的 constructor 自身是不参与检查的！检查过程只和原型链以及 Class.prototype 有关。

创建对象后，如果更改 prototype 属性，可能会导致有趣的结果。

就像这样：
*/

Rabbit = function () {}
rabbit = new Rabbit()

Rabbit.prototype = {}
console.log(rabbit instanceof Rabbit)

// 福利：使用 Object.prototype.toString 方法来揭示类型
{
  let obj = {}
  console.log(obj.toString())
}
// 这是通过 toString 方法实现的。但是这儿有一个隐藏的功能，该功能可以使 toString 实际上比这更强大。我们可以将其作为 typeof 的增强版或者 instanceof 的替代方法来使用。
let s = Object.prototype.toString
let arr = []
console.log(s.call(arr), s.call(123), s.call(null))

// Symbol.toStringTag
// 可以使用特殊的对象属性 Symbol.toStringTag 自定义对象的 toString 方法的行为。
let user = {
  [Symbol.toStringTag]: 'User',
}
console.log(user.toString())

// 对于大多数特定于环境的对象，都有一个这样的属性。下面是一些特定于浏览器的示例：
/*
console.log(window[Symbol.toStringTag]) // Window
console.log(XMLHttpRequest.prototype[Symbol.toStringTag]) // XMLHttpRequest

console.log({}.toString.call(window)) // [object Window]
console.log({}.toString.call(new XMLHttpRequest())) // [object XMLHttpRequest]
*/

/* 
正如我们所看到的，输出结果恰好是 Symbol.toStringTag（如果存在），只不过被包裹进了 [object ...] 里。

这样一来，我们手头上就有了个“磕了药似的 typeof”，不仅能检查原始数据类型，而且适用于内建对象，更可贵的是还支持自定义。

所以，如果我们想要获取内建对象的类型，并希望把该信息以字符串的形式返回，而不只是检查类型的话，我们可以用 {}.toString.call 替代 instanceof。
*/

// 总结
/* 
让我们总结一下我们知道的类型检查方法：

正如我们所看到的，从技术上讲，{}.toString 是一种“更高级的” typeof。

当我们使用类的层次结构（hierarchy），并想要对该类进行检查，同时还要考虑继承时，这种场景下 instanceof 操作符确实很出色。
*/
