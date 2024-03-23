class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

function test() {
  throw new ValidationError('Whoops!')
}

try {
  test()
} catch (err) {
  console.log(err.message)
  console.log(err.name)
  console.log(err.stack)
}

// 包装异常
/* 
在上面代码中的函数 readUser 的目的就是“读取用户数据”。在这个过程中可能会出现不同类型的 error。目前我们有了 SyntaxError 和 ValidationError，但是将来，函数 readUser 可能会不断壮大，并可能会产生其他类型的 error。

调用 readUser 的代码应该处理这些 error。现在它在 catch 块中使用了多个 if 语句来检查 error 类，处理已知的 error，并再次抛出未知的 error。

该方案是这样的：

try {
  ...
  readUser()  // 潜在的 error 源
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // 处理 validation error
  } else if (err instanceof SyntaxError) {
    // 处理 syntax error
  } else {
    throw err; // 未知 error，再次抛出它
  }
}
在上面的代码中，我们可以看到两种类型的 error，但是可以有更多。

如果 readUser 函数会产生多种 error，那么我们应该问问自己：我们是否真的想每次都一一检查所有的 error 类型？

通常答案是 “No”：我们希望能够“比它高一个级别”。我们只想知道这里是否是“数据读取异常” —— 为什么发生了这样的 error 通常是无关紧要的（error 信息描述了它）。或者，如果我们有一种方式能够获取 error 的详细信息那就更好了，但前提是我们需要。

我们所描述的这项技术被称为“包装异常”。

我们将创建一个新的类 ReadError 来表示一般的“数据读取” error。
函数readUser 将捕获内部发生的数据读取 error，例如 ValidationError 和 SyntaxError，并生成一个 ReadError 来进行替代。
对象 ReadError 会把对原始 error 的引用保存在其 cause 属性中。
之后，调用 readUser 的代码只需要检查 ReadError，而不必检查每种数据读取 error。并且，如果需要更多 error 细节，那么可以检查 readUser 的 cause 属性。

下面的代码定义了 ReadError，并在 readUser 和 try..catch 中演示了其用法：

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { //... }
class PropertyRequiredError extends ValidationError { //... }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}
在上面的代码中，readUser 正如所描述的那样正常工作 —— 捕获语法和验证（validation）错误，并抛出 ReadError（对于未知错误将照常再次抛出）。

所以外部代码检查 instanceof ReadError，并且它的确是。不必列出所有可能的 error 类型。

这种方法被称为“包装异常（wrapping exceptions）”，因为我们将“低级别”的异常“包装”到了更抽象的 ReadError 中。它被广泛应用于面向对象的编程中。

*/

// 总结
/* 
- 我们可以正常地从 Error 和其他内建的 error 类中进行继承。我们只需要注意 name 属性以及不要忘了调用 super。

- 我们可以使用 instanceof 来检查特定的 error。但有时我们有来自第三方库的 error 对象，并且在这儿没有简单的方法来获取它的类。那么可以将 name 属性用于这一类的检查。

- 包装异常是一项广泛应用的技术：用于处理低级别异常并创建高级别 error 而不是各种低级别 error 的函数。在上面的示例中，低级别异常有时会成为该对象的属性，例如 err.cause，但这不是严格要求的。

*/
