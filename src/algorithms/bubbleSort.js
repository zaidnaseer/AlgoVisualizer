// src/algorithms/bubbleSort.js

export const bubbleSort = async (array) => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            const bars = document.querySelectorAll(".array-bar");
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, 100));
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 5}px`;
                bars[j + 1].style.height = `${array[j + 1] * 5}px`;
            }
            bars[j].style.backgroundColor = "dodgerblue";
            bars[j + 1].style.backgroundColor = "dodgerblue";
        }
    }
};
