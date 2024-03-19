'use strict'
console.log(new Number(2) instanceof Number)
console.log(2 instanceof Number)
console.log(typeof 2)

console.log((2).constructor === Number)
console.log(true.constructor === Boolean)

function Fn() {}
Fn.prototype = new Array()
var f = new Fn()
console.log(f.constructor === Fn)
console.log(f.constructor === Array)

const a = Object.prototype.toString
console.log(a.call(1))
console.log(a.call(new Array(2)))
console.log(a.call([]))
console.log(a.call(Symbol()))

console.log(null == undefined)
console.log(null === undefined)

function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype

  while (true) {
    if (!proto) return false
    if (proto === prototype) return true

    proto = Object.getPrototypeOf(proto)
  }
}

function getStudent(student) {
  console.log(this.title + ': ' + student)
}

let group = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach(
      function getStudents(student) {
        console.log(this.title + ': ' + student)
      }.bind(this)
    )
  },
}
group.showList()

let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, recevier) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    },
  }
  return new Proxy(obj, handler)
}
