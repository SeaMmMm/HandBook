// Proxy
/*
语法：
let proxy = new Proxy(target, handler)

target —— 是要包装的对象，可以是任何东西，包括函数。
handler —— 代理配置：带有“捕捉器”（“traps”，即拦截操作的方法）的对象。比如 get 捕捉器用于读取 target 的属性，set 捕捉器用于写入 target 的属性，等等。 
*/
let target = {}
let proxy = new Proxy(target, {})

proxy.test = 5
console.log(target.test)

/* 
由于没有捕捉器，所有对 proxy 的操作都直接转发给了 target。

写入操作 proxy.test= 会将值写入 target。
读取操作 proxy.test 会从 target 返回对应的值。
迭代 proxy 会从 target 返回对应的值。
*/

/* 
不变量（Invariant）
JavaScript 强制执行某些不变量 —— 内部方法和捕捉器必须满足的条件。

其中大多数用于返回值：

[[Set]] 如果值已成功写入，则必须返回 true，否则返回 false。
[[Delete]] 如果已成功删除该值，则必须返回 true，否则返回 false。
……依此类推，我们将在下面的示例中看到更多内容。
还有其他一些不变量，例如：

应用于代理（proxy）对象的 [[GetPrototypeOf]]，必须返回与应用于被代理对象的 [[GetPrototypeOf]] 相同的值。换句话说，读取代理对象的原型必须始终返回被代理对象的原型。
捕捉器可以拦截这些操作，但是必须遵循上面这些规则。

不变量确保语言功能的正确和一致的行为。完整的不变量列表在 规范 中。如果你不做奇怪的事情，你可能就不会违反它们。
*/

// 带有 “get” 捕捉器的默认值
/* 
最常见的捕捉器是用于读取/写入的属性。

要拦截读取操作，handler 应该有 get(target, property, receiver) 方法。

读取属性时触发该方法，参数如下：

target —— 是目标对象，该对象被作为第一个参数传递给 new Proxy，
property —— 目标属性名，
receiver —— 如果目标属性是一个 getter 访问器属性，则 receiver 就是本次读取属性所在的 this 对象。通常，这就是 proxy 对象本身（或者，如果我们从 proxy 继承，则是从该 proxy 继承的对象）。现在我们不需要此参数，因此稍后我们将对其进行详细介绍。
*/

let numbers = [1, 2, 3]
numbers = new Proxy(numbers, {
  get(target, prop) {
    console.log(target, prop)

    if (prop in target) {
      return target[prop]
    } else {
      return 0
    }
  },
})
console.log(numbers[0])
console.log(numbers[3])

// 使用 “set” 捕捉器进行验证
/* 
假设我们想要一个专门用于数字的数组。如果添加了其他类型的值，则应该抛出一个错误。

当写入属性时 set 捕捉器被触发。

set(target, property, value, receiver)：

target —— 是目标对象，该对象被作为第一个参数传递给 new Proxy，
property —— 目标属性名称，
value —— 目标属性的值，
receiver —— 与 get 捕捉器类似，仅与 setter 访问器属性相关。
如果写入操作（setting）成功，set 捕捉器应该返回 true，否则返回 false（触发 TypeError）。
*/

let number2 = []
number2 = new Proxy(number2, {
  set(target, prop, val) {
    if (typeof val === 'number') {
      target[prop] = val
      return true
    } else {
      return false
    }
  },
})
number2.push(1)
number2.push(2)
// number2.push('a') error
/* 
请注意：数组的内建方法依然有效！值被使用 push 方法添加到数组。当值被添加到数组后，数组的 length 属性会自动增加。我们的代理对象 proxy 不会破坏任何东西。

我们不必重写诸如 push 和 unshift 等添加元素的数组方法，就可以在其中添加检查，因为在内部它们使用代理所拦截的 [[Set]] 操作。

因此，代码简洁明了。
*/

// 使用 “ownKeys” 和 “getOwnPropertyDescriptor” 进行迭代

let user = {
  name: 'John',
  age: 30,
  _password: '***',
}
user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith('_'))
  },
})

for (let key in user) console.log(key)
console.log(Object.keys(user))
console.log(Object.values(user))

// 尽管如此，但如果我们返回对象中不存在的键，Object.keys 并不会列出这些键：
user = {}
user = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c']
  },
})
console.log(Object.keys(user))
/*
为什么？原因很简单：Object.keys 仅返回带有 enumerable 标志的属性。为了检查它，该方法会对每个属性调用内部方法 [[GetOwnProperty]] 来获取 它的描述符（descriptor）。在这里，由于没有属性，其描述符为空，没有 enumerable 标志，因此它被略过。

为了让 Object.keys 返回一个属性，我们需要它要么存在于带有 enumerable 标志的对象，要么我们可以拦截对 [[GetOwnProperty]] 的调用（捕捉器 getOwnPropertyDescriptor 可以做到这一点)，并返回带有 enumerable: true 的描述符。 
 */
user = {}
user = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c']
  },
  getOwnPropertyDescriptor(target, prop) {
    return {
      enumerable: true,
      configurable: true,
      writable: true,
    }
  },
})

console.log(Object.keys(user))
// 让我们再次注意：如果该属性在对象中不存在，那么我们只需要拦截 [[GetOwnProperty]]。

