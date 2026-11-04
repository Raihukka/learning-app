import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LearningEntry from "./components/LearningEntry";

function App() {
  const studentName: string = "Jere";

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <LearningEntry
      topic="React Components"
      date="2026-10-19"
      learned="Components help divide the UI into reusable parts."
      noteToSelf="Practise regularly"
      confidence={3}
      />

      <LearningEntry
      topic="2nd learningentry test"
      date="1111-11-11"
      learned="Reusing a component is better than writing the same JSX structure twice."
      noteToSelf="Practise regularly"
      confidence={5}
      />
    </main>
  );
}


export default App
