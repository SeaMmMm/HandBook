(function(exports, require, module, __filename, __dirname) {
    const dependencyModule1 = require('./dependencyModule1');
    const dependencyModule2 = require('./dependencyModule2');

    let count = 0;
    const increase = () => ++count;
    const reset = () => {
        count = 0;
        console.log('hahaha count is reset');
    };
    module.exports = {
        increase,
        reset
    };

    return module.exports;
}).call(thisValue, module.exports, require, module, filename, dirname);

(function (exports, require, module, __filename, __dirname) {
    const commonJSCounterModule = require('./commonJSCounterModule')
    commonJSCounterModule.increase();
}).call(thisValue, exports, require, module, filename, dirname);