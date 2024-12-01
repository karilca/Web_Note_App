
import React, { useState } from 'react';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      id: Date.now(),
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      date: new Date().toISOString()
    });
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <section className="note-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          maxLength="50"
          aria-label="Note Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          maxLength="500"
          aria-label="Note Content"
          required
        ></textarea>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas..."
          aria-label="Note Tags"
        />
        <button type="submit"><i className="fas fa-plus"></i> Add Note</button>
      </form>
    </section>
  );
}

export default NoteInput;