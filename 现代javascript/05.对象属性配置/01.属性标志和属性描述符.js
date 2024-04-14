let user = {
  name: 'John',
}

let descriptor = Object.getOwnPropertyDescriptor(user, 'name')
console.log(JSON.stringify(descriptor, null, 2))

{
  let user = {}

  Object.defineProperty(user, 'name', {
    value: 'John',
  })

  let descriptor = Object.getOwnPropertyDescriptor(user, 'name')

  console.log(JSON.stringify(descriptor, null, 2))
}

// 使属性变成不可配置是一条单行道。我们无法通过 defineProperty 再把它改回来。

// Object.defineProperties
Object.defineProperties(user, {
  name: { value: 'John', writable: false },
  surname: { value: 'Smith', writable: false, enumerable: true },
  // ...
})

// Object.getOwnPropertyDescriptors
// 一次获取所有属性描述符
console.log(Object.getOwnPropertyDescriptors(user))

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user))
console.log(clone)

/* 
通常，当我们克隆一个对象时，我们使用赋值的方式来复制属性，像这样：

for (let key in user) {
  clone[key] = user[key]
}
……但是，这并不能复制标志。所以如果我们想要一个“更好”的克隆，那么 Object.defineProperties 是首选。

另一个区别是 for..in 会忽略 symbol 类型的和不可枚举的属性，但是 Object.getOwnPropertyDescriptors 返回包含 symbol 类型的和不可枚举的属性在内的 所有 属性描述符。
*/
