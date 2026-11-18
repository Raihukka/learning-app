import express from "express";
import cors from "cors";

type LearningEntryData = {
    id: number;
    topic: string;
    date: string;
    learned: string;
    confidence: number;
    noteToSelf: string;
};

const app = express();
app.use(cors());
const PORT = 3001;

const entries: LearningEntryData[] = [
    {
        id: 1,
        topic: "React Components",
        date: "2026-10-22",
        learned: "Components help us reuse UI code.",
        confidence: 3,
        noteToSelf: "Hmm"
    },
    {
        id: 2,
        topic: "React State",
        date: "2026-10-27",
        learned: "State lets the interface react to changes.",
        confidence: 2,
        noteToSelf: "Hmm"
    },
    {
        id: 3,
        topic: "Express basics",
        date: "2026-10-27",
        learned: "Im in a hurry",
        confidence: 1,
        noteToSelf: "Not enough time for this"
    }
];

app.get("/api/entries", (req, res) => {
    res.json(entries);
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});