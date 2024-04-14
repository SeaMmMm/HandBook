// 可达性

// 整个程序运行过程中需要访问到的,用到的值,这些都是被称为可达的
/*
比方说：

当前执行的函数，它的局部变量和参数。
当前嵌套调用链上的其他函数、它们的局部变量和参数。
全局变量。
（还有一些内部的）
这些值被称作 根（roots）。

如果一个值可以通过引用链从根访问任何其他值，则认为该值是可达的。

比方说，如果全局变量中有一个对象，并且该对象有一个属性引用了另一个对象，则 该 对象被认为是可达的。而且它引用的内容也是可达的。下面是详细的例子。

在 JavaScript 引擎中有一个被称作 垃圾回收器 的东西在后台执行。它监控着所有对象的状态，并删除掉那些已经不可达的。
*/
let user = {
  name: 'John',
}
user = null
// 将 user = null 的时候,对象 {name: 'John} "孤立无援",这个引用没了,该对象变成不可达 => 垃圾数据 => 回收释放内存

user = {
  name: 'John',
}
let admin = user
user = null
console.log(admin)
// 即使 user 设为 null,但是还有 admin 指向 'John',因此这个对象不能释放

// 相互关联对象
function marry(man, woman) {
  woman.husband = man
  man.wife = woman

  return {
    father: man,
    mother: woman,
  }
}

let family = marry(
  {
    name: 'John',
  },
  {
    name: 'Ann',
  }
)
// 他们现在都是可达的

delete family.father
delete family.mother.husband
// 现在 John(father) 没有被引用,变成了垃圾对象

// 无法到达的岛屿
let family2 = marry(
  {
    name: 'John',
  },
  {
    name: 'Ann',
  }
)
family2 = null
/*
显而易见，John 和 Ann 仍然连着，都有传入的引用。但是，这样还不够。

前面说的 "family" 对象已经不再与根相连，没有了外部对其的引用，所以它变成了一座“孤岛”，并且将被从内存中删除。
*/

//TODO 内部算法(需深究)
/*
简单概括为:
垃圾回收的基本算法被称为 “mark-and-sweep”。

定期执行以下“垃圾回收”步骤：

垃圾收集器找到所有的根，并“标记”（记住）它们。
然后它遍历并“标记”来自它们的所有引用。
然后它遍历标记的对象并标记 它们的 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。
……如此操作，直到所有可达的（从根部）引用都被访问到。
没有被标记的对象都会被删除。
*/
