// JSON.stringify 将对象转换为 JSON。
// JSON.parse 将 JSON 转换回对象。

let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null,
}

let json = JSON.stringify(student)
console.log(typeof json)
console.log(json)

/* 
JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。

即：

函数属性（方法）。
Symbol 类型的键和值。
存储 undefined 的属性。
*/

let user = {
  sayHi() {
    // 被忽略
    console.log('Hello')
  },
  [Symbol('id')]: 123, // 被忽略
  something: undefined, // 被忽略
}
console.log(JSON.stringify(user))

// 最棒的是支持嵌套对象转换，并且可以自动对其进行转换。

// 重要的限制：不得有循环引用。

let room = {
  number: 23,
}

let meetup = {
  title: 'Conference',
  participants: ['john', 'ann'],
}
meetup.place = room
room.occupiedBy = meetup
// JSON.stringify(meetup) // ERROR

// 排除和转换：replacer

// JSON.stringify 的完整语法是：
/* 
let json = JSON.stringify(value[, replacer, space])

value
要编码的值。

replacer
要编码的属性数组或映射函数 function(key, value)。

space
用于格式化的空格数量
*/
// 大部分情况，JSON.stringify 仅与第一个参数一起使用。但是，如果我们需要微调替换过程，比如过滤掉循环引用，我们可以使用 JSON.stringify 的第二个参数。

room = {
  number: 23,
}
meetup = {
  title: 'Conference',
  participants: [{ name: 'John' }, { name: 'Alice' }],
  place: room, // meetup 引用了 room
}
room.occupiedBy = meetup // room 引用了 meetup

console.log(JSON.stringify(meetup, ['title', 'participants']))

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key} : ${value}`)
    return key === 'occupiedBy' ? undefined : value
  })
)
/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/

/* 
请注意 replacer 函数会获取每个键/值对，包括嵌套对象和数组项。它被递归地应用。replacer 中的 this 的值是包含当前属性的对象。

第一个调用很特别。它是使用特殊的“包装对象”制作的：{"": meetup}。换句话说，第一个 (key, value) 对的键是空的，并且该值是整个目标对象。这就是上面的示例中第一行是 ":[object Object]" 的原因。

这个理念是为了给 replacer 提供尽可能多的功能：如果有必要，它有机会分析并替换/跳过整个对象。
*/

// 格式化：space
/* 
JSON.stringify(value, replacer, spaces) 的第三个参数是用于优化格式的空格数量。

以前，所有字符串化的对象都没有缩进和额外的空格。如果我们想通过网络发送一个对象，那就没什么问题。space 参数专门用于调整出更美观的输出。

这里的 space = 2 告诉 JavaScript 在多行中显示嵌套的对象，对象内部缩进 2 个空格：
*/

user = {
  name: 'John',
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
}

console.log(JSON.stringify(user, null, 2))
// 第三个参数也可以是字符串。在这种情况下，字符串用于缩进，而不是空格的数量。
// spaces 参数仅用于日志记录和美化输出。

// 自定义 toJson
// 像 toString 进行字符串转换，对象也可以提供 toJSON 方法来进行 JSON 转换。如果可用，JSON.stringify 会自动调用它。

room = {
  number: 23,
}

meetup = {
  title: 'Conference',
  date: new Date(Date.UTC(2017, 0, 1)),
  room,
}
console.log(JSON.stringify(meetup))

// 添加自定义的 toJSON:
room = {
  number: 23,
  toJSON() {
    return this.number
  },
}

console.log(JSON.stringify(room))

// JSON.parse
/* 
要解码 JSON 字符串，我们需要另一个方法 JSON.parse。

语法：

let value = JSON.parse(str, [reviver]);

str
要解析的 JSON 字符串。

reviver
可选的函数 function(key,value)，该函数将为每个 (key, value) 对调用，并可以对值进行转换。
*/

let number = '[0,1,2,3,4]'
let numbers = JSON.parse(number)
console.log(numbers)

// 使用 reviver
// 想象一下，我们从服务器上获得了一个字符串化的 meetup 对象。
// 它看起来像这样：

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

// ……现在我们需要对它进行 反序列（deserialize），把它转换回 JavaScript 对象。
// 让我们通过调用 JSON.parse 来完成：
meetup = JSON.parse(str)
// console.log(meetup.date.getDate()) // 报错

// meetup.date 的值是一个字符串，而不是 Date 对象。JSON.parse 怎么知道应该将字符串转换为 Date 呢？

// 让我们将 reviver 函数传递给 JSON.parse 作为第二个参数，该函数按照“原样”返回所有值，但是 date 会变成 Date：
meetup = JSON.parse(str, function (key, value) {
  if (key == 'date') return new Date(value)
  return value
})
console.log(meetup.date.getDate())

// 顺便说一下，这也适用于嵌套对象：
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`

schedule = JSON.parse(schedule, function (key, value) {
  if (key == 'date') return new Date(value)
  return value
})
console.log(schedule.meetups[1].date.getDate())

// 总结
/* 
- JSON 是一种数据格式，具有自己的独立标准和大多数编程语言的库。
- JSON 支持 object，array，string，number，boolean 和 null。
- JavaScript 提供序列化（serialize）成 JSON 的方法 JSON.stringify 和解析 JSON 的方法 JSON.parse。
- 这两种方法都支持用于智能读/写的转换函数。
- 如果一个对象具有 toJSON，那么它会被 JSON.stringify 调用。
*/

// 任务

/* 
将对象转换为 JSON，然后再转换回来
重要程度: 5
将 user 转换为 JSON，然后将其转换回到另一个变量。

let user = {
  name: "John Smith",
  age: 35
};
*/

json = JSON.stringify(user)
console.log(json)
console.log(JSON.parse(json))

/* 
排除反向引用
重要程度: 5
在简单循环引用的情况下，我们可以通过名称排除序列化中违规的属性。

但是，有时我们不能只使用名称，因为它既可能在循环引用中也可能在常规属性中使用。因此，我们可以通过属性值来检查属性。

编写 replacer 函数，移除引用 meetup 的属性，并将其他所有属性序列化：

let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// 循环引用
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {

}));

// 结果应该是：
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

room = {
  number: 23,
}

meetup = {
  title: 'Conference',
  occupiedBy: [{ name: 'John' }, { name: 'Alice' }],
  place: room,
}

room.occupiedBy = meetup
meetup.self = meetup

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    return key != '' && value == meetup ? undefined : value
  })
)
// 这里我们还需要判断 key=="" 以排除第一个调用时 value 是 meetup 的情况。
