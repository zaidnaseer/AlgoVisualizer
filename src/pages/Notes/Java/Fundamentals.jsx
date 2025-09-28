// src/pages/Notes/Java/Fundamentals.jsx
import React from "react";

const Fundamentals = () => {
  return (
    <div
      className="notes-page"
      style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#4f46e5",
          fontSize: "2rem",
        }}
      >
        Java Fundamentals
      </h1>

      {/* Introduction */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>
          1. Introduction to Java
        </h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li>Java is a high-level, object-oriented, platform-independent programming language.</li>
          <li>Follows the principle: <strong>Write Once, Run Anywhere (WORA)</strong>.</li>
          <li>Compiled into <strong>bytecode</strong> and executed on the JVM (Java Virtual Machine).</li>
        </ul>
      </section>

      {/* Data Types */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>2. Data Types</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li><strong>Primitive Types:</strong> byte, short, int, long, float, double, char, boolean</li>
          <li><strong>Non-Primitive Types:</strong> String, Arrays, Classes, Objects</li>
        </ul>
      </section>

      {/* Variables */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>3. Variables</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li>Local Variables – declared inside methods.</li>
          <li>Instance Variables – defined inside a class, outside methods.</li>
          <li>Static Variables – declared with <code>static</code> keyword, shared across all objects.</li>
        </ul>
      </section>

      {/* Control Flow */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>4. Control Flow</h2>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
          <li><strong>Decision Making:</strong> if, else-if, switch</li>
          <li><strong>Loops:</strong> for, while, do-while, for-each</li>
          <li><strong>Jump Statements:</strong> break, continue, return</li>
        </ul>
      </section>

      {/* Example Code */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#111827", marginBottom: "0.5rem" }}>5. Example Code</h2>
        <pre
          style={{
            background: "#1f2937",
            color: "#f9fafb",
            padding: "1rem",
            borderRadius: "6px",
            overflowX: "auto",
            fontFamily: "monospace",
          }}
        >
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`}
        </pre>
      </section>
    </div>
  );
};

export default Fundamentals;
