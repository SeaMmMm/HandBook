"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）
function sum(x, y) {
    return x + y;
}
let mySum = function (x, y) {
    return x + y;
};
// 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
let mySum2 = function (x, y) {
    return x + y;
};
let mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
