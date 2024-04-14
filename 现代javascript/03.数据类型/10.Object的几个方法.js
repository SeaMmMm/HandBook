// Object.keys，values，entries

/* 
对于普通对象，下列这些方法是可用的：

- Object.keys(obj) —— 返回一个包含该对象所有的键的数组。
- Object.values(obj) —— 返回一个包含该对象所有的值的数组。
- Object.entries(obj) —— 返回一个包含该对象所有 [key, value] 键值对的数组。

……但是请注意区别（比如说跟 map 的区别）[https://zh.javascript.info/keys-values-entries]

为什么会这样？主要原因是灵活性。请记住，在 JavaScript 中，对象是所有复杂结构的基础。因此，我们可能有一个自己创建的对象，比如 data，并实现了它自己的 data.values() 方法。同时，我们依然可以对它调用 Object.values(data) 方法。

第二个区别是 Object.* 方法返回的是“真正的”数组对象，而不只是一个可迭代对象。这主要是历史原因。
*/

let obj = {
  name: 'jack',
  age: 12,
  gender: 'male',
}
for (let value of Object.values(obj)) {
  console.log(value)
}

/* 
Object.keys/values/entries 会忽略 symbol 属性
就像 for..in 循环一样，这些方法会忽略使用 Symbol(...) 作为键的属性。

通常这很方便。但是，如果我们也想要 Symbol 类型的键，那么这儿有一个单独的方法 Object.getOwnPropertySymbols，它会返回一个只包含 Symbol 类型的键的数组。另外，还有一种方法 Reflect.ownKeys(obj)，它会返回 所有 键。
*/
const hike = Symbol('hike')
obj[hike] = 12
console.log(Reflect.ownKeys(obj))

// 转换对象

/* 
对象缺少数组存在的许多方法，例如 map 和 filter 等。

如果我们想应用它们，那么我们可以使用 Object.entries，然后使用 Object.fromEntries：

1. 使用 Object.entries(obj) 从 obj 获取由键/值对组成的数组。
2. 对该数组使用数组方法，例如 map，对这些键/值对进行转换。
3. 对结果数组使用 Object.fromEntries(array) 方法，将结果转回成对象。
*/
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
}

let doublePrice = Object.fromEntries(
  Object.entries(prices).map((entry) => [entry[0], entry[1] * 2])
)

console.log(doublePrice)

// 任务

/* 
属性求和
重要程度: 5
有一个带有任意数量薪水的 salaries 对象。

编写函数 sumSalaries(salaries)，该函数使用 Object.values 和 for..of 循环返回所有薪水的总和。

如果 salaries 是空对象，那么结果必须是 0。

举个例子：

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
*/

let salaries = {
  John: 100,
  Pete: 300,
  Mary: '250',
}

function sumSalaries(salaries) {
  return Object.values(salaries).reduce((acc, salary) => acc + +salary, 0)
}

console.log(sumSalaries(salaries))

/* 
计算属性数量
重要程度: 5
写一个函数 count(obj)，该函数返回对象中的属性的数量：

let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
试着使代码尽可能简短。

P.S. 忽略 Symbol 类型属性，只计算“常规”属性。
*/

let user = {
  name: 'John',
  age: 30,
}

function count(obj) {
  return Object.keys(obj).length
}
console.log(count(user))
