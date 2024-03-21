// 什么是模块？
/* 
一个模块（module）就是一个文件。一个脚本就是一个模块。就这么简单。

模块可以相互加载，并可以使用特殊的指令 export 和 import 来交换功能，从另一个模块调用一个模块的函数：

export 关键字标记了可以从当前模块外部访问的变量和函数。
import 关键字允许从其他模块导入功能。
*/

// 模块只通过 HTTP(s) 工作，而非本地
/* 
如果你尝试通过 file:// 协议在本地打开一个网页，你会发现 import/export 指令不起作用。你可以使用本地 Web 服务器，例如 static-server，或者使用编辑器的“实时服务器”功能，例如 VS Code 的 Live Server Extension 来测试模块。
*/

// 模块核心功能

/* 
始终使用 “use strict”
模块始终在严格模式下运行。例如，对一个未声明的变量赋值将产生错误（译注：在浏览器控制台可以看到 error 信息）。

<script type="module">
  a = 5; // error
</script>
*/

/* 
模块级作用域
每个模块都有自己的顶级作用域（top-level scope）。换句话说，一个模块中的顶级作用域变量和函数在其他脚本中是不可见的。

模块应该 export 它们想要被外部访问的内容，并 import 它们所需要的内容。
- user.js 应该导出 user 变量。
- hello.js 应该从 user.js 模块中导入它。

换句话说，对于模块，我们使用导入/导出而不是依赖全局变量。
*/

// 模块代码仅在第一次导入时被解析
/* 
我们假设一个模块导出了一个对象：

// 📁 admin.js
export let admin = {
  name: "John"
};
如果这个模块被导入到多个文件中，模块仅在第一次被导入时被解析，并创建 admin 对象，然后将其传入到所有的导入。

所有的导入都只获得了一个唯一的 admin 对象：

// 📁 1.js
import { admin } from './admin.js';
admin.name = "Pete";

// 📁 2.js
import { admin } from './admin.js';
alert(admin.name); // Pete

// 1.js 和 2.js 引用的是同一个 admin 对象
// 在 1.js 中对对象做的更改，在 2.js 中也是可见的

*/

// import.meta
/* 
import.meta 对象包含关于当前模块的信息。

它的内容取决于其所在的环境。在浏览器环境中，它包含当前脚本的 URL，或者如果它是在 HTML 中的话，则包含当前页面的 URL。

<script type="module">
  alert(import.meta.url); // 脚本的 URL
  // 对于内联脚本来说，则是当前 HTML 页面的 URL
</script>

*/

// 在一个模块中，“this” 是 undefined
/* 
这是一个小功能，但为了完整性，我们应该提到它。

在一个模块中，顶级 this 是 undefined。

将其与非模块脚本进行比较会发现，非模块脚本的顶级 this 是全局对象：

<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
*/

// 总结
/* 
下面总结一下模块的核心概念：

1. 一个模块就是一个文件。浏览器需要使用 <script type="module"> 以使 import/export 可以工作。模块（译注：相较于常规脚本）有几点差别：
  - 默认是延迟解析的（deferred）。
  - Async 可用于内联脚本。
  - 要从另一个源（域/协议/端口）加载外部脚本，需要 CORS header。
  - 重复的外部脚本会被忽略
2. 模块具有自己的本地顶级作用域，并可以通过 import/export 交换功能。
3. 模块始终使用 use strict。
4. 模块代码只执行一次。导出仅创建一次，然后会在导入之间共享。

当我们使用模块时，每个模块都会实现特定功能并将其导出。然后我们使用 import 将其直接导入到需要的地方即可。浏览器会自动加载并解析脚本。

在生产环境中，出于性能和其他原因，开发者经常使用诸如 Webpack 之类的打包工具将模块打包到一起。
*/
