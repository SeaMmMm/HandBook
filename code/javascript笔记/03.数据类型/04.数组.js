// 数组可以存储任何类型的元素。
let arr = [
  'Apple',
  { name: 'John' },
  true,
  function (x) {
    console.log(`you put ${x}`)
  },
]
console.log(arr[1].name)
arr[3](2)

// 使用 “at” 获取最后一个元素
let fruits = ['Apple', 'Orange', 'Plum']
console.log(fruits.at(-1))
/* 
换句话说，arr.at(i)：

如果 i >= 0，则与 arr[i] 完全相同。
对于 i 为负数的情况，它则从数组的尾部向前数。
*/

// pop/push, shift/unshift 方法

// pop
console.log(fruits.pop())
console.log(fruits)

// push
console.log(fruits.push('Pear'))
console.log(fruits)

// shift
console.log(fruits.shift())
console.log(fruits)

// unshift
console.log(fruits.unshift('Apple'))
console.log(fruits)

// push 和 unshift 方法都可以一次添加多个元素：
fruits = ['Apple']
fruits.push('Orange', 'Peach')
fruits.unshift('Pineapple', 'Lemon')
console.log(fruits)

// 内部
