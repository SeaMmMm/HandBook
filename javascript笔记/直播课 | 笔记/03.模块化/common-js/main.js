// let deps1 = require("./deps1")
// let deps2 = require("./deps2")


// console.log(deps1)
// console.log(deps1.a, deps1.b, deps1.c)

// deps1.addA()
// deps1.addB()
// deps1.print()


// console.log("deps2:", deps2)


console.log('main.js 开始执行');
const a = require('./a.js');
const b = require('./b.js');
console.log(`main.js 中, a.done = %j, b.done = %j`, a.done, b.done);