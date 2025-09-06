import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./complexityBox.css";

// Data for famous algorithms
const dataMap = {
  BubbleSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(n)" },
      { name: "Average", value: 2, complexity: "O(n²)" },
      { name: "Worst", value: 2, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  InsertionSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(n)" },
      { name: "Average", value: 2, complexity: "O(n²)" },
      { name: "Worst", value: 2, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  SelectionSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n²)" },
      { name: "Average", value: 2, complexity: "O(n²)" },
      { name: "Worst", value: 2, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  MergeSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n log n)" },
      { name: "Average", value: 2, complexity: "O(n log n)" },
      { name: "Worst", value: 2, complexity: "O(n log n)" },
    ],
    Space: [{ name: "Memory", value: 2, complexity: "O(n)" }],
  },
  QuickSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n log n)" },
      { name: "Average", value: 2, complexity: "O(n log n)" },
      { name: "Worst", value: 3, complexity: "O(n²)" },
    ],
    Space: [{ name: "Memory", value: 2, complexity: "O(log n)" }],
  },
  HeapSort: {
    Time: [
      { name: "Best", value: 2, complexity: "O(n log n)" },
      { name: "Average", value: 2, complexity: "O(n log n)" },
      { name: "Worst", value: 2, complexity: "O(n log n)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  CountingSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(n + k)" },
      { name: "Average", value: 1, complexity: "O(n + k)" },
      { name: "Worst", value: 1, complexity: "O(n + k)" },
    ],
    Space: [{ name: "Memory", value: 3, complexity: "O(n + k)" }],
  },
  RadixSort: {
    Time: [
      { name: "Best", value: 1, complexity: "O(nk)" },
      { name: "Average", value: 1, complexity: "O(nk)" },
      { name: "Worst", value: 1, complexity: "O(nk)" },
    ],
    Space: [{ name: "Memory", value: 3, complexity: "O(n + k)" }],
  },
  LinearSearch: {
    Time: [
      { name: "Best", value: 1, complexity: "O(1)" },
      { name: "Average", value: 1, complexity: "O(n)" },
      { name: "Worst", value: 1, complexity: "O(n)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  BinarySearch: {
    Time: [
      { name: "Best", value: 1, complexity: "O(1)" },
      { name: "Average", value: 2, complexity: "O(log n)" },
      { name: "Worst", value: 2, complexity: "O(log n)" },
    ],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  BFS: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  DFS: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  Dijkstra: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E log V)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  BellmanFord: {
    Time: [{ name: "All Cases", value: 3, complexity: "O(VE)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  FloydWarshall: {
    Time: [{ name: "All Cases", value: 3, complexity: "O(V³)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V²)" }],
  },
  MorrisTraversal: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  DutchNationalFlag: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
  KahnAlgorithm: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  TarjanAlgorithm: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(V + E)" }],
    Space: [{ name: "Memory", value: 2, complexity: "O(V)" }],
  },
  TowerOfHanoi: {
    Time: [{ name: "All Cases", value: 3, complexity: "O(2^n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(n)" }],
  },
  KadaneAlgorithm: {
    Time: [{ name: "All Cases", value: 2, complexity: "O(n)" }],
    Space: [{ name: "Memory", value: 1, complexity: "O(1)" }],
  },
};

// Neon colors
const COLORS = {
  Best: "#06b6d4",
  Average: "#8b5cf6",
  Worst: "#ec4899",
  Memory: "#84cc16",
  "All Cases": "#f59e0b",
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, complexity } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#1f2235",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #2a2d45",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: "500",
        }}
      >
        <p style={{ margin: 0, fontWeight: "600", color: "#38bdf8" }}>
          {name} Case
        </p>
        <p style={{ margin: 0 }}>⏱ Complexity: <b>{complexity}</b></p>
      </div>
    );
  }
  return null;
};

const ComplexityBox = () => {
  const [algo, setAlgo] = useState("BubbleSort");
  const [metric, setMetric] = useState("Time");

  const chartData = dataMap[algo][metric];

  return (
    <div className="complexity-container">
      <h2 className="complexity-title">⚡ Complexity Analysis</h2>
      <p className="complexity-subtitle">Big-O Notation for Famous Algorithms</p>

      {/* Dropdowns */}
      <div className="dropdown-container">
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          {Object.keys(dataMap).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option>Time</option>
          <option>Space</option>
        </select>
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={60}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name] || "#06b6d4"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplexityBox;