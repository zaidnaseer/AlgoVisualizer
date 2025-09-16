// src/pages/AlgorithmComparison.jsx
import React, { useState, useEffect } from "react";
import algorithmsData from "../algorithms/algorithms.json";
import Visualizer from "./AlgorithmVisualizer"; // shared visualizer
import "../styles/global-theme.css";

export default function AlgorithmComparison() {
  const [algoType, setAlgoType] = useState("sorting");

  // Filter algorithms based on selected type
  const filteredAlgos = algorithmsData.filter((a) => a.type === algoType);
  const fallback =
    algoType === "sorting"
      ? [{ name: "Bubble Sort" }, { name: "Insertion Sort" }]
      : [{ name: "Linear Search" }, { name: "Binary Search" }];
  const options = filteredAlgos.length > 0 ? filteredAlgos : fallback;

  // Default to first two algorithms for the selected type
  const [algo1, setAlgo1] = useState(options[0]?.name || "");
  const [algo2, setAlgo2] = useState(
    options[1]?.name || options[0]?.name || ""
  );

  // Custom arrays per panel (comma-separated)
  const [algo1ArrayText, setAlgo1ArrayText] = useState("5,2,9,1,5,6");
  const [algo2ArrayText, setAlgo2ArrayText] = useState("7,3,8,2,4,6");
  const [animate, setAnimate] = useState(false);

  const parseArray = (text) => {
    return text
      .split(",")
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
      setAlgo1((prev) =>
        updated.some((x) => x.name === prev) ? prev : updated[0].name
      );
      setAlgo2((prev) =>
        updated.some((x) => x.name === prev) ? prev : updated[1].name
      );
    } else {
      const fb =
        algoType === "sorting"
          ? ["Bubble Sort", "Insertion Sort"]
          : ["Linear Search", "Binary Search"];
      setAlgo1(fb[0]);
      setAlgo2(fb[1]);
    }
  }, [algoType]);

  const modernSelectStyles = {
    appearance: "none",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: "500",
    color: "var(--theme-text-primary, #1a1a1a)",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: "right 12px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
    paddingRight: "40px",
  };

  const modernInputStyles = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "var(--theme-text-primary, #1a1a1a)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "inherit",
  };

  const labelStyles = {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--theme-text-primary, #1a1a1a)",
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.025em",
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ width: "280px" }}>
          <label style={labelStyles}>Algorithm Type</label>
          <select
            value={algoType}
            onChange={(e) => handleTypeChange(e.target.value)}
            style={{
              ...modernSelectStyles,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 16px rgba(59, 130, 246, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(59, 130, 246, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(59, 130, 246, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <option value="sorting">🔀 Sorting Algorithms</option>
            <option value="searching">🔍 Searching Algorithms</option>
          </select>
        </div>
      </div>

      {/* Algorithm selectors and custom arrays */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 400px))",
          gap: "2rem",
          justifyContent: "center",
          marginBottom: "2rem",
          padding: "0 1rem",
        }}
      >
        {/* Algorithm 1 */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label style={labelStyles}>First Algorithm</label>
          <select
            value={algo1}
            onChange={(e) => setAlgo1(e.target.value)}
            style={{
              ...modernSelectStyles,
              width: "100%",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.5)";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 16px rgba(16, 185, 129, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 16px rgba(16, 185, 129, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>

          <label style={{ ...labelStyles, marginTop: "8px" }}>
            Input Array
          </label>
          <input
            type="text"
            placeholder="Enter comma-separated numbers (e.g., 5,2,9,1,5,6)"
            value={algo1ArrayText}
            onChange={(e) => setAlgo1ArrayText(e.target.value)}
            style={{
              ...modernInputStyles,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.4)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(16, 185, 129, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 16px rgba(16, 185, 129, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          />
        </div>

        {/* Algorithm 2 */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label style={labelStyles}>Second Algorithm</label>
          <select
            value={algo2}
            onChange={(e) => setAlgo2(e.target.value)}
            style={{
              ...modernSelectStyles,
              width: "100%",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.5)";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(239, 68, 68, 0.1), 0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>

          <label style={{ ...labelStyles, marginTop: "8px" }}>
            Input Array
          </label>
          <input
            type="text"
            placeholder="Enter comma-separated numbers (e.g., 7,3,8,2,4,6)"
            value={algo2ArrayText}
            onChange={(e) => setAlgo2ArrayText(e.target.value)}
            style={{
              ...modernInputStyles,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.4)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(239, 68, 68, 0.6)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(239, 68, 68, 0.1), 0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          />
        </div>
      </div>

      {/* Animation toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 20px",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
            style={{
              width: "18px",
              height: "18px",
              accentColor: "var(--theme-primary, #3b82f6)",
              cursor: "pointer",
            }}
          />
          <span style={{ color: "var(--theme-text-primary, #1a1a1a)" }}>
            🎬 Animate sorting steps
          </span>
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
        {[
          { name: algo1, arr: parseArray(algo1ArrayText) },
          { name: algo2, arr: parseArray(algo2ArrayText) },
        ].map(
          (cfg, idx) =>
            cfg.name && (
              <div
                key={idx}
                className="flex-1 min-w-[400px] max-w-[600px] bg-white p-4 rounded-2xl shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {cfg.name}
                </h2>
                <Visualizer
                  algorithmName={cfg.name}
                  initialArray={cfg.arr}
                  visualOnly={!animate}
                  hideTitle={true}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
