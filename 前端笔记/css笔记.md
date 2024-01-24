[TOC]



# 文本溢出显示省略号

1. 单行显示省略号

```css
// 溢出隐藏
overflow: hidden;
// 溢出的文本呈现为省略号
text-overflow:ellipsis;
// 禁止文本换行
white-space: nowrap;
```

效果:![image-20240107下午52108372](./css笔记.assets/image-20240107下午52108372.png)

<img src="./css笔记.assets/image-20240107下午52128300.png" alt="image-20240107下午52128300" style="zoom:25%;" />



2. 多行显示省略号

```css
// 溢出隐藏
overflow: hidden;
// 溢出的文本呈现为省略号
text-overflow: ellipsis;
// 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
display: -webkit-box;
// 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
-webkit-box-orient: vertical;
// 是一个 不规范的属性 必须结合上面三个属性来使用
// 这里的值写成 几 , 那么就显示几行
-webkit-line-clamp: 3;
```

效果:

![image-20240107下午52534581](./css笔记.assets/image-20240107下午52534581.png)

<img src="./css笔记.assets/image-20240107下午52542880.png" alt="image-20240107下午52542880" style="zoom:25%;" />



3. 还有可以使用 `js` 来控制(之前 `react` 中用到的一个例子)

```react
import { useState } from "react";
import styled from "styled-components";

const TextBox = ({ children, showWords = 10 }) => {
  const [maxWords, setMaxWords] = useState(showWords);
  const [showAll, setShowAll] = useState(false);

  const textTemple = children;

  const handleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <Wrapper $maxWords={maxWords}>
      {showAll ? textTemple : `${children.substring(0, maxWords)}... `}
      <span
        onClick={handleClick}
        style={{ color: "purple", fontWeight: "bold", cursor: "pointer" }}
      >
        {showAll ? "查看更少" : "查看更多"}
      </span>
    </Wrapper>
  );
};

export default TextBox;

const Wrapper = styled.div``;

```



# Basic Css

## 一些伪类

### `:first-child :last-child :nth-child()`

```css
li:first-child {
  /* ... */
}
```

`:first-child` 选择父元素中下一个孩子，`last-child` 选择父元素中的最后一个孩子，`nth-child()` 括号中数字代指第几个孩子

`nth-child(odd)`选择所有的奇数子元素，`nth-child(even)`相反，选择所有偶数子元素

如果是这种情况：

```css
article p:last-child {
  /* ... */
}
```

这里意思就变成了在 `article` 这个父元素中，找到他的一个子元素 `p` ，并且这个元素是他的最后一个子元素



### `:link :visited :hover :active`

这几个伪类都是给超链接用的，除了`:hover` 在其他地方也经常使用

- `:link` 设置超链接的一般样式
- `:visited` 设置在超链接在访问过后显示的样子
- `:hover` 设置鼠标悬停在超链接上方时的样式
- `:active` 设置鼠标点击超链接时的样子

>  ⚠️注意，最好就是按照这几个顺序写样式-- "LVHA" 打乱顺序的话可能会出现莫名其妙的问题



## 优先级

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240124%E4%B8%8B%E5%8D%88122510089.png" alt="image-20240124下午122510089"  />



## 继承

![image-20240124下午123441808](./css%E7%AC%94%E8%AE%B0.assets/image-20240124%E4%B8%8B%E5%8D%88123441808.png)





# Advanced Css

## Step1 Natours

### 多边形剪切效果

这里用到的是：`clip-path` 属性，用法一般是：` clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%)`

四个参数分别代表每个矩形的四个角，从左上顺时针旋转

每个参数都有两个值，分别代表 x 轴和 y 轴的偏移量：

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%8860315475-5917810.png" alt="image-20240122下午60315475" style="zoom: 50%;" />

本项目中不添加这个的样子：

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%8860440872.png" alt="image-20240122下午60440872" style="zoom:20%;" />

添加后：

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%8860507129.png" alt="image-20240122下午60507129" style="zoom:25%;" />



### 位置居中的一个方法

就像上面的那个单词：`OUTDOORS` 和下面的一行单词居于这个背景图片的中间，这里使用的是绝对布局，把这个背景图片设置成相对定位，字设置成绝对定位：

```css
.text-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
```

这里用了`top: 40%; left: 50%`，形成的效果是这样的：

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%8895817230.png" alt="image-20240122下午95817230" style="zoom:25%;" />

加上这句：`transform: translate(-50%, -50%);`，马上就得到我们想要的样子：

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%8895906208.png" alt="image-20240122下午95906208" style="zoom:25%;" />

为什么？

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%88101745015.png" alt="image-20240122下午101745015" style="zoom: 50%;" />

<img src="./css%E7%AC%94%E8%AE%B0.assets/image-20240122%E4%B8%8B%E5%8D%88101836665.png" alt="image-20240122下午101836665" style="zoom:50%;" />



​	
