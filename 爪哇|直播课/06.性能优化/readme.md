### 性能优化进阶
#### Navigation Timing API
```js
    // index.html
    <script>
        javascript:(() => {
            const perfData = window.performance.timing
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart

            console.log('当前页面加载耗时：', pageLoadTime, 'ms')
        })
    </script>

    // 上报数据 + 用户｜产研 + 主动定位 => 发掘性能问题
```

#### Core Web Vitals - 网页核心性能指标
* Google提出的衡量标准
可量化的，并反映真实主观体验：加载、交互性、稳定性

##### Largest Contentful Paint (LCP)
衡量装载性能
* 前2.5s内完成最大内容的渲染

a. 最大内容包括哪些？
- <img> 元素
- <svg> 元素
- <video> 元素
- 通过url()函数加载的背景图片元素
- 包含文本节点或其他内联文本元素子集的块级元素

b. LCP低下的原因
- 服务器响应慢 => 缓存
- 阻断JS和CSS的渲染 => JS DOM渲染是互斥的
- 资源加载未优化 => 上云 CDN
- 客户端渲染机器性能影响 => 提升页面脚本性能

##### First Input Delay (FID)
衡量交互性。
* 页面首次输入延迟应该小于100ms

a. js执行过多
    - 避免非必要的js后置执行
    - 尽量减少polyfill

b. 耗时任务过多
    - 阻塞主线程50ms以上的 => ‘长任务’
    - 拆分 & 降级

c. 单线程导致的队列阻塞
    - worker

MS
```js
    // main.js
    // 新增worker
    const myWorker = new Worker('worker.js')

    // 主从通信
    myWorker.postMessage('hello')
    myWorker.onmessage = function(e) {
        // ....
    }

    // worker.js
    // 数组遍历 + 读取 + js计算
    self.onmessage = function() {
        // ...
        self.postMessage(result);
    }
```

#### Cumulative Layout Shift (CLS)
衡量视觉稳定性
* 布局的移动可能发生在两个相邻帧之间，页面的CLS小于0.1
  
a. 不使用无尺寸元素
 => 图片、视频、头像……

b. 减少内容插入 => 减少影响布局元素的出现

c. 控制字体

#### 插件 Core Web Vitals Annotations

#### 性能优化体系
a) 埋点上报 => 点到点 + 信息采集 + 主动上报
b) 数据处理 => 数据计算 + 阈值设置 + 数据分类
c) 可视化展示
d) 告警处理
e) 预警体系