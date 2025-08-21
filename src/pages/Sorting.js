import React, { useEffect, useRef, useState } from 'react';
import CodeExplanation from '../components/CodeExplanation';
import SimpleExportControls from '../components/SimpleExportControls';
import { selectionSort } from '../algorithms/selectionSort';
import { insertionSort } from '../algorithms/insertionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import '../styles/pages.css';

// Minimal pseudocode for common algorithms
const ALGORITHM_PSEUDOCODE = {
  bubbleSort: [
    { code: 'for i from 0 to n - 1', explain: 'Repeat for each element in the array.' },
    { code: '  for j from 0 to n - i - 2', explain: 'Compare adjacent elements.' },
    { code: '    if arr[j] > arr[j+1]', explain: 'If out of order, swap.' },
    { code: '      swap arr[j] and arr[j+1]', explain: 'Swap them.' }
  ],
  selectionSort: [
    { code: 'for i from 0 to n - 2', explain: 'Traverse the array.' },
    { code: '  minIndex = i', explain: 'Assume current is min.' },
    { code: '  for j from i+1 to n - 1', explain: 'Find the true minimum.' },
    { code: '    if arr[j] < arr[minIndex]', explain: 'Update minIndex.' },
    { code: 'swap arr[i] and arr[minIndex]', explain: 'Place min at position i.' }
  ],
  insertionSort: [
    { code: 'for i from 1 to n - 1', explain: 'Iterate over unsorted part.' },
    { code: '  key = arr[i]', explain: 'Pick the key element.' },
    { code: '  while j >= 0 and arr[j] > key', explain: 'Shift greater elements right.' },
    { code: '  arr[j+1] = key', explain: 'Insert key in place.' }
  ],
  mergeSort: [
    { code: 'split array into halves', explain: 'Divide array recursively.' },
    { code: 'sort left half', explain: 'Recursively sort left.' },
    { code: 'sort right half', explain: 'Recursively sort right.' },
    { code: 'merge two halves', explain: 'Merge sorted halves.' }
  ],
  quickSort: [
    { code: 'pick a pivot', explain: 'Usually last element.' },
    { code: 'partition array', explain: 'Place smaller left, larger right.' },
    { code: 'recurse on subarrays', explain: 'Sort partitions.' }
  ]
};

// Algorithm details: time, space, and two real-life uses
const SORTING_DETAILS = {
  bubbleSort: {
    time: 'Best O(n), Average/Worst O(n^2)',
    space: 'O(1)',
    uses: ['Nearly sorted data', 'Education/teaching basics']
  },
  selectionSort: {
    time: 'O(n^2) (best/avg/worst)',
    space: 'O(1)',
    uses: ['When writes are costly (min swaps)', 'Small arrays, simple logic']
  },
  insertionSort: {
    time: 'Best O(n), Average/Worst O(n^2)',
    space: 'O(1)',
    uses: ['Small or nearly sorted datasets', 'Online/streaming insertion']
  },
  mergeSort: {
    time: 'O(n log n)',
    space: 'O(n)',
    uses: ['External sorting/large files', 'Stable sorting for linked lists']
  },
  quickSort: {
    time: 'Average O(n log n), Worst O(n^2)',
    space: 'O(log n) (recursion)',
    uses: ['In-memory general-purpose sorts', 'Library sorts with good pivoting']
  }
};

function getGap(arraySize, isTabletOrBelow) {
  if (arraySize > 40) return isTabletOrBelow ? '0.5px' : '1px';
  if (arraySize > 25) return '2px';
  return '3px';
}

function getBarFontSize(arraySize) {
  if (arraySize > 40) return '8px';
  if (arraySize > 30) return '9px';
  if (arraySize > 20) return '10px';
  return '11px';
}

