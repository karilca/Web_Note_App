# Web Note App

A sophisticated and user-friendly web-based note-taking application designed to enable users to create, edit, and manage notes directly within their browser. This application utilizes cutting-edge web technologies to deliver a seamless note-taking experience, emphasizing usability, accessibility, and multilingual support.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Notes**: Effortlessly add notes with rich text editing features.
- **Edit Notes**: Seamlessly modify existing notes through the intuitive interface.
- **Delete Notes**: Securely remove notes with a confirmation prompt to prevent accidental deletions.
- **Multilingual Support**: Switch between multiple languages using the language selector.
- **Responsive Design**: Optimized for various screen sizes, including mobile devices.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
- **Rich Text Formatting**: Utilize a WYSIWYG editor for rich text formatting.
- **Cloud Storage**: Notes are stored in Firebase Firestore for persistent data storage.
- **Search Functionality**: Quickly find notes using the search bar.
- **Note Locking**: Password-protect sensitive notes.
- **Accessibility**: Incorporates ARIA attributes and proper HTML semantics to enhance accessibility.
- **Security**: Implements secure authentication and data handling practices.

## Technologies Used

- **React**
- **Firebase**
- **Draft.js**
- **React Draft Wysiwyg**
- **Font Awesome 6.4.0**
- **CSS3**
- **JavaScript ES6**

## Getting Started

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/karilca/Web_Note_App.git
    cd Web_Note_App
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Firebase**:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Replace the Firebase configuration object in `src/App.js` with your project's configuration.

### Usage

1. **Start the application**:
    ```bash
    npm start
    ```

2. **Access the application**:
    - Open `http://localhost:3000` in your preferred web browser.

3. **Using the application**:
    - **Select Language**: Use the language selector in the header to choose your preferred language.
    - **Toggle Dark Mode**: Click the theme toggle button to switch between light and dark modes.
    - **Add a Note**:
        - Enter a title, content, and tags for your note.
        - Use the rich text editor for formatting.
        - Click the **Add Note** button.
    - **Edit a Note**:
        - Click the edit button on a note to modify it.
    - **Delete a Note**:
        - Click the delete button on a note to remove it.
    - **Lock a Note**:
        - Click the lock button on a note to password-protect it.
    - **Search Notes**:
        - Use the search bar to find notes by title or content.

## Code Structure

- `/public/` - Public assets and `index.html`.
- `/src/`
  - `index.js` - React entry point.
  - `App.js` - Main React component.
  - `App.css` - Main stylesheet.
  - `/components/`
    - `Header.js` - Header component with language selector and search bar.
    - `NoteInput.js` - Component for adding new notes.
    - `Note.js` - Individual note component with editing and locking features.
    - `NoteList.js` - Component for displaying the list of notes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.