## class 助力了 js 更加面向对象 - 类

```js
// 传统对象 - function
function Course(teacher, course) {
  this.teacher = teacher
  this.course = course
}
Course.prototype.getCourse = function () {
  return `teacher: ${this.teacher}, course: ${this.course}`
}

// ES6
class Course {
  constructor(teacher, course) {
    this.teacher = teacher
    this.course = course
    this.getTeacher = () => {}
  }
  getCourse() {
    return `teacher: ${this.teacher}, course: ${this.course}`
  }
}

// 追问：
// class 类型 | prototype | 原型链
console.log(typeof Course) // function
```

### 属性定义

```js
class Course {
  constructor(teacher, course) {
    this._teacher = teacher
    this.course = course
  }
  getCourse() {
    return `teacher: ${this.teacher}, course: ${this.course}`
  }

  get teacher() {
    // 操作
    return this._teacher
  }
  set teacher(val) {
    // 操作
    this._teacher = val
  }
}

// 特殊意义
// 1. js如何建立只读变量
class Course {
  constructor(teacher, course) {
    this._teacher = teacher
    this.course = course
  }
  getCourse() {
    return `teacher: ${this.teacher}, course: ${this.course}`
  }

  get teacher() {
    // 操作
    return this._teacher
  }
}
// 修改只读变量，不生效 不报错

// 2. js如何实现一个私有属性 - 闭包
class Course {
  constructor(teacher, course) {
    this._teacher = teacher
    let _course = 'es6'

    this.getCourse = () => {
      return _course
    }
  }
}

// #course = 'es6'

// 3. 封装核心 - 适配器模式
// 底层核心代码core => 封装 => 客户
class utils {
  constructor(core) {
    this._main = core
    this._name = {
      firstName: '定制name',
      lastName: '...',
      midName: '客户',
    }
  }
  get name() {
    return {
      ...this._main.name,
      ...this._name,
    }
  }
  set name(val) {
    this._name = val
  }
}
```

### 挂载方法 - 静态方法

```js
class Course {
  constructor(teacher, course) {
    this.teacher = teacher
    this.course = course
    Course.count++
  }
  static call() {
    // ...
  }
  static count = 0
}

Course.prototype.getCourse = function () {
  return `teacher: ${this.teacher}, course: ${this.course}`
}

Course.call()
```

### 继承

```js
class Course {
  constructor(teacher, course) {
    this.teacher = teacher
    this.course = course
    Course.count++
  }
  static call() {
    // ...
  }
  static count = 0
}
class Child extends Course {
  constructor() {
    super('yy', 'es')
  }
  start() {}
}
```
