/* 
有两种类型的对象属性。

第一种是 数据属性。我们已经知道如何使用它们了。到目前为止，我们使用过的所有属性都是数据属性。

第二种类型的属性是新东西。它是 访问器属性（accessor property）。它们本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。
*/

let user = {
  name: 'John',
  surname: 'Smith',

  get fullName() {
    return `${this.name} ${this.surname}`
  },

  set fullName(value) {
    ;[this.name, this.surname] = value.split(' ')
  },
}

console.log(user.fullName)
user.fullName = 'Alice Cooper'
console.log(user.name, user.surname)
