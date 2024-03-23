// if(...)中的语句会转换成布尔型
// 数字 0、空字符串 ""、null、undefined 和 NaN 都会被转换成 false。因为它们被称为“假值（falsy）”。
// 其他值被转换为 true，所以它们被称为“真值（truthy）”。

// 条件运算符 '?'
let age = 12
let age2 = 18
let age3 = 80

let message = age < 18 ? '未成年人' : '成年人'
let message2 = age2 < 18 ? '未成年人' : age2 > 60 ? '老年人' : '成年人'
let message3 =
  age3 < 3 ? '婴儿' : age3 < 18 ? '未成年人' : age3 < 60 ? '成年人' : '老年人'
console.log(message, message2, message3)
// 可以看到，条件运算符可以嵌套使用，十分不推荐这么做，因为会降低代码的可读性。
