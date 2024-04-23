"use strict";
// 通过给类、方法等数据定义元数据
// 元数据 —— 描绘数据的数据，会被附加到指定的类、方法之上，但是又不会影响类、方法本身
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// 设置
// Reflect.defineMetadata(metadataKey, metadataValuearget, propertyKey)
// metadataKey: meta 数据的 key
// metadataValue: meta数据的值
// target: 对应的property key
console.log("#####################");
console.log("元数据手动挂载开始");
// 自定义元数据
require("reflect-metadata");
class Test {
    static clsMethod() { }
    instMethod() { }
}
let obj = new Test();
// 写
Reflect.defineMetadata('meta', 'class', Test);
Reflect.defineMetadata('meta', 'class method', Test, 'clsMethod');
Reflect.defineMetadata('meta', 'instance', obj);
Reflect.defineMetadata('meta', 'instance method', obj, 'instMethod');
// 读
console.log(Reflect.getMetadata('meta', Test));
console.log(Reflect.getMetadata('meta', Test, 'clsMethod'));
console.log(Reflect.getMetadata('meta', obj));
console.log(Reflect.getMetadata('meta', obj, 'instMethod'));
console.log("#####################");
console.log('装饰器结合元数据');
function classDecorator() {
    return target => {
        console.log('classDecorator');
        Reflect.defineMetadata('meta', 'class', target);
    };
}
function staticMethodDecorator() {
    return (target, key, descriptor) => {
        console.log('staticMethodDecorator');
        Reflect.defineMetadata('meta', 'clsMethod', target, key);
    };
}
function methodDecorator() {
    return (target, key, descriptor) => {
        console.log('methodDecorator');
        Reflect.defineMetadata('meta', 'instMethod', target, key);
    };
}
function methodDecorator2() {
    return (target, key, descriptor) => {
        console.log('methodDecorator2');
    };
}
let Test2 = class Test2 {
    static clsMethod() { }
    instMethod() { }
};
__decorate([
    methodDecorator(),
    methodDecorator2(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Test2.prototype, "instMethod", null);
__decorate([
    staticMethodDecorator(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Test2, "clsMethod", null);
Test2 = __decorate([
    classDecorator()
], Test2);
let obj2 = new Test2();
Reflect.defineMetadata('meta', 'instance', obj2);
console.log(Reflect.getMetadata('meta', Test2));
console.log(Reflect.getMetadata('meta', Test2, 'clsMethod'));
console.log(Reflect.getMetadata('meta', obj2));
console.log(Reflect.getMetadata('meta', obj2, 'instMethod'));
console.log("#####################");
