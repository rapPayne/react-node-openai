import React, { useState } from 'react';
import './App.css';

enum SentenceType { question = "question", answer = "answer" }
type Sentence = {
  type: SentenceType,
  text: string,
}

export function App() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<Sentence>>([])
  return (
    <div style={styles.wrapper}>
      <h1>Ask me anything</h1>
      <label htmlFor="question">What do you want to know?</label>
      <textarea id="question" value={question} onChange={e => setQuestion(e.target.value)} style={styles.questionBox}></textarea>
      <button onClick={askQuestion}>Ask away</button>
      <section style={styles.answerBox}>
        {conversation.map((sentence: Sentence) => <p className={sentence.type} key={sentence.text}>{sentence.text}</p>)}
      </section>
    </div>
  );

  // TODO:If the question has embedded ", they need to be stripped out somehow.
  function askQuestion() {
    setConversation((conversation) => [...conversation, { type: SentenceType.question, text: question }])
    const headers = new Headers();
    headers.set("content-type", "application/json");

    fetch('/api/ask', {
      method: "POST",
      headers: headers,
      body: `{"question": "${question}"}`
    })
      .then(res => res.text())
      .then(formatAnswer)
      .then((paragraphs: string[]) => paragraphs.map(p => setConversation((conversation) => [...conversation, { type: SentenceType.answer, text: p }]))
      )
    setQuestion((question) => "");
  }
}
function formatAnswer(answer: string): Array<string> {
  answer = answer.replace(/(^"\\n\\n)/, "")
  answer = answer.replace(/("$)/, "")
  console.log({ answer })
  const paragraphs = answer.split("\\n\\n")
  console.log({ paragraphs })
  return paragraphs;
}

const styles = {
  wrapper: { padding: 10 },
  questionBox: {
    display: 'block',
    width: '95%',
  },
  answerBox: {
    border: '1px solid var(--dark2)',
    padding: 5,
  }
}