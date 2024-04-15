const compose = (f, g) => (x) => f(g(x))

const sum = (a) => (b) => a + b
const sum1 = sum(1)
const sum2 = sum(2)

const sum12 = compose(sum1, sum2)
console.log(sum12(1))
