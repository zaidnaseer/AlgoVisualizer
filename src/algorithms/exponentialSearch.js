import { binarySearch } from './binarySearch';

export const exponentialSearch = async (array, target, setColorArray, delay) => {
    if (array[0] === target) {
        setColorArray([ 'green', ...Array(array.length - 1).fill('lightgrey') ]);
        return 0;
    }

    let i = 1;
    while (i < array.length && array[i] <= target) {
        await new Promise(resolve => setTimeout(resolve, delay));
        // eslint-disable-next-line no-loop-func
        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[i] = 'yellow';
            return newColors;
        });
        i *= 2;
    }

    return await binarySearch(
        array.slice(i / 2, Math.min(i, array.length)),
        target,
        setColorArray,
        delay
    );
};
