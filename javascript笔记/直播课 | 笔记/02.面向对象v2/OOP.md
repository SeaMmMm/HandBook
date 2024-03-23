## 面向对象

### 对象是什么？为什么要面向对象？

#### 特点：面向对象 —— 逻辑迁移更加灵活、代码复用性高、高度的模块化

#### 对象的理解

- 对象是对于单个物体的简单抽象
- 对象是一个容器，封装了属性 & 方法

```js
let obj = {
  name: 'yy',
  course: 'oop',
}
// thinking1
obj = {
  name: 'xm',
}
obj.name = 'jcss'

// thinking2
obj1 = {
  name: 'xm',
}
obj2 = {
  name: 'jcss',
}
obj3 = {
  name: 'teacher',
}

// 简单对象
const course = {
  teacher: 'yy',
  course: 'oop',
  startCourse: function () {
    // start
  },
}

// 函数对象
function Course() {
  this.teacher = 'yy'
  this.course = 'oop'
  this.startCourse = function () {
    // start
  }
}
```

## 构造函数

#### 需要一个模版 - 表征了一类物体的共同特征，从而生成对象

#### 类即对象模版

```js
function Course(teacher) {
  this.teacher = teacher
  this.course = 'oop'
  this.startCourse = function () {
    // start
  }
}
const course = new Course('yy')
const course1 = new Course('zz')
```

#### Course 本质就是构造函数

面试题：

- 1. 函数体内使用的 this，指向所要生成的实例
- 2. 生成对象使用 new 来进行实例化
- 3. 可以做初始化传参

#### 追问：

#### 如果构造函数不初始化，可以使用吗？ - 无法使用

#### 如果项目中需要使用，通常（不被外界感知）如何解决？

```js
let staticProps = undefined
function Course() {
  const _isClass = this instanceof Course

  if (!_isClass) {
    staticProps = new Course()
    return staticProps
  } else {
    return staticProps
  }

  this.teacher = teacher
  this.course = 'oop'
  this.startCourse = function () {
    // start
  }
}

// 使用方
const course = Course()

// 暴露出去的是实例，而将实例化的过程放置在下层不被上层所感知
```

- 启发：如果写底层代码时，不需要让外界熟悉感知内部代码思想
- 延伸：通过改进 => 不多次实例化，同一个实例 => 单例模式

#### 思考：new 是什么？ / new 的原理 / new 时候做了些什么？

```js
function Course(teacher, course) {
  this.teacher = teacher
  this.course = course
}
const course1 = new Course('yy', 'oop')
const course2 = new Course('zz', 'js')
```

- 1. 结构上：创建了一个空对象，做为返回的对象实例
- 2. 属性上：将生成的空对象和类产生了关联 => prototype
- 2.5 属性上：将生成的对象的原型对象指向了构造函数的 prototype 属性
- 3. 关系上：将当前实例对象赋给了内部 this
- 4. 声明上：构造函数初始化代码的执行

#### constructor 是什么？

- 1. 每个对象在创建的时候，会自动拥有一个构造函数的属性 constructor
- 2. constructor 继承自原型对象，指向了构造函数的引用 => 实例获得了类的属性 => 继承了类的属性

#### 追问：使用构造函数没有问题么？ / 会有什么性能上的问题？

```js
function Course(name) {
  this.teacher = name
  this.course = 'oop'
  this.startCourse = function () {
    // start
  }
}
const course1 = new Course('yy')
const course2 = new Course('zz')

// 构造函数中的每一个方法和属性，都会存在于每一个实例中，重复挂载导致了资源浪费
```

- 如何优化？原型对象又是什么？

#### 原型对象

- 1. 构造函数 - 赋予一个属性 prototype，该属性引用等于实例对象的**proto**
     course1.**proto** === Course.prototype

- 2. 实例对象 - 每一个实例对象都有个 constructor => 指向当前构造函数
     course1.constructor === Course

- 3. prototype 是什么？ => drawio

- 4. 回到上面的题

```js
function Course(name) {
  this.teacher = name
  this.course = 'oop'
}

// 挂载在原型上的属性，可以被所有实例所查找到且共享
Course.prototype.startCourse = function () {
  // start
}

const course1 = new Course('yy')
const course2 = new Course('zz')

// 构造函数中的每一个方法和属性，都会存在于每一个实例中，重复挂载导致了资源浪费
```

## 继承

#### 在原型对象中的所有属性和方法，都能被实例所共享

```js
// game类
function Game() {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function () {
  return this.name
}

// LOL类
function LOL() {}
LOL.prototype = new Game()
LOL.prototype.constructor = LOL
const game1 = new LOL()

// 扩展
const game2 = new LOL()
game1.skin.push('ss')
```

- 1. 父类属性一旦复制给子类的原型属性，此时属性属于子类的共享属性了
- 2. 实例化子类的时候，无法向父类传参

### 解决方法：构造函数继承

#### 在子类的构造函数内部调用父类构造函数

```js
// game类
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function () {
  return this.name
}

// LOL类
function LOL(arg) {
  Game.call(this, arg)
}

const game3 = new LOL('arg')
// 解决共享属性 + 子向父传参的问题
```

#### 追问：原型链上的共享方法无法被读取继承 => 组合继承

```js
// game类
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function () {
  return this.name
}

// LOL类
function LOL(arg) {
  Game.call(this, arg)
}
LOL.prototype = new Game()
LOL.prototype.constructor = LOL

const game3 = new LOL('arg')
```

#### 追问：组合继承就没有缺点么？问题在于：无论在何种场景下，都会调用两次父类构造函数 => 寄生组合继承

```js
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function () {
  return this.name
}

function LOL(arg) {
  Game.call(this, arg)
}
LOL.prototype = Object.create(Game.prototype)
LOL.prototype.constructor = LOL
```

#### 提高：如何去实现多重继承？ => 原型属性合并

```js
function Game(arg) {
  this.name = 'lol'
  this.skin = ['s']
}
Game.prototype.getName = function () {
  return this.name
}

function Store() {
  this.shop = 'steam'
}
Store.prototype.getPlatform = function () {
  return this.shop
}

function LOL(arg) {
  Game.call(this, arg)
  Store.call(this, arg)
}

LOL.prototype = Object.create(Game.prototype)
// LOL.prototype = Object.create(Store.prototype)
Object.assign(LOL.prototype, Store.prototype)

LOL.prototype.constructor = LOL
```

上下文、作用域 => 思路 => 设计模式 ｜ ES TS ｜ 模块
