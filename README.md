# Web Note App

A sophisticated and user-friendly web-based note-taking application designed to enable users to create, edit, and manage notes directly within their browser. This application utilizes cutting-edge web technologies to deliver a seamless note-taking experience, emphasizing usability and accessibility.

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

- **Create Notes**: Effortlessly add notes with titles and content.
- **Edit Notes**: Seamlessly modify existing notes through the intuitive interface.
- **Delete Notes**: Securely remove notes with a confirmation prompt to prevent accidental deletions.
- **Responsive Design**: Optimized for various screen sizes, including mobile devices.
- **Animations**: Smooth transitions and animations enhance the user experience when adding and removing notes.
- **Input Validation**: Ensures that both title and content are provided before a note is created.
- **Data Persistence**: Notes are stored in the browser's local storage, ensuring they are preserved across sessions.
- **Character Limits**: Title (maximum 50 characters) and content (maximum 500 characters) to promote concise note-taking.
- **Accessibility**: Incorporates ARIA attributes and proper HTML semantics to enhance accessibility.
- **Security**: Implements HTML escaping to mitigate cross-site scripting (XSS) attacks.

## Technologies Used

- **HTML5**: Markup language for structuring the content.
- **CSS3**: Stylesheet language for designing the interface.
- **JavaScript ES6**: Adds interactivity and handles application logic.
- **Font Awesome**: Provides scalable vector icons for buttons and actions.

### Installation

1. **Clone the repository**:
     ```bash
     git clone https://github.com/yourusername/web-note-app.git
     cd web-note-app