import React from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/global-theme.css";

const GraphBFS = () => {
  return (
    <div className="theme-container">
      <h1 className="theme-title">Breadth-First Search (BFS)</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize BFS traversal on a graph. Load the default example or create your own graph.
      </p>
      <GraphVisualizer defaultAlgorithm="BFS" autoLoadExample={true} />
    </div>
  );
};

export default GraphBFS;


