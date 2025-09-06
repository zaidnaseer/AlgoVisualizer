import React from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/global-theme.css";

const GraphDFS = () => {
  return (
    <div className="theme-container">
      <h1 className="theme-title">Depth-First Search (DFS)</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize DFS traversal on a graph. Load the default example or create your own graph.
      </p>
      <GraphVisualizer defaultAlgorithm="DFS" autoLoadExample={true} />
    </div>
  );
};

export default GraphDFS;


