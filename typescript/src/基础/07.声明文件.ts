export {}
declare var jQuery: (selector: string) => any
jQuery('#foo') // Okay

// 上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：
jQuery('#foo')

// 什么是声明文件
// 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
// 声明文件必需以 .d.ts 为后缀。
// 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。
/* 
/path/to/project
├── src
\  ├── index.ts
\  └── jQuery.d.ts
└── tsconfig.json
*/
/* declare var
在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别,而当我们使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了 */
declare const axios: (config: any) => any
// axios = 123 // Error: Cannot reassign a const variable

// 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现

// declare function
// declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：
declare function addEvent(
  el: HTMLElement | null,
  event: string,
  handler: (event: Event) => void
): void
addEvent(document.getElementById('app'), 'click', (event) => {})

// 在函数类型的声明语句中，函数重载也是支持的
declare function add(a: string, b: string): string
declare function add(a: number, b: number): number

// declare class
// 当全局变量是一个类的时候，我们用 declare class 来定义它的类型
declare class Animal {
  name: string
  constructor(name: string)
  sayHi(): string
}
let cat = new Animal('Tom')

// 同样的，declare class 语句也只能用来定义类型，不能用来定义具体的实现

// declare enum
// 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// declare namespace
/* 
namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。

随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，故我们不再需要学习 namespace 的使用了。

namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。
*/

declare namespace jQuery2 {
  function ajax(url: string, config: any): void
  const version: number
  class Event {
    blur(eventType: EventType): void
  }
  enum EventType {
    CustomClick,
  }
}

jQuery2.ajax('/api/get_user_info', {})
console.log(jQuery2.version)
const e = new jQuery2.Event()
e.blur(jQuery2.EventType.CustomClick)

// 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句
// 类名空间可以嵌套
declare namespace jQuery3 {
  function ajax(url: string, config: any): void
  namespace fn {
    function extend(object: any): void
  }
}
jQuery3.fn.extend({
  check() {},
})

// interface 和 type
// 在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型
interface AjaxSettings {
  method?: 'GET' | 'POST'
  data?: any
}
declare namespace jQuery4 {
  function ajax(url: string, settings?: AjaxSettings): void
}
jQuery4.ajax('/api/get_user_info', {
  method: 'GET',
  data: {},
})

// 防止命名冲突
// 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下

// 声明合并
// 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来

declare function jQuery5(selector: string): any
declare namespace jQuery5 {
  function ajax(url: string, config: any): void
  const version: number
}

/* 
npm 包
一般我们通过 import foo from 'foo' 导入一个 npm 包，这是符合 ES6 模块规范的。

在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：

与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。
发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了。
假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：

创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外的配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
目录结构：

/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
tsconfig.json 内容：

{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应的模块的声明文件了。

注意 module 配置可以有很多种选项，不同的选项会影响模块的导入导出模式。这里我们使用了 commonjs 这个最常用的选项，后面的教程也都默认使用的这个选项。

不管采用了以上两种方式中的哪一种，我都强烈建议大家将书写好的声明文件（通过给第三方库发 pull request，或者直接提交到 @types 里）发布到开源社区中，享受了这么多社区的优秀的资源，就应该在力所能及的时候给出一些回馈。只有所有人都参与进来，才能让 ts 社区更加繁荣。
*/

// export
// npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现

/*  types/foo/index.d.ts
export const name: string;
export function getName(): string;
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}
*/

// 对应的导入和使用模块应该是这样：
/* 
import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};
*/

/* 混用 declare 和 export
我们也可以使用 declare 先声明多个变量，最后再用 export 一次性导出。上例的声明文件可以等价的改写为：

// types/foo/index.d.ts

declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any;
}

export { name, getName, Animal, Directions, Options };
注意，与全局变量的声明文件类似，interface 前是不需要 declare 的。
*/

/* export namespace
与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象：

// types/foo/index.d.ts

export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}
// src/index.ts

import { foo } from 'foo';

console.log(foo.name);
foo.bar.baz();
*/

/* export default
在 ES6 模块系统中，使用 export default 可以导出一个默认值，使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值。

在类型声明文件中，export default 用来导出默认值的类型：

// types/foo/index.d.ts

export default function foo(): string;
// src/index.ts

import foo from 'foo';

foo();
注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出：

// types/foo/index.d.ts

export default enum Directions {
// ERROR: Expression expected.
    Up,
    Down,
    Left,
    Right
}
上例中 export default enum 是错误的语法，需要使用 declare enum 定义出来，然后使用 export default 导出：

// types/foo/index.d.ts

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

export default Directions;
针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面：

// types/foo/index.d.ts

export default Directions;

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
 */

// UMD 库
// 既可以通过 <script> 标签引入，又可以通过 import 导入的库，称为 UMD 库。相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 export as namespace。

/* export as namespace§
一般使用 export as namespace 时，都是先有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，即可将声明好的一个变量声明为全局变量，举例如下22：

// types/foo/index.d.ts

export as namespace foo;
export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
当然它也可以与 export default 一起使用：

// types/foo/index.d.ts

export as namespace foo;
export default foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
 */

// 直接扩展全局变量
/* 有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，此时就需要扩展全局变量的类型。比如扩展 String 类型23：

interface String {
    prependHello(): string;
}

'foo'.prependHello();
通过声明合并，使用 interface String 即可给 String 添加属性或方法。

也可以使用 declare namespace 给已有的命名空间添加类型声明24：

// types/jquery-plugin/index.d.ts

declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}

interface JQueryStatic {
    foo(options: JQuery.CustomOptions): string;
}
// src/index.ts

jQuery.foo({
    bar: ''
});
 */
