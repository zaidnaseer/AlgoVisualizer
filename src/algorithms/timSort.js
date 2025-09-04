const RUN = 32;

async function insertionSort(arr, left, right, setArray, setColorArray, delay) {
  const n = arr.length;
  for (let i = left + 1; i <= right; i++) {
    let temp = arr[i];
    let j = i - 1;

    while (j >= left && arr[j] > temp) {
      const colors = new Array(n).fill("lightgrey");
      colors[j] = "red"; // element being compared
      colors[j + 1] = "red";
      setColorArray([...colors]);

      arr[j + 1] = arr[j];
      await setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, delay));
      j--;
    }
    arr[j + 1] = temp;
    await setArray([...arr]);
  }
}

async function merge(arr, l, m, r, setArray, setColorArray, delay) {
  const n = arr.length;
  let left = arr.slice(l, m + 1);
  let right = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    const colors = new Array(n).fill("lightgrey");
    colors[k] = "red"; // current position being written
    setColorArray([...colors]);

    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    await setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    await setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  while (j < right.length) {
    arr[k++] = right[j++];
    await setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export const timSort = async (arr, setArray, setColorArray, delay) => {
  let n = arr.length;

  // Sort small runs with insertion sort
  for (let i = 0; i < n; i += RUN) {
    await insertionSort(arr, i, Math.min((i + RUN - 1), n - 1), setArray, setColorArray, delay);
  }

  // Merge runs in size-doubling manner
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = Math.min(left + size - 1, n - 1);
      let right = Math.min((left + 2 * size - 1), n - 1);
      if (mid < right) {
        await merge(arr, left, mid, right, setArray, setColorArray, delay);
      }
    }
  }

  setColorArray(new Array(n).fill("green")); // mark fully sorted
  return arr;
};
