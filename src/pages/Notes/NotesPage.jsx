// src/pages/NotesPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotesPage = () => {
  const topics = [
    { name: "Fundamentals", path: "/notes/java/fundamentals" },
    // You can add more topics later
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4f46e5" }}>
        Notes
      </h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {topics.map((topic, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <Link
              to={topic.path}
              style={{
                textDecoration: "none",
                padding: "1rem",
                display: "block",
                background: "#f3f4f6",
                borderRadius: "6px",
                color: "#111827",
                fontWeight: "500",
              }}
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
