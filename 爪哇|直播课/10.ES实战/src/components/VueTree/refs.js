// 对于整棵树进行抽象
class Ref {
  constructor(opts, tree) {
    let name = (this.name = opts.name)
    this.tree = tree
    this.refs = {}
    refs[name] = this
  }

  get(cid) {
    return cid ? this.refs[cid] : this.tree
  }

  set(vm) {
    let cid = vm.cid
    this.refs[cid] = vm
  }
}

// 一整棵树
let refs = {}

// 初始化实例方法
let init = function (opts, tree) {
  let name = opts.name
  if (!refs[name]) {
    return new Ref(opts, tree)
  }
  return refs[name]
}

// 销毁
let destroy = function (name) {
  refs[name] && delete refs[name]
}

// 获取
let get = function (name, cid) {
  return refs[name] && refs[name].get(cid)
}

// 设置
let set = function (name, vm) {
  refs[name] && refs[name].set(vm)
}

export { init, destroy, get, set }
