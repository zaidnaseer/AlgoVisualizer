import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ALGORITHM_INFO } from "../data/algorithmInfo";
import { ALGORITHM_PSEUDOCODE as PSEUDO } from "../data/pseudocode";
import "../styles/SortingDoc.css";

export default function SortingDoc() {
  const { algoId } = useParams();

  // Only support Bubble Sort for now
  if (algoId !== "bubbleSort") {
    return (
      <main className="doc-page">
        <header className="doc-hero">
          <h1>Documentation not available</h1>
          <p className="muted">
            Only Bubble Sort docs are implemented right now.
          </p>
          <div className="cta-row">
            <Link className="btn" to="/data-structures">Back to Overview</Link>
            <Link className="btn primary" to="/sorting">Open Visualizer</Link>
          </div>
        </header>
      </main>
    );
  }

  const info = ALGORITHM_INFO?.bubbleSort;
  const pseudocode = PSEUDO?.["Bubble Sort"];

  if (!info) {
    // If repo data is missing, still show a friendly page
    return (
      <main className="doc-page">
        <header className="doc-hero">
          <h1>Bubble Sort — Documentation</h1>
          <p className="muted">Info not found in ALGORITHM_INFO. You can still try the visualizer.</p>
          <div className="cta-row">
            <Link className="btn primary" to="/sorting">Open Visualizer</Link>
          </div>
        </header>
      </main>
    );
  }

  return (
    <main className="doc-page">
      <header className="doc-hero">
        <div className="hero-text">
          <h1>Bubble Sort <span className="tag">docs</span></h1>
          <p className="muted">{info.description}</p>
          <div className="cta-row">
            <Link to="/sorting" className="btn primary">Open Visualizer</Link>
            <a className="btn" href="#pseudocode">Pseudocode</a>
            <a className="btn" href="#walkthrough">Walkthrough</a>
          </div>
        </div>
      </header>

      <section className="stats-grid" aria-label="Key properties">
        <article className="stat-card">
          <h3>Time Complexity</h3>
          <p><strong>Avg/Worst:</strong> {info.timeComplexity}</p>
          <p><strong>Best:</strong> {info.bestCase}</p>
        </article>
        <article className="stat-card">
          <h3>Space</h3>
          <p><strong>{info.spaceComplexity}</strong> (in-place)</p>
        </article>
        <article className="stat-card">
          <h3>Stable</h3>
          <p><strong>{String(info.stable) === "true" ? "Yes" : info.stable}</strong></p>
        </article>
        <article className="stat-card">
          <h3>Pattern</h3>
          <p>Adjacent compare &amp; swap</p>
        </article>
      </section>

      <section className="callout success" role="note">
        <h3>Intuition</h3>
        <p>
          Compare adjacent items and swap if out of order. After each pass, the largest
          unsorted element “bubbles” to the end. Stop early when a pass makes no swaps.
        </p>
      </section>

      {pseudocode && (
        <section id="pseudocode" className="doc-section">
          <h2>Pseudocode</h2>
          <pre aria-label="Bubble Sort pseudocode"><code>{pseudocode}</code></pre>
          <details className="tip">
            <summary>Optimization tip</summary>
            <p>Track last swap index to shrink the next pass range.</p>
          </details>
        </section>
      )}

      <section id="walkthrough" className="doc-section">
        <h2>Step-by-step walkthrough</h2>
        <p className="muted">Example: <code>[5, 1, 4, 2, 8]</code></p>
        <div className="steps">
          <div className="step">
            <div className="step-no">1</div>
            <div className="step-body">
              <p><strong>Pass 1</strong>: bubble <code>8</code> to the end.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-no">2</div>
            <div className="step-body">
              <p><strong>Pass 2</strong>: bubble next largest (<code>5</code>).</p>
            </div>
          </div>
          <div className="step">
            <div className="step-no">3</div>
            <div className="step-body">
              <p><strong>Stop early</strong> if no swaps in a pass.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>Reference implementation</h2>
        <h3>JavaScript</h3>
        <pre><code>{`function bubbleSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}`}</code></pre>
      </section>

      <section className="doc-section center">
        <Link to="/sorting" className="btn primary lg">Try in Visualizer</Link>
      </section>
    </main>
  );
}
