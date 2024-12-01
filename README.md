
# Modern Note Taking App

A beautiful and responsive note-taking application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- Create, edit, and delete notes
- Rich text content support
- Color-coded notes for better organization
- Responsive design for all devices
- Local storage persistence
- Search functionality
- Modern and clean UI
- Keyboard shortcuts support

## 🛠️ Technologies

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [date-fns](https://date-fns.org/) - Date formatting
- [Lucide React](https://lucide.dev/) - Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/karilca/Web_Note_App.git
cd note-taking-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Linting

```bash
npm run lint
# or
yarn lint
```

## 📁 Project Structure

```
src/
├── components/         # React components
├── store/             # Zustand store
├── types/             # TypeScript types
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## 🔑 Key Features Explained

### Note Management
- Notes are automatically saved to local storage
- Each note has a unique color assigned
- Notes display creation and update timestamps
- Markdown-style text formatting

### User Interface
- Clean and intuitive design
- Responsive grid layout
- Modal forms for creating/editing notes
- Smooth animations and transitions
- Search functionality in the header

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```