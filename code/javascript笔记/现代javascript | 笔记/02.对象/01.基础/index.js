const obj = {
  name: 'jack',
  age: 12,
  gender: 'female',
}

// 删除对象属性 delete

// 方括号更强大,比如
const key = 'name'
console.log(obj[key]) // jack

obj['what the fuck'] = 'mother fucker'
console.log(obj)

// 属性存在, in
// console.log({} === undefined) 这种只会返回false.在JavaScript中，对象是通过引用进行比较的，而不是通过值。这意味着即使两个对象具有相同的属性和值，它们也被视为不同的对象，因为它们在内存中的位置不同。因此，{} === undefined将始终返回false，因为这是在比较两个不同的对象引用。

console.log(obj.haa === undefined)
// 这种判断haa在不在obj里有漏洞

// 如果haa被定义为undefined,那么在这种判断就失效了
obj.haa = undefined
console.log(obj.haa === undefined)

// 要用 in
console.log('haa' in obj)
delete obj.haa
console.log('haa' in obj)

// for in 循环
for (let key in obj) {
  console.log(key)
}

// 任务

/* 
检查空对象
重要程度: 5
写一个 isEmpty(obj) 函数，当对象没有属性的时候返回 true，否则返回 false。
应该像这样：

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
*/
function isEmpty(obj) {
  for (let key in obj) {
    return false
  }
  return true
}

const testObj = {}
console.log(isEmpty(testObj))
testObj.name = 'Jack'
console.log(isEmpty(testObj))

/*
对象属性求和
重要程度: 5
我们有一个保存着团队成员工资的对象：

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}
写一段代码求出我们的工资总和，将计算结果保存到变量 sum。从所给的信息来看，结果应该是 390。

如果 salaries 是一个空对象，那结果就为 0。
*/
function sum(obj) {
  let sum = 0
  for (let key in obj) {
    sum += obj[key]
  }
  return sum
}
const testObj2 = {
  John: 100,
  Ann: 160,
  Pete: 130,
}

console.log(sum({}))
console.log(sum(testObj2))

/*
将数值属性值都乘以 2
重要程度: 3
创建一个 multiplyNumeric(obj) 函数，把 obj 所有的数值属性值都乘以 2。

例如：

// 在调用之前
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// 调用函数之后
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
注意 multiplyNumeric 函数不需要返回任何值，它应该就地修改对象。

*/
function multiplyNumeric(obj) {
  for (let key in obj) {
    let value = obj[key]

    if (typeof value === 'number') {
      obj[key] = value * 2
    }
  }
}
let menu = {
  width: 200,
  height: 300,
  title: 'My menu',
}
multiplyNumeric(menu)
menu
