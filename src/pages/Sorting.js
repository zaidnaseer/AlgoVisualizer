import React, { useState, useEffect, useRef } from 'react';
import CodeExplanation from '../components/CodeExplanation';
import SimpleExportControls from '../components/SimpleExportControls';
import '../styles/pages.css';
import '../styles/Sorting.css';

const Sorting = () => {
    const [array, setArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('Ready to sort!');
    const [delay, setDelay] = useState(100);
    const [algorithm, setAlgorithm] = useState('bubbleSort');
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(20);
    const [statistics, setStatistics] = useState({ comparisons: 0, swaps: 0, time: 0 });
    const [startTime, setStartTime] = useState(null);
    const stopSortingRef = useRef(false);
    const [showCodeExplanation, setShowCodeExplanation] = useState(false);

    useEffect(() => {
        const generateNewArray = () => {
            const randomArray = Array.from({ length: arraySize }, () =>
                Math.floor(Math.random() * 300) + 10
            );
            setArray(randomArray);
            setColorArray(new Array(arraySize).fill('#66ccff'));
            setMessage('New array generated. Ready to sort!');
            setIsSorting(false);
        };
        generateNewArray();
    }, [arraySize]);

    const generateArray = () => {
        const randomArray = Array.from({ length: arraySize }, () =>
            Math.floor(Math.random() * 300) + 10
        );
        setArray(randomArray);
        setColorArray(new Array(arraySize).fill('#66ccff'));
        setMessage('New array generated. Ready to sort!');
        setIsSorting(false);
    };

    const handleSort = async () => {
        setIsSorting(true);
        stopSortingRef.current = false;
        setStatistics({ comparisons: 0, swaps: 0, time: 0 });
        setStartTime(Date.now());
        setMessage(`Sorting with ${getAlgorithmName()} algorithm...`);

        let result = -1;
        try {
            switch (algorithm) {
                case 'selectionSort':
                    result = await selectionSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                case 'mergeSort':
                    result = await mergeSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                case 'insertionSort':
                    result = await insertionSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                case 'quickSort':
                    result = await quickSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                default:
                    result = await bubbleSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
            }

            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            setStatistics(prev => ({ ...prev, time: timeTaken }));

            if (stopSortingRef.current) {
                setMessage('❌ Sorting was stopped');
                setColorArray(new Array(arraySize).fill('#66ccff'));
            } else if (result === -1) {
                setMessage('Sorting failed or was interrupted');
            } else {
                setMessage(`🎉 Sorting completed in ${timeTaken}ms!`);
                setColorArray(new Array(arraySize).fill('#4ade80'));
            }
        } catch (error) {
            setMessage('❌ Sorting was stopped');
            setColorArray(new Array(arraySize).fill('#66ccff'));
        }
        setIsSorting(false);
    };

    const handleStop = () => {
        stopSortingRef.current = true;
        setIsSorting(false);
        setMessage('🛑 Stopping sorting...');
        setColorArray(new Array(arraySize).fill('#66ccff'));
    };

    const getAlgorithmName = () => {
        const names = {
            'bubbleSort': 'Bubble Sort',
            'selectionSort': 'Selection Sort',
            'mergeSort': 'Merge Sort',
            'insertionSort': 'Insertion Sort',
            'quickSort': 'Quick Sort'
        };
        return names[algorithm];
    };

    const getAlgorithmInfo = () => {
        const info = {
            'bubbleSort': {
                description: 'Compares adjacent elements and swaps them if they are in wrong order.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n)',
                stable: 'Yes'
            },
            'selectionSort': {
                description: 'Finds the minimum element and places it at the beginning.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n²)',
                stable: 'No'
            },
            'mergeSort': {
                description: 'Divides array into halves, sorts them and merges back.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                bestCase: 'O(n log n)',
                stable: 'Yes'
            },
            'insertionSort': {
                description: 'Builds sorted array one element at a time.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n)',
                stable: 'Yes'
            },
            'quickSort': {
                description: 'Selects a pivot and partitions the array into two halves, then sorts them.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(log n)',
                bestCase: 'O(n log n)',
                stable: 'No'
            }
        };
        return info[algorithm];
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const bubbleSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            if (stopRef.current) throw new Error('Stopped');

            for (let j = 0; j < n - i - 1; j++) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;

                const colors = new Array(n).fill('#66ccff');
                colors[j] = '#ff6b6b';
                colors[j + 1] = '#ff6b6b';
                setColorArray([...colors]);

                await sleep(delay);

                if (newArray[j] > newArray[j + 1]) {
                    [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
                    swaps++;
                    setArray([...newArray]);

                    colors[j] = '#ffd93d';
                    colors[j + 1] = '#ffd93d';
                    setColorArray([...colors]);

                    await sleep(delay);
                }

                setStats({ comparisons, swaps, time: 0 });
            }

            const colors = new Array(n).fill('#66ccff');
            for (let k = n - i - 1; k < n; k++) {
                colors[k] = '#4ade80';
            }
            setColorArray([...colors]);
        }

        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const selectionSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            if (stopRef.current) throw new Error('Stopped');

            let minIdx = i;

            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#ffd93d';
            setColorArray([...colors]);

            for (let j = i + 1; j < n; j++) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;

                colors[j] = '#ff6b6b';
                setColorArray([...colors]);

                await sleep(delay);

                if (newArray[j] < newArray[minIdx]) {
                    if (minIdx !== i) colors[minIdx] = '#66ccff';
                    minIdx = j;
                    colors[minIdx] = '#4da6ff';
                } else {
                    colors[j] = '#66ccff';
                }
                setColorArray([...colors]);
                setStats({ comparisons, swaps, time: 0 });
            }

            if (minIdx !== i) {
                [newArray[i], newArray[minIdx]] = [newArray[minIdx], newArray[i]];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
            }

            for (let k = 0; k <= i; k++) {
                colors[k] = '#4ade80';
            }
            setColorArray([...colors]);
            setStats({ comparisons, swaps, time: 0 });
        }

        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const insertionSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < n; i++) {
            if (stopRef.current) throw new Error('Stopped');

            const key = newArray[i];
            let j = i - 1;

            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#ffd93d';
            setColorArray([...colors]);
            await sleep(delay);

            while (j >= 0 && newArray[j] > key) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;
                colors[j] = '#ff6b6b';
                colors[j + 1] = '#ff6b6b';
                setColorArray([...colors]);

                newArray[j + 1] = newArray[j];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
                setStats({ comparisons, swaps, time: 0 });

                j--;
            }

            newArray[j + 1] = key;
            setArray([...newArray]);

            for (let k = 0; k <= i; k++) {
                colors[k] = '#4ade80';
            }
            setColorArray([...colors]);
            await sleep(delay);
        }

        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const mergeSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        let comparisons = 0, swaps = 0;

        const merge = async (left, mid, right) => {
            if (stopRef.current) throw new Error('Stopped');

            const leftArr = newArray.slice(left, mid + 1);
            const rightArr = newArray.slice(mid + 1, right + 1);

            let i = 0, j = 0, k = left;

            while (i < leftArr.length && j < rightArr.length) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;
                const colors = new Array(newArray.length).fill('#66ccff');
                colors[k] = '#ffd93d';
                setColorArray([...colors]);

                if (leftArr[i] <= rightArr[j]) {
                    newArray[k] = leftArr[i];
                    i++;
                } else {
                    newArray[k] = rightArr[j];
                    j++;
                }

                swaps++;
                setArray([...newArray]);
                setStats({ comparisons, swaps, time: 0 });
                await sleep(delay);
                k++;
            }

            while (i < leftArr.length) {
                if (stopRef.current) throw new Error('Stopped');
                newArray[k] = leftArr[i];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
                i++;
                k++;
            }

            while (j < rightArr.length) {
                if (stopRef.current) throw new Error('Stopped');
                newArray[k] = rightArr[j];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
                j++;
                k++;
            }
        };

        const mergeSortHelper = async (left, right) => {
            if (left < right) {
                if (stopRef.current) throw new Error('Stopped');

                const mid = Math.floor((left + right) / 2);
                await mergeSortHelper(left, mid);
                await mergeSortHelper(mid + 1, right);
                await merge(left, mid, right);
            }
        };

        await mergeSortHelper(0, newArray.length - 1);
        setColorArray(new Array(newArray.length).fill('#4ade80'));
        return 0;
    };

    const quickSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        async function partition(low, high) {
            let pivot = newArray[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (stopRef.current) throw new Error('Stopped');
                comparisons++;
                const colors = new Array(n).fill('#66ccff');
                colors[j] = '#ff6b6b';
                colors[high] = '#ffd93d';
                setColorArray([...colors]);
                await sleep(delay);

                if (newArray[j] < pivot) {
                    i++;
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                    swaps++;
                    setArray([...newArray]);
                    colors[i] = '#ffd93d';
                    colors[j] = '#ffd93d';
                    setColorArray([...colors]);
                    await sleep(delay);
                }
                setStats({ comparisons, swaps, time: 0 });
            }
            [newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]];
            swaps++;
            setArray([...newArray]);
            const colors = new Array(n).fill('#66ccff');
            colors[i + 1] = '#4ade80';
            colors[high] = '#4ade80';
            setColorArray([...colors]);
            await sleep(delay);
            setStats({ comparisons, swaps, time: 0 });
            return i + 1;
        }

        async function quickSortHelper(low, high) {
            if (low < high) {
                if (stopRef.current) throw new Error('Stopped');
                let pi = await partition(low, high);
                await quickSortHelper(low, pi - 1);
                await quickSortHelper(pi + 1, high);
            }
        }

        await quickSortHelper(0, n - 1);
        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const ALGORITHM_PSEUDOCODE = {
        bubbleSort: [
            { code: 'for i from 0 to n-1', explain: 'Repeat for each element in the array.' },
            { code: '  for j from 0 to n-i-2', explain: 'Compare each pair of adjacent elements.' },
            { code: '    if arr[j] > arr[j+1]', explain: 'Check if the current number is greater than the next number.' },
            { code: '      swap arr[j] and arr[j+1]', explain: 'Swap them if they are in the wrong order.' }
        ],
        selectionSort: [
            { code: 'for i from 0 to n-1', explain: 'Repeat for each element in the array.' },
            { code: '  minIdx = i', explain: 'Assume the current position is the minimum.' },
            { code: '  for j from i+1 to n-1', explain: 'Check the rest of the array.' },
            { code: '    if arr[j] < arr[minIdx]', explain: 'If a smaller value is found, update minIdx.' },
            { code: '  swap arr[i] and arr[minIdx]', explain: 'Swap the smallest found with the current position.' }
        ],
        insertionSort: [
            { code: 'for i from 1 to n-1', explain: 'Start from the second element.' },
            { code: '  key = arr[i]', explain: 'Store the current value.' },
            { code: '  j = i - 1', explain: 'Start comparing with previous elements.' },
            { code: '  while j >= 0 and arr[j] > key', explain: 'Move elements greater than key one position ahead.' },
            { code: '    arr[j+1] = arr[j]', explain: 'Shift the element right.' },
            { code: '    j = j - 1', explain: 'Move to the previous element.' },
            { code: '  arr[j+1] = key', explain: 'Insert the key at the correct position.' }
        ],
        mergeSort: [
            { code: 'if left < right', explain: 'If the array has more than one element.' },
            { code: '  mid = (left + right) / 2', explain: 'Find the middle point.' },
            { code: '  mergeSort(left, mid)', explain: 'Sort the first half.' },
            { code: '  mergeSort(mid+1, right)', explain: 'Sort the second half.' },
            { code: '  merge(left, mid, right)', explain: 'Merge the sorted halves.' }
        ],
        quickSort: [
            { code: 'if low < high', explain: 'If the array has more than one element.' },
            { code: '  pivot = arr[high]', explain: 'Select the rightmost element as pivot.' },
            { code: '  partition(low, high)', explain: 'Rearrange elements around the pivot.' },
            { code: '  quickSort(low, pi - 1)', explain: 'Recursively sort the left part.' },
            { code: '  quickSort(pi + 1, high)', explain: 'Recursively sort the right part.' }
        ]
    };

    function getStepsForBubbleSort(arr) {
        const steps = [];
        const n = arr.length;
        let a = [...arr];
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...a],
                    pseudoLine: 2
                });
                if (a[j] > a[j + 1]) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        array: [...a],
                        pseudoLine: 3
                    });
                }
            }
        }
        steps.push({
            type: 'done',
            indices: [],
            array: [...a],
            pseudoLine: null
        });
        return steps;
    }

    function getStepsForSelectionSort(arr) {
        const steps = [];
        const n = arr.length;
        let a = [...arr];
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            steps.push({ type: 'select', indices: [i], array: [...a], pseudoLine: 1 });
            for (let j = i + 1; j < n; j++) {
                steps.push({ type: 'compare', indices: [minIdx, j], array: [...a], pseudoLine: 3 });
                if (a[j] < a[minIdx]) {
                    minIdx = j;
                    steps.push({ type: 'newMin', indices: [minIdx], array: [...a], pseudoLine: 4 });
                }
            }
            if (minIdx !== i) {
                [a[i], a[minIdx]] = [a[minIdx], a[i]];
                steps.push({ type: 'swap', indices: [i, minIdx], array: [...a], pseudoLine: 5 });
            }
        }
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    function getStepsForInsertionSort(arr) {
        const steps = [];
        const n = arr.length;
        let a = [...arr];
        for (let i = 1; i < n; i++) {
            let key = a[i];
            let j = i - 1;
            steps.push({ type: 'select', indices: [i], array: [...a], pseudoLine: 1 });
            while (j >= 0 && a[j] > key) {
                steps.push({ type: 'compare', indices: [j, j + 1], array: [...a], pseudoLine: 3 });
                a[j + 1] = a[j];
                steps.push({ type: 'shift', indices: [j, j + 1], array: [...a], pseudoLine: 4 });
                j--;
            }
            a[j + 1] = key;
            steps.push({ type: 'insert', indices: [j + 1], array: [...a], pseudoLine: 6 });
        }
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    function getStepsForMergeSort(arr) {
        const steps = [];
        let a = [...arr];
        function mergeSortHelper(left, right) {
            if (left < right) {
                steps.push({ type: 'call', indices: [left, right], array: [...a], pseudoLine: 0 });
                const mid = Math.floor((left + right) / 2);
                steps.push({ type: 'mid', indices: [mid], array: [...a], pseudoLine: 1 });
                mergeSortHelper(left, mid);
                mergeSortHelper(mid + 1, right);
                merge(left, mid, right);
            }
        }
        function merge(left, mid, right) {
            let leftArr = a.slice(left, mid + 1);
            let rightArr = a.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;
            while (i < leftArr.length && j < rightArr.length) {
                steps.push({ type: 'compare', indices: [k], array: [...a], pseudoLine: 4 });
                if (leftArr[i] <= rightArr[j]) {
                    a[k] = leftArr[i];
                    i++;
                } else {
                    a[k] = rightArr[j];
                    j++;
                }
                steps.push({ type: 'merge', indices: [k], array: [...a], pseudoLine: 4 });
                k++;
            }
            while (i < leftArr.length) {
                a[k] = leftArr[i];
                steps.push({ type: 'merge', indices: [k], array: [...a], pseudoLine: 4 });
                i++; k++;
            }
            while (j < rightArr.length) {
                a[k] = rightArr[j];
                steps.push({ type: 'merge', indices: [k], array: [...a], pseudoLine: 4 });
                j++; k++;
            }
        }
        mergeSortHelper(0, a.length - 1);
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    function getStepsForQuickSort(arr) {
        const steps = [];
        let a = [...arr];
        function quickSortHelper(low, high) {
            if (low < high) {
                steps.push({ type: 'call', indices: [low, high], array: [...a], pseudoLine: 0 });
                let pivot = a[high];
                let i = low - 1;
                for (let j = low; j < high; j++) {
                    steps.push({ type: 'compare', indices: [j, high], array: [...a], pseudoLine: 2 });
                    if (a[j] < pivot) {
                        i++;
                        [a[i], a[j]] = [a[j], a[i]];
                        steps.push({ type: 'swap', indices: [i, j], array: [...a], pseudoLine: 3 });
                    }
                }
                steps.push({ type: 'pivot', indices: [i + 1, high], array: [...a], pseudoLine: 4 });
                [a[i + 1], a[high]] = [a[high], a[i + 1]];
                quickSortHelper(low, i);
                quickSortHelper(i + 2, high);
            }
        }
        quickSortHelper(0, a.length - 1);
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        let newSteps = [];
        if (algorithm === 'bubbleSort') newSteps = getStepsForBubbleSort(array);
        else if (algorithm === 'selectionSort') newSteps = getStepsForSelectionSort(array);
        else if (algorithm === 'insertionSort') newSteps = getStepsForInsertionSort(array);
        else if (algorithm === 'mergeSort') newSteps = getStepsForMergeSort(array);
        else if (algorithm === 'quickSort') newSteps = getStepsForQuickSort(array);
        setSteps(newSteps);
        setCurrentStep(0);
    }, [array, algorithm, arraySize]);

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };
    const handlePrevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const getStepColorArray = () => {
        if (!steps[currentStep]) return colorArray;
        const step = steps[currentStep];
        const n = array.length;
        let colors = new Array(n).fill('#66ccff');
        if (step.type === 'compare' || step.type === 'swap' || step.type === 'shift') {
            step.indices.forEach(idx => colors[idx] = '#ff6b6b');
        }
        if (step.type === 'select' || step.type === 'insert' || step.type === 'newMin') {
            step.indices.forEach(idx => colors[idx] = '#ffd93d');
        }
        if (step.type === 'merge') {
            step.indices.forEach(idx => colors[idx] = '#4da6ff');
        }
        if (step.type === 'done') {
            colors = new Array(n).fill('#4ade80');
        }
        return colors;
    };

    // Reactive screen size detection
    const [isTabletOrBelow, setIsTabletOrBelow] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsTabletOrBelow(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="page-container main-page-container">
            <h1 className="page-title main-page-title">
                Sorting Algorithms Visualizer
            </h1>
            {/* Algorithm Selection */}
            <div className="controls-section">
                <h3 className="algorithm-selector-title">
                    Select Algorithm:
                </h3>
                <div className='algorithm-buttons-wrapper'>
                    {['bubbleSort', 'selectionSort', 'mergeSort', 'insertionSort', 'quickSort'].map((algo) => {
                        const algorithmNames = {
                            'bubbleSort': 'Bubble Sort',
                            'selectionSort': 'Selection Sort',
                            'mergeSort': 'Merge Sort',
                            'insertionSort': 'Insertion Sort',
                            'quickSort': 'Quick Sort'
                        };

                        return (
                            <button
                                key={algo}
                                className={`btn algorithm-button ${algorithm === algo ? 'algorithm-button-active' : 'algorithm-button-inactive'}`}
                                onClick={() => setAlgorithm(algo)}
                                disabled={isSorting}
                            >
                                {algorithmNames[algo]}
                            </button>
                        );
                    })}
                </div>
            </div>


            {/* Status Message */}
            <div className="status-message-container">
                {message}
                {isSorting && (
                    <div className="progress-bar-container">
                        <div className="progress-bar-track">
                            <div className="progress-bar-fill" />
                        </div>
                    </div>
                )}
            </div>


            {/* --- Step Navigation and Algorithm Panel Layout --- */}
                {/* Visualization + Step Controls */}
                <div className="visualization-wrapper">
                    {/* Visualization Section with Algorithm psuedo code Section */}
                    <div className="vis-pseudo-container">

                        <div className="vis-main-section">
                            {/* --- Visualization Area (step-by-step) --- */}
                            <div className="visualization-area">
                                {/* Array-Visualization */}
                                <div className={`array-display-container ${arraySize > 40 ? 'xlarge-array' : arraySize > 25 ? 'large-array' : ''} ${isTabletOrBelow && arraySize > 40 ? 'tablet-spacing' : ''}`}>
                                    {(steps[currentStep]?.array || array).map((num, idx) => {
                                        const showNumbers = arraySize <= 25;
                                        const stepColors = getStepColorArray();
                                        return (
                                            <div
                                                key={idx}
                                                className="array-bar-element"
                                                style={{
                                                    height: `${Math.max(20, num)}px`,
                                                    backgroundColor: getStepColorArray()[idx],
                                                    border: `1px solid ${getStepColorArray()[idx]}`,
                                                    fontSize: arraySize > 40 ? '8px' : arraySize > 30 ? '9px' : arraySize > 20 ? '10px' : '11px',
                                                    boxShadow: `0 4px 12px ${stepColors[idx]}30`
                                                }}
                                            >
                                                {showNumbers && (
                                                    <div className="bar-number-display" style={{
                                                        fontSize: 'inherit'
                                                    }}>
                                                        {num}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {/* Array info display */}
                                    <div className="array-info-display">
                                        Array Size: {arraySize} | Step Mode
                                    </div>
                                </div>

                                {/* --- Step Navigation Buttons --- */}
                                <div className={`step-nav-container`}>
                                    {/* previous-step-button */}
                                    <button className="btn btn-secondary step-nav-btn"
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 0}
                                    >
                                        {/* arrow-left-icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
                                        Previous Step
                                    </button>

                                    {/* steps-counter */}
                                    <span className="step-counter">
                                        Step {currentStep + 1} / {steps.length}
                                    </span>

                                    {/* next-step-button */}
                                    <button className="btn btn-secondary step-nav-btn"
                                        onClick={handleNextStep}
                                        disabled={currentStep >= steps.length - 1}
                                    >
                                        Next Step
                                        {/* arrow-right-icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                                    </button>

                                </div>
                            </div>


                        </div>
                        {/* --- Algorithm Section with psuedo Code --- */}
                        <div className="pseudo-panel">
                            <h3 className="pseudo-title">
                                {getAlgorithmName()} Pseudocode
                            </h3>
                            <div className='code-explaination-wrapper'>
                            <pre className="pseudo-code-block">
                                {ALGORITHM_PSEUDOCODE[algorithm].map((line, idx) => (
                                    <div key={idx} className={`pseudo-line ${steps[currentStep]?.pseudoLine === idx ? 'active' : ''}`}>
                                        {line.code}
                                    </div>
                                ))}
                            </pre>
                            <div className="pseudo-explanation">
                                <strong>Explanation:</strong><br />
                                {steps[currentStep]?.pseudoLine !== null
                                    ? ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.explain
                                    : 'Algorithm finished!'}
                            </div>
                            </div>
                        </div>
                    </div>

                </div>

            


            {/* Controls Section & Record-Export section */}
            <div className="controls-section controls-section-container"> 
                <div className="controls-main-wrapper">

                    {/* controls section  */}
                    <div className="action-buttons-group">
                        <button className="btn" onClick={handleSort} disabled={isSorting}>
                            {isSorting ? (
                                <div className="sort-button-content">
                                    {/* Loading/Sorting icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor" style={{ animation: 'spin 1s linear infinite' }}>
                                        <path d="M3.05469 13H5.07065C5.55588 16.3923 8.47329 19 11.9998 19C15.5262 19 18.4436 16.3923 18.9289 13H20.9448C20.4474 17.5 16.6323 21 11.9998 21C7.36721 21 3.55213 17.5 3.05469 13ZM3.05469 11C3.55213 6.50005 7.36721 3 11.9998 3C16.6323 3 20.4474 6.50005 20.9448 11H18.9289C18.4436 7.60771 15.5262 5 11.9998 5C8.47329 5 5.55588 7.60771 5.07065 11H3.05469Z" />
                                    </svg>
                                    Sorting...
                                </div>
                            ) : (
                                <div className="sort-button-content">
                                    {/* Play/Start icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M8 18.3915V5.60846L18.2264 12L8 18.3915ZM6 3.80421V20.1957C6 20.9812 6.86395 21.46 7.53 21.0437L20.6432 12.848C21.2699 12.4563 21.2699 11.5436 20.6432 11.152L7.53 2.95621C6.86395 2.53993 6 3.01878 6 3.80421Z"></path></svg>
                                    Start Sort
                                </div>
                            )}
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={generateArray}
                            disabled={isSorting}>
                            {/* Generate icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M12 4C14.5905 4 16.8939 5.23053 18.3573 7.14274L16 9.5H22V3.5L19.7814 5.71863C17.9494 3.452 15.1444 2 12 2 6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20 9.40951 20 7.10605 18.7695 5.64274 16.8573L8 14.5 2 14.5V20.5L4.21863 18.2814C6.05062 20.548 8.85557 22 12 22 17.5228 22 22 17.5228 22 12H20Z"></path></svg>
                            Generate Array
                        </button>
                        <button className="btn btn-secondary" onClick={handleStop} disabled={!isSorting}>
                            {/* Stop Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4Z"></path></svg>
                            Stop
                        </button>
                    </div>

                    {/* ArraySize bar  */}

                    <div className="controls-grid">
                        <div className="control-input-group">
                            <label className="label">Array Size:</label>
                            <input
                                type="range"
                                min="10"
                                max="50"
                                value={arraySize}
                                onChange={(e) => setArraySize(parseInt(e.target.value))}
                                disabled={isSorting}
                                className="input control-input"
                            />
                            <span className="control-value">
                                {arraySize}
                            </span>
                            <span className="control-hint">
                                {arraySize <= 15 ? '(with indices)' : arraySize <= 25 ? '(with values)' : '(bars only)'}
                            </span>
                        </div>

                        {/* Speed bar */}
                        <div className="control-input-group">
                            <label className="label">Speed:</label>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                value={delay}
                                onChange={(e) => setDelay(parseInt(e.target.value))}
                                disabled={isSorting}
                                className="input control-input"
                            />
                            <span className="control-value speed">
                                {delay}ms
                            </span>
                            <span className="control-hint">
                                {delay < 50 ? '(very fast)' : delay < 150 ? '(fast)' : delay < 300 ? '(normal)' : '(slow)'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Simple Export Controls */}
                <SimpleExportControls />

            </div>


            {/* Performance Statistics Section */}
            <div className="controls-section stats-section">
                <h3 className="stats-title">
                    Performance Statistics
                </h3>
                <div className="stats-grid">
                    <div className="stat-card comparisons">
                        <div className="stat-label comparisons">Comparisons</div>
                        <div className="stat-value">
                            {statistics.comparisons}
                        </div>
                    </div>
                    <div className="stat-card swaps">
                        <div className="stat-label swaps">Swaps</div>
                        <div className="stat-value">
                            {statistics.swaps}
                        </div>
                    </div>
                    <div className="stat-card time">
                        <div className="stat-label time">Time</div>
                        <div className="stat-value">
                            {statistics.time}ms
                        </div>
                    </div>
                    <div className="stat-card array-size">
                        <div className="stat-label array-size">Array Size</div>
                        <div className="stat-value">
                            {arraySize}
                        </div>
                    </div>
                </div>
            </div>

            {/* Algorithm Information */}
            <div className="algorithm-info">
                <div className="algo-info-header">
                    <h3>{getAlgorithmName()} - Algorithm Details</h3>
                    <button
                        className="btn btn-secondary code-explanation-btn"
                        onClick={() => setShowCodeExplanation(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path></svg>
                         View Code Explanation
                    </button>
                </div>
                <p>{getAlgorithmInfo().description}</p>

                <div className="complexity-grid">
                    <div className="complexity-row">
                        <h4 className="complexity-label">Time Complexity:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().timeComplexity}</span>
                    </div>
                    <div className="complexity-row">
                        <h4 className="complexity-label">Space Complexity:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().spaceComplexity}</span>
                    </div>
                    <div className="complexity-row">
                        <h4 className="complexity-label">Best Case:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().bestCase}</span>
                    </div>
                    <div className="complexity-row">
                        <h4 className="complexity-label">Stable:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().stable}</span>
                    </div>
                </div>
            </div>

            {/* Code Explanation Modal */}
            <CodeExplanation
                algorithm={algorithm}
                isVisible={showCodeExplanation}
                onClose={() => setShowCodeExplanation(false)}
            />
        </div>
    );
};

export default Sorting;