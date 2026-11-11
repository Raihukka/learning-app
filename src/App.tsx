import { useState } from 'react'
import './App.css'
import LearningEntry from "./components/LearningEntry";
import type { LearningEntryData } from "./types/LearningEntryData";

const firstEntry: LearningEntryData = {
  id: 1,
  topic: "React Components",
  date: "2026-10-19",
  learned: "Components help divide the UI into reusable parts.",
  noteToSelf: "Practise regularly",
  confidence: 3,
};

const secondEntry: LearningEntryData = {
  id: 2,
  topic: "2nd learningentry test",
  date: "1111-11-11",
  learned: "Reusing a component is better than writing the same JSX structure twice.",
  noteToSelf: "Practise regularly",
  confidence: 5,
};

const initialEntries: LearningEntryData[] = [firstEntry, secondEntry];


function App() {
  const studentName: string = "Jere";
  const [entries, setEntries] = useState<LearningEntryData[]>(initialEntries);
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [noteToSelf, setNoteToSelf] = useState("");
  const [confidence, setConfidence] = useState(3);

  function handleAddEntry() {
    if (topic.trim() === "" || learned.trim() === "" || confidence > 5 || confidence < 1 || date === "") {

      alert("Topic and learned can't be empty, date must be selected, confidence must be between 1 and 5");

      return;
    }

    const newEntry: LearningEntryData = {
      id: Date.now(),
      topic: topic,
      date: date,
      learned: learned,
      noteToSelf: noteToSelf,
      confidence: confidence,
    };

    setEntries((currentEntries) => [...currentEntries, newEntry]);

    setTopic("");
    setDate("");
    setLearned("");
    setNoteToSelf("");
    setConfidence(3);

  }

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <form>
        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <label htmlFor="learned">Learned</label>
        <textarea
          id="learned"
          value={learned}
          onChange={(event) => setLearned(event.target.value)}
        />

        <label htmlFor="noteToSelf">Note To Self</label>
        <textarea
          id="noteToSelf"
          value={noteToSelf}
          onChange={(event) => setNoteToSelf(event.target.value)}
        />

        <label htmlFor="confidence">Confidence</label>
        <input
          id="confidence"
          type="number"
          min={1}
          max={5}
          value={confidence}
          onChange={(event) => setConfidence(Number(event.target.value))}
        />

        <button type="button" onClick={handleAddEntry}>
          Add entry
        </button>
      </form>


      {entries.map((entry) => (
        <LearningEntry key={entry.id} entry={entry} />
      ))}

    </main>
  );
}


export default App
