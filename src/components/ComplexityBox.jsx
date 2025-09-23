import React, { useState, useEffect } from "react";
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

// ===================== DATA =====================
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

// ===================== COLORS =====================
const COLORS_LIGHT = {
  Best: "#06b6d4",
  Average: "#8b5cf6",
  Worst: "#ec4899",
  Memory: "#84cc16",
  "All Cases": "#f59e0b",
};

const COLORS_DARK = {
  Best: "#22d3ee",
  Average: "#a78bfa",
  Worst: "#f472b6",
  Memory: "#a3e635",
  "All Cases": "#fbbf24",
};

// ===================== TOOLTIP =====================
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, complexity } = payload[0].payload;
    // Use data-theme attribute for theme detection
    return (
      <div
        style={{
       background: "var(--theme-card-bg)",
       color: "var(--theme-text-primary)",
       border: "1px solid var(--theme-border)",
       boxShadow: "var(--theme-card-shadow)",
       padding: "10px 14px",
       borderRadius: "8px",
       fontSize: "0.9rem",
       fontWeight: "500",
        }}
      >
         <p style={{ margin: 0, fontWeight: 600, color: "var(--theme-accent)" }}>
          {name} Case
        </p>
        <p style={{ margin: 0 }}>
          ⏱ Complexity: <b>{complexity}</b>
        </p>
      </div>
    );
  }
  return null;
};

// ===================== COMPONENT =====================
const ComplexityBox = () => {
  const [algo, setAlgo] = useState("BubbleSort");
  const [metric, setMetric] = useState("Time");
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    // Listen for changes to data-theme attribute
    const observer = new MutationObserver(() => {
      setIsDarkMode(
        document.documentElement.getAttribute("data-theme") === "dark"
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const chartData = dataMap[algo][metric];
  const colors = isDarkMode ? COLORS_DARK : COLORS_LIGHT;

  return (
    <div className={`complexity-container${isDarkMode ? " force-dark" : ""}`}>
      <h2 className="complexity-title">⚡ Complexity Analysis</h2>
      <p className="complexity-subtitle">
        Big-O Notation for Famous Algorithms
      </p>
      <div className="dropdown-container">
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          {Object.keys(dataMap).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="Time">Time</option>
          <option value="Space">Space</option>
        </select>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={60}>
            <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
             <Tooltip
               content={<CustomTooltip />}
              
                  cursor={false}

                wrapperStyle={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
                 contentStyle={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
                 labelStyle={{ color: 'var(--theme-text-primary)' }}
                 itemStyle={{ color: 'var(--theme-text-primary)' }}
                 trigger="hover"              // prevent click-to-toggle behavior
                 allowEscapeViewBox={{ x: true, y: true }}
             />

            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.name] || "#06b6d4"}
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
