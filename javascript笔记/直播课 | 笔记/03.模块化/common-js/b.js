console.log('b.js 开始执行');
exports.done = false;
const a = require('./a.js');
console.log('b.js 中, a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完成');