import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ALGORITHM_INFO } from "../data/algorithmInfo";
import { ALGORITHM_PSEUDOCODE as PSEUDO } from "../data/pseudocode";
import { sortingAlgorithms as CODE } from "../data/allCodes";
import "../styles/SortingDoc.css";

function normalizeStable(v) {
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string") return v;
  return String(v ?? "Unknown");
}

export default function SortingDoc() {
  const { algoId = "" } = useParams();

  const info = ALGORITHM_INFO?.[algoId];
  const pseudo = PSEUDO?.[algoId]; // your pseudocode keys are camelCase (e.g., bubbleSort)
  const code = CODE?.[algoId];

  const title = useMemo(() => {
    // turn "bubbleSort" -> "Bubble Sort"
    return algoId
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());
  }, [algoId]);

  if (!info) {
    return (
      <div className="doc-page">
        <header className="doc-hero">
          <h1 className="doc-title">Documentation not available</h1>
          <p className="muted">No docs found for “{algoId}”.</p>
          <div className="cta-row">
            <Link className="btn" to="/data-structures">Back to Overview</Link>
            <Link className="btn primary" to="/sorting">Open Visualizer</Link>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="doc-page">
      <header className="doc-hero">
        <div className="hero-text">
          <h1 className="doc-title">
            {title} <span className="tag">docs</span>
          </h1>
          <p className="muted">{info.description ?? "No description available."}</p>

          <nav className="cta-row" aria-label="Quick links">
            <Link to="/sorting" className="btn primary">Open Visualizer</Link>
            {pseudo?.length ? <a className="btn" href="#pseudocode">Pseudocode</a> : null}
            {code ? <a className="btn" href="#reference">Reference</a> : null}
          </nav>
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
          <p><strong>{info.spaceComplexity}</strong></p>
        </article>

        <article className="stat-card">
          <h3>Stable</h3>
          <p><strong>{normalizeStable(info.stable)}</strong></p>
        </article>
      </section>

      {pseudo?.length ? (
        <section id="pseudocode" className="doc-section">
          <h2>Pseudocode</h2>
          <div className="pseudo-steps">
            {pseudo.map((step, i) => (
              <div className="pseudo-step" key={i}>
                <pre><code>{step.code}</code></pre>
                {step.explain ? <p className="muted">{step.explain}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {code ? (
        <section id="reference" className="doc-section">
          <h2>Reference implementation</h2>

          {code.java && (
            <>
              <h3>Java</h3>
              <pre><code>{code.java}</code></pre>
            </>
          )}

          {code.python && (
            <>
              <h3>Python</h3>
              <pre><code>{code.python}</code></pre>
            </>
          )}

          {code.cpp && (
            <>
              <h3>C++</h3>
              <pre><code>{code.cpp}</code></pre>
            </>
          )}
        </section>
      ) : null}

      <section className="doc-section center">
        <Link to="/sorting" className="btn primary lg">Try in Visualizer</Link>
      </section>
    </div>
  );
}
