// src/pages/AlgorithmComparison.jsx
import React, { useState, useEffect } from "react";
import algorithmsData from "../algorithms/algorithms.json";
import Visualizer from "./AlgorithmVisualizer"; // shared visualizer
import "../styles/global-theme.css";

export default function AlgorithmComparison() {
  const [algoType, setAlgoType] = useState("sorting");

  // Filter algorithms based on selected type
  const filteredAlgos = algorithmsData.filter((a) => a.type === algoType);
  const fallback = algoType === "sorting"
    ? [{ name: "Bubble Sort" }, { name: "Insertion Sort" }]
    : [{ name: "Linear Search" }, { name: "Binary Search" }];
  const options = filteredAlgos.length > 0 ? filteredAlgos : fallback;

  // Default to first two algorithms for the selected type
  const [algo1, setAlgo1] = useState(options[0]?.name || "");
  const [algo2, setAlgo2] = useState(options[1]?.name || options[0]?.name || "");

  // Custom arrays per panel (comma-separated)
  const [algo1ArrayText, setAlgo1ArrayText] = useState("5,2,9,1,5,6");
  const [algo2ArrayText, setAlgo2ArrayText] = useState("7,3,8,2,4,6");
  const [animate, setAnimate] = useState(false);

  const parseArray = (text) => {
    return text
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number)
      .filter((n) => Number.isFinite(n));
  };

  // Update algorithms when type changes
  const handleTypeChange = (type) => {
    setAlgoType(type);
  };

  // Keep algo selections in sync when type or list changes
  useEffect(() => {
    const updated = algorithmsData.filter((a) => a.type === algoType);
    if (updated.length >= 2) {
      setAlgo1((prev) => (updated.some((x) => x.name === prev) ? prev : updated[0].name));
      setAlgo2((prev) => (updated.some((x) => x.name === prev) ? prev : updated[1].name));
    } else {
      const fb = algoType === "sorting"
        ? ["Bubble Sort", "Insertion Sort"]
        : ["Linear Search", "Binary Search"];
      setAlgo1(fb[0]);
      setAlgo2(fb[1]);
    }
  }, [algoType]);

  return (
    <div className="theme-container">
      <h1 className="theme-title">Algorithm Comparison</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "-1rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Select whether you want to compare sorting or searching algorithms, then
        choose two algorithms to compare side by side.
      </p>

      {/* Select algorithm type */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col w-64">
          <label className="mb-2 font-medium text-gray-700">
            Algorithm Type:
          </label>
          <select
            value={algoType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
          </select>
        </div>
      </div>

      {/* Algorithm selectors and custom arrays */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(260px, 360px))",
          gap: "1rem 2rem",
          justifyContent: "center",
          marginBottom: "1.25rem",
        }}
      >
        {/* Algorithm 1 */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Algorithm 1:</label>
          <select
            value={algo1}
            onChange={(e) => setAlgo1(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="e.g. 5,2,9,1,5,6"
            value={algo1ArrayText}
            onChange={(e) => setAlgo1ArrayText(e.target.value)}
            className="mt-2 p-2 border rounded-lg"
          />
        </div>

        {/* Algorithm 2 */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Algorithm 2:</label>
          <select
            value={algo2}
            onChange={(e) => setAlgo2(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="e.g. 7,3,8,2,4,6"
            value={algo2ArrayText}
            onChange={(e) => setAlgo2ArrayText(e.target.value)}
            className="mt-2 p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Animation toggle */}
      <div className="flex justify-center mb-6">
        <label className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
            style={{ width: 20, height: 20 }}
          />
          <span className="text-sm">Animate sorting</span>
        </label>
      </div>

      {/* Side by side visualizers */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[{ name: algo1, arr: parseArray(algo1ArrayText) }, { name: algo2, arr: parseArray(algo2ArrayText) }].map(
          (cfg, idx) =>
            cfg.name && (
              <div
                key={idx}
                className="flex-1 min-w-[400px] max-w-[600px] bg-white p-4 rounded-2xl shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-center">{cfg.name}</h2>
                <Visualizer algorithmName={cfg.name} initialArray={cfg.arr} visualOnly={!animate} hideTitle={true} />
              </div>
            )
        )}
      </div>
    </div>
  );
}
