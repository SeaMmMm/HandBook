## vue 基础用法

### 理论

#### 面试题 1: 简单聊聊对于 MVVM 的理解

a. 语义化模版
b. MVC - model view controller
c. MVVM - model view viewModel
i. 数据本身会绑定在 viewmodel 层，视图层跟 viewmodel 层关联
ii.i 视图发生变化 => viewModel => 更改数据
ii.ii 数据发生变化 => viewModel => 更新视图

双向绑定

### 写法

#### vue 是如何利用 mvvm 思想进行写法统一和前端开发

数据双向绑定
a. 利用花括号，构筑了数据与 vm 的绑定关系 => buidTemplate => build
b. 通过视图绑定事件，来处理数据 => v-model => :value @input => model

```js
    <a-component v-model="data1"></a-component>

    // a-component
    props: {
        value: {
            type: string,
            default: ''
        }
    },
    methods: {
        handleChangeValue() {
            this.$emit('input', dataSon)
        }
    },
```

buidTemplate => render()

```js
    <template>
        <div class='data1'>{{ data1 }}</div>
    </template>

    render() {
        return (
            <div class='data1'>{ this.data1 }</div>
        )
    }
    // v8 javascript设计模式 javascript语言精粹

```

#### 生命周期

##### 面试题：vue 生命周期

创建阶段：beforeCreate（setup） => created（setup） => beforemount => mounted

bC: new Vue() - 实例创建阶段
c: data | props | method | computed - 数据操作 => 不涉及 vdom 以及 dom 操作

bM：vDOM - 数据操作都可以进行，不涉及 dom
m：DOM - 任何操作

更新阶段：beforeUpdate => updated
bU: vDom 完成更新，dom 旧
u: dom 已经更新 => 谨慎修改数据

销毁阶段：beforeDestroy（beforeUnmount） => destroyed（unmounted）
bD: 实例未被销毁 - 清空 eventBus...
d: 实例已经被销毁

#### 指令 ｜ 监听

#### 条件

v-if v-show
v-else v-else-if

#### 循环

v-for
=> for & if
=> vue2.x v-for
=> vue3.x v-if

#### 其他

v-model v-once v-text v-html v-bind v-on
自定义指令

```js
    directives: {
        zhaowa: {
            update: function() {}
        }
    }
```

#### watch & computed

vue 2.x 3.x
