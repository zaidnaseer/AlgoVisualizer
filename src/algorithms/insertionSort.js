export const insertionSort = async (array, setArray, delay) => {
    let arr = [...array];
    const bars = document.getElementsByClassName('array-bar');

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && arr[j] > current) {
            bars[j].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, delay));
            arr[j + 1] = arr[j];
            bars[j].style.height = `${arr[j] * 5}px`;
            j--;
        }

        arr[j + 1] = current;
        setArray([...arr]);
        bars[i].style.backgroundColor = 'dodgerblue';
    }
};
