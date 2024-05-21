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

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function getName(animal: Cat | Fish) {
  return animal.name
}

// 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，使用类型断言，将 animal 断言成 Fish：
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}

// 如果不使用断言，直接获取 animal.swim 的时候会报错。
// 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

// 将一个父类断言为更加具体的子类
class ApiError extends Error {
  code: number = 0
}
class HttpError extends Error {
  statusCode: number = 200
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true
  }
  return false
}
