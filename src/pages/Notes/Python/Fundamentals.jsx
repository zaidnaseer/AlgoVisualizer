import React from "react";

const PythonFundamentals = () => {
  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5" }}>
        Python Fundamentals
      </h1>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>1. Introduction to Python</h2>
        <ul>
          <li>Python is a high-level, interpreted, general-purpose programming language.</li>
          <li>Known for its simplicity and readability, widely used in web development, data science, AI, and automation.</li>
          <li>Runs line by line using the Python interpreter (no compilation step).</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>2. Key Features</h2>
        <ul>
          <li>Dynamic typing (no need to declare variable types explicitly).</li>
          <li>Rich standard library with extensive modules and packages.</li>
          <li>Supports multiple paradigms – object-oriented, functional, and procedural.</li>
          <li>Cross-platform and open source.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>3. Basic Syntax</h2>
        <ul>
          <li>Indentation defines code blocks (not braces `{}` like Java/C++).</li>
          <li>Case-sensitive language.</li>
          <li>Comments use <code>#</code> for single-line, and triple quotes <code>"""..."""</code> for multi-line.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#111827" }}>4. Example Code</h2>
        <pre
          style={{
            background: "#1f2937",
            color: "#f9fafb",
            padding: "1rem",
            borderRadius: "6px",
            overflowX: "auto"
          }}
        >
{`# Hello World in Python
print("Hello, Python!")`}
        </pre>
      </section>
    </div>
  );
};

export default PythonFundamentals;
