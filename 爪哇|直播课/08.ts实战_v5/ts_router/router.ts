import { Router } from 'express'
import {
  httpGet,
  httpPost,
  symbolHttpMethodsKey,
} from 'decorators/http-methods'
import { path, SymbolPathKey } from 'decorators/path'

// 模块抽象 - 用户对象
class User {
  // 登入
  // 1. post请求逻辑
  @httpPost
  // 2. path逻辑
  @path('/user/login')
  login() {
    return 'user login'
  }

  // 登出
  // 1. get请求逻辑
  @httpGet
  // 2. path逻辑
  @path('/user/logout')
  exit() {
    return 'user logout'
  }
}

export default (app: Router) => {
  let user = new User()
  for (let methodName in user) {
    let method = user[methodName]

    if (typeof method !== 'function') break

    // 反射
    let httpMethod = Reflect.getMetadata(symbolHttpMethodsKey, user, methodName)
    let path = Reflect.getMetadata(SymbolPathKey, user, methodName)

    app[httpMethod](path, method)
    // app.get('/user/login', () => any)
  }
}
