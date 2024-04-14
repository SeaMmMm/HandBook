// || (或)

// 参与运算中的任意一方为true，则结果为true
// 如果操作数不是布尔类型，会将其转换为布尔类型再运算
console.log(1 || 0) // 1
console.log(true || 'hello') // true
console.log(false || 'hello') // hello
console.log('hello' || 'world') // hello
console.log('' || 'world') // world
console.log('' || 0) // 0
console.log('' || null) // null
console.log('' || undefined) // undefined
console.log('' || NaN) // NaN
console.log('' || false) // false
console.log('' || '') // ''

/*
或运算符 || 做了如下的事情：

1. 从左到右依次计算操作数。
2. 处理每一个操作数时，都将其转化为布尔值。如果结果是 true，就停止计算，返回这个操作数的初始值。
3. 如果所有的操作数都被计算过（也就是，转换结果都是 false），则返回最后一个操作数。
  
返回的值是操作数的初始形式，不会做布尔转换。只会在计算的过程中做布尔转换。
*/

// && (与)

// 参与运算的任意一个操作数为false，则结果为false
// 与运算寻找第一个假值
console.log('----------------')
console.log(1 && 0) // 0
console.log(true && 'hello') // hello
console.log(false && 'hello') // false
console.log('hello' && 'world') // world
console.log('' && 'world') // ''

/*
与运算 && 做了如下的事：

1. 从左到右依次计算操作数。
2. 在处理每一个操作数时，都将其转化为布尔值。如果结果是 false，就停止计算，并返回这个操作数的初始值。
3. 如果所有的操作数都被计算过（例如都是真值），则返回最后一个操作数。
*/

// 与运算 && 的优先级比 || 高
console.log(null || (2 && 3) || 4) // 3 (那个括号加不加都一样)
