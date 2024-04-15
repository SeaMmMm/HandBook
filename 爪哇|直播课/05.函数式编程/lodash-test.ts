import _ from 'lodash'
var fp = require('lodash/fp')
const arr = [1, 2, 3, 4]
const res = _.map(arr, (i) => i + 1)
const res2 = _.filter(res, (i) => i > 2)
const res3 = _.flatMap(res2, (i) => [i * 1, i * 2])
const res4 = _.groupBy(res3, (i) => i % 2)
console.log(res4)

const addOne = fp.map((i) => i + 1)
const gtTwo = fp.filter((i) => i > 2)
const flat = fp.flatMap((i) => [i * 1, i * 2])
const groupBy = fp.groupBy((i) => i % 2)
// console.log(groupBy(flat(gtTwo(addOne(arr)))))
const func = fp.flow(addOne, gtTwo, flat, groupBy)
console.log(func(arr))
