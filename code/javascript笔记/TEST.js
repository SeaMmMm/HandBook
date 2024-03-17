class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hello ${this.name}`)
  }
}

console.log(typeof User)
console.log(User === User.prototype.constructor)
console.log(User.prototype)
console.log(new User('Jack').__proto__ === User.prototype)
console.log(User.prototype.sayHi)
console.log(Object.getOwnPropertyNames(User.prototype))
