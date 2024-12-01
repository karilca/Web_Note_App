
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'enabled');

  useEffect(() => {
    localStorage.setItem('language', language);
    // ...existing code...
  }, [language]);

  // ...existing code...

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Header language={language} setLanguage={setLanguage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <NoteInput addNote={addNote} />
        <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />
      </main>
    </div>
  );
}

export default App;