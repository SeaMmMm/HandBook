// 这里只看原始类型,以后再看对象的转换

// 字符串转换

// 在 alert(value) 中,会将 value 转换为字符串
// 也可以显式调用 String(value) 进行转换
let bool = true
console.log(typeof bool) // boolean
console.log(typeof String(bool)) // string

// 数字型转换

// 算术运算符和数学函数会自动将值转换为数字
console.log(1 + '2') // 12
console.log(1 - '2') // -1
console.log(1 * '2') // 2
console.log(1 / '2') // 0.5

// 也可以显式调用 Number(value) 进行转换
console.log(Number('123')) // 123
console.log(Number('123abc')) // NaN
console.log(Number(true)) // 1
console.log(typeof Number('123')) // number

// 值得注意得是,null 和 undefined 转换为数字时不一样
// null 转换为数字时为 0. undefined 转换为数字时为 NaN
console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN

// 布尔型转换
// 直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false。

console.log(Boolean(0)) // false
console.log(Boolean('')) // false
console.log(Boolean(null)) // false
console.log(Boolean(undefined)) // false
console.log(Boolean(NaN)) // false

// 值得注意得是,字符串 0 和空字符串是 true
console.log(Boolean('0')) // true
console.log(Boolean(' ')) // true
