// src/pages/NotesPage.jsx
import React, { useState, useEffect } from "react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteText.trim() === "") return;
    setNotes([...notes, noteText]);
    setNoteText("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>My Notes</h1>

      {/* Input for new note */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Write your note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          onClick={addNote}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {/* Notes list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.length === 0 && <p style={{ textAlign: "center" }}>No notes yet!</p>}
        {notes.map((note, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              padding: "0.75rem 1rem",
              marginBottom: "0.5rem",
              borderRadius: "4px"
            }}
          >
            <span>{note}</span>
            <button
              onClick={() => deleteNote(index)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.25rem 0.5rem",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
