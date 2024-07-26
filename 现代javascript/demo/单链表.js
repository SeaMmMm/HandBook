class List {
  #value = undefined
  #next = null

  constructor(data = 0) {
    this.#value = data
  }

  get() {
    return this.#value
  }

  set(data) {
    this.#value = data
  }

  setNext(data) {
    const nextNode = this.getNext()
    const newNode = new List(data)
    this.#next = newNode
    newNode.#next = nextNode
  }

  getNext() {
    return this.#next
  }

  print() {
    let arr = [],
      current = this
    do {
      arr.push(current.#value)
      current = current.getNext()
    } while (current !== null)

    console.log(arr)
    return arr
  }

  insert(data) {
    this.setNext(data)
  }

  static setAll(arr) {
    const list = new List(arr[0])
    let current = list
    for (let i = 1; i < arr.length; i++) {
      current.setNext(arr[i])
      current = current.#next
    }
    return list
  }

  length() {
    let l = 0,
      current = this
    do {
      l++
      current = current.getNext()
    } while (current !== null)
    return l
  }
}
