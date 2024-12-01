import React, { useState } from 'react';
import { useNoteStore } from './store/useNoteStore';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';
import { Header } from './components/Header';
import { Note } from './types/note';

function App() {
  const { notes, addNote, updateNote, deleteNote } = useNoteStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleAddNote = (note: { title: string; content: string }) => {
    addNote(note);
    setIsFormOpen(false);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdateNote = (note: { title: string; content: string }) => {
    if (editingNote) {
      updateNote(editingNote.id, note);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewNote={() => setIsFormOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>

        {(isFormOpen || editingNote) && (
          <NoteForm
            onSubmit={editingNote ? handleUpdateNote : handleAddNote}
            onClose={() => {
              setIsFormOpen(false);
              setEditingNote(null);
            }}
            initialValues={editingNote ?? undefined}
          />
        )}
      </main>
    </div>
  );
}

export default App;