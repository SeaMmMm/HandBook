let arr = ['John', 'Smith']
let [firstName, surName] = arr
console.log(firstName, surName)

// 忽略使用逗号的元素
// 可以通过添加额外的逗号来丢弃数组中不想要的元素：

// 不需要第二个元素
let [, , , title] = ['Julius', 'Caesar', 'Consul', 'of the Roman Republic']
console.log(title)

// 等号右侧可以是任何可迭代对象
let [a, b, c] = 'abc' // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3])

// 交换变量值的技巧
// 使用解构赋值来交换两个变量的值是一个著名的技巧：

let guest = 'Jane'
let admin = 'Pete'
;[guest, admin] = [admin, guest]
console.log(`${guest} ${admin}`)

// 不使用 let 时的陷阱

let card,
  width,
  height
  // {card, width, height} = {card: "Menu", width: 200, height: 100}; // 这一行发生了错误

  /* 
问题在于 JavaScript 把主代码流（即不在其他表达式中）的 {...} 当做一个代码块。这样的代码块可以用于对语句分组，如下所示：

{
  // 一个代码块
  let message = "Hello";
  // ...
  alert( message );
}
因此，这里 JavaScript 假定我们有一个代码块，这就是报错的原因。我们需要解构它。

为了告诉 JavaScript 这不是一个代码块，我们可以把整个赋值表达式用括号 (...) 包起来：
*/
;({ card, width, height } = { card: 'Menu', width: 200, height: 100 })
console.log(card)

// 总结
/* 
解构赋值可以简洁地将一个对象或数组拆开赋值到多个变量上。

解构对象的完整语法：

let {prop : varName = default, ...rest} = object
这表示属性 prop 会被赋值给变量 varName，如果没有这个属性的话，就会使用默认值 default。

没有对应映射的对象属性会被复制到 rest 对象。

解构数组的完整语法：

let [item1 = default, item2, ...rest] = array
数组的第一个元素被赋值给 item1，第二个元素被赋值给 item2，剩下的所有元素被复制到另一个数组 rest。

从嵌套数组/对象中提取数据也是可以的，此时等号左侧必须和等号右侧有相同的结构。
*/

// 任务

/* 
解构赋值
重要程度: 5
我们有一个对象：

let user = {
  name: "John",
  years: 30
};
写一个解构赋值语句使得：

name 属性赋值给变量 name。
years 属性赋值给变量 age。
isAdmin 属性赋值给变量 isAdmin（如果属性缺失则取默认值 false）。
下面是赋值完成后的值的情况：

let user = { name: "John", years: 30 };

// 等号左侧是你的代码
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
*/

let user = {
  name: 'John',
  years: 30,
}
const { name, years: age, isAdmin = false } = user
console.log(name)
console.log(age)
console.log(isAdmin)

/* 
最高薪资
重要程度: 5
这儿有一个 salaries 对象：

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
新建一个函数 topSalary(salaries)，返回收入最高的人的姓名。

如果 salaries 是空的，函数应该返回 null。
如果有多个收入最高的人，返回其中任意一个即可。
P.S. 使用 Object.entries 和解构语法来遍历键/值对。
*/

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
}

function topSalary(salaries = {}) {
  let top = null

  Object.entries(salaries).map((salary) => {
    if (top === null) top = salary[1]
    else {
      top = top > salary[1] ? top : salary[1]
    }
  })

  return top
}
console.log(topSalary())
