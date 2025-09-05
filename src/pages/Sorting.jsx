import React, { useEffect, useRef, useState } from "react";
import CodeExplanation from "../components/CodeExplanation";
import SimpleExportControls from "../components/SimpleExportControls";
import "../styles/pages.css";
import "../styles/Sorting.css";
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
};

// Helpers for Selection Sort to keep cognitive complexity low
const createBaseColors = (n) => new Array(n).fill("#66ccff");
const markSortedPrefix = (colors, endIdx) => {
  for (let k = 0; k <= endIdx; k++) colors[k] = "#4ade80";
};

async function selectionScanForMin(
  a,
  i,
  n,
  colors,
  setColorState,
  sleepFn,
  stopRef,
  counts,
  setStats
) {
  let minIdx = i;
  for (let j = i + 1; j < n; j++) {
    if (stopRef.current) throw new Error("Stopped");
    counts.comparisons++;
    colors[j] = "#ff6b6b";
    setColorState([...colors]);
    await sleepFn();
    if (a[j] < a[minIdx]) {
      if (minIdx !== i) colors[minIdx] = "#66ccff";
      minIdx = j;
      colors[minIdx] = "#4da6ff";
    } else {
      colors[j] = "#66ccff";
    }
    setColorState([...colors]);
    setStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
  }
  return minIdx;
}

