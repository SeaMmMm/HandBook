// Iterable object

// 数组是可迭代的。但不仅仅是数组。很多其他内建对象也都是可迭代的。例如字符串也是可迭代的。
// 如果从技术上讲，对象不是数组，而是表示某物的集合（列表，集合），for..of 是一个能够遍历它的很好的语法，因此，让我们来看看如何使其发挥作用。

// JS 中的迭代器是专门为了遍历这一操作设计的每次获取到的迭代器总是初始指向第一个元素，并且迭代器只有next()一种行为，直到获取到数据集的最后一个元素。我们无法灵活移动迭代器的位置，所以，迭代器的任务，是按某种次序遍历数据集中的元素。

// JS规定，迭代器必须实现next()接口，它应该返回当前元素并将迭代器指向下一个元素，返回的对象格式为{value:元素值, done:是否遍历结束}，其中，done是一个布尔值。done属性为true的时候，我们默认不会去读取value, 所以最后返回的经常是{value: undifined, done: true}，注意，返回类似{value: 2, done: true} 不会导致错误，但是因为done设置为true，在for...of等操作中都会忽略value的值。因此，done:false和value:undifined可以省略

// 一个简单的迭代器：
let iter = {
  i: 0,
  next() {
    if (this.i > 10) return { done: true }
    return { value: this.i++ }
  },
}
while (true) {
  let item = iter.next()
  if (!item.done) {
    console.log(item.value)
  } else {
    break
  }
}

// 可以看到，迭代器与普通的JS对象没有区别，它就是一个用于实现迭代的对象。手动操作迭代器并没有什么实用性，迭代器的作用是附着在对象上，让一个对象，或者数据结构成为可迭代对象。

//  迭代器接口与可迭代对象

/*
迭代器接口是我们获取对象迭代器时默认调用的接口，一个实现了迭代接口的对象即是可迭代对象。JS的默认迭代接口是[Symbol.iterator], 一个对象实现了[Symbol.iterator]接口就成为了可迭代对象。

[Symbol.iterator]是一个特殊的Symbol属性，它用于JS内部检测一个对象是否为可迭代对象。接口一词的含义代表它是一个函数，其结果应该放回一个迭代器。结合上面迭代器必须要有next()操作，所以，对可迭代对象，调用链iterableObj[Symbol.iterator]().next()应该是可行的。数组是最具代表性的可迭代对象，让我们拿数组测试一下：
*/

let arr = [1, '2', { a: 3 }]
let arrIt = arr[Symbol.iterator]()
console.log(arrIt.next())
console.log(arrIt.next())
console.log(arrIt.next())
console.log(arrIt.next())

// 自定义可迭代对象
/* 
- 实现对象的迭代器接口[Symbol.iterator]()，注意它是一个方法，
- 在迭代器接口中返回一个迭代器对象，
- 确保迭代器对象具有next()接口，并且返回{value: v, done: bool}的结构。
*/

// 1. 可迭代的Range对象
function Range(from, to) {
  this.from = from
  this.to = to
}
Range.prototype[Symbol.iterator] = function () {
  return {
    cur: this.from,
    to: this.to,
    next() {
      return this.cur < this.to
        ? { value: this.cur++, done: false }
        : { done: true }
    },
  }
}

let range = new Range(5, 11)
for (const num of range) {
  console.log(num)
}
let arrFromRange = Array.from(range)
console.log(arrFromRange)

/* 
Array.from 是 JavaScript 中的一个静态方法，用于从类数组对象或可迭代对象创建一个新的数组实例。

类数组对象是指拥有一个 length 属性和若干索引属性的任意对象。可迭代对象是可以获取迭代器的对象，例如 Map、Set 等。

这个方法的基本用法如下：

Array.from(obj, mapFn, thisArg)

参数说明：

obj：要转换成数组的可迭代或类数组对象。
mapFn（可选）：如果指定了该参数，新数组中的每个元素会执行该回调函数。
thisArg（可选）：执行回调函数 mapFn 时 this 对象。
*/
// 比如：
let set = new Set(['foo', 'bar', 'baz', 'foo'])
let array = Array.from(set)
console.log(array)

// 2. 使用Generator函数作为迭代器接口
// 因为Generator函数产生的generator对象是一种特殊的迭代器，所以我们可以很方法地使用Generator函数作为对象的迭代器接口。使用Generator函数改写上面的迭代器接口：

Range.prototype[Symbol.iterator] = function* () {
  for (let i = this.from; i < this.to; i++) {
    yield i
  }
}
// 这种写法更加简洁易懂，是最为推荐的写法，Generator函数中产生的值就是遍历过程中得到的值。

