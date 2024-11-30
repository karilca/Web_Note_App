// Translations object
const translations = {
    en: {
        appTitle: '📝 Web Note App',
        noteTitlePlaceholder: 'Enter note title...',
        noteContentPlaceholder: 'Write your note here...',
        addNoteButton: ' Add Note',
        editButtonTitle: 'Edit note',
        deleteButtonTitle: 'Delete note',
        fillTitleContentAlert: 'Please fill in both title and content!',
        deleteNoteConfirm: 'Are you sure you want to delete this note?'
    },
    hr: {
        appTitle: '📝 Web Bilješke',
        noteTitlePlaceholder: 'Unesite naslov bilješke...',
        noteContentPlaceholder: 'Napišite svoju bilješku ovdje...',
        addNoteButton: ' Dodaj Bilješku',
        editButtonTitle: 'Uredi bilješku',
        deleteButtonTitle: 'Obriši bilješku',
        fillTitleContentAlert: 'Molimo ispunite naslov i sadržaj!',
        deleteNoteConfirm: 'Jeste li sigurni da želite obrisati ovu bilješku?'
    }
};

// Set default language
let currentLanguage = localStorage.getItem('language') || 'en';
setLanguage(currentLanguage);

// Function to change language
function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    setLanguage(language);
}

// Function to update text based on selected language
function setLanguage(language) {
    document.getElementById('appTitle').innerText = translations[language].appTitle;
    document.getElementById('noteTitle').placeholder = translations[language].noteTitlePlaceholder;
    document.getElementById('noteContent').placeholder = translations[language].noteContentPlaceholder;
    document.getElementById('addNoteButton').innerHTML = '<i class="fas fa-plus"></i>' + translations[language].addNoteButton;
    // Update existing notes' buttons titles
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.title = translations[language].editButtonTitle;
    });
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.title = translations[language].deleteButtonTitle;
    });
}

// On page load, update language settings
window.onload = function() {
    setLanguage(currentLanguage);
    loadNotes();
};

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        displayNote(note);
    });
}

function addNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    if (!title || !content) {
        alert(translations[currentLanguage].fillTitleContentAlert);
        return;
    }

    const note = {
        id: Date.now(),
        title: title,
        content: content
    };

    // Save note to local storage
    saveNoteToLocalStorage(note);

    // Display the note
    displayNote(note);

    // Clear input fields
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

// Modify displayNote to set button titles based on language
function displayNote(note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.setAttribute('data-id', note.id);
    noteElement.innerHTML = `
        <button class="edit-btn" onclick="editNote(this)" title="${translations[currentLanguage].editButtonTitle}">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" onclick="deleteNote(this)" title="${translations[currentLanguage].deleteButtonTitle}">
            <i class="fas fa-trash"></i>
        </button>
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.content)}</p>
    `;

    document.getElementById('notesContainer').prepend(noteElement);
    // Add animation class
    noteElement.classList.add('note-added');
}

function saveNoteToLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.unshift(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(button) {
    const confirmation = translations[currentLanguage].deleteNoteConfirm;
    if (confirm(confirmation)) {
        const noteElement = button.parentElement;
        const noteId = noteElement.getAttribute('data-id');
        removeNoteFromLocalStorage(noteId);

        // Add removal animation
        noteElement.classList.add('note-remove');
        noteElement.addEventListener('transitionend', () => noteElement.remove());
    }
}

function removeNoteFromLocalStorage(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id != id);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function editNote(button) {
    const noteElement = button.parentElement;
    const noteId = noteElement.getAttribute('data-id');
    const title = noteElement.querySelector('h3').innerText;
    const content = noteElement.querySelector('p').innerText;

    // Populate input fields with existing note data
    document.getElementById('noteTitle').value = title;
    document.getElementById('noteContent').value = content;

    // Remove the existing note
    removeNoteFromLocalStorage(noteId);
    noteElement.remove();

    // Focus on the title input field
    document.getElementById('noteTitle').focus();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}