// 在声明前导出
// 我们可以通过在声明之前放置 export 来标记任意声明为导出，无论声明的是变量，函数还是类都可以。
// 例如，这里的所有导出均有效：
export let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const MODULES_BECAME_STANDARD_YEAR = 2015

export class User {
  constructor(name) {
    this.name = name
  }
}

// Import *
// 通常，我们把要导入的东西列在花括号 import {...} 中，就像这样：

// 📁 main.js
import { sayHi, sayBye } from './say.js'

sayHi('John') // Hello, John!
sayBye('John') // Bye, John!

// 但是如果有很多要导入的内容，我们可以使用 import * as <obj> 将所有内容导入为一个对象，例如：

// 📁 main.js
import * as say from './say.js'

say.sayHi('John')
say.sayBye('John')

// “default” 名称
/* 
在某些情况下，default 关键词被用于引用默认的导出。

例如，要将函数与其定义分开导出：

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 就像我们在函数之前添加了 "export default" 一样
export {sayHi as default};
或者，另一种情况，假设模块 user.js 导出了一个主要的默认的导出和一些命名的导出（这种情况很少见，但确实会发生）：

// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
这是导入默认的导出以及命名的导出的方法：

// 📁 main.js
import {default as User, sayHi} from './user.js';

new User('John');
如果我们将所有东西 * 作为一个对象导入，那么 default 属性正是默认的导出：

// 📁 main.js
import * as user from './user.js';

let User = user.default; // 默认的导出
new User('John');
*/

// 重新导出
/* 
“重新导出（Re-export）”语法 export ... from ... 允许导入内容，并立即将其导出（可能是用的是其他的名字），就像这样：

export {sayHi} from './say.js'; // 重新导出 sayHi

export {default as User} from './user.js'; // 重新导出 default
为什么要这样做？我们看一个实际开发中的用例。

想象一下，我们正在编写一个 “package”：一个包含大量模块的文件夹，其中一些功能是导出到外部的（像 NPM 这样的工具允许我们发布和分发这样的 package，但我们不是必须要去使用它们），并且其中一些模块仅仅是供其他 package 中的模块内部使用的 “helpers”。

文件结构可能是这样的：

auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
我们希望通过单个入口暴露包的功能。

换句话说，想要使用我们的包的人，应该只从“主文件” auth/index.js 导入。

像这样：

import {login, logout} from 'auth/index.js'
“主文件”，auth/index.js 导出了我们希望在包中提供的所有功能。

这样做是因为，其他使用我们包的开发者不应该干预其内部结构，不应该搜索我们包的文件夹中的文件。我们只在 auth/index.js 中导出必要的部分，并保持其他内容“不可见”。

由于实际导出的功能分散在 package 中，所以我们可以将它们导入到 auth/index.js，然后再从中导出它们：

// 📁 auth/index.js

// 导入 login/logout 然后立即导出它们
import {login, logout} from './helpers.js';
export {login, logout};

// 将默认导出导入为 User，然后导出它
import User from './user.js';
export {User};
...
现在使用我们 package 的人可以 import {login} from "auth/index.js"。

语法 export ... from ... 只是下面这种导入-导出的简写：

// 📁 auth/index.js
// 重新导出 login/logout
export {login, logout} from './helpers.js';

// 将默认导出重新导出为 User
export {default as User} from './user.js';
...
export ... from 与 import/export 相比的显着区别是重新导出的模块在当前文件中不可用。所以在上面的 auth/index.js 示例中，我们不能使用重新导出的 login/logout 函数。
*/
