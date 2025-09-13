import React, { useEffect, useRef, useState } from "react";
import CodeExplanation from "../components/CodeExplanation";
import SimpleExportControls from "../components/SimpleExportControls";
import "../styles/Sorting.css"; 
import { sortingAlgorithms } from "../data/allCodes";
import { useMediaQuery } from "react-responsive";

// Pseudocode map used for step-mode highlighting/explanations
const ALGORITHM_PSEUDOCODE = {
  bubbleSort: [
    {
      code: "for i from 0 to n-1",
      explain: "Repeat for each element in the array.",
    },
    {
      code: "  for j from 0 to n-i-2",
      explain: "Compare each pair of adjacent elements.",
    },
    {
      code: "    if arr[j] > arr[j+1]",
      explain: "Check if the current number is greater than the next number.",
    },
    {
      code: "      swap arr[j] and arr[j+1]",
      explain: "Swap them if they are in the wrong order.",
    },
  ],
  selectionSort: [
    {
      code: "for i from 0 to n-1",
      explain: "Repeat for each element in the array.",
    },
    {
      code: "  minIdx = i",
      explain: "Assume the current position is the minimum.",
    },
    {
      code: "  for j from i+1 to n-1",
      explain: "Check the rest of the array.",
    },
    {
      code: "    if arr[j] < arr[minIdx]",
      explain: "If a smaller value is found, update minIdx.",
    },
    {
      code: "  swap arr[i] and arr[minIdx]",
      explain: "Swap the smallest found with the current position.",
    },
  ],
  insertionSort: [
    { code: "for i from 1 to n-1", explain: "Start from the second element." },
    { code: "  key = arr[i]", explain: "Store the current value." },
    { code: "  j = i - 1", explain: "Start comparing with previous elements." },
    {
      code: "  while j >= 0 and arr[j] > key",
      explain: "Move elements greater than key one position ahead.",
    },
    { code: "    arr[j+1] = arr[j]", explain: "Shift the element right." },
    { code: "    j = j - 1", explain: "Move to the previous element." },
    {
      code: "  arr[j+1] = key",
      explain: "Insert the key at the correct position.",
    },
  ],
  mergeSort: [
    {
      code: "if left < right",
      explain: "If the array has more than one element.",
    },
    { code: "  mid = (left + right) / 2", explain: "Find the middle point." },
    { code: "  mergeSort(left, mid)", explain: "Sort the first half." },
    { code: "  mergeSort(mid+1, right)", explain: "Sort the second half." },
    { code: "  merge(left, mid, right)", explain: "Merge the sorted halves." },
  ],
  quickSort: [
    {
      code: "if low < high",
      explain: "If the array has more than one element.",
    },
    {
      code: "  pivot = arr[high]",
      explain: "Select the rightmost element as pivot.",
    },
    {
      code: "  partition(low, high)",
      explain: "Rearrange elements around the pivot.",
    },
    {
      code: "  quickSort(low, pi - 1)",
      explain: "Recursively sort the left part.",
    },
    {
      code: "  quickSort(pi + 1, high)",
      explain: "Recursively sort the right part.",
    },
  ],
  radixSort: [
    {
      code: "max = getMax(arr)",
      explain: "Find the maximum number to get number of digits.",
    },
    {
      code: "for digit = 1; max/digit > 0; digit *= 10",
      explain: "Process each digit from least to most significant.",
    },
    {
      code: "  countingSort(arr, digit)",
      explain: "Sort by current digit using counting sort.",
    },
    {
      code: "  distribute into buckets",
      explain: "Place numbers in buckets based on current digit.",
    },
    {
      code: "  collect from buckets",
      explain: "Collect numbers back maintaining order.",
    },
  ],
  bucketSort: [
    { code: "n = arr.length", explain: "Get the number of elements." },
    {
      code: "create n empty buckets",
      explain: "Create empty buckets for distribution.",
    },
    { code: "for i = 0 to n-1", explain: "Process each element in the array." },
    {
      code: "  place in bucket by range",
      explain: "Distribute elements into appropriate buckets.",
    },
    {
      code: "sort each bucket individually",
      explain: "Sort each bucket using insertion sort.",
    },
    {
      code: "concatenate all buckets",
      explain: "Combine all sorted buckets to get final result.",
    },
  ],
  heapSort: [
    {
      code: "buildMaxHeap(arr)",
      explain: "Rearrange the array to form a max-heap.",
    },
    {
      code: "for i from n-1 down to 1",
      explain: "Iterate from the end of the heap.",
    },
    {
      code: " swap arr[0] and arr[i]",
      explain: "Move the largest element (root) to the end.",
    },
    {
      code: " heapify(arr, i, 0)",
      explain: "Restore the max-heap property on the reduced heap.",
    },
  ],
  timSort: [
    { 
      code: "minRun = calculateMinRun(n)", 
      explain: "Compute the minimum run size (32–64 depending on n)." 
    },
    { 
      code: "for i from 0 to n step minRun", 
      explain: "Process array in chunks of size minRun." 
    },
    { 
      code: "  end = min(i + minRun - 1, n-1)", 
      explain: "Find the end index of the current run." 
    },
    { 
      code: "  insertionSort(arr, i, end)", 
      explain: "Sort each small run with insertion sort." 
    },
    { 
      code: "size = minRun", 
      explain: "Start merging from size = minRun." 
    },
    { 
      code: "while size < n", 
      explain: "Double the size of runs until the array is sorted." 
    },
    { 
      code: "  for left from 0 to n-1 in steps of 2*size", 
      explain: "Pick pairs of runs to merge." 
    },
    { 
      code: "    mid = left + size - 1", 
      explain: "Find midpoint of the current run." 
    },
    { 
      code: "    right = min((left + 2*size - 1), n-1)", 
      explain: "Find end of the right run." 
    },
    { 
      code: "    if mid < right", 
      explain: "Check if two runs exist to merge." 
    },
    { 
      code: "      merge(arr, left, mid, right)", 
      explain: "Merge the two runs like in merge sort." 
    },
    { 
      code: "  size = size * 2", 
      explain: "Double the size and repeat merging." 
    },
  ],
  introSort: [
    { 
      code: "maxDepth = 2 * log₂(n)", 
      explain: "Set a recursion depth limit based on array size." 
    },
    { 
      code: "introSortHelper(arr, 0, n-1, maxDepth)", 
      explain: "Start sorting with quicksort strategy." 
    },
    { 
      code: "if size < threshold", 
      explain: "Use insertion sort for small subarrays." 
    },
    { 
      code: "else if depth == 0", 
      explain: "If recursion depth is exhausted, switch to heapsort." 
    },
    { 
      code: "else", 
      explain: "Otherwise, use quicksort partitioning with pivot." 
    },
    { 
      code: "  partition around pivot", 
      explain: "Rearrange elements around pivot element." 
    },
    { 
      code: "  recursively sort left and right halves", 
      explain: "Apply introsort recursively on partitions." 
    },
    { 
      code: "final insertion sort pass", 
      explain: "Ensure small pieces are fully sorted at the end." 
    }
  ],  
  shellSort: [
    {
      code: "gap = n / 2",
      explain: "Start with a large gap (half the array size).",
    },
    {
      code: "while gap > 0",
      explain: "Keep reducing the gap until it becomes 1.",
    },
    {
      code: "  for i from gap to n-1",
      explain: "Pick elements starting from the gap index.",
    },
    {
      code: "    temp = arr[i]",
      explain: "Store the current element to be placed correctly.",
    },
    {
      code: "    j = i",
      explain: "Initialize j to current index.",
    },
    {
      code: "    while j >= gap and arr[j-gap] > temp",
      explain: "Shift earlier gap-sorted elements to the right.",
    },
    {
      code: "      arr[j] = arr[j-gap]",
      explain: "Move the larger element up by one gap.",
    },
    {
      code: "      j = j - gap",
      explain: "Move backwards by gap to keep checking.",
    },
    {
      code: "    arr[j] = temp",
      explain: "Place the stored element in its correct position.",
    },
    {
      code: "  gap = gap / 2",
      explain: "Reduce the gap for the next pass.",
    },
  ],
};

