export {}
// 「类型 + 方括号」表示法
let fibonacci: number[] = [1, 1, 2, 3, 5]

// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
// fibonacci.push('8'); // error: Argument of type 'string' is not assignable to parameter of type 'number'.

// 数组泛型
let fibonacci2: Array<number> = [1, 1, 2, 3, 5]

// 用接口表示数组,一般不会这么做,不过有一种情况例外，那就是它常用来表示类数组。
interface NumberArray {
  [index: number]: number
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5]

interface IArguments {
  length: number
  callee: Function
  [index: number]: any
}

function sum() {
  let args: IArguments = arguments
}

// any 在数组中的应用,一个比较常见的做法是，用 any 表示数组中允许出现任意类型：
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }]
