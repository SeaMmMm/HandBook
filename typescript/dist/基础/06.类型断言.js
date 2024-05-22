"use strict";
/*
类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。

语法
 值 as 类型
或
 <类型>值

在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。
形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言之外，也可能是表示一个泛型。
故建议大家在使用类型断言时，统一使用 值 as 类型 这样的语法.
*/
function getName(animal) {
    return animal.name;
}
// 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，使用类型断言，将 animal 断言成 Fish：
function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
// 如果不使用断言，直接获取 animal.swim 的时候会报错。
// 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
// 将一个父类断言为更加具体的子类
class ApiError extends Error {
    constructor() {
        super(...arguments);
        this.code = 0;
    }
}
class HttpError extends Error {
    constructor() {
        super(...arguments);
        this.statusCode = 200;
    }
}
function isApiError(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
// 在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof：
function isApiError2(error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
// 将 any 断言为一个具体的类型
// 在日常的开发中，我们不可避免的需要处理 any 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。
function getCacheData(key) {
    return window.cache[key];
}
const tom2 = getCacheData('tom');
tom2.run();
let tom = {
    name: 'Tom',
    run: () => {
        console.log('run');
    },
};
let animal = tom;
// 类型断言 vs 类型转换
// 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除
function toBoolean(something) {
    return something;
}
toBoolean(1); // return 1而不是true
// 类型断言不是类型转换，它不会真的影响到变量的类型。
// 若要进行类型转换，需要直接调用类型转换的方法：
function toBoolean2(something) {
    return Boolean(something);
}
// 类型断言 vs 类型声明
function getCacheData2(key) {
    return window.cache[key];
}
const tom3 = getCacheData('tom');
tom3.run();
// 我们使用 as Cat 将 any 类型断言为了 Cat 类型。
// 但实际上还有其他方式可以解决这个问题：
const tom4 = getCacheData('tom');
tom4.run();
