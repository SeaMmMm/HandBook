export var a = 10
export var b = 20
export var c = 30
export function addA() {
    a++
}
export function addB() {
    b++
}
export function addC() {
    c++
}
export function print() {
    console.log("a,b,c = ", a, b, c)
}

export default function () {
    console.log("default func from deps1")
}