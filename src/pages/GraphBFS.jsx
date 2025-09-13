import React, { useState } from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import { graphAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

const GraphBFS = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  return (
    <div className="theme-container">
      <h1 className="theme-title">Breadth-First Search (BFS)</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize BFS traversal on a graph. Load the default example or create your own graph.
      </p>
      <GraphVisualizer defaultAlgorithm="BFS" autoLoadExample={true} />

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>BFS - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedLanguage === 'java' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedLanguage('java')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Java
            </button>
            <button
              className={`btn ${selectedLanguage === 'python' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedLanguage('python')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Python
            </button>
            <button
              className={`btn ${selectedLanguage === 'cpp' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedLanguage('cpp')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              C++
            </button>
          </div>
        </div>
        <div style={{
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {graphAlgorithms.bfs && graphAlgorithms.bfs[selectedLanguage] 
                ? graphAlgorithms.bfs[selectedLanguage]
                : `// BFS implementation in ${selectedLanguage.toUpperCase()} coming soon!`
              }
            </code>
          </pre>
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: 'var(--accent-warning-bg)', 
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> This is the actual implementation code for Breadth-First Search in {selectedLanguage.toUpperCase()}. 
          You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GraphBFS;


