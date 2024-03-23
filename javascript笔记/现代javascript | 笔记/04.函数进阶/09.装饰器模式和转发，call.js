// 透明缓存
/* 
假设我们有一个 CPU 重负载的函数 slow(x)，但它的结果是稳定的。换句话说，对于相同的 x，它总是返回相同的结果。

如果经常调用该函数，我们可能希望将结果缓存（记住）下来，以避免在重新计算上花费额外的时间。

但是我们不是将这个功能添加到 slow() 中，而是创建一个包装器（wrapper）函数，该函数增加了缓存功能。正如我们将要看到的，这样做有很多好处。
*/

function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  console.log(`Called with ${x}`)
  return x
}

function cachingDecorator(func) {
  let cache = new Map()

  return function (x) {
    if (cache.has(x)) {
      // 如果缓存中有对应的结果
      return cache.get(x) // 从缓存中读取结果
    }

    let result = func(x) // 否则就调用 func

    cache.set(x, result) // 然后将结果缓存（记住）下来
    return result
  }
}

slow = cachingDecorator(slow)

console.log(slow(1)) // slow(1) 被缓存下来了，并返回结果
console.log('Again: ' + slow(1)) // 返回缓存中的 slow(1) 的结果

console.log(slow(2)) // slow(2) 被缓存下来了，并返回结果
console.log('Again: ' + slow(2)) // 返回缓存中的 slow(2) 的结果

/* 
在上面的代码中，cachingDecorator 是一个 装饰器（decorator）：一个特殊的函数，它接受另一个函数并改变它的行为。

其思想是，我们可以为任何函数调用 cachingDecorator，它将返回缓存包装器。这很棒啊，因为我们有很多函数可以使用这样的特性，而我们需要做的就是将 cachingDecorator 应用于它们。

通过将缓存与主函数代码分开，我们还可以使主函数代码变得更简单。

cachingDecorator(func) 的结果是一个“包装器”：function(x) 将 func(x) 的调用“包装”到缓存逻辑中
*/

/* 
从外部代码来看，包装的 slow 函数执行的仍然是与之前相同的操作。它只是在其行为上添加了缓存功能。

总而言之，使用分离的 cachingDecorator 而不是改变 slow 本身的代码有几个好处：

- cachingDecorator 是可重用的。我们可以将它应用于另一个函数。
- 缓存逻辑是独立的，它没有增加 slow 本身的复杂性（如果有的话）。
- 如果需要，我们可以组合多个装饰器（其他装饰器将遵循同样的逻辑）。
*/

// 使用 “func.call” 设定上下文

// 上面提到的缓存装饰器不适用于对象方法。
// 例如，在下面的代码中，worker.slow() 在装饰后停止工作：

let worker = {
  someMethod() {
    return 1
  },

  slow(x) {
    console.log(`Called with ${x}`)
    return x * this.someMethod() // (*)
  },
}

function cachingDecorator(func) {
  let cache = new Map()

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x)
    }
    let result = func(x) // (*)
    cache.set(x, result)
    return result
  }
}

console.log(worker.slow(1)) // 有效

worker.slow = cachingDecorator(worker.slow)

// console.log(worker.slow(2)) // Error

/* 
错误发生在试图访问 this.someMethod 并失败了的 (*) 行中。你能看出来为什么吗？

原因是包装器将原始函数调用为 (**) 行中的 func(x)。并且，当这样调用时，函数将得到 this = undefined。

如果尝试运行下面这段代码，我们会观察到类似的问题：
*/
let func = worker.slow
// func(2) // Error

// 因此，包装器将调用传递给原始方法，但没有上下文 this。因此，发生了错误。
// 让我们来解决这个问题。

// func.call
// 有一个特殊的内建函数方法 func.call(context, …args)，它允许调用一个显式设置 this 的函数。

function sayHi() {
  console.log(this.name)
}

let user = { name: 'John' }
let admin = { name: 'Admin' }

sayHi.call(user)
sayHi.call(admin)

// 在我们的例子中，我们可以在包装器中使用 call 将上下文传递给原始函数：
function cachingDecorator(func) {
  let cache = new Map()
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x)
    }
    let result = func.call(this, x) // 现在 "this" 被正确地传递了
    cache.set(x, result)
    return result
  }
}
worker.slow = cachingDecorator(worker.slow) // 现在对其进行缓存
console.log(worker.slow(2))
console.log(worker.slow(2)) // 工作正常，没有调用原始函数（使用的缓存）

/* 
1. 在经过装饰之后，worker.slow 现在是包装器 function (x) { ... }。
2. 因此，当 worker.slow(2) 执行时，包装器将 2 作为参数，并且 this=worker（它是点符号 . 之前的对象）。
3. 在包装器内部，假设结果尚未缓存，func.call(this, x) 将当前的 this（=worker）和当前的参数（=2）传递给原始方法。
*/

// 传递多个参数

