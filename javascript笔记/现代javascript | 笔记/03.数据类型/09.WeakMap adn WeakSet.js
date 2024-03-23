// WeakMap

// WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值

let weakMap = new WeakMap()
let obj = {}
weakMap.set(obj, 'ok')
// weakMap.set('test', 'Whoops') // Error，因为 "test" 不是一个对象

// 现在，如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。

let john = { name: 'John' }
weakMap.set(john, '...')
john = null // 覆盖引用

// john 被从内存中删除了！

/* 
与上面常规的 Map 的例子相比，现在如果 john 仅仅是作为 WeakMap 的键而存在 —— 它将会被从 map（和内存）中自动删除。

WeakMap 不支持迭代以及 keys()，values() 和 entries() 方法。所以没有办法获取 WeakMap 的所有键或值。

WeakMap 只有以下的方法：

weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)

为什么会有这种限制呢？这是技术的原因。如果一个对象丢失了其它所有引用（就像上面示例中的 john），那么它就会被垃圾回收机制自动回收。但是在从技术的角度并不能准确知道 何时会被回收。

这些都是由 JavaScript 引擎决定的。JavaScript 引擎可能会选择立即执行内存清理，如果现在正在发生很多删除操作，那么 JavaScript 引擎可能就会选择等一等，稍后再进行内存清理。因此，从技术上讲，WeakMap 的当前元素的数量是未知的。JavaScript 引擎可能清理了其中的垃圾，可能没清理，也可能清理了一部分。因此，暂不支持访问 WeakMap 的所有键/值的方法。
*/

// 使用案例：额外的数据

/* 
WeakMap 的主要应用场景是 额外数据的存储。

假如我们正在处理一个“属于”另一个代码的一个对象，也可能是第三方库，并想存储一些与之相关的数据，那么这些数据就应该与这个对象共存亡 —— 这时候 WeakMap 正是我们所需要的利器。

我们将这些数据放到 WeakMap 中，并使用该对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除。

weakMap.set(john, "secret documents");
// 如果 john 消失，secret documents 将会被自动清除
*/

// 例如，我们有用于处理用户访问计数的代码。收集到的信息被存储在 map 中：一个用户对象作为键，其访问次数为值。当一个用户离开时（该用户对象将被垃圾回收机制回收），这时我们就不再需要他的访问次数了。

let visitsCountMap = new WeakMap()

function countUser(user) {
  let count = visitsCountMap.get(user) || 0
  visitsCountMap.set(user, count + 1)
}

// 现在我们不需要去清理 visitsCountMap 了。当 john 对象变成不可达时，即便它是 WeakMap 里的一个键，它也会连同它作为 WeakMap 里的键所对应的信息一同被从内存中删除。

// 使用案例：缓存

// 另外一个常见的例子是缓存。我们可以存储（“缓存”）函数的结果，以便将来对同一个对象的调用可以重用这个结果。

let cache = new WeakMap()

function process(obj) {
  if (!cache.has(obj)) {
    let result = obj

    cache.set(obj, result)
  }

  return cache.get(obj)
}

obj = {}

let result1 = process(obj)
let result2 = process(obj)

obj = null
// 当 obj 被垃圾回收，缓存的数据也会被清除

// WeakSet

/* 
WeakSet 的表现类似：

- 与 Set 类似，但是我们只能向 WeakSet 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 WeakSet 中。
- 跟 Set 一样，WeakSet 支持 add，has 和 delete 方法，但不支持 size 和 keys()，并且不可迭代。

变“弱（weak）”的同时，它也可以作为额外的存储空间。但并非针对任意数据，而是针对“是/否”的事实。WeakSet 的元素可能代表着有关该对象的某些信息。
*/

let visitedSet = new WeakSet()

john = { name: 'John' }
let pete = { name: 'Pete' }
let mary = { name: 'Mary' }

visitedSet.add(john) // John 访问了我们
visitedSet.add(pete) // 然后是 Pete
visitedSet.add(john) // John 再次访问

// visitedSet 现在有两个用户了

// 检查 John 是否来访过？
console.log(visitedSet.has(john)) // true

// 检查 Mary 是否来访过？
console.log(visitedSet.has(mary)) // false

john = null

// visitedSet 将被自动清理(即自动清除其中已失效的值 john)

// 总结

/* 
WeakMap 是类似于 Map 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除。

WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象删除。

它们的主要优点是它们对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。

这是以不支持 clear、size、keys、values 等作为代价换来的……

WeakMap 和 WeakSet 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 WeakMap 或 WeakSet 的键，那么该对象将被自动清除。
*/

// 任务

/* 
存储 "unread" 标识
重要程度: 5
这里有一个 messages 数组：

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
你的代码可以访问它，但是 message 是由其他人的代码管理的。该代码会定期添加新消息，删除旧消息，但是你不知道这些操作确切的发生时间。

现在，你应该使用什么数据结构来保存关于消息“是否已读”的信息？该结构必须很适合对给定的 message 对象给出“它读了吗？”的答案。

P.S. 当一个消息被从 messages 中删除后，它应该也从你的数据结构中消失。

P.S. 我们不能修改 message 对象，例如向其添加我们的属性。因为它们是由其他人的代码管理的，我们修改该数据可能会导致不好的后果。
*/

let messages = [
  { text: 'Hello', from: 'John' },
  { text: 'How goes?', from: 'John' },
  { text: 'See you soon', from: 'Alice' },
]

let readMessages = new WeakSet()

// 两个消息已读
readMessages.add(messages[0])
readMessages.add(messages[1])
// readMessages 包含两个元素

// ……让我们再读一遍第一条消息！
readMessages.add(messages[0])
// readMessages 仍然有两个不重复的元素

// 回答：message[0] 已读？
console.log('Read message 0: ' + readMessages.has(messages[0])) // true

messages.shift()
// 现在 readMessages 有一个元素（技术上来讲，内存可能稍后才会被清理）
/* 
WeakSet 允许存储一系列的消息，并且很容易就能检查它是否包含某个消息。

它会自动清理自身。代价是，我们不能对它进行迭代，也不能直接从中获取“所有已读消息”。但是，我们可以通过遍历所有消息，然后找出存在于 set 的那些消息来完成这个功能。

另一种不同的解决方案可以是，在读取消息后向消息添加诸如 message.isRead=true 之类的属性。由于 messages 对象是由另一个代码管理的，因此通常不建议这样做，但是我们可以使用 symbol 属性来避免冲突。

像这样：

// symbol 属性仅对于我们的代码是已知的
let isRead = Symbol("isRead");
messages[0][isRead] = true;
现在，第三方代码可能看不到我们的额外属性。

尽管 symbol 可以降低出现问题的可能性，但从架构的角度来看，还是使用 WeakSet 更好。
*/

/* 
保存阅读日期
重要程度: 5
这儿有一个和 上一个任务 类似的 messages 数组。场景也相似。

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
现在的问题是：你建议采用什么数据结构来保存信息：“消息是什么时候被阅读的？”。

在前一个任务中我们只需要保存“是/否”。现在我们需要保存日期，并且它应该在消息被垃圾回收时也被从内存中清除。

P.S. 日期可以存储为内建的 Date 类的对象，稍后我们将进行介绍。
*/

messages = [
  { text: 'Hello', from: 'John' },
  { text: 'How goes?', from: 'John' },
  { text: 'See you soon', from: 'Alice' },
]

let readMap = new WeakMap()

readMap.set(messages[0], new Date(2017, 1, 1))
// 我们稍后将学习 Date 对象
