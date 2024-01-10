[TOC]

# 组件拆分

`React`项目组件拆分一般都有三种：

- **无状态组件** 这种组件一般都没有状态，只是简单地呈现内容或数据，一般都是非常小的组件（如`logo组件`等等），并且他们的可重用性非常高
- **有状态组件** 不能被高度重用，重点在于他的功能性强，可以满足一定需求，比如说搜索组件,可以在应用程序中随意使用输入的值.
- **结构组件** 可以吧结构组件看成是程序的 页面 布局 或者是屏幕,它通常是由许多较小的组件组成的,而且一般比较大,可重用性非常低(*一般*)



# 避免不必要的渲染

在 `react` 组件中一些不会改变的值不要写在函数内部,直接放在外面,避免重渲染造成资源浪费,比如:

<img src="./React HandBook.assets/image-20240106下午90946807.png" alt="image-20240106下午90946807" style="zoom:25%;" />

样式对象放在组件外部(可以理解成全局变量),其他类似情况也是这样做



# 注意适当的 props

<img src="./React HandBook.assets/image-20240107下午41620360.png" alt="image-20240107下午41620360" style="zoom:20%;" />



# 清理API请求

这点与 `React`本身无关,是属于`js`的知识

因为在软件中如果一直获取 api 请求而不及时清理,会造成资源浪费,甚至是影响到整个程序的流畅性,一般会使用`AbortController`

<img src="./React HandBook.assets/截屏2024-01-10 下午3.59.34.png" alt="截屏2024-01-10 下午3.59.34" style="zoom:40%;" />

与`fetch`连接起来,在`useEffect`勾子中调用清理函数:

```react
import 'useEffect' from 'React'

const controller = new AbortController();

useEffect(() => {
  // ... 

  return () => {
    controller.abort();
  }
}, [query])
```

