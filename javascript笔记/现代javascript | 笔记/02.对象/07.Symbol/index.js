// symbol 值表示唯一的标识符
let id = Symbol('sword new new')
console.log(id)

// 就算里面的值一样也不影响
let id2 = Symbol('id')
console.log(id === id2)

// symbol 不会被自动转换为字符串
// alert(id) // TypeError: Cannot convert a Symbol value to a string

// symbol 在 for…in 中会被跳过
let user = {
  name: 'John',
  age: 30,
  [id]: 123,
}

for (let key in user) console.log(key)

// Object.keys(user) 也会忽略他们，但 Object.assign 不会忽略，他会复制 Symbol 属性

let colone = Object.assign({}, user)
console.log(colone[id])

// 全局 symbol 注册表，要从注册表中读取（不存在则创建）symbol， 要使用 Symbol.for(key)。

let id3 = Symbol.for('id')
let idAgain = Symbol.for('id')
console.log(id3 === idAgain)

// Symbol.keyFor 有一个与 Symbol.for 相对的方法 Symbol.keyFor(sym)，它接受一个 symbol 并返回一个已登记的 symbol 的名字。
let sym = Symbol.keyFor(id3)
console.log(sym)

// 但是所有 symbol 都有 description 属性，该属性只是一个只读的字符串，对应于创建 symbol 时的参数

console.log(id.description)
