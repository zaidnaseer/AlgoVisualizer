// src/pages/GraphComparison.jsx
import React, { useState } from "react";
import algorithmsData from "../algorithms/algorithms.json";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/global-theme.css";

export default function GraphComparison() {
  const graphAlgos = algorithmsData.filter((a) => a.type === "graph");
  const fallbackGraphAlgos = [
    { name: "BFS", type: "graph" },
    { name: "DFS", type: "graph" },
    { name: "Dijkstra", type: "graph" }
  ];
  const options = graphAlgos.length > 0 ? graphAlgos : fallbackGraphAlgos;

  const [algo1, setAlgo1] = useState(options[0].name);
  const [algo2, setAlgo2] = useState(options[1].name);

  return (
    <div className="theme-container">
      <h1 className="theme-title">Graph Algorithms Comparison</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "-1rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Compare two graph algorithms side by side. You can load the default graph
        or create your own to see how the algorithms behave differently.
      </p>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div className="flex flex-col w-64">
          <label className="mb-2 font-medium text-gray-700">
            Algorithm 1:
          </label>
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
        </div>

        <div className="flex flex-col w-64">
          <label className="mb-2 font-medium text-gray-700">
            Algorithm 2:
          </label>
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
        </div>
      </div>

      {/* Side by side visualizers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "1.5rem",
          alignItems: "start",
          overflowX: "auto",
        }}
      >
        <div className="bg-white p-4 rounded-2xl shadow-lg" style={{ overflow: "auto" }}>
          <h2 className="text-xl font-semibold mb-4 text-center">{algo1}</h2>
          <GraphVisualizer defaultAlgorithm={algo1} autoLoadExample={true} canvasWidth={640} canvasHeight={420} />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-lg" style={{ overflow: "auto" }}>
          <h2 className="text-xl font-semibold mb-4 text-center">{algo2}</h2>
          <GraphVisualizer defaultAlgorithm={algo2} autoLoadExample={true} canvasWidth={640} canvasHeight={420} />
        </div>
      </div>
    </div>
  );
}
