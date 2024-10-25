export const binarySearch = async (array, target, setColorArray, delay) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[mid] = 'yellow'; // Highlight the middle element
            return newColors;
        });

        await new Promise(resolve => setTimeout(resolve, delay));

        if (array[mid] === target) {
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid] = 'green'; // Target found
                return newColors;
            });
            return mid;
        } else if (array[mid] < target) {
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid] = 'lightgrey'; // Reset color if not found
                return newColors;
            });
            left = mid + 1;
        } else {
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid] = 'lightgrey'; // Reset color if not found
                return newColors;
            });
            right = mid - 1;
        }
    }

    return -1; // Target not found
};
