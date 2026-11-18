import { useLearningStore } from "../store/useLearningStore";
import { loadEntries, saveEntry } from "../api/entries";
import { useEffect, useState } from "react";
import LearningEntry from "../components/LearningEntry";

function EntriesPage() {
    // Local state because this value is only used by the form.
    const [topic, setTopic] = useState("");
    const [date, setDate] = useState("");
    const [learned, setLearned] = useState("");
    const [noteToSelf, setNoteToSelf] = useState("");
    const [confidence, setConfidence] = useState(3);
    const [message, setMessage] = useState("");
    const entries = useLearningStore((state) => state.entries);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        loadEntries().catch(() => setLoadError("Could not load entries from the backend."));
    }, []);

    async function handleAddEntry() {
        setMessage("");

        if (topic.trim() === "" || learned.trim() === "" || confidence > 5 || confidence < 1 || date === "") {
            alert("Topic and learned can't be empty, date must be selected, confidence must be between 1 and 5");
            return;
        }

        const newEntry = {
            topic,
            date,
            learned,
            confidence: Number(confidence),
            noteToSelf,
        };

        try {
            await saveEntry(newEntry);
        } catch {
            setMessage("Saving failed. Please try again.");
            return;
        }


        setTopic("");
        setDate("");
        setLearned("");
        setNoteToSelf("");
        setConfidence(3);

        try {
            await loadEntries();
            setMessage("Entry saved successfully.");
        } catch {
            setMessage("Entry was saved, but the list could not be refreshed.");
        }
    }

    async function handleLoadEntries() {
        setLoadError("");
        try {
            await loadEntries();
        } catch {
            setLoadError("Could not load entries. Please try again.");
        }
    }

    return (
        <main>
            <h1>Entries</h1>
            <p>Fullstack Project</p>

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
                {message && <p>{message}</p>}
            </form>

            <section>
                <h2>Entries from the backend</h2>
                <button
                    type="button"
                    onClick={handleLoadEntries}
                >
                    Load from backend
                </button>
                {loadError && <p>{loadError}</p>}
                {entries.map((entry) => (
                    <LearningEntry key={entry.id} entry={entry} />
                ))}
            </section>

        </main>
    );
}


export default EntriesPage