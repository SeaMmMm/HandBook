// Map

// Map 允许任何类型的键
/* 
new Map() —— 创建 map。
map.set(key, value) —— 根据键存储值。
map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
map.delete(key) —— 删除指定键的值。
map.clear() —— 清空 map。
map.size —— 返回当前元素个数。
*/

let map = new Map()

map.set('1', 'str1') // 字符串键
map.set(1, 'num1') // 数字键
map.set(true, 'bool1') // 布尔值键

console.log(map.get(1))
console.log(map.get('1'))
console.log(map.size)

// 每一次 map.set 调用都会返回 map 本身，所以我们可以进行“链式”调用：

map.set('2', 'str1').set(2, 'num1').set(false, 'bool1')
map.forEach((item) => {
  console.log(item)
})

// map迭代
// 如果要在 map 里使用循环，可以使用以下三个方法：
/* 
map.keys() —— 遍历并返回一个包含所有键的可迭代对象，
map.values() —— 遍历并返回一个包含所有值的可迭代对象，
map.entries() —— 遍历并返回一个包含所有实体 [key, value] 的可迭代对象，for..of 在默认情况下使用的就是这个。
*/

let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion', 50],
])

// 遍历所有的键（vegetables）
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable)
}

// 遍历所有的值（amounts）
for (let amount of recipeMap.values()) {
  console.log(amount)
}

// 遍历所有的实体 [key, value]
for (let entry of recipeMap) {
  // 与 recipeMap.entries() 相同
  console.log(entry)
}

// Object.entries：从对象创建 map

let obj = {
  name: 'John',
  age: 30,
}
map = new Map(Object.entries(obj))
console.log(map)

// Object.fromEntries：从 Map 创建对象

let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4],
])
console.log(prices)

// 或者
map = new Map()
map.set('banana', 1)
map.set('orange', 2)
map.set('meat', 4)

obj = Object.fromEntries(map.entries()) // 创建一个普通对象（plain object）(*)
console.log(obj)

// 调用 map.entries() 将返回一个可迭代的键/值对，这刚好是 Object.fromEntries 所需要的格式。
// 我们可以把带 (*) 这一行写得更短：

obj = Object.fromEntries(map)
console.log(obj)

// Set

// Set 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。
/* 
new Set(iterable) —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
set.add(value) —— 添加一个值，返回 set 本身
set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
set.clear() —— 清空 set。
set.size —— 返回元素个数。
*/

let set = new Set()

let john = { name: 'John' }
let pete = { name: 'Pete' }
let mary = { name: 'Mary' }

// visits，一些访客来访好几次
set.add(john)
set.add(pete)
set.add(mary)
set.add(john)
set.add(mary)

// set 只保留不重复的值
console.log(set.size)

for (let user of set) {
  console.log(user.name)
}

// 总结
/*
Map —— 是一个带键的数据项的集合。

方法和属性如下：

- new Map([iterable]) —— 创建 map，可选择带有 [key,value] 对的 iterable（例如数组）来进行初始化。
- map.set(key, value) —— 根据键存储值，返回 map 自身。
- map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
- map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
- map.delete(key) —— 删除指定键对应的值，如果在调用时 key 存在，则返回 true，否则返回 false。
- map.clear() —— 清空 map 。
- map.size —— 返回当前元素个数。

与普通对象 Object 的不同点：

- 任何键、对象都可以作为键。
- 有其他的便捷方法，如 size 属性。
- Set —— 是一组唯一值的集合。

方法和属性：

- new Set([iterable]) —— 创建 set，可选择带有 iterable（例如数组）来进行初始化。
- set.add(value) —— 添加一个值（如果 value 存在则不做任何修改），返回 set 本身。
- set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
- set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
- set.clear() —— 清空 set。
- set.size —— 元素的个数。

在 Map 和 Set 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。
*/

// 任务

/* 
过滤数组中的唯一元素
重要程度: 5
定义 arr 为一个数组。

创建一个函数 unique(arr)，该函数返回一个由 arr 中所有唯一元素所组成的数组。

例如：

function unique(arr) {
  // ...
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
P.S. 这里用到了 string 类型，但其实可以是任何类型的值。

P.S. 使用 Set 来存储唯一值。
*/

function unique(arr) {
  return Array.from(new Set(arr))
}

/* 
过滤字谜（anagrams）
重要程度: 4
Anagrams 是具有相同数量相同字母但是顺序不同的单词。

例如：

nap - pan
ear - are - era
cheaters - hectares - teachers
写一个函数 aclean(arr)，它返回被清除了字谜（anagrams）的数组。

例如：

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
对于所有的字谜（anagram）组，都应该保留其中一个词，但保留的具体是哪一个并不重要。
*/
function aclean(arr) {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const sortedItem = arr[i].toLowerCase().split('').sort().join('')
    map.set(sortedItem, arr[i])
  }
  return Array.from(map.values())
}
let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares']
console.log(aclean(arr))

/* 
迭代键
重要程度: 5
我们期望使用 map.keys() 得到一个数组，然后使用例如 .push 等特定的方法对其进行处理。

但是运行不了：

let map = new Map();

map.set("name", "John");

let keys = map.keys();

// Error: keys.push is not a function
keys.push("more");
为什么？我们应该如何修改代码让 keys.push 工作？
*/

// 这是因为 map.keys() 返回的是可迭代对象而非数组。
// 我们可以使用方法 Array.from 来将它转换为数组：

let kmap = new Map()
kmap.set('name', 'John')
let keys = Array.from(kmap.keys())
keys.push('more')
console.log(keys)