{
  let worker = {
    slow(min, max) {
      console.log(`Called with ${min},${max}`)
      return min + max
    },
  }

  function cachingDecorator(func, hash) {
    let cache = new Map()
    return function () {
      let key = hash(arguments) // (*)

      if (cache.has(key)) {
        return cache.get(key)
      }

      let result = func.call(this, ...arguments) // (**)

      cache.set(key, result)
      return result
    }
  }

  function hash(args) {
    return args[0] + ',' + args[1]
  }

  worker.slow = cachingDecorator(worker.slow, hash)
  console.log(worker.slow(1, 2))
}

/* 
现在这个包装器可以处理任意数量的参数了（尽管哈希函数还需要被进行调整以允许任意数量的参数。一种有趣的处理方法将在下面讲到）。

这里有两个变化：

- 在 (*) 行中它调用 hash 来从 arguments 创建一个单独的键。这里我们使用一个简单的“连接”函数，将参数 (3, 5) 转换为键 "3,5"。更复杂的情况可能需要其他哈希函数。
- 然后 (**) 行使用 func.call(this, ...arguments) 将包装器获得的上下文和所有参数（不仅仅是第一个参数）传递给原始函数。
*/

// func.apply

// 我们可以使用 func.apply(this, arguments) 代替 func.call(this, ...arguments)。
// func.apply(context, args)
{
  function hash() {
    console.log([].join.call(arguments))
  }

  hash(1, 2, 3)
}

// 总结
/* 
装饰器 是一个围绕改变函数行为的包装器。主要工作仍由该函数来完成。

装饰器可以被看作是可以添加到函数的 “features” 或 “aspects”。我们可以添加一个或添加多个。而这一切都无需更改其代码！

为了实现 cachingDecorator，我们研究了以下方法：

- func.call(context, arg1, arg2…) —— 用给定的上下文和参数调用 func。
- func.apply(context, args) —— 调用 func 将 context 作为 this 和类数组的 args 传递给参数列表。
通用的 调用传递（call forwarding） 通常是使用 apply 完成的：

let wrapper = function() {
  return original.apply(this, arguments);
};

我们也可以看到一个 方法借用（method borrowing） 的例子，就是我们从一个对象中获取一个方法，并在另一个对象的上下文中“调用”它。采用数组方法并将它们应用于参数 arguments 是很常见的。另一种方法是使用 Rest 参数对象，该对象是一个真正的数组。 
*/

// 任务

/* 
间谍装饰器
重要程度: 5
创建一个装饰器 spy(func)，它应该返回一个包装器，该包装器将所有对函数的调用保存在其 calls 属性中。

每个调用都保存为一个参数数组。

例如：

function work(a, b) {
  alert( a + b ); // work 是一个任意的函数或方法
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
P.S. 该装饰器有时对于单元测试很有用。它的高级形式是 Sinon.JS 库中的 sinon.spy。
*/

function work(a, b) {
  console.log(a + b)
}

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args)
    return func.apply(this, args)
  }
  wrapper.calls = []
  return wrapper
}
work = spy(work)
work(1, 2)
work(2, 4)

for (const args of work.calls) {
  console.log(args)
}

/* 
延时装饰器
重要程度: 5
创建一个装饰器 delay(f, ms)，该装饰器将 f 的每次调用延时 ms 毫秒。

例如：

function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // 在 1000ms 后显示 "test"
f1500("test"); // 在 1500ms 后显示 "test"
换句话说，delay(f, ms) 返回的是延迟 ms 后的 f 的变体。

在上面的代码中，f 是单个参数的函数，但是你的解决方案应该传递所有参数和上下文 this。
*/

function f(x) {
  console.log(x)
}

function delay(func, time) {
  return function () {
    setTimeout(() => {
      func.apply(this, arguments)
    }, time)
  }
}
let f1000 = delay(f, 1000)
f1000('text')

// 防抖
function debounce(func, ms) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, ms)
  }
}

// 节流
function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments
      savedThis = this
      return
    }
    isThrottled = true

    func.apply(this, arguments) // (1)

    setTimeout(function () {
      isThrottled = false // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}

function test(a) {
  console.log(a)
}

const test1000 = throttle(test, 1000)
test1000(1)
setTimeout(() => {}, 1000)
test1000(5)
setTimeout(() => {}, 1000)
test1000(6)

/* 
调用 throttle(func, ms) 返回 wrapper。

1. 在第一次调用期间，wrapper 只运行 func 并设置冷却状态（isThrottled = true）。
2. 在冷却状态下，所有调用都被保存在 savedArgs/savedThis 中。请注意，上下文（this）和参数（arguments）都很重要，应该被保存下来。我们需要它们来重现调用。
3. 经过 ms 毫秒后，setTimeout中的函数被触发。冷却状态被移除（isThrottled = false），如果存在被忽略的调用，将使用最后一次调用保存的参数和上下文运行 wrapper。

第 3 步运行的不是 func，而是 wrapper，因为我们不仅需要执行 func，还需要再次进入冷却状态并设置 setTimeout 以重置节流。
*/
