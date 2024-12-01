import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { convertToRaw } from 'draft-js';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID'
  // ...other config...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [notes, setNotes] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'enabled');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('language', language);
    // ...existing code...
  }, [language]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = collection(db, 'notes');
      const notesSnapshot = await getDocs(notesCollection);
      setNotes(notesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    const docRef = await addDoc(collection(db, 'notes'), note);
    setNotes(prevNotes => [...prevNotes, { ...note, id: docRef.id }]);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const editNote = async (id, updatedNote) => {
    await updateDoc(doc(db, 'notes', id), updatedNote);
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === id ? { ...updatedNote, id } : note))
    );
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode ? 'enabled' : 'disabled');
  };

  const filteredNotes = notes.filter(note => {
    const contentText = note.content.blocks
      .map(block => block.text)
      .join(' ')
      .toLowerCase();

    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contentText.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main>
        <NoteInput addNote={addNote} />
        <NoteList
          notes={filteredNotes}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      </main>
    </div>
  );
}

export default App;