## TS 原理

```ts
    // 1. 源码输入
    let a = 2;

    // 2. 扫描器scanner生成令牌流
    [
        "let" : "keyword",
        "a" : "identifier",
        "=" : "assignment",
        "2" : "integer",
        ";" : "eos"
    ]

    // 3. 解析器parser生成AST
    {
        operation: "=",
        left: {
            keyword: "let",
            right: "a"
        }
        right: "2"
    }

    // 4. 绑定器
    // 创建了一个从AST节点到符号（node.symbol）的引用连接

    // 5. 校验器checker
    // 检查TS语法错误

    // 6. 发射器emitter
    // 根据每个node翻译成js
```