// 具有 “deleteProperty” 和其他捕捉器的受保护属性
/* 
有一个普遍的约定，即以下划线 _ 开头的属性和方法是内部的。不应从对象外部访问它们。

从技术上讲，我们也是能访问到这样的属性的：

let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret
让我们使用代理来防止对以 _ 开头的属性的任何访问。

我们将需要以下捕捉器：

get 读取此类属性时抛出错误，
set 写入属性时抛出错误，
deleteProperty 删除属性时抛出错误，
ownKeys 在使用 for..in 和像 Object.keys 这样的的方法时排除以 _ 开头的属性。
*/
user = {
  name: 'John',
  _password: '***',
}

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error('Access denied')
    }
    let value = target[prop]
    return typeof value === 'function' ? value.bind(target) : value // (*)
  },
  set(target, prop, val) {
    // 拦截属性写入
    if (prop.startsWith('_')) {
      throw new Error('Access denied')
    } else {
      target[prop] = val
      return true
    }
  },
  deleteProperty(target, prop) {
    // 拦截属性删除
    if (prop.startsWith('_')) {
      throw new Error('Access denied')
    } else {
      delete target[prop]
      return true
    }
  },
  ownKeys(target) {
    // 拦截读取属性列表
    return Object.keys(target).filter((key) => !key.startsWith('_'))
  },
})
/* 
请注意在 (*) 行中 get 捕捉器的重要细节：

get(target, prop) {
  // ...
  let value = target[prop];
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
}
为什么我们需要一个函数去调用 value.bind(target)？

原因是对象方法（例如 user.checkPassword()）必须能够访问 _password：

user = {
  // ...
  checkPassword(value) {
    //对象方法必须能读取 _password
    return value === this._password;
  }
}
对 user.checkPassword() 的调用会将被代理的对象 user 作为 this（点符号之前的对象会成为 this），因此，当它尝试访问 this._password 时，get 捕捉器将激活（在任何属性读取时，它都会被触发）并抛出错误。

因此，我们在 (*) 行中将对象方法的上下文绑定到原始对象 target。然后，它们将来的调用将使用 target 作为 this，不会触发任何捕捉器。

该解决方案通常可行，但并不理想，因为一个方法可能会将未被代理的对象传递到其他地方，然后我们就会陷入困境：原始对象在哪里，被代理的对象在哪里？

此外，一个对象可能会被代理多次（多个代理可能会对该对象添加不同的“调整”），并且如果我们将未包装的对象传递给方法，则可能会产生意想不到的后果。

因此，在任何地方都不应使用这种代理。
*/

// 带有 “has” 捕捉器的 “in range”
let range = {
  start: 1,
  end: 10,
}
/* 
我们想使用 in 操作符来检查一个数字是否在 range 范围内。

has 捕捉器会拦截 in 调用。

has(target, property)

target —— 是目标对象，被作为第一个参数传递给 new Proxy，
property —— 属性名称。
*/

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end
  },
})

// 包装函数："apply"
/* 
我们也可以将代理（proxy）包装在函数周围。

apply(target, thisArg, args) 捕捉器能使代理以函数的方式被调用：

target 是目标对象（在 JavaScript 中，函数就是一个对象），
thisArg 是 this 的值。
args 是参数列表。
*/

function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms)
    },
  })
}
function sayHi(user) {
  console.log(`Hello ${user}`)
}

sayHi = delay(sayHi, 1000)
console.log(sayHi.length)
sayHi('jack')

/* 
结果是相同的，但现在不仅仅调用，而且代理上的所有操作都能被转发到原始函数。所以在 (*) 行包装后的 sayHi.length 会返回正确的结果。

我们得到了一个“更丰富”的包装器。

还存在其他捕捉器：完整列表在本文的开头。它们的使用模式与上述类似。
*/

// Reflect
/* 
Reflect 是一个内建对象，可简化 Proxy 的创建。

前面所讲过的内部方法，例如 [[Get]] 和 [[Set]] 等，都只是规范性的，不能直接调用。

Reflect 对象使调用这些内部方法成为了可能。它的方法是内部方法的最小包装。
*/

let man = {}
Reflect.set(man, 'name', 'john')
console.log(man.name)

/* 
尤其是，Reflect 允许我们将操作符（new，delete，……）作为函数（Reflect.construct，Reflect.deleteProperty，……）执行调用。这是一个有趣的功能，但是这里还有一点很重要。

对于每个可被 Proxy 捕获的内部方法，在 Reflect 中都有一个对应的方法，其名称和参数与 Proxy 捕捉器相同。

所以，我们可以使用 Reflect 来将操作转发给原始对象。

在下面这个示例中，捕捉器 get 和 set 均透明地（好像它们都不存在一样）将读取/写入操作转发到对象，并显示一条消息：
*/
let woman = {
  name: 'John',
}

woman = new Proxy(woman, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`)
    return Reflect.get(target, prop, receiver) // (1)
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}=${val}`)
    return Reflect.set(target, prop, val, receiver) // (2)
  },
})

let name = woman.name // 显示 "GET name"
woman.name = 'Pete' // 显示 "SET name=Pete"

/* 
这里：

Reflect.get 读取一个对象属性。
Reflect.set 写入一个对象属性，如果写入成功则返回 true，否则返回 false。
这样，一切都很简单：如果一个捕捉器想要将调用转发给对象，则只需使用相同的参数调用 Reflect.<method> 就足够了。

在大多数情况下，我们可以不使用 Reflect 完成相同的事情，例如，用于读取属性的 Reflect.get(target, prop, receiver) 可以被替换为 target[prop]。尽管有一些细微的差别。
*/

// 代理一个 getter
