export const selectionSort = async (array, setColorArray, delay) => {
    const n = array.length;
    const colorArray = new Array(n).fill('lightgrey');

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        colorArray[minIndex] = 'red';
        setColorArray([...colorArray]);
        await new Promise(resolve => setTimeout(resolve, delay));

        for (let j = i + 1; j < n; j++) {
            colorArray[j] = 'yellow';
            setColorArray([...colorArray]);
            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] < array[minIndex]) {
                colorArray[minIndex] = 'lightgrey';
                minIndex = j;
                colorArray[minIndex] = 'red';
                setColorArray([...colorArray]);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                colorArray[j] = 'lightgrey';
                setColorArray([...colorArray]);
            }
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }

        colorArray[minIndex] = 'lightgrey';
        colorArray[i] = 'green';
        setColorArray([...colorArray]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    colorArray[n - 1] = 'green';
    setColorArray([...colorArray]);
    return array;
};