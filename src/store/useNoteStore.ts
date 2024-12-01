import { create } from 'zustand';
import { Note } from '../types/note';

interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

const defaultNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Notes App! 📝',
    content: 'This is your personal space for capturing thoughts, ideas, and important information. Click the "New Note" button to start creating your own notes.',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: '#4F46E5',
  },
  {
    id: '2',
    title: '✨ Features & Tips',
    content: '• Create new notes with titles and content\n• Edit your notes anytime\n• Delete notes you no longer need\n• Organized and clean interface\n• Responsive design for all devices',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: '#10B981',
  },
];

// Load notes from localStorage or use default notes
const loadNotes = (): Note[] => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    const parsed = JSON.parse(savedNotes);
    return parsed.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  }
  return defaultNotes;
};

export const useNoteStore = create<NoteStore>((set) => ({
  notes: loadNotes(),
  addNote: (note) =>
    set((state) => {
      const newNotes = [
        {
          ...note,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          color: ['#4F46E5', '#10B981', '#EC4899', '#F59E0B', '#6366F1'][
            Math.floor(Math.random() * 5)
          ],
        },
        ...state.notes,
      ];
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
  updateNote: (id, updatedNote) =>
    set((state) => {
      const newNotes = state.notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedNote, updatedAt: new Date() }
          : note
      );
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
  deleteNote: (id) =>
    set((state) => {
      const newNotes = state.notes.filter((note) => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
}));