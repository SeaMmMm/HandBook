const obj1 = {
  a: 1,
  b: {
    c: 111,
    d: 222,
    g: 333,
  },
  e: {
    g: 333,
  },
}

const obj2 = {
  a: 1,
  c: 'sss',
  b: {
    c: 1111,
    d: 222,
    f: 333,
  },
  e: {
    g: 23,
  },
}

function mergeObj(obj1, obj2) {
  const obj1K = Object.keys(obj1)

  for (let i = 0; i < obj1K.length; i++) {
    if (typeof obj1[obj1K[i]] !== 'object') {
      obj1[obj1K[i]] = obj2[obj1K[i]] ? obj2[obj1K[i]] : obj1[obj1K[i]]
    } else {
      obj1[obj1K[i]] = { ...obj1[obj1K[i]], ...obj2[obj1K[i]] }
    }
  }
  return { ...obj2, ...obj1 }
}
console.log(mergeObj(obj1, obj2))
