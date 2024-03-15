function getProp(obj, prop) {
  let proto = obj
  while (proto && proto[prop] === void 0) {
    proto = proto.__proto__
  }
  return proto === null ? void 0 : obj[prop]
}
