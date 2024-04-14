// 对于字符串的比较,按照 Unicode 码点进行比较

console.log('Glow' > 'Glee') // true
/*
  G 和 G 相等。
  l 和 l 相等。
  o 比 e 大，算法停止，第一个字符串大于第二个。
*/

console.log('Bee' > 'Be') // true
/*
  B 和 B 相等。
  e 和 e 相等。
  e 和 没有字符的字符串相比较，算法停止，第一个字符串大于第二个。
*/

// 不同类型的比较
// 当对不同的值进行比较的话,js 会首先将其转化为数字再判定大小
console.log('2' > 1) // true
console.log('01' == 1) // true '01'会被转化为数字1
console.log(true == 1) // true
console.log(false == 0) // true
console.log('' == 0) // true
console.log('' == false) // true
console.log('' == null) // false
console.log('' == undefined) // false
console.log(null == undefined) // true  null 和 undefined 之间的相等性判断是个例外
console.log(null === undefined) // false  严格相等运算符不会进行类型转换

// 严格相等
// 普通的 == 存在一个问题,他无法区分出 0 和 false.也无法区分出 '' 和 false

console.log(0 == false) // true
console.log('' == false) // true
// 这是因为在比较不同值的时候,js 会将其转化为数字再进行比较
// 而严格相等运算符 === 不会进行类型转换,如果两个值的类型不同,直接返回 false

console.log(0 === false) // false
console.log('' === false) // false

// 一个奇怪的结果 null 和 0 的比较
console.log(null > 0) // false (1)
console.log(null == 0) // false (2)
console.log(null >= 0) // true (3)
/*
  为什么会出现这种反常结果，这是因为相等性检查 == 和普通比较符 > < >= <= 的代码逻辑是相互独立的。进行值的比较时，null 会被转化为数字，因此它被转化为了 0。这就是为什么（3）中 null >= 0 返回值是 true，（1）中 null > 0 返回值是 false。

  另一方面，undefined 和 null 在相等性检查 == 中不会进行任何的类型转换，它们有自己独立的比较规则，所以除了它们之间互等外，不会等于任何其他的值。这就解释了为什么（2）中 null == 0 会返回 false。
*/

// undefined,他不该与任何值进行比较
console.log(undefined > 0) // false
console.log(undefined < 0) // false
console.log(undefined == 0) // false
// 在大于等于比较重,undefined 被转化成了 NaN,而 NaN 和任何值进行比较都是 false.在相等性比较中,undefined 只和 null 相等,和其他值都不相等
