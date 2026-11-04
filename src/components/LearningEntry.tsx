type LearningEntryProps = {
  topic: string;
  date: string;
  learned: string;
  noteToSelf: string;
  confidence: number;
};

function LearningEntry({ topic,date,learned,noteToSelf,confidence, }: LearningEntryProps) {
  return (
    <article>
      <h2>{topic}</h2>
      <p>Date: {date}</p>
      <p>{learned}</p>
      <p>{noteToSelf}</p>
      <p>Confidence: {confidence} / 5</p>
    </article>
  );
}

export default LearningEntry;