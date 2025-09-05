import React from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/global-theme.css";

const GraphDijkstra = () => {
  return (
    <div className="theme-container">
      <h1 className="theme-title">Dijkstra's Algorithm</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize shortest paths using Dijkstra's algorithm. Load the default example or create your own graph.
      </p>
      <GraphVisualizer defaultAlgorithm="Dijkstra" autoLoadExample={true} />
    </div>
  );
};

export default GraphDijkstra;


