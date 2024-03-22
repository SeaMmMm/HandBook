/* 
  func.bind(obj, arg1 ~ argn) => func 的 this 指向 obj， 并返回一个可执行函数（已经替换成的）
 */
Function.prototype.myBind = function () {
  const _this = this
  const args = Array.prototype.slice.call(arguments)
  const newThis = args.shift()

  return function () {
    return _this.newApply(newThis, args)
  }
}

/* 
  func.apply(context, [iratebale]) => 返回运行结果
  1. func => this 指向 context (this 原本是调用这个的对象)
*/
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') throw new Error('type error')

  context = context || window
  context.fn = this // this 就是调用 myApply 的函数对象

  const result = arguments[1] ? context.fn(...arguments[1]) : context.fn()

  delete context.fn

  return result
}
