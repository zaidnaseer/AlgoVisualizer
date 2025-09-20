import React, { useEffect, useRef, useState } from "react";
import CodeExplanation from "./CodeExplanation";
import SimpleExportControls from "./SimpleExportControls";
import "../styles/Sorting.css";
import { useMediaQuery } from "react-responsive";

import { ALGORITHM_PSEUDOCODE } from "../data/pseudocode";
import { ALGORITHM_INFO } from "../data/algorithmInfo";

import { bubbleSortWithStop } from "../algorithms/bubbleSort";
import { selectionSortWithStop } from "../algorithms/selectionSort";
import { insertionSortWithStop } from "../algorithms/insertionSort";
import { mergeSortWithStop } from "../algorithms/mergeSort";
import { quickSortWithStop } from "../algorithms/quickSort";
import { radixSortWithStop } from "../algorithms/radixSort";
import { bucketSortWithStop } from "../algorithms/bucketSort";
import { heapSortWithStop } from "../algorithms/heapSort";
import { timSortWithStop } from "../algorithms/timSort";
import { introSortWithStop } from "../algorithms/introSort";
import { shellSortWithStop } from "../algorithms/shellSort";

import { COLOR } from "../utils/sortingHelpers";
import { cycleSortWithStop } from "../algorithms/cycleSort";

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
  cycleSort: "Cycle Sort",
};

