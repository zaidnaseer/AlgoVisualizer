export const linearSearch = async (array, target, setColorArray, delay) => {
    for (let i = 0; i < array.length; i++) {
        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[i] = 'yellow'; // Highlight the current element being checked
            return newColors;
        });

        await new Promise(resolve => setTimeout(resolve, delay));

        if (array[i] === target) {
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[i] = 'green'; // Highlight the found element
                return newColors;
            });
            return i; // Return the index of the found element
        }

        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[i] = 'lightgrey'; // Reset color if not found
            return newColors;
        });
    }

    return -1; // Target not found
};
