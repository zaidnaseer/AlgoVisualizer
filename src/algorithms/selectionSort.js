export const selectionSort = async (array, setArray, delay) => {
    let arr = [...array];
    const bars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            bars[minIndex].style.backgroundColor = 'red';
            bars[j].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, delay));

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            bars[minIndex].style.backgroundColor = 'dodgerblue';
            bars[j].style.backgroundColor = 'dodgerblue';
        }

        // Swap elements
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
    }
};
