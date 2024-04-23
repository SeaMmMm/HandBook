// 通过给类、方法等数据定义元数据
// 元数据 —— 描绘数据的数据，会被附加到指定的类、方法之上，但是又不会影响类、方法本身

// 设置
// Reflect.defineMetadata(metadataKey, metadataValuearget, propertyKey)
// metadataKey: meta 数据的 key
// metadataValue: meta数据的值
// target: 对应的property key

console.log('#####################')
console.log('元数据手动挂载开始')
// 自定义元数据
import 'reflect-metadata'

class Test {
  public static clsMethod() {}
  public instMethod() {}
}

let obj = new Test()

// 写
Reflect.defineMetadata('meta', 'class', Test)
Reflect.defineMetadata('meta', 'class method', Test, 'clsMethod')
Reflect.defineMetadata('meta', 'instance', obj)
Reflect.defineMetadata('meta', 'instance method', obj, 'instMethod')

// 读
console.log(Reflect.getMetadata('meta', Test))
console.log(Reflect.getMetadata('meta', Test, 'clsMethod'))
console.log(Reflect.getMetadata('meta', obj))
console.log(Reflect.getMetadata('meta', obj, 'instMethod'))

console.log('#####################')
console.log('装饰器结合元数据')
function classDecorator(): ClassDecorator {
  return (target) => {
    console.log('classDecorator')
    Reflect.defineMetadata('meta', 'class', target)
  }
}

function staticMethodDecorator(): MethodDecorator {
  return (target, key, descriptor) => {
    console.log('staticMethodDecorator')
    Reflect.defineMetadata('meta', 'clsMethod', target, key)
  }
}

function methodDecorator(): MethodDecorator {
  return (target, key, descriptor) => {
    console.log('methodDecorator')
    Reflect.defineMetadata('meta', 'instMethod', target, key)
  }
}

function methodDecorator2(): MethodDecorator {
  return (target, key, descriptor) => {
    console.log('methodDecorator2')
  }
}

@classDecorator()
class Test2 {
  @staticMethodDecorator()
  public static clsMethod() {}
  @methodDecorator()
  @methodDecorator2()
  public instMethod() {}
}

let obj2 = new Test2()
Reflect.defineMetadata('meta', 'instance', obj2)
console.log(Reflect.getMetadata('meta', Test2))
console.log(Reflect.getMetadata('meta', Test2, 'clsMethod'))
console.log(Reflect.getMetadata('meta', obj2))
console.log(Reflect.getMetadata('meta', obj2, 'instMethod'))
console.log('#####################')
console.log('直接绑定元数据')

@Reflect.metadata('meta', 'class')
class Test3 {
  @Reflect.metadata('meta', 'clsMethod')
  public static clsMethod() {}
  @Reflect.metadata('meta', 'method-meta')
  public instMethod() {}
}

console.log('#####################')
