// [[Prototype]]
let animal = {
  eats: true,
}

let rabbit = {
  jumps: true,
}

rabbit.__proto__ = animal

console.log(rabbit.eats)

/* 
这里只有两个限制：

1. 引用不能形成闭环。如果我们试图给 __proto__ 赋值但会导致引用形成闭环时，JavaScript 会抛出错误。
2. __proto__ 的值可以是对象，也可以是 null。而其他的类型都会被忽略。
*/

// 访问器（accessor）属性是一个例外，因为赋值（assignment）操作是由 setter 函数处理的。因此，写入此类属性实际上与调用函数相同。
// 也就是这个原因，所以下面这段代码中的 admin.fullName 能够正常运行：
let user = {
  name: 'John',
  surname: 'Smith',

  set fullName(value) {
    ;[this.name, this.surname] = value.split(' ')
  },

  get fullName() {
    return `${this.name} ${this.surname}`
  },
}

let admin = {
  __proto__: user,
  isAdmin: true,
}

console.log(admin.fullName)
admin.fullName = 'Alice Cooper'
console.log(admin.fullName, user.fullName)

/* 
- 在 JavaScript 中，所有的对象都有一个隐藏的 [[Prototype]] 属性，它要么是另一个对象，要么就是 null。
- 我们可以使用 obj.__proto__ 访问它（历史遗留下来的 getter/setter，这儿还有其他方法，很快我们就会讲到）。
- 通过 [[Prototype]] 引用的对象被称为“原型”。
- 如果我们想要读取 obj 的一个属性或者调用一个方法，并且它不存在，那么 JavaScript 就会尝试在原型中查找它。
- 写/删除操作直接在对象上进行，它们不使用原型（假设它是数据属性，不是 setter）。
- 如果我们调用 obj.method()，而且 method 是从原型中获取的，this 仍然会引用 obj。因此，方法始终与当前对象一起使用，即使方法是继承的。
- for..in 循环在其自身和继承的属性上进行迭代。所有其他的键/值获取方法仅对对象本身起作用。
*/

// 任务

/* 
使用原型
重要程度: 5
下面这段代码创建了一对对象，然后对它们进行修改。

过程中会显示哪些值？

let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
应该有 3 个答案。
*/
/* 
true，来自于 rabbit。
null，来自于 animal。
undefined，不再有这样的属性存在。
*/

/* 
搜索算法
重要程度: 5
本题目有两个部分。

给定以下对象：

let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
使用 __proto__ 来分配原型，以使得任何属性的查找都遵循以下路径：pockets → bed → table → head。例如，pockets.pen 应该是 3（在 table 中找到），bed.glasses 应该是 1（在 head 中找到）。
回答问题：通过 pockets.glasses 或 head.glasses 获取 glasses，哪个更快？必要时需要进行基准测试。
*/
let head = {
  glasses: 1,
}

let table = {
  pen: 3,
  __proto__: head,
}

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
}

let pockets = {
  money: 2000,
  __proto__: bed,
}
/* 
在现代引擎中，从性能的角度来看，我们是从对象还是从原型链获取属性都是没区别的。它们（引擎）会记住在哪里找到的该属性，并在下一次请求中重用它。

例如，对于 pockets.glasses 来说，它们（引擎）会记得在哪里找到的 glasses（在 head 中），这样下次就会直接在这个位置进行搜索。并且引擎足够聪明，一旦有内容更改，它们就会自动更新内部缓存，因此，该优化是安全的。
*/

/* 
写在哪里？
重要程度: 5
我们有从 animal 中继承的 rabbit。

如果我们调用 rabbit.eat()，哪一个对象会接收到 full 属性：animal 还是 rabbit？

let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
*/
// rabbit

/* 
为什么两只仓鼠都饱了？
重要程度: 5
我们有两只仓鼠：speedy 和 lazy 都继承自普通的 hamster 对象。

当我们喂其中一只的时候，另一只也吃饱了。为什么？如何修复它？

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// 这只仓鼠找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 这只仓鼠也找到了食物，为什么？请修复它。
alert( lazy.stomach ); // apple
*/

/* 
我们仔细研究一下在调用 speedy.eat("apple") 的时候，发生了什么。

speedy.eat 方法在原型（=hamster）中被找到，然后执行 this=speedy（在点符号前面的对象）。

this.stomach.push() 需要找到 stomach 属性，然后对其调用 push。它在 this（=speedy）中查找 stomach，但并没有找到。

然后它顺着原型链，在 hamster 中找到 stomach。

然后它对 stomach 调用 push，将食物添加到 stomach 的原型 中。

因此，所有的仓鼠共享了同一个胃！

对于 lazy.stomach.push(...) 和 speedy.stomach.push() 而言，属性 stomach 被在原型中找到（不是在对象自身），然后向其中 push 了新数据。

请注意，在简单的赋值 this.stomach= 的情况下不会出现这种情况：

let hamster = {
  stomach: [],

  eat(food) {
    // 分配给 this.stomach 而不是 this.stomach.push
    this.stomach = [food];
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// 仓鼠 Speedy 找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 仓鼠 Lazy 的胃是空的
alert( lazy.stomach ); // <nothing>
现在，一切都运行正常，因为 this.stomach= 不会执行对 stomach 的查找。该值会被直接写入 this 对象。

此外，我们还可以通过确保每只仓鼠都有自己的胃来完全回避这个问题：

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
  stomach: []
};

let lazy = {
  __proto__: hamster,
  stomach: []
};

// 仓鼠 Speedy 找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 仓鼠 Lazy 的胃是空的
alert( lazy.stomach ); // <nothing>
作为一种常见的解决方案，所有描述特定对象状态的属性，例如上面的 stomach，都应该被写入该对象中。这样可以避免此类问题。
*/