async function selectionSwapIfNeeded(
  a,
  i,
  minIdx,
  setArrayState,
  sleepFn,
  counts
) {
  if (minIdx === i) return;
  [a[i], a[minIdx]] = [a[minIdx], a[i]];
  counts.swaps++;
  setArrayState([...a]);
  await sleepFn();
}

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [message, setMessage] = useState("Ready to sort!");
  const [delay, setDelay] = useState(100);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [customArrayInput, setCustomArrayInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [statistics, setStatistics] = useState({
    comparisons: 0,
    swaps: 0,
    time: 0,
  });
  const stopSortingRef = useRef(false);
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);

  // Contributed By Devika Harshey
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const delayRef = useRef(delay);
  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  useEffect(() => {
    const randomArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 300) + 10
    );
    setArray(randomArray);
    setColorArray(new Array(arraySize).fill("#66ccff"));
    setMessage("New array generated. Ready to sort!");
    setIsSorting(false);
  }, [arraySize]);

  const sleep = () =>
    new Promise((resolve) => setTimeout(resolve, delayRef.current));

  const generateArray = () => {
    const randomArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 300) + 10
    );
    setArray(randomArray);
    setColorArray(new Array(arraySize).fill("#66ccff"));
    setMessage("New array generated. Ready to sort!");
    setIsSorting(false);
    setCustomArrayInput("");
    setInputError("");
  };

  const getAlgorithmName = () => algorithmNames[algorithm];

  const getAlgorithmInfo = () => {
    const info = {
      bubbleSort: {
        description:
          "Compares adjacent elements and swaps them if they are in wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n)",
        stable: "Yes",
      },
      selectionSort: {
        description:
          "Finds the minimum element and places it at the beginning.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n²)",
        stable: "No",
      },
      mergeSort: {
        description: "Divides array into halves, sorts them and merges back.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        bestCase: "O(n log n)",
        stable: "Yes",
      },
      insertionSort: {
        description: "Builds sorted array one element at a time.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n)",
        stable: "Yes",
      },
      quickSort: {
        description:
          "Selects a pivot and partitions the array into two halves, then sorts them.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        bestCase: "O(n log n)",
        stable: "No",
      },
      radixSort: {
        description:
          "Sorts numbers by processing individual digits from least to most significant.",
        timeComplexity: "O(d × (n + k))",
        spaceComplexity: "O(n + k)",
        bestCase: "O(d × (n + k))",
        stable: "Yes",
      },
      bucketSort: {
        description:
          "Distributes elements into buckets, sorts each bucket, then concatenates.",
        timeComplexity: "O(n + k)",
        spaceComplexity: "O(n × k)",
        bestCase: "O(n + k)",
        stable: "Yes",
      },
      heapSort: {
        description:
          "Builds a max-heap from the array, then repeatedly swaps the root with the last element and rebuilds the heap.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        bestCase: "O(n log n)",
        stable: "No",
      },
      timSort: {
        description: "Hybrid of merge sort and insertion sort, optimized for real-world data.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        bestCase: "O(n)",
        stable: "Yes",
      },     
      introSort: {
        description:
          "Hybrid algorithm that starts with quicksort, switches to heapsort if recursion is too deep, and uses insertion sort for small partitions.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        bestCase: "O(n log n)",
        stable: "No",
      },      
    };
    return info[algorithm];
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
    let comparisons = 0,
      swaps = 0;
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
    let comparisons = 0,
      swaps = 0;
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

  const mergeSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    let comparisons = 0,
      swaps = 0;

    const merge = async (left, mid, right) => {
      if (stopRef.current) throw new Error("Stopped");
      const leftArr = a.slice(left, mid + 1);
      const rightArr = a.slice(mid + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;
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

    const helper = async (l, r) => {
      if (l < r) {
        if (stopRef.current) throw new Error("Stopped");
        const m = Math.floor((l + r) / 2);
        await helper(l, m);
        await helper(m + 1, r);
        await merge(l, m, r);
      }
    };

    await helper(0, a.length - 1);
    setColorState(new Array(a.length).fill("#4ade80"));
    setArrayState([...a]);
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
    const n = a.length;
    let comparisons = 0,
      swaps = 0;

    async function partition(low, high) {
      const pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        const colors = new Array(n).fill("#66ccff");
        colors[j] = "#ff6b6b";
        colors[high] = "#4da6ff"; // pivot
        setColorState([...colors]);
        await sleepFn();
        if (a[j] <= pivot) {
          i++;
          if (i !== j) {
            [a[i], a[j]] = [a[j], a[i]];
            swaps++;
            setArrayState([...a]);
            colors[i] = "#ffd93d";
            colors[j] = "#ffd93d";
            setColorState([...colors]);
            await sleepFn();
          }
        }
        setStats({ comparisons, swaps, time: 0 });
      }
      if (i + 1 !== high) {
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        swaps++;
        setArrayState([...a]);
        const colors = new Array(n).fill("#66ccff");
        colors[i + 1] = "#4ade80";
        setColorState([...colors]);
        await sleepFn();
      }
      setStats({ comparisons, swaps, time: 0 });
      return i + 1;
    }

    async function quickSortRec(low, high) {
      if (low < high) {
        if (stopRef.current) throw new Error("Stopped");
        const pi = await partition(low, high);
        await quickSortRec(low, pi - 1);
        await quickSortRec(pi + 1, high);
      }
    }

    await quickSortRec(0, n - 1);
    setArrayState([...a]);
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  const heapSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0,
      swaps = 0;

    // Helper function to heapify a subtree rooted at index i
    async function heapify(heapSize, i) {
      if (stopRef.current) throw new Error("Stopped");
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      const colors = new Array(n).fill("#66ccff");
      colors[i] = "#ffd93d"; // Highlight current root

      if (left < heapSize) {
        colors[left] = "#ff6b6b"; // Comparing left child
        comparisons++;
      }
      if (right < heapSize) {
        colors[right] = "#ff6b6b"; // Comparing right child
        comparisons++;
      }
      setColorState([...colors]);
      await sleepFn();

      if (left < heapSize && a[left] > a[largest]) {
        largest = left;
      }
      if (right < heapSize && a[right] > a[largest]) {
        largest = right;
      }

      if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        swaps++;
        setArrayState([...a]);
        setStats({ comparisons, swaps, time: 0 });
        await sleepFn();
        await heapify(heapSize, largest); // Recursively heapify the affected sub-tree
      }
    }

    // Build max heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      if (stopRef.current) throw new Error("Stopped");
      // Move current root to end
      [a[0], a[i]] = [a[i], a[0]];
      swaps++;
      const colors = new Array(n).fill("#66ccff");
      for (let k = i; k < n; k++) {
        colors[k] = "#4ade80"; // Mark sorted elements
      }
      setColorState([...colors]);
      setArrayState([...a]);
      setStats({ comparisons, swaps, time: 0 });
      await sleepFn();

      // call max heapify on the reduced heap
      await heapify(i, 0);
    }

    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  // Delegate linear-time sorts to dedicated modules
  const runRadixSort = async () => {
    const { radixSort } = await import("../algorithms/radixSort");
    return radixSort(
      array,
      setArray,
      setColorArray,
      delayRef.current,
      stopSortingRef,
      (s) => setStatistics((prev) => ({ ...prev, ...s }))
    );
  };
  const runBucketSort = async () => {
    const { bucketSort } = await import("../algorithms/bucketSort");
    return bucketSort(
      array,
      setArray,
      setColorArray,
      delayRef.current,
      stopSortingRef,
      (s) => setStatistics((prev) => ({ ...prev, ...s }))
    );
  };
