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

效果:

<video src="./css笔记.assets/录屏2024-01-07 下午5.54.45.mov"></video>



