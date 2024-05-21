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
// 可选参数
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
// 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了
// 参数默认值
// 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
function buildName2(firstName, lastName = 'Cat') {
    return firstName + ' ' + lastName;
}
// 此时就不受「可选参数必须接在必需参数后面」的限制了：
function buildName3(firstName = 'Tom', lastName) {
    return firstName + ' ' + lastName;
}
let tomcat2 = buildName2('Tom', 'Cat');
let cat = buildName2('Cat');
let tomcat3 = buildName3(undefined, 'Tom');
// 剩余参数
function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);
// 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
// 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
// 利用联合类型，我们可以这么实现：
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
function reverse2(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
/*
上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
*/
