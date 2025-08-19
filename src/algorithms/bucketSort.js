export const bucketSort = async (array, setArray, setColorArray, delay, stopRef, setStats) => {
    const newArray = [...array];
    const n = newArray.length;
    let comparisons = 0, swaps = 0;

    if (n <= 1) return 0;

    // Find maximum and minimum values
    let max = newArray[0];
    let min = newArray[0];
    
    for (let i = 1; i < n; i++) {
        if (stopRef.current) throw new Error('Stopped');
        
        comparisons++;
        if (newArray[i] > max) max = newArray[i];
        if (newArray[i] < min) min = newArray[i];
        
        // Highlight current element being examined
        const colors = new Array(n).fill('#66ccff');
        colors[i] = '#ff6b6b';
        setColorArray([...colors]);
        setStats({ comparisons, swaps, time: 0 });
        
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Create buckets
    const bucketCount = Math.floor(Math.sqrt(n));
    const buckets = Array.from({ length: bucketCount }, () => []);
    const range = (max - min) / bucketCount;

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        if (stopRef.current) throw new Error('Stopped');
        
        const bucketIndex = Math.min(Math.floor((newArray[i] - min) / range), bucketCount - 1);
        buckets[bucketIndex].push(newArray[i]);
        
        // Highlight element being distributed
        const colors = new Array(n).fill('#66ccff');
        colors[i] = '#ffd93d';
        setColorArray([...colors]);
        setStats({ comparisons, swaps, time: 0 });
        
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Sort individual buckets using insertion sort and concatenate
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (stopRef.current) throw new Error('Stopped');
        
        const bucket = buckets[i];
        
        // Insertion sort for each bucket
        for (let j = 1; j < bucket.length; j++) {
            if (stopRef.current) throw new Error('Stopped');
            
            const key = bucket[j];
            let k = j - 1;
            
            while (k >= 0 && bucket[k] > key) {
                if (stopRef.current) throw new Error('Stopped');
                
                comparisons++;
                bucket[k + 1] = bucket[k];
                k--;
                
                await new Promise(resolve => setTimeout(resolve, delay / 2));
            }
            bucket[k + 1] = key;
            swaps++;
        }
        
        // Place sorted bucket elements back into the array
        for (let j = 0; j < bucket.length; j++) {
            if (stopRef.current) throw new Error('Stopped');
            
            newArray[index] = bucket[j];
            
            // Highlight placement
            const colors = new Array(n).fill('#66ccff');
            colors[index] = '#4ade80';
            setColorArray([...colors]);
            setArray([...newArray]);
            setStats({ comparisons, swaps, time: 0 });
            
            index++;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    // Final green coloring to show completion
    setColorArray(new Array(n).fill('#4ade80'));
    return 0;
};
