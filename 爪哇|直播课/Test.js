function say() {
  console.log(this.name)
  console.log(...arguments)
}

const obj = {
  name: 'jack',
}
say.call(obj, 'arg1', 'arg2')
