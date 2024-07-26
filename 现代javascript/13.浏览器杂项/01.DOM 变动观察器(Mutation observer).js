// MutationObserver 是一个内建对象，它观察 DOM 元素，并在检测到更改时触发回调。
function callback(e) {
  console.log(e)
}
let observer = new MutationObserver(callback)

// observer.observe(node, config);

// 用于集成
/* 
在什么时候可能有用？

想象一下，你需要添加一个第三方脚本，该脚本不仅包含有用的功能，还会执行一些我们不想要的操作，例如显示广告 <div class="ads">Unwanted ads</div>。

当然，第三方脚本没有提供删除它的机制。

使用 MutationObserver，我们可以监测到我们不需要的元素何时出现在我们的 DOM 中，并将其删除。

还有一些其他情况，例如第三方脚本会将某些内容添加到我们的文档中，并且我们希望检测出这种情况何时发生，以调整页面，动态调整某些内容的大小等。

MutationObserver 使我们能够实现这种需求。
*/

/* 
用于架构
从架构的角度来看，在某些情况下，MutationObserver 有不错的作用。比如对动态获取到的html片段进行处理。
*/

// 其他方法
// 有一个方法可以停止观察节点：
observer.disconnect() // —— 停止观察。
// 当我们停止观察时，观察器可能尚未处理某些更改。在种情况下，我们使用：
observer.takeRecords() //  —— 获取尚未处理的变动记录列表，表中记录的是已经发生，但回调暂未处理的变动。
// 这些方法可以一起使用，如下所示：
/* 
// 如果你关心可能未处理的近期的变动
// 那么，应该在 disconnect 前调用获取未处理的变动列表
let mutationRecords = observer.takeRecords();

// 停止跟踪变动
observer.disconnect();
...
*/
