// Load notes from local storage on page load
window.onload = function() {
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
        alert('Please fill in both title and content!');
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

function displayNote(note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.setAttribute('data-id', note.id);
    noteElement.innerHTML = `
        <button class="edit-btn" onclick="editNote(this)" title="Edit note">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" onclick="deleteNote(this)" title="Delete note">
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
    if (confirm('Are you sure you want to delete this note?')) {
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