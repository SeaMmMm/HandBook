var module1 = (function () {
    var a = 10
    var b = 20
    var c = 30
    console.log("来自 deps1.js", a, b, c)
    function addA() {
        a++
    }
    function addB() {
        b++
    }
    function addC() {
        c++
    }
    function print() {
        console.log("a,b,c = ", a, b, c)
    }
    return {
        addA,
        addB,
        addC,
        print
    }
})()