const algorithms = {
  bubbleSort: bubbleSortWithStop,
  selectionSort: selectionSortWithStop,
  insertionSort: insertionSortWithStop,
  mergeSort: mergeSortWithStop,
  quickSort: quickSortWithStop,
  radixSort: radixSortWithStop,
  bucketSort: bucketSortWithStop,
  heapSort: heapSortWithStop,
  timSort: timSortWithStop,
  introSort: introSortWithStop,
  shellSort: shellSortWithStop,
  cycleSort: cycleSortWithStop,
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
    time: 0,
  });

  const skipNextGenerateRef = useRef(false);
  const stopSortingRef = useRef(false);

  const updateStats = (partial) =>
    setStatistics((prev) => ({ ...prev, ...partial }));

  const generateArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 200) + 10
    );
    setArray(newArray);
    setColorArray(new Array(arraySize).fill(COLOR.base));
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });
    setMessage("");
    setInputError("");
  };

  const handleCustomArray = () => {
    try {
      const customArray = customArrayInput
        .split(",")
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !Number.isNaN(num));

      if (customArray.length === 0) {
        setInputError("Please enter valid numbers separated by commas");
        return;
      }
      if (customArray.length > 60) {
        setInputError("Array size cannot exceed 60 elements");
        return;
      }

      skipNextGenerateRef.current = true;
      setArray(customArray);
      setArraySize(customArray.length);
      setColorArray(new Array(customArray.length).fill(COLOR.base));
      setStatistics({ comparisons: 0, swaps: 0, time: 0 });
      setMessage("");
      setInputError("");
      setCustomArrayInput("");
    } catch {
      setInputError("Invalid input format");
    }
  };

  const handleStop = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
    setMessage("Sorting stopped");
  };

  const getAlgorithmName = () => algorithmNames[algorithm] || "Unknown Algorithm";

  const getAlgorithmInfo = () =>
    ALGORITHM_INFO[algorithm] || {
      description: "Algorithm implementation coming soon!",
      timeComplexity: "N/A",
      spaceComplexity: "N/A",
      bestCase: "N/A",
      stable: "N/A",
    };

  const handleSort = async () => {
    if (isSorting) return;

    setIsSorting(true);
    stopSortingRef.current = false;
    setMessage(`Sorting using ${algorithmNames[algorithm]}...`);
    setStatistics({ comparisons: 0, swaps: 0, time: 0 });

    const startTime = Date.now();
    const fn = algorithms[algorithm];

    if (!fn) {
      setMessage(`${algorithmNames[algorithm]} implementation coming soon!`);
      setIsSorting(false);
      return;
    }

    try {
      await fn(
        array,
        setArray,
        setColorArray,
        delay,
        stopSortingRef,
        (s) => updateStats(s)
      );
      if (!stopSortingRef.current) {
        const endTime = Date.now();
        updateStats({ time: endTime - startTime });
        setMessage(`Sorting completed using ${algorithmNames[algorithm]}!`);
      }
    } catch (e) {
      if (e && e.message === "Stopped") {
        setMessage("Sorting stopped.");
      } else {
        console.error(e);
        setMessage("An error occurred while sorting.");
      }
    } finally {
      setIsSorting(false);
    }
  };

  useEffect(() => {
    if (skipNextGenerateRef.current) {
      skipNextGenerateRef.current = false;
      return;
    }
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1024px)" });

  const currentLen = array.length || arraySize;

  const computeGap = () => {
    if (currentLen > 40) return isTabletOrBelow ? "1px" : "2px";
    if (currentLen > 25) return "3px";
    return "6px";
  };

  const computeBarFontSize = () => {
    if (currentLen > 40) return "8px";
    if (currentLen > 30) return "9px";
    if (currentLen > 20) return "10px";
    return "11px";
  };

  const algoOptions = Object.keys(algorithms);

  return (
    <div className="theme-container">
      <h1 className="theme-title">Sorting Algorithms</h1>

      <div className="sorting-grid">
        {/* LEFT COLUMN */}
        <div className="sorting-left">
          {/* Controls */}
          <div className="theme-card">
            <div className="theme-card-header no-border">
              <h3>Controls</h3>
            </div>

            <div className="form-grid tight-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="algorithm-select">
                  Algorithm
                </label>
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

              <div className="form-group span-2">
                <label className="form-label" htmlFor="custom-array">
                  Custom Array
                </label>
                <input
                  id="custom-array"
                  type="text"
                  placeholder="e.g., 8, 2, 5"
                  value={customArrayInput}
                  onChange={(e) => setCustomArrayInput(e.target.value)}
                  disabled={isSorting}
                  className="form-control"
                />
                <div className="row-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleSort}
                    disabled={isSorting}
                  >
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
                  {customArrayInput && (
                    <button
                      className="btn btn-secondary"
                      onClick={handleCustomArray}
                      disabled={isSorting}
                    >
                      Apply Custom Array
                    </button>
                  )}
                </div>
              </div>
            </div>

            {inputError && <div className="inline-error">{inputError}</div>}
          </div>

          {/* Visualization controls */}
          <div className="theme-card">
            <div className="theme-card-header">
              <h3>Visualization Controls</h3>
            </div>
            <div className="form-grid tight-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="arraySizeRange">
                  Array Size: {arraySize}
                </label>
                <input
                  id="arraySizeRange"
                  type="range"
                  min="10"
                  max="60"
                  value={arraySize}
                  onChange={(e) => setArraySize(parseInt(e.target.value, 10))}
                  disabled={isSorting}
                  className="form-range"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="speedRange">
                  Speed: {delay}ms
                </label>
                <input
                  id="speedRange"
                  type="range"
                  min="20"
                  max="1000"
                  value={delay}
                  onChange={(e) => setDelay(parseInt(e.target.value, 10))}
                  disabled={isSorting}
                  className="form-range"
                />
              </div>
            </div>
          </div>

          {/* Export */}
          <SimpleExportControls containerId="sort-visualization-container" />

          {/* Info */}
          <div className="theme-card">
            <div className="theme-card-header">
              <h3>{getAlgorithmName()} Information</h3>
            </div>
            <div className="code-like">
              <div>
                <strong>Description:</strong> {getAlgorithmInfo()?.description}
              </div>
            </div>
          </div>

          {/* Status message */}
          {message && (
            <div className="theme-card">
              <div className="status-message">{message}</div>
            </div>
          )}

          {/* Stats */}
          <div className="theme-card">
            <div className="theme-card-header">
              <h3>Performance Statistics</h3>
            </div>
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
                <div className="stat-value">{array.length}</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="theme-card">
            <div className="theme-card-header between">
              <h3>{getAlgorithmName()} - Algorithm Details</h3>
              <button
                className="code-explanation-btn btn btn-secondary"
                onClick={() => setShowCodeExplanation(true)}
              >
                View Code Explanation
              </button>
            </div>
            <div>
              <p className="muted">{getAlgorithmInfo()?.description}</p>
              <div className="complexity-grid">
                <div className="complexity-item">
                  <span className="complexity-label">Time Complexity:</span>
                  <span className="complexity-value">
                    {getAlgorithmInfo()?.timeComplexity}
                  </span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Space Complexity:</span>
                  <span className="complexity-value">
                    {getAlgorithmInfo()?.spaceComplexity}
                  </span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Best Case:</span>
                  <span className="complexity-value">
                    {getAlgorithmInfo()?.bestCase}
                  </span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Stable:</span>
                  <span className="complexity-value">
                    {getAlgorithmInfo()?.stable}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="sorting-right" id="sort-visualization-container">
          <div className="theme-card">
            <div className="theme-card-header no-border viz-header">
              <h3>Visualization</h3>
            </div>
            <div className="viz-canvas" style={{ gap: computeGap() }}>
              {array.map((num, idx) => {
                const maxVal = Math.max(...array, 1);
                const heightPx = Math.max(40, Math.round((num / maxVal) * 280));
                const col = colorArray[idx] || COLOR.base;
                return (
                  <div
                    key={`${num}-${idx}`}
                    className="array-bar"
                    style={{
                      height: `${heightPx}px`,
                      backgroundColor: col,
                      color: "var(--surface-bg)",
                      fontSize: computeBarFontSize(),
                      width: `${Math.max(
                        12,
                        Math.min(40, 400 / Math.max(1, currentLen))
                      )}px`,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      paddingBottom: "4px",
                      transition:
                        "height 180ms ease, background-color 180ms ease, transform 150ms ease",
                      transform: `translateY(0)`,
                    }}
                  >
                    {currentLen <= 25 && num}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compact stats */}
          <div className="theme-card compact-card">
            <div className="theme-card-header no-border">
              <h3>Performance Stats</h3>
            </div>
            <div className="stats-grid compact">
              <div className="stat-card">
                <div className="stat-label">Comparisons</div>
                <div className="stat-value">{statistics.comparisons}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Swaps/Moves</div>
                <div className="stat-value">{statistics.swaps}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Elapsed</div>
                <div className="stat-value">{statistics.time} ms</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Array Size</div>
                <div className="stat-value">{array.length}</div>
              </div>
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
    </div>
  );
};

export default Sorting;
