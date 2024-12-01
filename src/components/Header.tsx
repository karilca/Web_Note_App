import React from 'react';
import { Plus, Search } from 'lucide-react';

interface HeaderProps {
  onNewNote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewNote }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white">My Notes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
            <button
              onClick={onNewNote}
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-opacity-90 transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-1.5" />
              New Note
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};