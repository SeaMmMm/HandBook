// 可选链 ?. 是一种访问嵌套对象属性的安全的方式。即使中间的属性不存在，也不会出现错误。

// “不存在的属性”的问题
let user = {}
console.log(user?.address?.street)
//_ ?.前面的一定是无法肯定有值的(可选的)，如果一定有值的话就不要用 ?.

// 可选链 ?. 不是一个运算符，而是一个特殊的语法结构。它还可以与函数和方括号一起使用。
let userAdmin = {
  admin() {
    console.log('I am admin')
  },
  name: 'Tom',
}

let userGuest = {}

userAdmin.admin?.()

userGuest.admin?.()

//_ ?.可以跟很多情况使用。使用方括号也行:
const a = 'name'
console.log(userAdmin?.[a])

// 还可以与 delete 使用
delete userAdmin?.name
console.log(userAdmin.name)