export default function Sorting() {
  // core state
  const [array, setArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [delay, setDelay] = useState(100);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [statistics, setStatistics] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const stopSortingRef = useRef(false);
  const [showCodeExplanation, setShowCodeExplanation] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // initial array
  useEffect(() => {
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(arr);
    setColorArray(new Array(arr.length).fill('#66ccff'));
  }, [arraySize]);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Live sort (Bubble) with stop support (internal)
  async function bubbleSortWithStop(arr, setArr, setCols, d, stopRef, setStats) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;
    for (let i = 0; i < n - 1; i++) {
      if (stopRef.current) throw new Error('Stopped');
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) throw new Error('Stopped');
        comparisons++;
        const cols = new Array(n).fill('#66ccff');
        cols[j] = '#ff6b6b';
        cols[j + 1] = '#ff6b6b';
        setCols([...cols]);
        await sleep(d);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          swaps++;
          setArr([...a]);
          cols[j] = '#ffd93d';
          cols[j + 1] = '#ffd93d';
          setCols([...cols]);
          await sleep(d);
        }
        setStats({ comparisons, swaps, time: 0 });
      }
    }
    setCols(new Array(n).fill('#4ade80'));
    return 0;
  }

  // QuickSort animation runner with stop support
  async function animateQuickSort(arr, setArr, setCols, d, stopRef) {
    const a = [...arr];
    const n = a.length;
    const animations = quickSort([...a]);

    for (const step of animations) {
      if (stopRef.current) throw new Error('Stopped');
      if (step.type === 'compare') {
        const cols = new Array(n).fill('lightgrey');
        const [i, j] = step.indices;
        cols[i] = 'red';
        cols[j] = 'red';
        setCols([...cols]);
        await sleep(d);
      }
      if (step.type === 'swap') {
        const [i, j] = step.indices;
        [a[i], a[j]] = [a[j], a[i]];
        setArr([...a]);
        const cols = new Array(n).fill('lightgrey');
        cols[i] = 'yellow';
        cols[j] = 'yellow';
        setCols([...cols]);
        await sleep(d);
      }
    }
    setCols(new Array(n).fill('green'));
  }

  // Step-mode (simple, only bubble for now)
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (algorithm !== 'bubbleSort') {
      setSteps([]);
      setCurrentStep(0);
      return;
    }
    const s = [];
    const a = [...array];
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        s.push({ type: 'compare', indices: [j, j + 1], array: [...a], pseudoLine: 1 });
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          s.push({ type: 'swap', indices: [j, j + 1], array: [...a], pseudoLine: 2 });
        }
      }
    }
    s.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
    setSteps(s);
    setCurrentStep(0);
  }, [array, algorithm]);

  const handleNextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // derive colors for current step (only for step-mode)
  const getStepColorArray = () => {
    if (!steps[currentStep]) return colorArray;
    const step = steps[currentStep];
    const n = array.length;
    let colors = new Array(n).fill('#66ccff');
    if (step.type === 'compare' || step.type === 'swap') step.indices.forEach((i) => (colors[i] = '#ff6b6b'));
    if (step.type === 'done') colors = new Array(n).fill('#4ade80');
    return colors;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 800;
  const isTabletOrBelow = typeof window !== 'undefined' && window.innerWidth < 1024;

  const getAlgorithmName = () => ({
    bubbleSort: 'Bubble Sort',
    selectionSort: 'Selection Sort',
    insertionSort: 'Insertion Sort',
    mergeSort: 'Merge Sort',
    quickSort: 'Quick Sort'
  }[algorithm] || 'Sorting');

  const gapValue = getGap(arraySize, isTabletOrBelow);
  const barFontSize = getBarFontSize(arraySize);

  const startSort = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });
    const start = Date.now();
    setStatusMsg(`Sorting started using ${getAlgorithmName()}.`);
    try {
      if (algorithm === 'bubbleSort') {
        // Prefer internal (stop-aware) bubble sort
        await bubbleSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
      } else if (algorithm === 'selectionSort') {
        const result = await selectionSort([...array], setColorArray, delay);
        setArray([...result]);
      } else if (algorithm === 'insertionSort') {
        const result = await insertionSort([...array], setColorArray, delay);
        setArray([...result]);
      } else if (algorithm === 'mergeSort') {
        const result = await mergeSort([...array]);
        setArray([...result]);
        setColorArray(new Array(result.length).fill('green'));
      } else if (algorithm === 'quickSort') {
        await animateQuickSort(array, setArray, setColorArray, delay, stopSortingRef);
      }
      const elapsed = Date.now() - start;
      setStatistics((s) => ({ ...s, time: elapsed }));
      setStatusMsg(`Sorting completed in ${elapsed} ms.`);
    } catch {
      // stopped or failed gracefully
      setStatusMsg('Sorting stopped.');
    }
    setIsSorting(false);
  };

  const stopSort = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
    setColorArray(new Array(array.length).fill('#66ccff'));
    setStatusMsg('Sorting stopped.');
  };
  const regenerate = () => {
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(arr);
    setColorArray(new Array(arr.length).fill('#66ccff'));
    setStatusMsg('New array generated. Ready to sort!');
  };

  return (
    <div className="page-container" style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px' }}>
      <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '30px' }}>Sorting Algorithms Visualizer</h1>

      {/* Top control bar: Algorithm select + actions */}
      <div className="controls-section" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
        <select
          aria-label="Select Algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
          className="input"
          style={{ minWidth: '180px' }}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="quickSort">Quick Sort</option>
        </select>

        <button className="btn" onClick={startSort} disabled={isSorting}>Run Sort</button>
        <button className="btn btn-secondary" onClick={stopSort} disabled={!isSorting || (algorithm !== 'bubbleSort' && algorithm !== 'quickSort')}>Stop</button>
        <button className="btn btn-secondary" onClick={regenerate} disabled={isSorting}>Generate Array</button>
      </div>

      {/* 2) Controls & Export cards side-by-side */}
      <div className="controls-section" style={{ display: 'grid', gridTemplateColumns: isTabletOrBelow ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '20px' }}>
        {/* Visualization Controls card */}
        <div style={{ background: 'rgba(15, 52, 96, 0.1)', borderRadius: '15px', border: '1px solid rgba(102,204,255,0.2)', padding: '20px' }}>
          <h3 style={{ color: '#66ccff', marginBottom: '12px' }}>Visualization Controls</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', marginBottom: '14px' }}>
            <label className="label" htmlFor="arraySizeRange" style={{ minWidth: '110px' }}>Array Size:</label>
            <input
              id="arraySizeRange"
              type="range"
              min="10"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
              className="input"
              style={{ width: '200px' }}
            />
            <div style={{ color: '#66ccff', fontWeight: 600, minWidth: '140px', textAlign: 'right' }}>{arraySize} <span style={{ color: '#9bb3c7', fontWeight: 400 }}>(with values)</span></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
            <label className="label" htmlFor="speedRange" style={{ minWidth: '110px' }}>Speed:</label>
            <input
              id="speedRange"
              type="range"
              min="10"
              max="500"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              disabled={isSorting}
              className="input"
              style={{ width: '200px' }}
            />
            <div style={{ color: '#66ccff', fontWeight: 600, minWidth: '140px', textAlign: 'right' }}>{delay}ms <span style={{ color: '#9bb3c7', fontWeight: 400 }}>(fast)</span></div>
          </div>
        </div>

        {/* Export Visualization card */}
        <SimpleExportControls />
      </div>

      {/* Status message line */}
      {statusMsg && (
        <div style={{ textAlign: 'right', color: '#66ccff', fontWeight: 600, margin: '8px 0 6px' }}>{statusMsg}</div>
      )}

      {/* 3) Step Navigation (only for Bubble step-mode) */}
      {steps.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <button className="btn btn-secondary" onClick={handlePrevStep} disabled={currentStep === 0}>Previous Step</button>
          <button className="btn btn-secondary" onClick={handleNextStep} disabled={currentStep >= steps.length - 1}>Next Step</button>
          <span style={{ color: '#66ccff', fontWeight: 600, marginLeft: '15px', fontSize: '14px' }}>Step {currentStep + 1} / {steps.length}</span>
        </div>
      )}

      {/* 4) Visualization & Pseudocode */}
      <div style={{ display: 'flex', flexDirection: isTabletOrBelow ? 'column' : 'row', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ flex: '1 1 auto', minWidth: '300px', maxWidth: '100%', overflowX: 'hidden' }}>
          <div className="visualization-area" style={{ minHeight: '500px', padding: '20px', background: 'rgba(15, 52, 96, 0.1)', borderRadius: '15px', border: '1px solid rgba(102, 204, 255, 0.2)', margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '400px', gap: gapValue, padding: '20px 10px 50px 10px', position: 'relative', flexWrap: 'nowrap' }}>
              {(steps[currentStep]?.array || array).map((num, idx) => {
                const maxBarWidth = isTabletOrBelow ? 8 : 12;
                const barWidth = Math.max(4, Math.min(maxBarWidth, 350 / arraySize));
                const showNumbers = arraySize <= 25;
                const stepColors = steps.length > 0 ? getStepColorArray() : colorArray;
                return (
                  <div
                    key={`${num}-${idx}`}
                    style={{
                      height: `${Math.max(20, num)}px`,
                      width: `${barWidth}px`,
                      backgroundColor: stepColors[idx] || '#66ccff',
                      border: `1px solid ${stepColors[idx] || '#66ccff'}`,
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 'bold',
                      fontSize: barFontSize,
                      padding: '4px 2px',
                      transition: 'all 0.3s ease',
                      boxShadow: `0 4px 12px ${(stepColors[idx] || '#66ccff')}30`,
                      position: 'relative',
                      cursor: 'default'
                    }}
                    title={`Value: ${num}, Index: ${idx}`}
                  >
                    {showNumbers && (
                      <div style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontWeight: 'bold', fontSize: 'inherit', minHeight: '14px', display: 'flex', alignItems: 'center' }}>{num}</div>
                    )}
                  </div>
                );
              })}
              <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: '#66ccff', fontSize: '12px', fontWeight: '600', background: 'rgba(26, 26, 46, 0.8)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(102, 204, 255, 0.3)' }}>
                Array Size: {arraySize} {steps.length > 0 ? '| Step Mode' : ''}
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '0 0 300px', minWidth: '280px', maxWidth: '100%', background: 'rgba(102,204,255,0.07)', border: '1px solid rgba(102,204,255,0.15)', borderRadius: '12px', padding: '18px', overflowX: 'auto' }}>
          <h3 style={{ color: '#66ccff', marginBottom: '10px' }}>{getAlgorithmName()} Pseudocode</h3>
          <pre style={{ background: 'rgba(26,26,46,0.95)', borderRadius: '8px', padding: '14px', fontSize: '15px', color: '#e0e6ed', marginBottom: '10px', overflowX: 'auto' }}>
            {(ALGORITHM_PSEUDOCODE[algorithm] || []).map((line) => (
              <div
                key={line.code}
                style={{
                  background: steps.length > 0 && steps[currentStep]?.pseudoLine !== null && ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.code === line.code ? 'rgba(102,204,255,0.25)' : 'none',
                  borderRadius: '5px',
                  padding: '2px 6px',
                  fontWeight: steps.length > 0 && steps[currentStep]?.pseudoLine !== null && ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.code === line.code ? 700 : 400,
                  color: steps.length > 0 && steps[currentStep]?.pseudoLine !== null && ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.code === line.code ? '#66ccff' : '#e0e6ed'
                }}
              >
                {line.code}
              </div>
            ))}
          </pre>
          <div style={{ background: 'rgba(102,204,255,0.08)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#b8c5d1', minHeight: '40px' }}>
            <strong>Explanation:</strong>
            <br />
            {steps.length > 0 && steps[currentStep]?.pseudoLine !== null
              ? ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.explain
              : 'Switch to Bubble Sort to see step-by-step explanation.'}
          </div>
        </div>
      </div>

      {/* 5) Performance Statistics */}
      <div className="controls-section" style={{ width: '100%', maxWidth: '1000px', textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#66ccff', marginBottom: '15px', textAlign: 'center' }}>Performance Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(102, 204, 255, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(102, 204, 255, 0.3)', textAlign: 'center' }}>
            <div style={{ color: '#66ccff', fontSize: '14px', marginBottom: '5px' }}>Comparisons</div>
            <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>{statistics.comparisons}</div>
          </div>
          <div style={{ background: 'rgba(255, 215, 61, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 215, 61, 0.3)', textAlign: 'center' }}>
            <div style={{ color: '#ffd93d', fontSize: '14px', marginBottom: '5px' }}>Swaps</div>
            <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>{statistics.swaps}</div>
          </div>
          <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.3)', textAlign: 'center' }}>
            <div style={{ color: '#4ade80', fontSize: '14px', marginBottom: '5px' }}>Time</div>
            <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>{statistics.time}ms</div>
          </div>
          <div style={{ background: 'rgba(255, 107, 107, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 107, 107, 0.3)', textAlign: 'center' }}>
            <div style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '5px' }}>Array Size</div>
            <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>{arraySize}</div>
          </div>
        </div>
      </div>

      {/* 6) Algorithm Details */}
      <div className="algorithm-info" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <h3>{getAlgorithmName()} - Algorithm Details</h3>
          <button className="btn btn-secondary" onClick={() => setShowCodeExplanation(true)}>View Code Explanation</button>
        </div>

        {(() => {
          const meta = SORTING_DETAILS[algorithm] || { time: '—', space: '—', uses: [] };
          return (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(102, 204, 255, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(102, 204, 255, 0.2)' }}>
                  <div style={{ color: '#66ccff', fontWeight: 600, marginBottom: '6px' }}>Time Complexity</div>
                  <div style={{ color: '#e0e6ed' }}>{meta.time}</div>
                </div>
                <div style={{ background: 'rgba(102, 204, 255, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(102, 204, 255, 0.2)' }}>
                  <div style={{ color: '#66ccff', fontWeight: 600, marginBottom: '6px' }}>Space Complexity</div>
                  <div style={{ color: '#e0e6ed' }}>{meta.space}</div>
                </div>
              </div>

              <div>
                <div style={{ color: '#66ccff', fontWeight: 600, marginBottom: '6px' }}>Real-life uses</div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#e0e6ed' }}>
                  {meta.uses?.slice(0, 2).map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
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
}