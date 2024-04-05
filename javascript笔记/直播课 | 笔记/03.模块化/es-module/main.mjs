// import defaultFunc, { addA, print } from './deps1.mjs'
import func, * as deps1 from './deps1.mjs'

import deps2 from './deps2.mjs'

// defaultFunc()
// addA()
// print()


func()
deps1.addA()
deps1.print()


deps2()

import("./async-deps3.mjs").then(mod => {
    mod.reset()
})