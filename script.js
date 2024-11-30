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
    document.getElementById('searchInput').placeholder = translations[language].searchPlaceholder;
    const sortSelector = document.getElementById('sortSelector');
    sortSelector.options[0].text = translations[language].sortByDate;
    sortSelector.options[1].text = translations[language].sortByTitle;
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

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// On page load, update language settings and apply dark mode if enabled
window.onload = function() {
    setLanguage(currentLanguage);
    loadNotes();
    // Apply dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
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
        content: content,
        tags: tags,
        date: new Date().toISOString()
    };

    // Save note to local storage
    saveNoteToLocalStorage(note);

    // Display the note
    displayNote(note);

    // Clear input fields
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteTags').value = '';
}

// Modify displayNote to set button titles based on language
// Update displayNote to show tags and set data-date attribute
function displayNote(note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.setAttribute('data-id', note.id);
    noteElement.setAttribute('data-date', note.date);
    noteElement.innerHTML = `
        <button class="edit-btn" onclick="editNote(this)" title="${translations[currentLanguage].editButtonTitle}">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" onclick="deleteNote(this)" title="${translations[currentLanguage].deleteButtonTitle}">
            <i class="fas fa-trash"></i>
        </button>
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.content)}</p>
        ${note.tags.length > 0 ? `<div class="note-tags">${note.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join(' ')}</div>` : ''}
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

// Update removeNoteFromLocalStorage to refresh search and sorting after deletion
function removeNoteFromLocalStorage(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id != id);
    localStorage.setItem('notes', JSON.stringify(notes));
    searchNotes();
}

function editNote(button) {
    const noteElement = button.parentElement;
    const noteId = noteElement.getAttribute('data-id');
    const title = noteElement.querySelector('h3').innerText;
    const content = noteElement.querySelector('p').innerText;

    // Populate input fields with existing note data
    document.getElementById('noteTitle').value = title;
    document.getElementById('noteContent').value = content;

    const tags = noteElement.querySelectorAll('.tag');
    if (tags.length > 0) {
        const tagTexts = Array.from(tags).map(tag => tag.innerText);
        document.getElementById('noteTags').value = tagTexts.join(', ');
    } else {
        document.getElementById('noteTags').value = '';
    }

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

// Implement search functionality
function searchNotes() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        const title = note.querySelector('h3').innerText.toLowerCase();
        const content = note.querySelector('p').innerText.toLowerCase();
        const tags = Array.from(note.querySelectorAll('.tag')).map(tag => tag.innerText.toLowerCase());
        if (title.includes(query) || content.includes(query) || tags.some(tag => tag.includes(query))) {
            note.style.display = '';
        } else {
            note.style.display = 'none';
        }
    });
}

// Implement sortNotes function
function sortNotes(criteria) {
    const notesContainer = document.getElementById('notesContainer');
    let notes = Array.from(notesContainer.children);

    notes.sort((a, b) => {
        if (criteria === 'title') {
            const titleA = a.querySelector('h3').innerText.toLowerCase();
            const titleB = b.querySelector('h3').innerText.toLowerCase();
            return titleA.localeCompare(titleB);
        } else {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateB - dateA;
        }
    });

    notes.forEach(note => notesContainer.appendChild(note));
}