🎯 React Quiz App
A simple and interactive quiz application built with React. This project demonstrates state management using useReducer and data fetching with useEffect.

🛠️ Features
Fetches quiz questions from a local API (http://localhost:9000/questions)

State managed using useReducer

Loading and error states

Start screen and question navigation

Modular component structure (e.g., Header, StartScreen, Questions, etc.)

🚀 Technologies Used
React (Vite)

useReducer + useEffect

JavaScript (ES6+)

CSS for styling

📁 Project Structure
css
Copy
Edit
src/
├── components/
│ ├── Header.jsx
│ ├── StartScreen.jsx
│ ├── Questions.jsx
│ ├── Loader.jsx
│ └── Error.jsx
├── App.jsx
├── main.jsx
└── assets/
└── react.svg
🧠 Key Concepts
useEffect: To fetch data from the API when the app loads.

useReducer: For centralized state management (loading, error, active quiz, etc.).

🖥️ Getting Started
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yasirnikozai/react-quiz-app.git
cd react-quiz-app
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Make sure your local API is running at http://localhost:9000/questions.

📌 TODO
Add scoring system

Timer for each question

Display final score

Improve styling with Tailwind or styled-components

📃 License
This project is licensed under the MIT License.
