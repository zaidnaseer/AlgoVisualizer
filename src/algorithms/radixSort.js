export const radixSort = async (array, setArray, setColorArray, delay, stopRef, setStats) => {
    const newArray = [...array];
    const n = newArray.length;
    let comparisons = 0, swaps = 0;

    // Find the maximum number to know number of digits
    const getMax = (arr) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
                comparisons++;
            }
        }
        return max;
    };

    // A function to do counting sort of arr[] according to the digit represented by exp
    const countingSort = async (arr, exp) => {
        const output = new Array(n);
        const count = new Array(10).fill(0);

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            if (stopRef.current) throw new Error('Stopped');
            
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
            
            // Highlight current element being processed
            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#ff6b6b';
            setColorArray([...colors]);
            setStats({ comparisons, swaps, time: 0 });
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            if (stopRef.current) throw new Error('Stopped');
            
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
            
            // Highlight elements being placed
            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#ffd93d';
            colors[count[digit]] = '#4da6ff';
            setColorArray([...colors]);
            setStats({ comparisons, swaps, time: 0 });
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers according to current digit
        for (let i = 0; i < n; i++) {
            if (stopRef.current) throw new Error('Stopped');
            
            arr[i] = output[i];
            swaps++;
            
            // Highlight the placement
            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#4ade80';
            setColorArray([...colors]);
            setArray([...arr]);
            setStats({ comparisons, swaps, time: 0 });
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    };

    const max = getMax(newArray);

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (stopRef.current) throw new Error('Stopped');
        await countingSort(newArray, exp);
    }

    // Final green coloring to show completion
    setColorArray(new Array(n).fill('#4ade80'));
    return 0;
};
