export { jack }

interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}

// 多/少一些属性是不允许的

// 可选属性
interface Person2 {
  name: string
  age?: number
}

let jack: Person2 = {
  name: 'Jack',
}

// 任意属性
interface Person3 {
  name: string
  age?: number
  [propName: string]: any
}

let jerry: Person3 = {
  name: 'Jerry',
  age: 25,
  gender: 'male',
}
// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

interface Person4 {
  name: string
  age?: number
  [propName: string]: string | number | undefined
}

// 只读属性
interface Person5 {
  readonly id: number
  name: string
  age?: number
  [propName: string]: number | string | undefined
}

let rose: Person5 = {
  id: 89757,
  name: 'Rose',
}

// rose.id = 9527 // Cannot assign to 'id' because it is a read-only property.
