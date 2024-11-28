function addNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    if (!title || !content) {
        alert('Please fill in both title and content!');
        return;
    }

    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
        <button class="delete-btn" onclick="deleteNote(this)" title="Delete note">
            <i class="fas fa-trash"></i>
        </button>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(content)}</p>
    `;

    document.getElementById('notesContainer').prepend(noteElement);

    // Clear input fields
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

function deleteNote(button) {
    if (confirm('Are you sure you want to delete this note?')) {
        button.parentElement.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}