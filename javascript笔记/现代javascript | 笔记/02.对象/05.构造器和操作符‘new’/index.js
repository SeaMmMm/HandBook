// 构造函数
function User(name) {
  this.name = name
  this.isAdmin = false

  console.log(new.target)
}

let user = new User('Jack')
console.log(user.name)
/*
当一个函数使用 new 操作符执行时:
1. 一个新的空对象被创建并分配给 this
2. 函数体执行.通常他会修改 this,围棋田间新的属性
3. 返回 this 的属性
*/
// 也就是:
function User2(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name
  this.isAdmin = false

  // return this;（隐式返回）
}

// 构造器模式测试： new.target
// 这个是来检查他是不是使用了 new 来调用的，比如：

User()

new User()

// 利用这个，我们就可以让两种不同的调用都可以干相同的事：
function User3(name) {
  if (!new.target) {
    return new User3(name)
  }
  this.name = name
}
// 这样一来，无论是用是经过 new 调用还是普通的调用，程序都能正常工作

// 通常构造器没有 return 语句，如果有 return 语句的话遵守以下规则
/*
1. 如果 return 返回的是一个对象，那么这个对象会被正常使用
2. 如果 return 返回的是一个原始类型的值，那么这个 return 会被忽略
 */

function BigUser() {
  this.name = 'John'
  return { name: 'Godzilla' }
}
console.log(new BigUser().name)

function SmallUser() {
  this.name = 'John'
  return
}
console.log(new SmallUser().name)

// 构造器的方法
function User4(name) {
  this.name = name

  this.sayHi = function () {
    console.log(`My name is ${this.name}`)
  }
}

let john = new User4('John')
john.sayHi()

// 任务

/*
两个函数 —— 一个对象
重要程度: 2
是否可以创建像 new A() == new B() 这样的函数 A 和 B？

function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
如果可以，请提供一个它们的代码示例。
*/
let obj = {}
function A() {
  return obj
}
function B() {
  return obj
}

console.log(A() === B())

/*
创建 new Calculator
重要程度: 5
创建一个构造函数 Calculator，它创建的对象中有三个方法：

read() 使用 prompt 请求两个值并把它们记录在对象的属性中。
sum() 返回这些属性的总和。
mul() 返回这些属性的乘积。
例如：

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
*/
function Calculator() {
  function read() {
    // 模拟 prompt 请求两个值,这里直接硬编码了
    this.sum1 = 12
    this.sum2 = 22
  }

  function sum() {
    return this.sum1 + this.sum2
  }

  function mul() {
    return this.sum1 * this.sum2
  }
}
