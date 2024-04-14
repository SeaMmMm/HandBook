// 我们可以把一个方法作为一个整体赋值给类。这样的方法被称为 静态的（static）。
class User {
  static staticMethod() {
    console.log(this === User)
  }
}

User.staticMethod()

/* 
在 User.staticMethod() 调用中的 this 的值是类构造器 User 自身（“点符号前面的对象”规则）。

通常，静态方法用于实现属于整个类，但不属于该类任何特定对象的函数。

例如，我们有对象 Article，并且需要一个方法来比较它们。

通常的解决方案就是添加 Article.compare 静态方法：
*/

class Article {
  constructor(title, date) {
    this.title = title
    this.date = date
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date
  }
}

// 用法
let articles = [
  new Article('HTML', new Date(2019, 1, 1)),
  new Article('CSS', new Date(2019, 0, 1)),
  new Article('JavaScript', new Date(2019, 11, 1)),
]

articles.sort(Article.compare)

console.log(articles[0].title)

/* 
这里 Article.compare 方法代表“上面的”文章，意思是比较它们。它不是文章的方法，而是整个 class 的方法。

另一个例子是所谓的“工厂”方法。

比如说，我们需要通过多种方式来创建一篇文章：

通过用给定的参数来创建（title，date 等）。
使用今天的日期来创建一个空的文章。
……其它方法。
第一种方法我们可以通过 constructor 来实现。对于第二种方式，我们可以创建类的一个静态方法来实现。

例如这里的 Article.createTodays()：
*/
class Articles {
  constructor(title, date) {
    this.title = title
    this.date = date
  }

  static createTodays() {
    // 记住 this = Article
    return new this("Today's digest", new Date())
  }
}

let article = Articles.createTodays()
console.log(article.title)

/* 
静态方法不适用于单个对象
静态方法可以在类上调用，而不是在单个对象上。

例如，这样的代码无法正常工作：

// ...
article.createTodays(); /// Error: article.createTodays is not a function
*/

// 静态的属性也是可能的，它们看起来就像常规的类属性，但前面加有 static：
class Users {
  static name = 'Jack'
}

console.log(Users.name)

// 静态属性和方法是可被继承的。
class Animal {
  static planet = 'Earth'

  constructor(name, speed) {
    this.speed = speed
    this.name = name
  }

  run(speed = 0) {
    this.speed += speed
    console.log(`${this.name} runs with speed ${this.speed}.`)
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed
  }
}

// 继承于 Animal
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`)
  }
}

let rabbits = [new Rabbit('White Rabbit', 10), new Rabbit('Black Rabbit', 5)]
rabbits.sort(Rabbit.compare)
rabbits[0].run()
console.log(Rabbit.planet)

/* 
现在我们调用 Rabbit.compare 时，继承的 Animal.compare 将会被调用。
它是如何工作的？再次，使用原型。你可能已经猜到了，extends 让 Rabbit 的 [[Prototype]] 指向了 Animal。
*/

/* 
所以，Rabbit extends Animal 创建了两个 [[Prototype]] 引用：

Rabbit 函数原型继承自 Animal 函数。
Rabbit.prototype 原型继承自 Animal.prototype。

结果就是，继承对常规方法和静态方法都有效。
*/
{
  class Animal {}
  class Rabbit extends Animal {}

  // 对于静态的
  console.log(Rabbit.__proto__ === Animal)

  // 对于常规方法
  console.log(Rabbit.prototype.__proto__ === Animal.prototype)
}

// 总结
/* 
静态方法被用于实现属于整个类的功能。它与具体的类实例无关。

举个例子， 一个用于进行比较的方法 Article.compare(article1, article2) 或一个工厂（factory）方法 Article.createTodays()。

在类声明中，它们都被用关键字 static 进行了标记。

静态属性被用于当我们想要存储类级别的数据时，而不是绑定到实例。

语法如下所示：

class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
从技术上讲，静态声明与直接给类本身赋值相同：

MyClass.property = ...
MyClass.method = ...
静态属性和方法是可被继承的。

对于 class B extends A，类 B 的 prototype 指向了 A：B.[[Prototype]] = A。因此，如果一个字段在 B 中没有找到，会继续在 A 中查找。
*/

// 任务
/* 
类扩展自对象？
重要程度: 3
正如我们所知道的，所有的对象通常都继承自 Object.prototype，并且可以访问“通用”对象方法，例如 hasOwnProperty 等。

例如：

class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// hasOwnProperty 方法来自于 Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
但是，如果我们像这样 "class Rabbit extends Object" 把它明确地写出来，那么结果会与简单的 "class Rabbit" 有所不同么？

不同之处在哪里？

下面是此类的示例代码（它无法正常运行 —— 为什么？修复它？）：

class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
*/

