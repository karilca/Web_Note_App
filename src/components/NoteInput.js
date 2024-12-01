import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    addNote({
      id: Date.now(),
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      date: new Date().toISOString()
    });
    setTitle('');
    setEditorState(EditorState.createEmpty());
    setTags('');
  };

  return (
    <section className="note-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          maxLength="50"
          aria-label="Note Title"
          required
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          toolbarClassName="toolbar"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas..."
          aria-label="Note Tags"
        />
        <button type="submit" aria-label="Add Note"><i className="fas fa-plus"></i> Add Note</button>
      </form>
    </section>
  );
}

export default NoteInput;