// 反引号

// 反引号允许我们通过 ${…} 将任何表达式嵌入到字符串中：
function sum(a, b) {
  return a + b
}
console.log(`1 + 2 = ${sum(1, 2)}`)

// 另一个优点是它们允许字符串跨行：
let guestList = `Guests:
 * John
 * Pete
 * Mary
`
console.log(guestList) // 客人清单，多行

// 特殊字符情况下也是一样的
let str1 = 'hello\nworld'
let str2 = `hello
world`
console.log(str1 === str2)

// Unicode 示例：
console.log('\u00A9')
console.log('\u{20331}')
console.log('\u{1F60D}')

// length是属性，不是方法
console.log(str1.length) // 不是length()

// for..of 遍历字符串
for (const char of 'Hello') {
  console.log(char)
}

// 查找子字符串
// 第一个方法是 str.indexOf(substr, pos)
let str = 'Widget with id'
console.log(str.indexOf('Widget'))
console.log(str.indexOf('widget'))
console.log(str.indexOf('id'))

/*
还有一个类似的方法 str.lastIndexOf(substr, position)，它从字符串的末尾开始搜索到开头。
它会以相反的顺序列出这些事件。 
*/
// 还有个需要注意，indexOf 方法返回 -1 说明没找到，返回 0 或者其他的值指的是开始下标，因此在判断是否找到的时候不能直接将这个函数放在判断里，要检查 -1
if (str.indexOf('Widget') != -1) {
  console.log('we found it')
}

// 按位（bitwise）NOT 技巧

/*
这里使用的一个老技巧是 bitwise NOT ~ 运算符。它将数字转换为 32-bit 整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反。
实际上，这意味着一件很简单的事儿：对于 32-bit 整数，~n 等于 -(n+1)。
*/

console.log(~2)
console.log(~1)
console.log(~0)
console.log(~1)
// 只有当 n == -1 时，~n 才为零（适用于任何 32-bit 带符号的整数 n）。
// 这不好巧吗，indexOf 方法只有返回 -1 的时候表明没找到，所以...
if (~str.indexOf('Widget')) {
  console.log('we found it')
}
// 但是通常不建议这样做，可读性降低，但是在旧代码种被广泛使用

// includes，startsWith，endsWith
// 更现代的方法 str.includes(substr, pos) 根据 str 中是否包含 substr 来返回 true/false。
console.log('hello'.includes('bye'))
console.log('Widget'.includes('Wid'))

// 方法 str.startsWith 和 str.endsWith 的功能与其名称所表示的意思相同：
console.log('Widget'.startsWith('Wid'))
console.log('Widget'.endsWith('get'))

// 获取子字符串
// JavaScript 中有三种获取字符串的方法：substring、substr 和 slice。

str = 'stringify'
console.log(str.slice(0, 5)) // 'strin'，从 0 到 5 的子字符串（不包括 5）
console.log(str.slice(0, 1)) // 's'，从 0 到 1，但不包括 1，所以只有在 0 处的字符

// 比较字符串
console.log('z'.codePointAt(0))
console.log(String.fromCodePoint(345))

str = ''
for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i)
}
console.log(str)

// 因此正确的比较：
/* 
所有现代浏览器（IE10- 需要额外的库 Intl.JS) 都支持国际化标准 ECMA-402。

它提供了一种特殊的方法来比较不同语言的字符串，遵循它们的规则。

调用 str.localeCompare(str2) 会根据语言规则返回一个整数，这个整数能指示字符串 str 在排序顺序中排在字符串 str2 前面、后面、还是相同：

如果 str 排在 str2 前面，则返回负数。
如果 str 排在 str2 后面，则返回正数。
如果它们在相同位置，则返回 0。
*/
console.log('Österreich'.localeCompare('Zealand'))
console.log('Österreich' > 'Zealand') //直接比大小错的

// 内部，Unicode
// 这部分专门处理罕见字符，需要时再来看

/* 
总结

- 有 3 种类型的引号。反引号允许字符串跨越多行并可以使用 ${…} 在字符串中嵌入表达式。
- JavaScript 中的字符串使用的是 UTF-16 编码。
- 我们可以使用像 \n 这样的特殊字符或通过使用 \u... 来操作它们的 Unicode 进行字符插入。
- 获取字符时，使用 []。
- 获取子字符串，使用 slice 或 substring。
- 字符串的大/小写转换，使用：toLowerCase/toUpperCase。
- 查找子字符串时，使用 indexOf 或 includes/startsWith/endsWith 进行简单检查。
- 根据语言比较字符串时使用 localeCompare，否则将按字符代码进行比较。

还有其他几种有用的字符串方法：

- str.trim() —— 删除字符串前后的空格 (“trims”)。
- str.repeat(n) —— 重复字符串 n 次。
- ……更多内容细节请参见手册。
*/

// 任务
/* 
首字母大写
重要程度: 5
写一个函数 ucFirst(str)，并返回首字母大写的字符串 str，例如：

ucFirst("john") == "John";
*/
function ucFirst(x) {
  if (!x) return ''

  return x[0].toUpperCase() + x.slice(1)
}
console.log(ucFirst(''))
console.log(ucFirst('aaaa'))

/*
检查 spam
重要程度: 5
写一个函数 checkSpam(str)，如果 str 包含 viagra 或 XXX 就返回 true，否则返回 false。

函数必须不区分大小写：

checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
*/
function checkSpam(str) {
  return (
    str.toLowerCase().includes('viagra') || str.toLowerCase().includes('xxx')
  )
}

/*
截断文本
重要程度: 5
创建函数 truncate(str, maxlength) 来检查 str 的长度，如果超过 maxlength —— 应使用 "…" 来代替 str 的结尾部分，长度仍然等于 maxlength。

函数的结果应该是截断后的文本（如果需要的话）。

例如：

truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
*/
function truncate(str, maxlength) {
  const sub = str.substr(0, maxlength)

  return maxlength >= str.length ? str : `${sub}...`
}
console.log(truncate('sss', 3))

/* 
提取货币
重要程度: 4
我们有以 "$120" 这样的格式表示的花销。意味着：先是美元符号，然后才是数值。

创建函数 extractCurrencyValue(str) 从字符串中提取数值并返回。

例如：

alert( extractCurrencyValue('$120') === 120 ); // true
*/

function extractCurrencyValue(str) {
  return +str.slice(1)
}
console.log(extractCurrencyValue('$123') === 123)
