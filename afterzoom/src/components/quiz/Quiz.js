import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { btt_questions } from './btt'; // Import BTT questions
import { ftt_questions } from './ftt'; // Import FTT questions
import './quiz.css'


const Quiz = ({ type }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  
  let questions;

  // Import the BTT and FTT questions accordingly
  if (type === 'btt') {
    questions = btt_questions
  }
  else {
    questions = ftt_questions
  };
  // console.log("bttquiz.js" + questions)

  const onClickNext = () => {
    if (activeQuestion < questions.length - 1) {
        setActiveQuestion(activeQuestion + 1);
        setSelectedAnswerIndex(null) // Reset selected answer index
        
      } else {
        setShowResult(true);
      }

  }

  const onAnswerSelected = (index) => {
    
    if (selectedAnswerIndex === null) {
        setSelectedAnswerIndex(index);
        const isCorrect = questions[activeQuestion].answers[index].correct;
  
        if (isCorrect) {
          setResult((prev) => ({
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }));
        } else {
          setResult((prev) => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }));
        }
      }
    
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  const currentQuestion = questions[activeQuestion];

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{currentQuestion.question}</h2>
          <img src={currentQuestion.image} alt=""/>
          <ul>
            {currentQuestion.answers.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(index)}
                key={index}
                className={`${
                    selectedAnswerIndex !== null &&
                  (answer.correct || selectedAnswerIndex === index)
                    ? answer.correct
                      ? 'correct-answer'
                      : 'wrong-answer'
                    : ''
                  }
                  
                  `}
                  >
                {answer.text}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>

          <Link to="/choose-quiz">
                <button id="btt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Return to quiz home</button>
            </Link>
        </div>
      )}
    </div>
  )
}

export default Quiz;