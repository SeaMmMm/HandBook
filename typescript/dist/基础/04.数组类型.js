"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 「类型 + 方括号」表示法
let fibonacci = [1, 1, 2, 3, 5];
// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
// fibonacci.push('8'); // error: Argument of type 'string' is not assignable to parameter of type 'number'.
// 数组泛型
let fibonacci2 = [1, 1, 2, 3, 5];
let fibonacci3 = [1, 1, 2, 3, 5];
function sum() {
    let args = arguments;
}
// any 在数组中的应用,一个比较常见的做法是，用 any 表示数组中允许出现任意类型：
let list = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
