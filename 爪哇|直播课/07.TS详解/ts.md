### 洋葱模型

外皮 1 => 外皮 2 => 外皮 3 => core => 外皮 3 => 外皮 2 => 外皮 1

assembleOneStep
assembleTwoStep
assembleThreeStep

console.log('1+1=2' + teacher)

restoreThreeStep
restoreTwoStep
restoreOneStep

```js
const genLine = ['OneStep', 'TwoStep', 'ThreeStep']

const operateType = 'assemble' || 'restore'
// new Funtion(operateType + 'genLine')

// 异步 => 同步 co库 generator
```

## TypeScript 详解

### 一、TS 基础概念

#### 1. 什么是 TS

a. 对比原理

- 它是 JS 的一个超集，在原有的语法基础上，添加了可选静态类型和基于类的面向对象编程
  > 面向项目：
  > TS - 面向解决大型项目中，架构以及代码、共建等复杂维护场景
  > JS - 用于面向简单页面场景，脚本化语言

> 自主检测：
> TS - 编译期间，主动发现并且纠正错误
> JS - 运行时报错

> 类型检测：
> TS - 弱类型，支持动态、静态的类型检测
> JS - 弱类型，无类型选项检测

> 运行流程
> TS - 依赖编译

    => .ts -> .js -> 浏览器

b. 安装运行

```bash
npm install -g typescript
tsc -v

tsc demo.ts
```

#### 2. TS 基础类型与写法

- boolean ｜ string | number | array | null | undefined

```ts
    // es
    let isEnabled = true
    let class = 'zhaowa'
    let classNum = 2
    let u = undefined
    let n = null
    let classArr = ['basic', 'execute']

    // TS
    let isEnabled: boolean = true
    let class: string = 'zhaowa'
    let classNum: number = 2
    let u: undefined = undefined
    let n: null = null

    let classArr: string[] = ['basic', 'execute']
    let classArr: Array<string> = ['basic', 'execute']
```

- tuple - 元组

```ts
let tupleType: [string, boolean]
tupleType = ['zhaowa', true]
```

- enum - 枚举

```ts
// 数字类枚举 - 可无赋值，默认从零开始，依次递增
enum Score {
  BAD, // 0
  NG, // 1
  GOOD,
  PERFECT,
}

let score: Score = Score.BAD

// 字符串类型枚举
enum Score {
  BAD = 'BAD',
  NG = 'NG',
  GOOD = 'GOOD',
  PERFECT = 'PERFECT',
}

// 反向映射
enum Score {
  BAD, // 0
  NG, // 1
  GOOD,
  PERFECT,
}
let scoName = Score[0] // BAD
let scoVal = Score['BAD'] // 0

// 异构
enum Enum {
  A, // 0
  B, // 1
  C = 'C', // C
  D = 'D', // D
  E = 6, // 6
  F, // 7
}
```

- any | unknown | void

```ts
// any - 绕过所有类型检查 => 类型检测和编译筛查全部失效
let anyValue: any = 'anyValue'
anyValue = false
anyValue = 123

let value1: number = anyValue

// unknown - 绕过赋值检查 => 禁止更改传递
let unknownValue: unknown
unknownValue = true
unknownValue = 123
unknownValue = 'unknownValue'

let value1: unknown = unknownValue // OK
let value1: boolean = unknownValue // NOK
let value3: any = unknownValue // OK

// void - 声明函数返回值为空
function voidFunction(): void {
  console.log('no return')
}

// never - 永不返回
function error(msg: string): never {
  throw new Error(msg)
}

function longlongloop(): never {
  while (true) {
    // ...
  }
}
```

- Object | object | {} - 对象

```ts
// ts
interface Object {
  constructor: Function
  toString(): string
  hasOwnProperty(v: PropertyKey): boolean
  // ...
}
interface ObjectConstructor {
  new (value?: any): Object
  // ……
}

// 自己的
function zhaowa(arg: Object): { toString(): string } {
  return arg // OK
}

// Object 包含原始类型
function course(courseName: Object) {
  // ...
}
course('zhaowa') // OK

// object
function course(courseName: object) {
  // ...
}
course('zhaowa') // ERROR

// {} - 描述了一个没有成员的对象
const obj = {}
obj.prop = 'zhaowa' // Error
```

