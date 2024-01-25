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
