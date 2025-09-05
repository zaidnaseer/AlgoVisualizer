import React, { useEffect, useRef, useState } from "react";
import CodeExplanation from "../components/CodeExplanation";
import SimpleExportControls from "../components/SimpleExportControls";
import "../styles/Sorting.css"; 
import { useMediaQuery } from "react-responsive";

// Import sorting algorithms
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { insertionSort } from "../algorithms/insertionSort";
import { quickSort } from "../algorithms/quickSort";

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

const algorithmFunctions = {
  bubbleSort,
  selectionSort,
  mergeSort,
  insertionSort,
  quickSort
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
  const [statistics, setStatistics] = useState({
    comparisons: 0,
    swaps: 0,
    time: 0
  });

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

  // Handle sorting
  const handleSort = async () => {
    if (isSorting) return;
    
    setIsSorting(true);
    setMessage(`Sorting using ${algorithmNames[algorithm]}...`);
    
    const startTime = Date.now();
    const sortFunction = algorithmFunctions[algorithm];
    
    if (sortFunction) {
      const sortedArray = [...array];
      await sortFunction(sortedArray, setColorArray, delay);
      setArray(sortedArray);
      
      const endTime = Date.now();
      setStatistics(prev => ({
        ...prev,
        time: endTime - startTime
      }));
      setMessage(`Sorting completed using ${algorithmNames[algorithm]}!`);
    } else {
      setMessage(`${algorithmNames[algorithm]} implementation coming soon!`);
    }
    
    setIsSorting(false);
  };

  // Handle stop
  const handleStop = () => {
    setIsSorting(false);
    setMessage("Sorting stopped");
  };

  // Get algorithm info
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
        stable: "No"
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

  const getAlgorithmName = () => algorithmNames[algorithm] || "Unknown Algorithm";

  // Initialize array on component mount and when arraySize changes
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Handle custom array input change
  useEffect(() => {
    if (customArrayInput) {
      handleCustomArray();
    }
  }, []);

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
                40, // A minimum height to ensure small numbers are visible
                Math.round((num / maxVal) * 280) // Scale height within a 280px range
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
        isVisible={showCodeExplanation}
        onClose={() => setShowCodeExplanation(false)}
      />
    </div>
  );
};

export default Sorting;