### 二、接口 - interface

- 对行为的抽象，具体行为由类来实现

```js
    interface Class {
        name: string;
        time: number;
    }

    let zhaowa: Class = {
        name: 'ts',
        time: 2,
    }

    // 只读 & 任意
    interface Class {
        readonly name: string;
        time: number;

        [propName: string]: any;
    }
```

### 三、交叉类型 - &

```ts
interface A {
  name: D
}
interface B {
  name: E
}
interface C {
  name: F
}

interface D {
  d: boolean
}
interface E {
  e: string
}
interface F {
  f: number
}

type ABC = A & B & C

let abc: ABC = {
  name: {
    d: false,
    e: 'class',
    f: 5,
  },
}

// 面试：合并冲突
interface A {
  c: string
  d: string
}
interface B {
  c: number
  e: string
}

type AB = A & B
let ab: AB = {
  d: 'zhaowa',
  e: 'zhaowa',
}
// 合并 => c: never
```

### 四、断言 - 类型的中间执行时声明、转换（过程中和编译器的交流）

```ts
// 尖括号形式
let anyValue: any = 'zhaowa'
let anyLength: number = (<string>anyValue).length // 阶段性类型

// as声明
let anyValue: any = 'zhaowa'
let anyLength: number = (anyValue as string).length
```

### 五、类型守卫 - 保障在语法规定范围做进一步确认业务逻辑

```ts
    interface Teacher {
        name: string;
        courses: string[];
    }
    interface Student {
        name: string;
        startTime: Date;
    }

    type Class = Teacher | Student;

    // in - 定义属性场景下内容确认
    function startCourse(cls: Class) {
        if ('courses' in cls) {
            // teacher 逻辑
        }
        if ('startTime' in cls) {
            // student 逻辑
        }
    }

    // typeof | instanceof - 类型分类场景下的身份确认
    function class(name: string, score: string | number) {
        if (typeof score === 'number') {
            // teacher打的分数
        }
        if (typeof score === 'string') {
            // student打的分数
        }
    }

    interface Teacher {
        name: string;
        courses: string[];
    }
    interface Student {
        name: string;
        startTime: Date;
    }

    type Class = Teacher | Student;

    const getName = (cls: Class) => {
        if (cls instanceof Teacher) {
            // teacher
        }
        if (cls instanceof Student) {
            // Student
        }
    }
```

### 六、TS 进阶

#### 1. 泛型

- 让模块可以支持多种类型的数据 - 让类型和值一样，可以被传递赋值

```ts
function startClass<T, U>(name: T, score: U): K {
  return name + score
}

function startClass<T, U>(name: T, score: U): String {
  return `${name}${score}`
}

function startClass<T, U>(name: T, score: U): T {
  return (name + String(score)) as any as T
}

console.log(startClass<string, number>('yy', 5))
```

#### 2. 装饰器 - 装饰器模式 设计模式

```ts
    {
        "compilerOptions": {
            "experimentalDecorators": true
        }
    }

    function Zhaowa(target: Function): void {
        target.prototype.startClass = function(): void {
            // 拓展的方法
        }
    }

    @Zhaowa
    class Class {
        constructor () {
            // 业务逻辑
        }
    }
    // class Class1 {
    //     constructor () {
    //         // 业务逻辑
    //     }
    // }
    // class Class2 {
    //     constructor () {
    //         // 业务逻辑
    //     }
    // }

    // 属性装饰器 ｜ 方法
    function nameWrapper(target: any, key: string) {
        // 属性加工
    }

    class Class {
        constructor () {
            // 业务逻辑
        }

        @nameWrapper
        public name: string;
    }
```

拓展 TS 的原理
编译 => 运行
