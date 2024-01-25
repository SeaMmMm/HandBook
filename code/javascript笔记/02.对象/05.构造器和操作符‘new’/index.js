// 构造函数
function User(name) {
  this.name = name
  this.isAdmin = false

  console.log(new.target)
}

// let user = new User('Jack')
// console.log(user.name)

// 构造器模式测试： new.target
// 这个是来检查他是不是使用了 new 来调用的，比如：

User()

new User()

// 利用这个，我们就可以让两种不同的调用都可以干相同的事：
function User2(name) {
  if (!new.target) {
    return new User2(name)
  }
  this.name = name
}
// 这样一来，无论是用是经过 new 调用还是普通的调用，程序都能正常工作

// 通常构造器没有 return 语句，如果有 return 语句的话遵守以下规则
/*
1. 如果 return 返回的是一个对象，那么这个对象会被正常使用
2. 如果 return 返回的是一个原始类型的值，那么这个 return 会被忽略
 */

function BigUser() {
  this.name = 'John'
  return { name: 'Godzilla' }
}
console.log(new BigUser().name)

function SmallUser() {
  this.name = 'John'
  return
}
console.log(new SmallUser().name)