/* 插曲
在 JavaScript 中，function* 定义了一个生成器函数（generator function）。这个 * 就是用来标识这是一个生成器函数的。

生成器函数是一种特殊的函数，它可以在执行过程中被暂停和恢复。生成器函数在执行时返回一个生成器对象（具有 next 方法的对象），每次调用这个对象的 next 方法都会继续执行函数，直到遇到 yield 表达式。

yield 表达式用于暂停和恢复一个生成器函数（function* 或其内部的一个函数）。

例如：

function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
在这个例子中，idGenerator 是一个生成器函数，每次调用 gen.next() 时，它都会执行到下一个 yield 表达式，然后暂停，等待下一次调用 next 方法。
*/

// 3. 可迭代的List
function ListNode(value) {
  this.value = value
  this.nextNode = null
}

function List(root) {
  this.cur = this.root = root
}

//List的next接口
List.prototype.next = function () {
  if (this.cur) {
    //非尾哨兵节点
    let curNode = {
      value: this.cur.value,
    }
    this.cur = this.cur.nextNode
    return curNode
  } else {
    return {
      done: true,
    }
  }
}
// List.next()实现了将链表指针后移的操纵，并且返回了移动前节点的值，你可能注意到，我特意让返回的对象格式与迭代器返回结果一致，下面你将看到这么做的原因。现在我们让List变成可迭代，按照之前的做法，使得List[Symbol.iterator]().next()能够返回正确的{value: v, done: true}格式。是的，我们已经画好龙了，就差一个点睛之笔：

List.prototype[Symbol.iterator] = function () {
  return this
}

let a = new ListNode('a'),
  b = new ListNode('b'),
  c = new ListNode('c')
a.nextNode = b
b.nextNode = c
let list = new List(a)
for (let i of list) {
  console.log(i)
}

// 4. 可迭代的迭代器
// 上面的List例子会让人觉得有点牵强，list.next()的返回值为了迎合迭代器的要求，让平时不得不使用let curValue = list.next().value来正确接收返回的节点值，确实。但是，这种做法在一种时候让人觉得眼前一亮——让迭代器称为可迭代对象，因为自己就是可迭代器，让自己成为自己的迭代器，就像1=1一样正确自然。

// 回到开头埋下的雷，我们只需要稍加改动

iter = {
  i: 0,
  next() {
    if (this.i > 10) return { done: true }
    return { value: this.i++ }
  },
  //让迭代器的迭代器接口返回自身
  [Symbol.iterator]() {
    return this
  },
}
//这样，你就可以把迭代器用在任何可迭代对象的地方
for (let i of iter) {
  console.log(i)
}
// 这样，这个迭代器本身也是可迭代的。需要注意的是，内置可迭代类型的迭代器也都是可迭代的，类似for(let i of arr[Symbol.iterator]())的操作是可行，其原理是让Array的迭代器继承Array.prototype。其它类型也有类似的继承，如Generator与generator对象。

// 意义
// 可迭代对象作为数组的扩充，具有非凡的意义。在以前，对一个需要操作一组数据的接口，只有数组这种结构能支持，非数组对象必须通过某种方式转化为数组，完成之后，还可能需要还原成原来的结构，这种繁琐的来回切换很不理想。有了可迭代对象的概念，这类操作可以接受一个可迭代对象，数组是可迭代对象，所以之前的数组参数是仍然可行的，在此之上，任何实现了可迭代接口的对象，也能正常处理。考虑这个下面例子：

function sumInArray(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}
function sumInIterable(iterable) {
  let sum = 0
  for (let num of iterable) {
    sum += num
  }
  return sum
}

// sumInArray()只对数组友好，而sumInIterable()是所有可迭代对象通用的，例如我们前面的Range对象，iter对象。是的，数组到可迭代对象的提升，代表了接口的通用性的提升。这个道理太浅显易懂，以至于你可能觉得我说废话，那么，请问你在接口设计的时候，会考虑能否使用可迭代对象代替数组吗？个人认为这种提升很多时候是有益的，特别在一些应用场景较多的接口，我发现很多ES6操作也是基于可迭代对象。如果有什么看法，也欢迎评论区探讨。

// 使用可迭代对象

/* 
先认识JS内建的可迭代对象：

1. 非 weak 的数据结构,包括 Array,Set, Map。
2.DOM中的NodeList对象。
3. String对象。
4. 函数的arguments属性。

再了解哪些操作是基于可迭代对象的：

1. for...of语法
2. ...iterable：展开语法和解构赋值
3. yield*语法
4. Map, Set, WeakMap,WeakSet的构造器。为什么没有Array？因为Array直接把它对象当成元素了，但是有Array.from(iterable)。
5. Object.fromEntries(iterable) ，每次迭代结果应该是一个对应键值对的二元数组，与Map的迭代结果吻合，常有let obj = Object.fromEntries(map) 实现从 map 到 object 的转化。
6. promise.all(iterable) 和 promist.race(iterable).
*/
