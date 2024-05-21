export {}
// 联合类型（Union Types）表示取值可以为多种类型中的一种。

let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
function getLength(something: string | number): number {
  return something.toString().length
}
