export const symbolHttpMethodsKey = Symbol("router:httpMethod")

export const httpGet = function (target: any, propertyKey: string) {
    // 补充挂在到调用装饰器的方法上
    Reflect.defineMetadata(symbolHttpMethodsKey, 'get', target, propertyKey)
}

export const httpPost = function (target: any, propertyKey: string) {
    Reflect.defineMetadata(symbolHttpMethodsKey, 'get', target, propertyKey)
}