const algorithmNames = {
  bubbleSort: "Bubble Sort",
  selectionSort: "Selection Sort",
  mergeSort: "Merge Sort",
  insertionSort: "Insertion Sort",
  quickSort: "Quick Sort",
  radixSort: "Radix Sort",
  bucketSort: "Bucket Sort",
  heapSort: "Heap Sort",
  timSort: "Tim Sort",
  introSort: "Intro Sort", 
  shellSort: "Shell Sort", 
};

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [delay, setDelay] = useState(100);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [isSorting, setIsSorting] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [message, setMessage] = useState("");
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [statistics, setStatistics] = useState({
    comparisons: 0,
    swaps: 0,
    time: 0
  });

  // Add missing refs and helper functions
  const stopSortingRef = useRef(false);
  
  // Sleep function for delays
  const sleep = (ms = delay) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper functions for selection sort
  const createBaseColors = (n) => new Array(n).fill("#66ccff");
  
  const selectionScanForMin = async (a, start, n, colors, setColorState, sleepFn, stopRef, counts, setStats) => {
    let minIdx = start;
    for (let j = start + 1; j < n; j++) {
      if (stopRef.current) throw new Error("Stopped");
      counts.comparisons++;
      colors[j] = "#ff6b6b";
      setColorState([...colors]);
      await sleepFn();
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
      setStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    }
    return minIdx;
  };

  const selectionSwapIfNeeded = async (a, i, minIdx, setArrayState, sleepFn, counts) => {
    if (i !== minIdx) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      counts.swaps++;
      setArrayState([...a]);
      await sleepFn();
    }
  };

  const markSortedPrefix = (colors, upTo) => {
    for (let k = 0; k <= upTo; k++) {
      colors[k] = "#4ade80";
    }
  };

  // Generate random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 200) + 10);
    }
    setArray(newArray);
    setColorArray(new Array(arraySize).fill('var(--accent-primary)'));
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });
    setMessage("");
    setInputError("");
  };

  // Handle custom array input
  const handleCustomArray = () => {
    try {
      const customArray = customArrayInput
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num) && num > 0);
      
      if (customArray.length === 0) {
        setInputError("Please enter valid numbers separated by commas");
        return;
      }
      
      if (customArray.length > 60) {
        setInputError("Array size cannot exceed 60 elements");
        return;
      }
      
      setArray(customArray);
      setArraySize(customArray.length);
      setColorArray(new Array(customArray.length).fill('var(--accent-primary)'));
      setStatistics({ comparisons: 0, swaps: 0, time: 0 });
      setMessage("");
      setInputError("");
      setCustomArrayInput("");
    } catch (error) {
      setInputError("Invalid input format");
    }
  };

  // Handle stop
  const handleStop = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
    setMessage("Sorting stopped");
  };

  // Get algorithm name helper
  const getAlgorithmName = () => algorithmNames[algorithm] || "Unknown Algorithm";

  // Get algorithm info - Fixed function
  const getAlgorithmInfo = () => {
    const algorithmInfo = {
      bubbleSort: {
        description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n)",
        stable: "Yes"
      },
      selectionSort: {
        description: "Selection Sort sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n²)",
        stable: "No"
      },
      mergeSort: {
        description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        bestCase: "O(n log n)",
        stable: "Yes"
      },
      insertionSort: {
        description: "Insertion Sort builds the final sorted array one item at a time by inserting each element into its correct position.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n)",
        stable: "Yes"
      },
      quickSort: {
        description: "Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        bestCase: "O(n log n)",
        stable: "No",
      },      
      shellSort: {
        description: "Sorts elements at specific gaps, reducing the gap until it becomes 1 (like insertion sort).",
        timeComplexity: "O(n^1.5) to O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n log n)",
        stable: "No",
      }
    };
    return algorithmInfo[algorithm] || {
      description: "Algorithm implementation coming soon!",
      timeComplexity: "N/A",
      spaceComplexity: "N/A",
      bestCase: "N/A",
      stable: "N/A"
    };
  };

  // Sorting implementations with stop & visualization hooks
  const bubbleSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;
    for (let i = 0; i < n - 1; i++) {
      if (stopRef.current) throw new Error("Stopped");
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        const colors = new Array(n).fill("#66ccff");
        colors[j] = "#ff6b6b";
        colors[j + 1] = "#ff6b6b";
        setColorState([...colors]);
        await sleepFn();
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          swaps++;
          setArrayState([...a]);
          colors[j] = "#ffd93d";
          colors[j + 1] = "#ffd93d";
          setColorState([...colors]);
          await sleepFn();
        }
        setStats({ comparisons, swaps, time: 0 });
      }
    }
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  const selectionSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    const n = a.length;
    const counts = { comparisons: 0, swaps: 0 };
    for (let i = 0; i < n - 1; i++) {
      if (stopRef.current) throw new Error("Stopped");
      const colors = createBaseColors(n);
      colors[i] = "#ffd93d";
      setColorState([...colors]);
      const minIdx = await selectionScanForMin(
        a,
        i,
        n,
        colors,
        setColorState,
        sleepFn,
        stopRef,
        counts,
        setStats
      );
      await selectionSwapIfNeeded(a, i, minIdx, setArrayState, sleepFn, counts);
      markSortedPrefix(colors, i);
      setColorState([...colors]);
      setStats({
        comparisons: counts.comparisons,
        swaps: counts.swaps,
        time: 0,
      });
    }
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  const insertionSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;
    for (let i = 1; i < n; i++) {
      if (stopRef.current) throw new Error("Stopped");
      const key = a[i];
      let j = i - 1;
      const colors = new Array(n).fill("#66ccff");
      colors[i] = "#ffd93d";
      setColorState([...colors]);
      await sleepFn();
      while (j >= 0 && a[j] > key) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        colors[j] = "#ff6b6b";
        colors[j + 1] = "#ff6b6b";
        setColorState([...colors]);
        a[j + 1] = a[j];
        swaps++;
        setArrayState([...a]);
        await sleepFn();
        setStats({ comparisons, swaps, time: 0 });
        j--;
      }
      a[j + 1] = key;
      setArrayState([...a]);
      for (let k = 0; k <= i; k++) colors[k] = "#4ade80";
      setColorState([...colors]);
      await sleepFn();
    }
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  // Complete merge sort implementation
  const mergeSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    let comparisons = 0, swaps = 0;

    const merge = async (left, mid, right) => {
      if (stopRef.current) throw new Error("Stopped");
      const leftArr = a.slice(left, mid + 1);
      const rightArr = a.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
      while (i < leftArr.length && j < rightArr.length) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        const colors = new Array(a.length).fill("#66ccff");
        colors[k] = "#ffd93d";
        setColorState([...colors]);
        if (leftArr[i] <= rightArr[j]) {
          a[k] = leftArr[i];
          i++;
        } else {
          a[k] = rightArr[j];
          j++;
        }
        swaps++;
        setArrayState([...a]);
        setStats({ comparisons, swaps, time: 0 });
        await sleepFn();
        k++;
      }
      while (i < leftArr.length) {
        if (stopRef.current) throw new Error("Stopped");
        a[k] = leftArr[i];
        swaps++;
        setArrayState([...a]);
        await sleepFn();
        i++;
        k++;
      }
      while (j < rightArr.length) {
        if (stopRef.current) throw new Error("Stopped");
        a[k] = rightArr[j];
        swaps++;
        setArrayState([...a]);
        await sleepFn();
        j++;
        k++;
      }
    };

    const mergeSortHelper = async (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(left, mid);
        await mergeSortHelper(mid + 1, right);
        await merge(left, mid, right);
      }
    };

    await mergeSortHelper(0, a.length - 1);
    setColorState(new Array(a.length).fill("#4ade80"));
    return 0;
  };

  const quickSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    let comparisons = 0, swaps = 0;

    const partition = async (low, high) => {
      const pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        const colors = new Array(a.length).fill("#66ccff");
        colors[j] = "#ff6b6b";
        colors[high] = "#ffd93d"; // pivot
        setColorState([...colors]);
        await sleepFn();
        if (a[j] <= pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          swaps++;
          setArrayState([...a]);
        }
        setStats({ comparisons, swaps, time: 0 });
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      swaps++;
      setArrayState([...a]);
      return i + 1;
    };

    const quickSortHelper = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    };

    await quickSortHelper(0, a.length - 1);
    setColorState(new Array(a.length).fill("#4ade80"));
    return 0;
  };

  // Shell sort implementation (keeping your existing one as it looks correct)
  const shellSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      if (stopRef.current) throw new Error("Stopped");
      
      for (let i = gap; i < n; i++) {
        if (stopRef.current) throw new Error("Stopped");
        
        const temp = a[i];
        let j;
        
        const colors = new Array(n).fill("#66ccff");
        colors[i] = "#ffd93d";
        
        for (let k = i - gap; k >= 0; k -= gap) {
          colors[k] = "#e0e7ff";
        }
        
        setColorState([...colors]);
        await sleepFn();
        
        for (j = i; j >= gap && a[j - gap] > temp; j -= gap) {
          if (stopRef.current) throw new Error("Stopped");
          
          comparisons++;
          
          const compColors = new Array(n).fill("#66ccff");
          compColors[j] = "#ff6b6b";
          compColors[j - gap] = "#ff6b6b";
          
          for (let k = 0; k < n; k += gap) {
            if (k !== j && k !== j - gap && compColors[k] === "#66ccff") {
              compColors[k] = "#e0e7ff";
            }
          }
          
          setColorState([...compColors]);
          await sleepFn();
          
          a[j] = a[j - gap];
          swaps++;
          setArrayState([...a]);
          
          const swapColors = new Array(n).fill("#66ccff");
          swapColors[j] = "#ffd93d";
          swapColors[j - gap] = "#ffd93d";
          setColorState([...swapColors]);
          await sleepFn();
          
          setStats({ comparisons, swaps, time: 0 });
        }
        
        a[j] = temp;
        setArrayState([...a]);
        
        const finalColors = new Array(n).fill("#66ccff");
        finalColors[j] = "#4ade80";
        
        for (let k = 0; k < n; k++) {
          if (k < i && (k % gap === j % gap)) {
            finalColors[k] = "#4ade80";
          }
        }
        
        setColorState([...finalColors]);
        await sleepFn();
        
        setStats({ comparisons, swaps, time: 0 });
      }
      
      const gapColors = new Array(n).fill("#66ccff");
      
      for (let start = 0; start < gap; start++) {
        for (let k = start; k < n; k += gap) {
          gapColors[k] = "#4ade80";
        }
      }
      
      setColorState([...gapColors]);
      await sleepFn();
    }
    
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  // Fixed handleSort function
  const handleSort = async () => {
    if (isSorting) return;
    
    setIsSorting(true);
    stopSortingRef.current = false;
    setMessage(`Sorting using ${algorithmNames[algorithm]}...`);
    
    const startTime = Date.now();
    
    try {
      switch (algorithm) {
        case "bubbleSort":
          await bubbleSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "selectionSort":
          await selectionSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "insertionSort":
          await insertionSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "mergeSort":
          await mergeSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "quickSort":
          await quickSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "shellSort":
          await shellSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        default:
          setMessage(`${algorithmNames[algorithm]} implementation coming soon!`);
          setIsSorting(false);
          return;
      }
      
      const endTime = Date.now();
      setStatistics(prev => ({
        ...prev,
        time: endTime - startTime
      }));
      setMessage(`Sorting completed using ${algorithmNames[algorithm]}!`);
    } catch (e) {
      if (e && e.message === "Stopped") {
        setMessage("Sorting stopped.");
      } else {
        setMessage("An error occurred while sorting.");
        console.error(e);
      }
    } finally {
      setIsSorting(false);
    }
  };

  // Initialize array on component mount and when arraySize changes
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // UI helpers
  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1024px)" });
  const computeGap = () => {
    if (arraySize > 40) return isTabletOrBelow ? "1px" : "2px";
    if (arraySize > 25) return "3px";
    return "6px";
  };
  const computeBarFontSize = () => {
    if (arraySize > 40) return "8px";
    if (arraySize > 30) return "9px";
    if (arraySize > 20) return "10px";
    return "11px";
  };

  const algoOptions = [
    "bubbleSort",
    "selectionSort",
    "insertionSort",
    "mergeSort",
    "quickSort",
    "radixSort",
    "bucketSort",
    "heapSort",
    "timSort",
    "introSort",    
    "shellSort",
  ];

  return (
    <div className="theme-container">
      <h1 className="theme-title">Sorting Algorithms</h1>

      {/* Top control bar */}
      <div className="theme-card">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="algorithm-select">Algorithm</label>
            <select
              id="algorithm-select"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isSorting}
              className="form-select"
            >
              {algoOptions.map((algo) => (
                <option key={algo} value={algo}>
                  {algorithmNames[algo]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label" htmlFor="custom-array">Custom Array</label>
            <input
              id="custom-array"
              type="text"
              placeholder="e.g., 8, 2, 5"
              value={customArrayInput}
              onChange={(e) => setCustomArrayInput(e.target.value)}
              disabled={isSorting}
              className="form-control"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleSort} disabled={isSorting}>
              {isSorting ? "Sorting..." : "Start Sort"}
            </button>
            <button className="btn btn-secondary" onClick={handleStop} disabled={!isSorting}>
              Stop
            </button>
            <button className="btn btn-secondary" onClick={generateArray} disabled={isSorting}>
              Generate Array
            </button>
            {customArrayInput && (
              <button className="btn btn-secondary" onClick={handleCustomArray} disabled={isSorting}>
                Apply Custom Array
              </button>
            )}
          </div>
        </div>
        {inputError && <div style={{ color: "var(--accent-danger)", textAlign: "center", marginTop: "1rem" }}>{inputError}</div>}
      </div>

      {/* Controls & Export */}
      <div className="form-grid">
        <div className="theme-card">
          <div className="theme-card-header">
            <h3>Visualization Controls</h3>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="arraySizeRange">Array Size: {arraySize}</label>
            <input
              id="arraySizeRange"
              type="range"
              min="10" max="60"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
              className="form-range"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="speedRange">Speed: {delay}ms</label>
            <input
              id="speedRange"
              type="range"
              min="20" max="1000"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              disabled={isSorting}
              className="form-range"
            />
          </div>
        </div>

        <SimpleExportControls containerId="sort-visualization-container" />
        
        <div className="theme-card">
           <div className="theme-card-header">
             <h3>{getAlgorithmName()} Information</h3>
           </div>
           <div style={{ 
             background: 'var(--surface-bg)', 
             borderRadius: '8px', 
             padding: '1rem', 
             color: 'var(--text-secondary)', 
             overflowX: 'auto',
             fontFamily: 'monospace',
             fontSize: '0.9rem',
             lineHeight: '1.4'
           }}>
             <div><strong>Description:</strong> {getAlgorithmInfo()?.description}</div>
           </div>
        </div>
      </div>
      
      {message && <div style={{ textAlign: "center", color: "var(--accent-primary)", fontWeight: 600, margin: "1rem 0" }}>{message}</div>}

      {/* Visualization */}
      <div className="visualization-area" id="sort-visualization-container">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "100%", gap: computeGap() }}>
            {array.map((num, idx) => {
              const maxVal = Math.max(...array, 1);
              const heightPx = Math.max(
                40,
                Math.round((num / maxVal) * 280)
              );
              const col = colorArray[idx] || 'var(--accent-primary)';
              return (
                  <div
                    key={`${num}-${idx}`}
                    className="array-bar"
                    style={{
                      height: `${heightPx}px`,
                      backgroundColor: col,
                      color: 'var(--surface-bg)',
                      fontSize: computeBarFontSize(),
                      width: `${Math.max(12, Math.min(40, 400 / arraySize))}px`,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: '4px'
                    }}
                  >
                    {arraySize <= 25 && num}
                  </div>
                );
            })}
          </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <h3 className="theme-title" style={{ fontSize: '1.75rem' }}>Performance Statistics</h3>
        <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Comparisons</div>
              <div className="stat-value">{statistics.comparisons}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Swaps/Moves</div>
              <div className="stat-value">{statistics.swaps}</div>
            </div>
             <div className="stat-card">
              <div className="stat-label">Elapsed Time</div>
              <div className="stat-value">{statistics.time} ms</div>
            </div>
             <div className="stat-card">
              <div className="stat-label">Array Size</div>
              <div className="stat-value">{arraySize}</div>
            </div>
        </div>
      </div>

      {/* Algorithm details */}
      <div className="theme-card">
        <div className="theme-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h3>{getAlgorithmName()} - Algorithm Details</h3>
          <button
            className="code-explanation-btn"
            onClick={() => setShowCodeExplanation(true)}
          >
            View Code Explanation
          </button>
        </div>
        <div>
          <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
            {getAlgorithmInfo()?.description}
          </p>
          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="complexity-label">Time Complexity:</span>
              <span className="complexity-value">{getAlgorithmInfo()?.timeComplexity}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Space Complexity:</span>
              <span className="complexity-value">{getAlgorithmInfo()?.spaceComplexity}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Best Case:</span>
              <span className="complexity-value">{getAlgorithmInfo()?.bestCase}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Stable:</span>
              <span className="complexity-value">{getAlgorithmInfo()?.stable}</span>
            </div>
          </div>
        </div>
      </div>

      <CodeExplanation
        algorithm={algorithm}
        pseudocode={ALGORITHM_PSEUDOCODE[algorithm]}
        isVisible={showCodeExplanation}
        onClose={() => setShowCodeExplanation(false)}
      />

      {/* Code Implementation Section */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h3>{getAlgorithmName()} - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedLanguage === 'java' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedLanguage('java')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Java
            </button>
            <button
              className={`btn ${selectedLanguage === 'python' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedLanguage('python')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Python
            </button>
            <button
              className={`btn ${selectedLanguage === 'cpp' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedLanguage('cpp')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              C++
            </button>
          </div>
        </div>
        <div style={{
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {sortingAlgorithms[algorithm] && sortingAlgorithms[algorithm][selectedLanguage] 
                ? sortingAlgorithms[algorithm][selectedLanguage]
                : `// ${getAlgorithmName()} implementation in ${selectedLanguage.toUpperCase()} coming soon!`
              }
            </code>
          </pre>
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: 'var(--accent-warning-bg)', 
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> This is the actual implementation code for {getAlgorithmName()} in {selectedLanguage.toUpperCase()}. 
          You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default Sorting;
