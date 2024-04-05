(function () {
    var a = 1
    var b = 2
    var c = 3
    console.log("来自 main() ", a, b, c)

    setTimeout(() => {
        console.log("来自 main() 一秒后的值", a, b, c)
    }, 1000)
})()

// main()
// console.log("来自 main.js ", a, b, c)

module1.addA()
module1.addB()
module1.print()
