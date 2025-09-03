// IntroSort = QuickSort + HeapSort (depth limited quicksort)
// Uses quicksort until recursion depth runs out, then switches to heapsort

async function partition(arr, low, high, setArray, setColorArray, delay) {
  const n = arr.length;
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // highlight comparison
    const colors = new Array(n).fill("lightgrey");
    colors[j] = "red";
    colors[high] = "blue"; // pivot
    setColorArray([...colors]);

    await new Promise(resolve => setTimeout(resolve, delay));

    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      await setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  await setArray([...arr]);
  await new Promise(resolve => setTimeout(resolve, delay));

  return i + 1;
}

async function heapify(arr, n, i, setArray, setColorArray, delay) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  const colors = new Array(n).fill("lightgrey");
  colors[i] = "blue"; // root
  if (l < n) colors[l] = "red"; // left child comparison
  if (r < n) colors[r] = "red"; // right child comparison
  setColorArray([...colors]);
  await new Promise(resolve => setTimeout(resolve, delay));

  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    await setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, delay));
    await heapify(arr, n, largest, setArray, setColorArray, delay);
  }
}

async function heapSort(arr, setArray, setColorArray, delay) {
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, setArray, setColorArray, delay);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    await setArray([...arr]);

    const colors = new Array(n).fill("lightgrey");
    for (let k = i; k < n; k++) colors[k] = "green"; // sorted tail
    setColorArray([...colors]);

    await new Promise(resolve => setTimeout(resolve, delay));
    await heapify(arr, i, 0, setArray, setColorArray, delay);
  }
}

async function introSortUtil(arr, low, high, depthLimit, setArray, setColorArray, delay) {
  const size = high - low + 1;
  if (size <= 16) {
    // Insertion sort for small arrays
    for (let i = low + 1; i <= high; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= low && arr[j] > key) {
        const colors = new Array(arr.length).fill("lightgrey");
        colors[j] = "red";
        colors[j + 1] = "red";
        setColorArray([...colors]);

        arr[j + 1] = arr[j];
        await setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, delay));
        j--;
      }
      arr[j + 1] = key;
      await setArray([...arr]);
    }
    return;
  }

  if (depthLimit === 0) {
    await heapSort(arr, setArray, setColorArray, delay);
    return;
  }

  const p = await partition(arr, low, high, setArray, setColorArray, delay);
  await introSortUtil(arr, low, p - 1, depthLimit - 1, setArray, setColorArray, delay);
  await introSortUtil(arr, p + 1, high, depthLimit - 1, setArray, setColorArray, delay);
}

export const introSort = async (arr, setArray, setColorArray, delay) => {
  const n = arr.length;
  const depthLimit = 2 * Math.floor(Math.log2(n));

  await introSortUtil(arr, 0, n - 1, depthLimit, setArray, setColorArray, delay);

  setColorArray(new Array(n).fill("green")); // all sorted
  return arr;
};
