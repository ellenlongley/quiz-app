import React, { useState, useEffect } from 'react';
import './style.css';
import QuizContainer from './QuizContainer';
import { fetchQuiz } from './api.js';

export default function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizzesLoading, setQuizzesLoading] = useState(false);

  async function getQuizzes() {
    setQuizzesLoading(true);
    const quizJSON = await fetchQuiz();
    setQuizQuestions([...quizQuestions, quizJSON]);
    setQuizzesLoading(false);
  }

  async function startNewQuizPressed() {
    getQuizzes();
  }

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className="app-container">
      <h1>Let's Take A Quiz!</h1>
      {/* Loop over the number of quizzes and display a new quiz container for each quiz */}
      {quizQuestions.map((quiz, i) => (
        <QuizContainer quizQuestions={quiz} id={i} key={i} />
      ))}
      <br />
      <button
        type="button"
        onClick={startNewQuizPressed}
        disabled={quizzesLoading}
      >
        Start New Quiz
      </button>
    </div>
  );
}
