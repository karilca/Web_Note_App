import React from 'react';

const translations = {
    en: {
        appTitle: '📝 Web Note App',
        noteTitlePlaceholder: 'Enter note title...',
        noteContentPlaceholder: 'Write your note here...',
        addNoteButton: ' Add Note',
        editButtonTitle: 'Edit note',
        deleteButtonTitle: 'Delete note',
        fillTitleContentAlert: 'Please fill in both title and content!',
        deleteNoteConfirm: 'Are you sure you want to delete this note?',
        searchPlaceholder: 'Search notes...',
        sortByDate: 'Sort by Date',
        sortByTitle: 'Sort by Title'
    },
    hr: {
        appTitle: '📝 Web Bilješke',
        noteTitlePlaceholder: 'Unesite naslov bislješke...',
        noteContentPlaceholder: 'Napišite svoju bilješku ovdje...',
        addNoteButton: ' Dodaj Bilješku',
        editButtonTitle: 'Uredi bilješku',
        deleteButtonTitle: 'Obriši bilješku',
        fillTitleContentAlert: 'Molimo ispunite naslov i sadržaj!',
        deleteNoteConfirm: 'Jeste li sigurni da želite obrisati ovu bilješku?',
        searchPlaceholder: 'Pretraži bilješke...',
        sortByDate: 'Sortiraj po datumu',
        sortByTitle: 'Sortiraj po naslovu'
    }
};

function Header({ language, setLanguage, darkMode, toggleDarkMode }) {
  return (
    <header>
      <h1>{translations[language].appTitle}</h1>
      <div className="header-controls">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-selector"
        >
          <option value="en">English</option>
          <option value="hr">Hrvatski</option>
        </select>
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
        </button>
      </div>
    </header>
  );
}

export default Header;