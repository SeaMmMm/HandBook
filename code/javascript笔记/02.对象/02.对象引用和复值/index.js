// 对象的赋值是引用赋值
let obj1 = {}
let obj2 = obj1
console.log(obj1 === obj2)

obj1.name = 'jack'
console.log(obj2)

obj2 = {}
console.log(obj1 === obj2)

// 使用Object.assign来简单克隆
// Object.assign(dest, [src1, src2, src3...])
let user = { name: 'John' }

let permissions1 = { canView: true }
let permissions2 = { canEdit: true }

// 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
Object.assign(user, permissions1, permissions2)
console.log(user)

// 深拷贝
/**
 *
 * @param {any} target
 * @returns {any} cloned target
 */
function deepClone(target) {
  const map = new WeakMap()

  function isObject(target) {
    return (
      (typeof target === 'object' && target) || typeof target === 'function'
    )
  }

  function clone(data) {
    if (!isObject(data)) {
      return data
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data)
    }
    if (typeof data === 'function') {
      return new Function('return ' + data.toString())()
    }
    const exist = map.get(data)
    if (exist) {
      return exist
    }
    if (data instanceof Map) {
      const result = new Map()
      map.set(data, result)
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val))
        } else {
          result.set(key, val)
        }
      })
      return result
    }
    if (data instanceof Set) {
      const result = new Set()
      map.set(data, result)
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val))
        } else {
          result.add(val)
        }
      })
      return result
    }
    const keys = Reflect.ownKeys(data)
    const allDesc = Object.getOwnPropertyDescriptors(data)
    const result = Object.create(Object.getPrototypeOf(data), allDesc)
    map.set(data, result)
    keys.forEach((key) => {
      const val = data[key]
      if (isObject(val)) {
        result[key] = clone(val)
      } else {
        result[key] = val
      }
    })
    return result
  }

  return clone(target)
}

// 设置 this 的规则不考虑对象定义。只有调用那一刻才重要。
// this 的值是在代码运行时计算出来的，它取决于代码上下文。
