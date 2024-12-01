import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 overflow-hidden"
      style={{ borderLeftColor: note.color || '#4F46E5' }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{note.title}</h3>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(note)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Edit note"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3 whitespace-pre-line">{note.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            {format(new Date(note.updatedAt), 'MMM d, yyyy')}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
            {format(new Date(note.updatedAt), 'h:mm a')}
          </span>
        </div>
      </div>
    </div>
  );
};