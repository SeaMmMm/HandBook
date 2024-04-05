var a = 10
var b = 20
var c = 30
console.log("来自 deps1.js", a, b, c)
function addA() {
    a++
}
function addB() {
    b++
}
function addC() {
    c++
}
function print() {
    console.log("a,b,c = ", a, b, c)
}
// console.log(exports)
// console.log(require)
console.log(module)
// console.log(__filename)
// console.log(__dirname)

exports.a = a
exports.b = b
exports.c = c

console.log(module)

module.exports = {
    a, b, c,
    addA, addB, addC,
    print
}