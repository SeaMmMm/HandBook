export {}

// 在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）

function sum(x: number, y: number): number {
  return x + y
}

let mySum = function (x: number, y: number): number {
  return x + y
}
// 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：

let mySum2: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

/* 
注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。

在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
*/

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1
}

// 可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')
// 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了

// 参数默认值
// 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
function buildName2(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName
}
// 此时就不受「可选参数必须接在必需参数后面」的限制了：
function buildName3(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}
let tomcat2 = buildName2('Tom', 'Cat')
let cat = buildName2('Cat')
let tomcat3 = buildName3(undefined, 'Tom')

// 剩余参数
function push(array: number[], ...items: number[]) {
  items.forEach(function (item) {
    array.push(item)
  })
}

let a: number[] = []
push(a, 1, 2, 3)

// 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
// 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
// 利用联合类型，我们可以这么实现：
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
/* 
然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

这时，我们可以使用重载定义多个 reverse 的函数类型：
*/

function reverse2(x: number): number
function reverse2(x: string): string
function reverse2(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
/* 
上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
*/
