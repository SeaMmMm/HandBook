import { Request, Response } from "express"

export const SymbolPathKey = Symbol.for('router: path')

export let path = (path: string): Function => {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Reflect.defineMetadata(
            SymbolPathKey, 
            path, target, propertyKey
        )

        if (!descriptor.value) return

        // 技巧：函数封装
        let oldMethod = descriptor.value

        descriptor.value = function (req: Request, res: Response) {
            const params = Object.assign(
                {},
                req.body,
                req.query
            )
            let methodResult = oldMethod.call(this, params)
            res.send(methodResult)
        }
    }
}