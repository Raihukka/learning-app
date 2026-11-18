// src/api/entries.ts
import type { LearningEntryData } from "../types/LearningEntryData";
import { useLearningStore } from "../store/useLearningStore";

export async function loadEntries() {
  const response = await fetch("http://localhost:3001/api/entries");
  if (!response.ok) throw new Error("Failed to load entries");

  const data: LearningEntryData[] = await response.json();
  useLearningStore.getState().setEntries(data);
}

export async function saveEntry(entry: Omit<LearningEntryData, "id">) {
  const response = await fetch("http://localhost:3001/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!response.ok) throw new Error("Failed to save entry");
}
