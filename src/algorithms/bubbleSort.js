export const bubbleSort = async (array, setColorArray, delay) => {
    const n = array.length;
    const colorArray = new Array(n).fill('lightgrey');

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            colorArray[j] = 'red';
            colorArray[j + 1] = 'red';
            setColorArray([...colorArray]);
            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }

            colorArray[j] = 'lightgrey';
            colorArray[j + 1] = 'lightgrey';
            setColorArray([...colorArray]);
        }
        colorArray[n - i - 1] = 'green';
        setColorArray([...colorArray]);
    }
    colorArray[0] = 'green';
    setColorArray([...colorArray]);
    return array;
};