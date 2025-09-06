export const shellSort = async (array, setColorArray, delay) => {
    const n = array.length;
    const colorArray = new Array(n).fill('lightgrey');
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j;
            
            // Highlight the current element being processed
            colorArray[i] = 'red';
            setColorArray([...colorArray]);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Shift earlier gap-sorted elements up until the correct location for array[i] is found
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                // Highlight the element being compared
                colorArray[j - gap] = 'orange';
                setColorArray([...colorArray]);
                await new Promise(resolve => setTimeout(resolve, delay));
                
                // Move the element
                array[j] = array[j - gap];
                
                // Reset color after moving
                colorArray[j - gap] = 'lightgrey';
                setColorArray([...colorArray]);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            // Put temp (the original array[i]) in its correct location
            array[j] = temp;
            
            // Reset the color of the current element
            colorArray[i] = 'lightgrey';
            setColorArray([...colorArray]);
        }
        
        // Brief pause between gap iterations
        await new Promise(resolve => setTimeout(resolve, delay * 2));
    }
    
    // Final coloring - turn all elements green to show completion
    for (let i = 0; i < n; i++) {
        colorArray[i] = 'green';
        setColorArray([...colorArray]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return array;
};