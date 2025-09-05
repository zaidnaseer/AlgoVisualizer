import React, { useEffect, useRef, useState } from "react";
import CodeExplanation from "../components/CodeExplanation";
import SimpleExportControls from "../components/SimpleExportControls";
import "../styles/global-theme.css"; 
import { useMediaQuery } from "react-responsive";

// Pseudocode map used for step-mode highlighting/explanations
const ALGORITHM_PSEUDOCODE = {
  // ... (full pseudocode map unchanged)
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

// ... selectionScanForMin, selectionSwapIfNeeded, all sorting function definitions unchanged ...

const Sorting = () => {
  // ... all hooks and helpers unchanged ...

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
          </div>
        </div>
        {inputError && <div style={{ color: "var(--theme-status-danger)", textAlign: "center", marginTop: "1rem" }}>{inputError}</div>}
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
             <h3>{getAlgorithmName()} Pseudocode</h3>
           </div>
           <pre style={{ background: 'var(--theme-bg)', borderRadius: '8px', padding: '1rem', color: 'var(--theme-text-secondary)', overflowX: 'auto' }}>
             {(ALGORITHM_PSEUDOCODE[algorithm] || []).map((line) => (
               <div key={line.code}>{line.code}</div>
             ))}
           </pre>
        </div>
      </div>
      
      {message && <div style={{ textAlign: "center", color: "var(--theme-status-info)", fontWeight: 600, margin: "1rem 0" }}>{message}</div>}

      {/* Visualization */}
      <div className="visualization-area" id="sort-visualization-container">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "100%", gap: computeGap() }}>
            {array.map((num, idx) => {
              const maxVal = Math.max(...array, 1);
              const heightPx = Math.max(
                40, // A minimum height to ensure small numbers are visible
                Math.round((num / maxVal) * 280) // Scale height within a 280px range
              );
              const col = colorArray[idx] || 'var(--theme-bar-color)';
              return (
                  <div
                    key={`${num}-${idx}`}
                    className="array-bar"
                    style={{
                      height: `${heightPx}px`,
                      backgroundColor: col,
                      color: 'var(--theme-bar-text)',
                      fontSize: computeBarFontSize()
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