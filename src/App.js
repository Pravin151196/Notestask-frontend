import React, { useEffect, useState } from "react";
import axios from "axios";

const API_url = "http://localhost:5000/api/notes";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(API_url);
    setNotes(res.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    await axios.post(API_url, { title, description });
    setTitle("");
    setDescription("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Notes App</h2>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Note Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Add Note</button>
      </form>

      <hr />
      <h3>Your Notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>: {note.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
