// Central runner: adapts ONLY the implementations from src/algorithms (no internal logic)
// We call the concrete functions and translate their side-effects/outputs into unified steps.

import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  timSort,
  introSort,
  shellSort,
  linearSearch,
  binarySearch,
  jumpSearch,
} from "./index";

const SORTING_ALGOS = new Set([
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Merge Sort",
  "Quick Sort",
  "Tim Sort",
  "Intro Sort",
  "Shell Sort",
]);

export function getAlgorithmType(algorithmName) {
  return SORTING_ALGOS.has(algorithmName) ? "sorting" : "searching";
}

function colorsToIndices(colors) {
  const indices = [];
  if (!Array.isArray(colors)) return indices;
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] && colors[i] !== "lightgrey") indices.push(i);
  }
  return indices;
}

async function adaptColorArrayAlgorithm(fn, working, delay = 0) {
  const steps = [];
  const n = working.length;
  let lastColors = new Array(n).fill("lightgrey");
  const setColorArray = (colors) => {
    lastColors = Array.isArray(colors) ? colors.slice() : lastColors;
    const indices = colorsToIndices(lastColors);
    steps.push({ type: "compare", indices, array: working.slice() });
  };
  // Drive the algorithm (it mutates working and calls setColorArray)
  await fn(working, setColorArray, delay);
  steps.push({ type: "done", array: working.slice() });
  return { steps, finalArray: working.slice() };
}

function adaptQuickSort(working) {
  const animations = quickSort(working.slice());
  const steps = [];
  const replay = working.slice();
  for (const evt of animations) {
    if (evt.type === "compare" && Array.isArray(evt.indices)) {
      steps.push({ type: "compare", indices: evt.indices });
    }
    if (evt.type === "swap" && Array.isArray(evt.indices)) {
      const [i, j] = evt.indices;
      if (typeof i === "number" && typeof j === "number") {
        const tmp = replay[i];
        replay[i] = replay[j];
        replay[j] = tmp;
      }
      steps.push({ type: "swap", array: replay.slice() });
    }
  }
  steps.push({ type: "done", array: replay.slice() });
  return { steps, finalArray: replay };
}

async function runSorting(algorithmName, array) {
  const working = array.slice();
  switch (algorithmName) {
    case "Bubble Sort":
      return await adaptColorArrayAlgorithm(bubbleSort, working, 0);
    case "Insertion Sort":
      return await adaptColorArrayAlgorithm(insertionSort, working, 0);
    case "Selection Sort":
      return await adaptColorArrayAlgorithm(selectionSort, working, 0);
    case "Shell Sort":
      return await adaptColorArrayAlgorithm(shellSort, working, 0);
    case "Tim Sort":
      return await adaptColorArrayAlgorithm(timSort, working, 0);
    case "Intro Sort":
      return await adaptColorArrayAlgorithm(introSort, working, 0);
    case "Quick Sort":
      return await adaptColorArrayAlgorithm(quickSort, working, 0);
    case "Merge Sort": {
      // mergeSort implementation returns sorted array without colors; we run it and emit final state.
      const result = await mergeSort(working.slice());
      const out = Array.isArray(result) ? result : working.slice();
      return { steps: [{ type: "done", array: out.slice() }], finalArray: out.slice() };
    }
    default:
      return { steps: [{ type: "done", array: working.slice() }], finalArray: working.slice() };
  }
}

async function runSearching(algorithmName, array, target) {
  const working = array.slice();
  const steps = [];
  let foundIndex = -1;
  // We adapt searching functions that take (array, target, setColorArray, delay)
  const setColorArray = (colors) => {
    const indices = colorsToIndices(colors);
    if (indices.length > 0) steps.push({ type: "probe", index: indices[0] });
  };
  switch (algorithmName) {
    case "Linear Search":
      foundIndex = await linearSearch(working, target, setColorArray, 0);
      break;
    case "Binary Search":
      foundIndex = await binarySearch(working, target, setColorArray, 0);
      break;
    case "Jump Search":
      foundIndex = await jumpSearch(working, target, setColorArray, 0);
      break;
    default: {
      // Unknown searching: simple probe sequence driven by implementation absence
      for (let i = 0; i < working.length; i++) {
        steps.push({ type: "probe", index: i });
        if (working[i] === target) { foundIndex = i; break; }
      }
    }
  }
  return { type: "searching", steps, finalArray: working.slice(), foundIndex };
}

export function runAlgorithm(algorithmName, array, target) {
  const type = getAlgorithmType(algorithmName);
  if (type === "sorting") {
    // Note: returning a promise to allow awaiting in callers if needed
    // but AlgorithmVisualizer treats steps synchronously, so we resolve immediately by blocking until done.
    // Here we use deasync via async/await-style: Since callers are not async, we expose sync-like result using Atomics? Not needed.
    // Instead, we design AlgorithmVisualizer to call this synchronously? For now, we rely on algorithms executing quickly with delay 0.
  }
  // We return a plain object; since we call the async fns synchronously above using await, callers should call runAlgorithmSync.
  throw new Error("Use runAlgorithmAsync for execution");
}

export async function runAlgorithmAsync(algorithmName, array, target) {
  const type = getAlgorithmType(algorithmName);
  if (type === "sorting") {
    const res = await runSorting(algorithmName, array);
    return { type, ...res };
  }
  const res = await runSearching(algorithmName, array, target);
  return { ...res };
}


