// 创建

// new Date()
// 不带参数 —— 创建一个表示当前日期和时间的 Date 对象：
let now = new Date()
console.log(now)

// new Date(milliseconds)
// 创建一个 Date 对象，其时间等于 1970 年 1 月 1 日 UTC+0 之后经过的毫秒数（1/1000 秒）。

// 0 表示 01.01.1970 UTC+0
let Jan01_1970 = new Date(0)
console.log(Jan01_1970)

// 现在增加 24 小时，得到 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000)
console.log(Jan02_1970)

// new Date(datestring)
// 如果只有一个参数，并且是字符串，那么它会被自动解析。该算法与 Date.parse 所使用的算法相同，将在下文中进行介绍。
let date = new Date('2017-01-26')
console.log(date)

// new Date(year, month, date, hours, minutes, seconds, ms)
/* 
使用当前时区中的给定组件创建日期。只有前两个参数是必须的。

- year 应该是四位数。为了兼容性，也接受 2 位数，并将其视为 19xx，例如 98 与 1998 相同，但强烈建议始终使用 4 位数。
- month 计数从 0（一月）开始，到 11（十二月）结束。
- date 是当月的具体某一天，如果缺失，则为默认值 1。
- 如果 hours/minutes/seconds/ms 缺失，则均为默认值 0。
*/
new Date(2011, 0, 1, 0, 0, 0, 0) // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1) // 同样，时分秒等均为默认值 0

// 时间度量最大精确到 1 毫秒（1/1000 秒）：
date = new Date(2011, 0, 1, 2, 3, 4, 567)
console.log(date)

// 访问日期组件
/* 
从 Date 对象中访问年、月等信息有多种方式：

getFullYear()
获取年份（4 位数）

getMonth()
获取月份，从 0 到 11。

getDate()
获取当月的具体日期，从 1 到 31，这个方法名称可能看起来有些令人疑惑。

getHours()，getMinutes()，getSeconds()，getMilliseconds()
获取相应的时间组件。
*/

/* 
另外，我们还可以获取一周中的第几天：

getDay()
获取一周中的第几天，从 0（星期日）到 6（星期六）。第一天始终是星期日，在某些国家可能不是这样的习惯，但是这不能被改变。

以上的所有方法返回的组件都是基于当地时区的。

当然，也有与当地时区的 UTC 对应项，它们会返回基于 UTC+0 时区的日、月、年等：getUTCFullYear()，getUTCMonth()，getUTCDay()。只需要在 "get" 之后插入 "UTC" 即可。

如果你当地时区相对于 UTC 有偏移，那么下面代码会显示不同的小时数：

//  当前日期
let date = new Date();

// 当地时区的小时数
alert( date.getHours() );

// 在 UTC+0 时区的小时数（非夏令时的伦敦时间）
alert( date.getUTCHours() );

除了上述给定的方法，还有两个没有 UTC 变体的特殊方法：

getTime()
返回日期的时间戳 —— 从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数。

getTimezoneOffset()
返回 UTC 与本地时区之间的时差，以分钟为单位：

// 如果你在时区 UTC-1，输出 60
// 如果你在时区 UTC+3，输出 -180
alert( new Date().getTimezoneOffset() );
*/

let today = new Date()
today.setHours(0)
console.log(today)

date = new Date(2013, 0, 32)
console.log(date)

console.log(date.getTime())
console.log(+date)
console.log(+date === date.getTime())

let ms = Date.parse('2012-01-26T13:51:50.417-07:00')

console.log(ms)

date = new Date(Date.parse('2012-01-26T13:51:50.417-07:00'))
console.log(date)

// 总结
/* 
- 在 JavaScript 中，日期和时间使用 Date 对象来表示。我们不能单独创建日期或时间，Date 对象总是同时创建两者。
- 月份从 0 开始计数（对，一月是 0）。
- 一周中的某一天 getDay() 同样从 0 开始计算（0 代表星期日）。
- 当设置了超出范围的组件时，Date 会进行自动校准。这一点对于日/月/小时的加减很有用。
- 日期可以相减，得到的是以毫秒表示的两者的差值。因为当 Date 被转换为数字时，Date 对象会被转换为时间戳。
- 使用 Date.now() 可以更快地获取当前时间的时间戳。

和其他系统不同，JavaScript 中时间戳以毫秒为单位，而不是秒。

有时我们需要更加精准的时间度量。JavaScript 自身并没有测量微秒的方法（百万分之一秒），但大多数运行环境会提供。例如：浏览器有 performance.now() 方法来给出从页面加载开始的以毫秒为单位的微秒数（精确到毫秒的小数点后三位）：

alert(`Loading started ${performance.now()}ms ago`);
// 类似于 "Loading started 34731.26000000001ms ago"
// .26 表示的是微秒（260 微秒）
// 小数点后超过 3 位的数字是精度错误，只有前三位数字是正确的

Node.js 可以通过 microtime 模块或使用其他方法。从技术上讲，几乎所有的设备和环境都允许获取更高精度的时间数值，只不过不是使用 Date 对象。
*/

date = new Date(2015, 0, 2)
console.log(date)

function getDateAgo(date, days) {
  date.setDate(date.getDate() - days)
  return date.getDate()
}

getDateAgo(date, 4)
console.log(date)

date = new Date(2024, 2, 0)
console.log(date.getMonth(), date.getDate())
