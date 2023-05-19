import React, { useState } from 'react';
import './style.css';

export default function QuizContainer({ quizQuestions, id }) {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState();

  const currentQuestion = quizQuestions[currentQuestionId];

  function onAnswerSelect(answer) {
    setSelectedAnswer(answer);
  }

  function onPreviousClick() {
    // Look through the selected answers to find the one we are on
    const selected = selectedAnswers.find(
      (answer) => answer.questionId === currentQuestionId - 1
    );
    // Remove the answer from the selected answers array
    const updatedAnswers = selectedAnswers.filter(
      (answer) => answer.questionId !== currentQuestionId
    );
    // Go to previous question
    setCurrentQuestionId(currentQuestionId - 1);
    setSelectedAnswers(updatedAnswers);
    setSelectedAnswer(selected.answer);
  }
  function onNextClick() {
    // Build a new array of selected answers
    const selected = [
      ...selectedAnswers,
      { questionId: currentQuestion.id, answer: selectedAnswer },
    ];
    setSelectedAnswers(selected);
    if (currentQuestionId === quizQuestions.length - 1) {
      // If at the end of the questions array
      // Get the correct answers from the questions json
      const correctAnswers = quizQuestions.map((question) => {
        return { questionId: question.id, answer: question.correct_answer };
      });
      let correctNum = 0;
      // Count the correct answers
      correctAnswers.forEach((correctAnswer, index) => {
        if (selected[index].answer === correctAnswer.answer) {
          correctNum += 1;
        }
      });
      setCorrectAnswersNumber(correctNum.toString());
    } else {
      // Else if not at end of array then go to next question
      setCurrentQuestionId(currentQuestionId + 1);
    }
    setSelectedAnswer();
  }

  function startOverPressed() {
    // Resets all the states
    setCurrentQuestionId(0);
    setSelectedAnswers([]);
    setSelectedAnswer();
    setCorrectAnswersNumber();
  }

  // For some reason the api comes back with these HTML escapes characters
  function unescapeHtml(safe) {
    return safe
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&eacute;/g, 'é');
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{`Quiz ${id + 1}`}</h2>
        <button type="button" onClick={startOverPressed}>
          Start Over
        </button>
      </div>
      <h3>{`Question ${currentQuestionId + 1}`}</h3>
      <p>{unescapeHtml(currentQuestion.question)}</p>
      <div>
        {currentQuestion.answers.map((answer, i) => {
          return (
            <>
              <input
                type="radio"
                key={i}
                id={i}
                onChange={() => onAnswerSelect(answer)}
                checked={selectedAnswer === answer}
              />
              <label htmlFor={i}>{unescapeHtml(answer)}</label>
              <br />
            </>
          );
        })}
        <br />
        <p className="correct-answers-message">
          {correctAnswersNumber &&
            `You got ${correctAnswersNumber}/${quizQuestions.length} answers correct.`}
        </p>
      </div>
      <br />
      <div>
        <button
          type="button"
          onClick={onPreviousClick}
          disabled={currentQuestionId === 0}
        >{`< Prev`}</button>
        <button type="button" onClick={onNextClick} disabled={!selectedAnswer}>
          {currentQuestionId === quizQuestions.length - 1 ? 'Submit' : `Next >`}
        </button>
      </div>
    </div>
  );
}
