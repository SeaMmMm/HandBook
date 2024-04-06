console.log('a.js 开始执行')
exports.done = false
const b = require('./b.js')
console.log('a.js 中, b.done = %j', b.done)
exports.done = true
console.log('a.js 执行完成')

function print() {
  console.log('hello')
}
