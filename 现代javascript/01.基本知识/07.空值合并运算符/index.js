// 空值运算符: ??

// 当一个值既不是 null 也不是 undefined 时，我们将其称为“已定义的（defined）”。
/*
a ?? b 的结果是：

如果 a 是已定义的，则结果为 a，
如果 a 不是已定义的，则结果为 b。
也就是，如果第一个参数不是 null/undefined，则 ?? 返回第一个参数。否则，返回第二个参数。
*/
console.log(null ?? undefined) // undefined
console.log(undefined ?? null) // null

// 与 || 的区别
/*
|| 返回第一个 真 值。
?? 返回第一个 已定义的 值。

|| 无法区分 false、0、空字符串 "" 和 null/undefined。它们都一样 —— 假值（falsy values）。如果其中任何一个是 || 的第一个参数，那么我们将得到第二个参数作为结果。
*/
let height = 10,
  width = null
console.log(height || 100) // 100
console.log(height ?? 100) // 0

// ?? 的优先级与 || 相同
height = null
console.log((height ?? 100) * (width ?? 50)) // 5000
console.log(height ?? 100 * width ?? 50) // 0

// 与 && 或 || 一起使用
// let x = 1 && 2 ?? 3 // Syntax error
let x = (1 && 2) ?? 3
console.log(x) // 2