const timSortWithStop = async (
    arr,
    setArrayState,
    setColorState,
    sleepFn,
    stopRef,
    setStats
  ) => {
    const RUN = 32; // Typical run size
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;

    // Insertion sort for small runs
    async function insertionSort(left, right) {
      for (let i = left + 1; i <= right; i++) {
        let key = a[i], j = i - 1;
        while (j >= left && a[j] > key) {
          if (stopRef.current) throw new Error("Stopped");
          a[j + 1] = a[j];
          swaps++;
          comparisons++;
          j--;
          setArrayState([...a]);
          setColorState(new Array(n).fill("#66ccff"));
          await sleepFn();
        }
        a[j + 1] = key;
        setArrayState([...a]);
      }
    }

    // Merge function
    async function merge(l, m, r) {
      let left = a.slice(l, m + 1);
      let right = a.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        if (left[i] <= right[j]) {
          a[k++] = left[i++];
        } else {
          a[k++] = right[j++];
        }
        swaps++;
        setArrayState([...a]);
        setColorState(new Array(n).fill("#ffd93d"));
        await sleepFn();
      }
      while (i < left.length) a[k++] = left[i++];
      while (j < right.length) a[k++] = right[j++];
      setArrayState([...a]);
    }

    // TimSort main
    for (let i = 0; i < n; i += RUN) {
      await insertionSort(i, Math.min((i + RUN - 1), n - 1));
    }
    for (let size = RUN; size < n; size = 2 * size) {
      for (let left = 0; left < n; left += 2 * size) {
        let mid = Math.min(left + size - 1, n - 1);
        let right = Math.min((left + 2 * size - 1), n - 1);
        if (mid < right) {
          await merge(left, mid, right);
        }
      }
    }

    setStats({ comparisons, swaps, time: 0 });
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };

  const introSortWithStop = async (
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
    const THRESHOLD = 16;
    const maxDepth = 2 * Math.floor(Math.log2(n));

    async function insertionSort(left, right) {
      for (let i = left + 1; i <= right; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= left && a[j] > key) {
          if (stopRef.current) throw new Error("Stopped");
          comparisons++;
          a[j + 1] = a[j];
          swaps++;
          j--;
          setArrayState([...a]);
          setColorState(new Array(n).fill("#66ccff"));
          await sleepFn();
        }
        a[j + 1] = key;
        setArrayState([...a]);
      }
    }

    async function heapify(heapSize, i) {
      if (stopRef.current) throw new Error("Stopped");
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < heapSize) {
        comparisons++;
        if (a[left] > a[largest]) largest = left;
      }
      if (right < heapSize) {
        comparisons++;
        if (a[right] > a[largest]) largest = right;
      }

      if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        swaps++;
        setArrayState([...a]);
        await sleepFn();
        await heapify(heapSize, largest);
      }
    }

    async function heapSort(start, end) {
      const size = end - start + 1;
      for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        await heapify(size, i);
      }
      for (let i = size - 1; i > 0; i--) {
        [a[0], a[i]] = [a[i], a[0]];
        swaps++;
        setArrayState([...a]);
        await sleepFn();
        await heapify(i, 0);
      }
    }

    async function partition(low, high) {
      const pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        if (a[j] <= pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          swaps++;
          setArrayState([...a]);
          setColorState(new Array(n).fill("#ffd93d"));
          await sleepFn();
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      swaps++;
      return i + 1;
    }

    async function introSortHelper(low, high, depthLimit) {
      if (high - low <= THRESHOLD) {
        await insertionSort(low, high);
        return;
      }
      if (depthLimit === 0) {
        await heapSort(low, high);
        return;
      }
      const pi = await partition(low, high);
      await introSortHelper(low, pi - 1, depthLimit - 1);
      await introSortHelper(pi + 1, high, depthLimit - 1);
    }

    await introSortHelper(0, n - 1, maxDepth);

    setStats({ comparisons, swaps, time: 0 });
    setColorState(new Array(n).fill("#4ade80"));
    return 0;
  };
  // Actions
  const handleSort = async () => {
    if (isSorting) return;
    let arrayToSort = array;

    if (customArrayInput.trim() !== "") {
      const parsedArray = customArrayInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map(Number);

      if (parsedArray.some(isNaN) || parsedArray.length === 0) {
        setInputError("Invalid input. Please enter comma-separated numbers.");
        return;
      }

      setInputError("");
      setArray(parsedArray);
      setArraySize(parsedArray.length);
      setColorArray(new Array(parsedArray.length).fill("#66ccff"));
      arrayToSort = parsedArray;
    }

    setIsSorting(true);
    stopSortingRef.current = false;
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });
    const start = Date.now();
    setMessage(`Sorting started using ${getAlgorithmName()}.`);

    try {
      // We now pass `arrayToSort` to the sorting functions instead of `array`
      switch (algorithm) {
        case "bubbleSort":
          await bubbleSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "selectionSort":
          await selectionSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "insertionSort":
          await insertionSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "mergeSort":
          await mergeSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "quickSort":
          await quickSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "heapSort":
          await heapSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "radixSort":
          // Radix and Bucket sort use the state `array` directly, so we update it first
          await runRadixSort();
          break;
        case "bucketSort":
          await runBucketSort();
          break;
        case "timSort":
          await timSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;
        case "introSort":
          await introSortWithStop(
            array,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
          break;  

        default:
          await bubbleSortWithStop(
            arrayToSort,
            setArray,
            setColorArray,
            sleep,
            stopSortingRef,
            (s) => setStatistics((prev) => ({ ...prev, ...s }))
          );
      }
      const elapsed = Date.now() - start;
      setStatistics((prev) => ({ ...prev, time: elapsed }));
      setMessage("Sorting completed.");
    } catch (e) {
      if (e && e.message === "Stopped") {
        setMessage("Sorting stopped.");
      } else {
        setMessage("An error occurred while sorting.");
        // eslint-disable-next-line no-console
        console.error(e);
      }
    } finally {
      setIsSorting(false);
    }
  };

  const handleStop = () => {
    stopSortingRef.current = true;
  };

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
  const gapValue = computeGap();
  const barFontSize = computeBarFontSize();

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
  ];

  return (
    <div
      className="page-container"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <h1 className="page-title">Sorting Algorithms</h1>

      {/* Top control bar */}
      <div
        className="controls-section"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <select
          aria-label="Select Algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
          className="input"
        >
          {algoOptions.map((algo) => (
            <option key={algo} value={algo}>
              {algorithmNames[algo]}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Custom Array (e.g., 8, 2, 5)"
          value={customArrayInput}
          onChange={(e) => setCustomArrayInput(e.target.value)}
          disabled={isSorting}
          className="input"
        />
        <button className="btn" onClick={handleSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Start Sort"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleStop}
          disabled={!isSorting}
        >
          Stop
        </button>
        <button
          className="btn btn-secondary"
          onClick={generateArray}
          disabled={isSorting}
        >
          Generate Array
        </button>
      </div>
      {inputError && (
        <div className="input-error">{inputError}</div>
      )}

      {/* Controls & Export */}
      <div
        className="controls-section"
        style={{
          display: "grid",
          gridTemplateColumns: isTabletOrBelow ? "1fr " : "1fr 1fr ",
          gridTemplateRows: isTabletOrBelow ? "auto auto auto" : "auto auto",
          gap: "24px",
          marginBottom: "12px",
          width: "100%",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "rgba(15, 52, 96, 0.1)",
            borderRadius: "15px",
            border: "1px solid rgba(102,204,255,0.2)",
            padding: "20px",
            width: "100%",
          }}
        >
          <h3 style={{ color: "#66ccff", marginBottom: "12px" }}>
            Visualization Controls
          </h3>

          {/* Array Size Control */}
          <div
            style={{
              display: "flex",
              flexDirection: isTabletOrBelow ? "column" : "row",
              alignItems: isTabletOrBelow ? "flex-start" : "center",
              gap: "10px",
              justifyContent: "space-between",
              marginBottom: "14px",
              width: "100%",
            }}
          >
            <label
              className="label"
              htmlFor="arraySizeRange"
              style={{ minWidth: "110px" }}
            >
              Array Size:
            </label>
            <input
              id="arraySizeRange"
              type="range"
              min="10"
              max="60"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
              className="input"
              style={{ flex: 1, maxWidth: "100%" }}
            />
            <div
              style={{
                color: "#66ccff",
                fontWeight: 600,
                minWidth: isTabletOrBelow ? "auto" : "140px",
                textAlign: isTabletOrBelow ? "left" : "right",
                // width: "100%"
              }}
            >
              {arraySize}{" "}
              <span style={{ color: "#9bb3c7", fontWeight: 400 }}>
                (elements)
              </span>
            </div>
          </div>

          {/* Speed Control */}
          <div
            style={{
              display: "flex",
              flexDirection: isTabletOrBelow ? "column" : "row",
              alignItems: isTabletOrBelow ? "flex-start" : "center",
              gap: "10px",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "4px",
            }}
          >
            <label
              className="label"
              htmlFor="speedRange"
              style={{ minWidth: "110px" }}
            >
              Speed:
            </label>
            <input
              id="speedRange"
              type="range"
              min="20"
              max="1000"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              disabled={isSorting}
              className="input"
              style={{ flex: 1, maxWidth: "100%" }}
            />
            <div
              style={{
                color: "#66ccff",
                fontWeight: 600,
                minWidth: isTabletOrBelow ? "auto" : "140px",
                textAlign: isTabletOrBelow ? "left" : "right",
                // width: "100%",
              }}
            >
              {delay}ms
            </div>
          </div>
        </div>

        <SimpleExportControls containerId="sort-visualization-container" />
        {/* Pseudocode panel */}
        <div
          style={{
            flex: "0 0 300px",
            minWidth: "280px",
            maxWidth: "100%",
            background: "rgba(102,204,255,0.07)",
            border: "1px solid rgba(102,204,255,0.15)",
            borderRadius: "12px",
            padding: "18px",
            overflowX: "auto",
            marginTop: isTabletOrBelow ? "20px" : "0px",
            height: "fit-content",
            alignSelf: "flex-start",
          }}
        >
          <h3 className="pseudo-title">{getAlgorithmName()} Pseudocode</h3>
          <pre className="pseudo-code-block">
            {(ALGORITHM_PSEUDOCODE[algorithm] || []).map((line) => (
              <div key={line.code} className="pseudo-line">
                {line.code}
              </div>
            ))}
          </pre>
          <div className="pseudo-explanation">
            <strong>Explanation:</strong>
            <br />
            {(ALGORITHM_PSEUDOCODE[algorithm] || [])[0]?.explain ||
              "Select an algorithm to view its pseudocode."}
          </div>
        </div>
      </div>

      {/* Status */}
      {message && (
        <div className="status-message-container">{message}</div>
      )}

      {/* Visualization */}
      <div
        style={{
          display: "flex",
          flexDirection: isTabletOrBelow ? "column" : "row",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: "1 1 auto",
            minWidth: "300px",
            maxWidth: "100%",
            overflowX: "hidden",
          }}
        >
          <div
            className="visualization-area"
            id="sort-visualization-container"
          >
            <div className="array-display-container">
              {array.map((num, idx) => {
                const showNumbers = arraySize <= 25;
                const col = colorArray[idx] || "#66ccff";
                return (
                  <div
                    key={`${num}-${idx}`}
                    className="array-bar-element"
                    style={{
                      height: `${Math.max(40, Math.round((num / Math.max(...array, 1)) * 280))}px`,
                      backgroundColor: col,
                      borderColor: col,
                    }}
                    title={`Value: ${num}, Index: ${idx}`}
                  >
                    {showNumbers && (
                      <div className="bar-number-display">{num}</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="array-info-display">
              Array Size: {array.length}
            </div>
          </div>
        </div>

      </div>

      {/* Stats */}
      <div className="stats-section">
        <h3 className="stats-title">Performance Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card comparisons">
            <div className="stat-label comparisons">Comparisons</div>
            <div className="stat-value">{statistics.comparisons}</div>
          </div>
          <div className="stat-card swaps">
            <div className="stat-label swaps">Swaps/Moves</div>
            <div className="stat-value">{statistics.swaps}</div>
          </div>
          <div className="stat-card time">
            <div className="stat-label time">Elapsed Time</div>
            <div className="stat-value">{statistics.time} ms</div>
          </div>
          <div className="stat-card array-size">
            <div className="stat-label array-size">Array Size</div>
            <div className="stat-value">{arraySize}</div>
          </div>
        </div>
      </div>

      {/* Algorithm details */}
      <div className="algorithm-info">
        <div className="algo-info-header">
          <h3>{getAlgorithmName()} - Algorithm Details</h3>
          <button
            className="code-explanation-btn"
            onClick={() => setShowCodeExplanation(true)}
          >
            View Code Explanation
          </button>
        </div>
        {(() => {
          const meta = getAlgorithmInfo() || {};
          return (
            <div>
              <p>{meta.description}</p>
              <div className="complexity-grid">
                <div className="complexity-row">
                  <span className="complexity-label">Time:</span>{" "}
                  <span>{meta.timeComplexity}</span>
                </div>
                <div className="complexity-row">
                  <span className="complexity-label">Space:</span>{" "}
                  <span>{meta.spaceComplexity}</span>
                </div>
                <div className="complexity-row">
                  <span className="complexity-label">Best Case:</span>{" "}
                  <span>{meta.bestCase}</span>
                </div>
                <div className="complexity-row">
                  <span className="complexity-label">Stable:</span>{" "}
                  <span>{meta.stable}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      <CodeExplanation
        algorithm={algorithm}
        isVisible={showCodeExplanation}
        onClose={() => setShowCodeExplanation(false)}
      />
    </div>
  );
};

export default Sorting;
