import React, { useState } from 'react';

function Note({ note, deleteNote, editNote, language }) {
  const [isLocked, setIsLocked] = useState(note.isLocked);
  const [password, setPassword] = useState('');
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false);

  const toggleLock = () => {
    if (isLocked) {
      setShowUnlockPrompt(true);
    } else {
      const newPassword = prompt('Enter a password to lock this note:');
      if (newPassword) {
        setIsLocked(true);
        setPassword(newPassword);
        // Update note in parent component/storage
      }
    }
  };

  const handleUnlock = (inputPassword) => {
    if (inputPassword === password) {
      setIsLocked(false);
      setShowUnlockPrompt(false);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className={`note ${isLocked ? 'locked' : ''}`} data-id={note.id} data-date={note.date}>
      <button className="edit-btn" onClick={() => !isLocked && editNote(note.id)} title={translations[language].editButtonTitle}>
        <i className="fas fa-edit"></i>
      </button>
      <button className="delete-btn" onClick={() => !isLocked && deleteNote(note.id)} title={translations[language].deleteButtonTitle}>
        <i className="fas fa-trash"></i>
      </button>
      <button className="lock-btn" onClick={toggleLock}>
        <i className={`fas fa-${isLocked ? 'lock' : 'lock-open'}`}></i>
      </button>
      
      <div className={isLocked ? 'locked-content' : ''}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        {note.tags.length > 0 && (
          <div className="note-tags">
            {note.tags.map((tag, index) => (
              <span className="tag" key={index}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {showUnlockPrompt && (
        <div className="unlock-prompt">
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => handleUnlock(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default Note;