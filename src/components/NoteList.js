
import React from 'react';
import Note from './Note';

function NoteList({ notes, deleteNote, editNote }) {
  return (
    <section className="notes-container" aria-live="polite">
      {notes.map(note => (
        <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
      ))}
    </section>
  );
}

export default NoteList;