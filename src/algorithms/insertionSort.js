export const insertionSort = async (array, setColorArray, delay) => {
    const n = array.length;
    const colorArray = new Array(n).fill('lightgrey');

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        colorArray[i] = 'red';
        setColorArray([...colorArray]);
        await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            colorArray[j] = 'red';
            setColorArray([...colorArray]);
            await new Promise(resolve => setTimeout(resolve, delay));
            colorArray[j] = 'lightgrey';
            j = j - 1;
        }
        array[j + 1] = key;

        colorArray[i] = 'lightgrey';
        setColorArray([...colorArray]);
    }

    for (let i = 0; i < n; i++) {
        colorArray[i] = 'green';
        setColorArray([...colorArray]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    return array;
};