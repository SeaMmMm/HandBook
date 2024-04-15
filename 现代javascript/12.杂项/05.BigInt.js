// BigInt 是一种特殊的数字类型，它提供了对任意长度整数的支持。
// 创建 bigint 的方式有两种：在一个整数字面量后面加 n 或者调用 BigInt 函数，该函数从字符串、数字等中生成 bigint。

const bigint = 1234567890123456789012345678901234567890n
const sameBigint = BigInt('1234567890123456789012345678901234567890')
const bigintFromNumber = BigInt(10) // 与 10n 相同

// 数学运算符
// BigInt 大多数情况下可以像常规数字类型一样使用，例如：
console.log(1n + 2n) // 3

console.log(5n / 2n) // 2

// 请注意：除法 5/2 的结果向零进行舍入，舍入后得到的结果没有了小数部分。对 bigint 的所有操作，返回的结果也是 bigint。

// 我们不可以把 bigint 和常规数字类型混合使用

// 如果有需要，我们应该显式地转换它们：使用 BigInt() 或者 Number()，像这样：
let number = 2

// 将 number 转换为 bigint
alert(bigint + BigInt(number)) // 3

// 将 bigint 转换为 number
alert(Number(bigint) + number) // 3

// 转换操作始终是静默的，绝不会报错，但是如果 bigint 太大而数字类型无法容纳，则会截断多余的位，因此我们应该谨慎进行此类转换。

/* 
BigInt 不支持一元加法
一元加法运算符 +value，是大家熟知的将 value 转换成数字类型的方法。

为了避免混淆，在 bigint 中不支持一元加法：

let bigint = 1n;

alert( +bigint ); // error
所以我们应该用 Number() 来将一个 bigint 转换成一个数字类型。
*/
