let count = 0;

export const increase = () => ++count;
export const reset = () => {
    count = 0;
    console.log('hahaha count is reset');
};
