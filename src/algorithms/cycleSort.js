import {
  COLOR,
  createBaseColors,
  markAllSorted,
  sleep,
} from "../utils/sortingHelpers";

export async function cycleSortWithStop(
  arr,
  setArray,
  setColorArray,
  delay,
  stopRef,
  updateStats
) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0,
    swaps = 0;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    if (stopRef.current) throw new Error("Stopped");

    let item = a[cycleStart];
    let pos = cycleStart;

    // Find where to place the item
    for (let i = cycleStart + 1; i < n; i++) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      if (a[i] < item) pos++;
    }

    // If the item is already in the correct position, skip
    if (pos === cycleStart) continue;

    // Skip duplicates
    while (item === a[pos]) pos++;

    // Place the item to its correct position
    if (item !== a[pos]) {
      [a[pos], item] = [item, a[pos]];
      swaps++;

      const colors = createBaseColors(n);
      colors[pos] = COLOR.swapping;
      colors[cycleStart] = COLOR.comparing;
      setArray([...a]);
      setColorArray([...colors]);
      await sleep(delay);
      updateStats({ comparisons, swaps, time: 0 });
    }

    // Rotate the rest of the cycle
    while (pos !== cycleStart) {
      if (stopRef.current) throw new Error("Stopped");

      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        if (a[i] < item) pos++;
      }

      while (item === a[pos]) pos++;

      if (item !== a[pos]) {
        [a[pos], item] = [item, a[pos]];
        swaps++;

        const colors = createBaseColors(n);
        colors[pos] = COLOR.swapping;
        colors[cycleStart] = COLOR.comparing;
        setArray([...a]);
        setColorArray([...colors]);
        await sleep(delay);
        updateStats({ comparisons, swaps, time: 0 });
      }
    }

    const colors = createBaseColors(n);
    for (let k = 0; k <= cycleStart; k++) colors[k] = COLOR.sorted;
    setColorArray([...colors]);
    await sleep(delay);
  }

  markAllSorted(n, setColorArray);
}
