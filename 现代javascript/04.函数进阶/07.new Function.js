// 还有一种创建函数的方法。它很少被使用，但有些时候只能选择它。
let sum = new Function('a', 'b', 'return a + b')
console.log(sum(1, 2))

/* 
以前的所有声明方法都需要我们 —— 程序员，在脚本中编写函数的代码。

但是 new Function 允许我们将任意字符串变为函数。例如，我们可以从服务器接收一个新的函数并执行它：

let str = ... 动态地接收来自服务器的代码 ...

let func = new Function(str);
func();
*/

// 闭包
// 但是如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。
function getFunc() {
  let value = 'test'

  let func = new Function('console.log(value)')

  return func
}

// getFunc()() // error

// 总结
/* 
语法：

let func = new Function ([arg1, arg2, ...argN], functionBody);
由于历史原因，参数也可以按逗号分隔符的形式给出。

以下三种声明的含义相同：

new Function('a', 'b', 'return a + b'); // 基础语法
new Function('a,b', 'return a + b'); // 逗号分隔
new Function('a , b', 'return a + b'); // 逗号和空格分隔

使用 new Function 创建的函数，它的 [[Environment]] 指向全局词法环境，而不是函数所在的外部词法环境。因此，我们不能在 new Function 中直接使用外部变量。不过这样是好事，这有助于降低我们代码出错的可能。并且，从代码架构上讲，显式地使用参数传值是一种更好的方法，并且避免了与使用压缩程序而产生冲突的问题。
*/
