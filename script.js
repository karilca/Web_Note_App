
function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    
    if (!title || !content) {
        alert('Please fill in both title and content!');
        return;
    }

    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    document.getElementById('notesContainer').appendChild(noteElement);

    // Clear input fields
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}