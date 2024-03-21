// 常规函数只会返回一个单一值（或者不返回任何值）。
// 而 generator 可以按需一个接一个地返回（“yield”）多个值。它们可与 iterable 完美配合使用，从而可以轻松地创建数据流。

// generator 函数
/* 
要创建一个 generator，我们需要一个特殊的语法结构：function*，即所谓的 “generator function”。

它看起来像这样：

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
generator 函数与常规函数的行为不同。在此类函数被调用时，它不会运行其代码。而是返回一个被称为 “generator object” 的特殊对象，来管理执行流程。

我们来看一个例子：
*/
function* generateSequence() {
  yield 1
  yield 2
  return 3
}

// "generator function" 创建了一个 "generator object"
let generator = generateSequence()
console.log(generator)

/*
一个 generator 的主要方法就是 next()。当被调用时（译注：指 next() 方法），它会恢复上图所示的运行，执行直到最近的 yield <value> 语句（value 可以被省略，默认为 undefined）。然后函数执行暂停，并将产出的（yielded）值返回到外部代码。

next() 的结果始终是一个具有两个属性的对象：

value: 产出的（yielded）的值。
done: 如果 generator 函数已执行完成则为 true，否则为 false。

*/

let one = generator.next()
console.log(one)

let two = generator.next()
console.log(two)

let three = generator.next()
console.log(three)

/* 
现在 generator 执行完成。我们通过 done:true 可以看出来这一点，并且将 value:3 处理为最终结果。

再对 generator.next() 进行新的调用不再有任何意义。如果我们这样做，它将返回相同的对象：{done: true}。
*/

// generator 是可迭代的
// 我们可以使用 for..of 循环遍历它所有的值：
const generator2 = generateSequence()
for (const value of generator2) {
  console.log(value)
}

/* 
……但是请注意：上面这个例子会先显示 1，然后是 2，然后就没了。它不会显示 3！

这是因为当 done: true 时，for..of 循环会忽略最后一个 value。因此，如果我们想要通过 for..of 循环显示所有的结果，我们必须使用 yield 返回它们
*/

const sequence = [0, ...generateSequence()]
console.log(sequence)

// 使用 generator 进行迭代
/* 
在前面的 Iterable object（可迭代对象） 一章中，我们创建了一个可迭代的 range 对象，它返回 from..to 的值。

现在，我们回忆一下代码：
*/
let range = {
  from: 1,
  to: 5,

  // for..of range 在一开始就调用一次这个方法
  [Symbol.iterator]() {
    // ...它返回 iterator object：
    // 后续的操作中，for..of 将只针对这个对象，并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for..of 循环在每次迭代时都会调用 next()
      next() {
        // 它应该以对象 {done:.., value :...} 的形式返回值
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        } else {
          return { done: true }
        }
      },
    }
  },
}
console.log(...range)

// 我们可以通过提供一个 generator 函数作为 Symbol.iterator，来使用 generator 进行迭代：
range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value
    }
  },
}
console.log(...range)

// generator 组合
/* 
generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。

例如，我们有一个生成数字序列的函数：
*/
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i
}

/* 
现在，我们想重用它来生成一个更复杂的序列：

首先是数字 0..9（字符代码为 48…57），
接下来是大写字母 A..Z（字符代码为 65…90）
接下来是小写字母 a...z（字符代码为 97…122）

*/
function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57)

  // A..Z
  yield* generateSequence(65, 90)

  // a..z
  yield* generateSequence(97, 122)
}

let str = ''

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code)
}
console.log(str)

// “yield” 是一条双向路
/* 
目前看来，generator 和可迭代对象类似，都具有用来生成值的特殊语法。但实际上，generator 更加强大且灵活。

这是因为 yield 是一条双向路（two-way street）：它不仅可以向外返回结果，而且还可以将外部的值传递到 generator 内。

调用 generator.next(arg)，我们就能将参数 arg 传递到 generator 内部。这个 arg 参数会变成 yield 的结果。
*/
function* gen() {
  let result = yield '2 + 2 = ?' // (*)

  console.log(result)
}

generator = gen()
let question = generator.next().value
generator.next(4)

/* 
1. 第一次调用 generator.next() 应该是不带参数的（如果带参数，那么该参数会被忽略）。它开始执行并返回第一个 yield "2 + 2 = ?" 的结果。此时，generator 执行暂停，而停留在 (*) 行上。

2. 然后，正如上面图片中显示的那样，yield 的结果进入调用代码中的 question 变量。

3. 在 generator.next(4)，generator 恢复执行，并获得了 4 作为结果：let result = 4。
*/

function* gen2() {
  let ask1 = yield '2 + 2 = ?'
  console.log(ask1)

  let ask2 = yield '3 * 3 = ?'
  console.log(ask2)
}

generator = gen2()
console.log(generator.next().value)
console.log(generator.next(4).value)
console.log(generator.next(9))

// generator.throw
{
  function* gen() {
    try {
      let result = yield '2 + 2 = ?' // (1)

      console.log(
        'The execution does not reach here, because the exception is thrown above'
      )
    } catch (e) {
      console.log(e) // 显示这个 error
    }
  }

  let generator = gen()
  let question = generator.next().value
  console.log(question)
  generator.throw(new Error('The answer is not found in my database')) // (2)
}

// generator.return
// generator.return(value) 完成 generator 的执行并返回给定的 value。
{
  function* gen() {
    yield 1
    yield 2
    yield 3
  }

  const g = gen()

  g.next() // { value: 1, done: false }
  g.return('foo') // { value: "foo", done: true }
  g.next() // { value: undefined, done: true }
}

// 总结
/* 
- generator 是通过 generator 函数 function* f(…) {…} 创建的。
- 在 generator（仅在）内部，存在 yield 操作。
- 外部代码和 generator 可能会通过 next/yield 调用交换结果。

在现代 JavaScript 中，generator 很少被使用。但有时它们会派上用场，因为函数在执行过程中与调用代码交换数据的能力是非常独特的。而且，当然，它们非常适合创建可迭代对象。

并且，在下一章我们将会学习 async generator，它们被用于在 for await ... of 循环中读取异步生成的数据流（例如，通过网络分页提取 (paginated fetches over a network)）。

在 Web 编程中，我们经常使用数据流，因此这是另一个非常重要的使用场景。
*/

// 任务
/* 
伪随机 generator
在很多地方我们都需要随机数据。

其中之一就是测试。我们可能需要随机数据：文本，数字等，以便很好地进行测试。

在 JavaScript 中，我们可以使用 Math.random()。但是如果什么地方出现了问题，我们希望能使用完全相同的数据进行重复测试。

为此，我们可以使用所谓的“种子伪随机（seeded pseudo-random）generator”。它们将“种子（seed）”作为第一个值，然后使用公式生成下一个值。以便相同的种子（seed）可以产出（yield）相同的序列，因此整个数据流很容易复现。我们只需要记住种子并重复它即可。

这样的公式的一个示例如下，它可以生成一些均匀分布的值：

next = previous * 16807 % 2147483647
如果我们使用 1 作为种子，生成的值将会是：

16807
282475249
1622650073
……等……
这里的任务是创建一个 generator 函数 pseudoRandom(seed)，它将 seed 作为参数并使用此公式创建 generator。

使用范例：

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
*/

function* pseudoRandom(val) {
  let value = val

  while (true) {
    value = (value * 16807) % 2147483647
    yield value
  }
}

generator = pseudoRandom(1)
console.log(generator.next().value)
console.log(generator.next().value)
