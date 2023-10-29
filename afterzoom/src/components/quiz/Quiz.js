import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { btt_questions } from './btt'; // Import BTT questions
import { ftt_questions } from './ftt'; // Import FTT questions
import './quiz.css'

// Function to combine questions of a specific category from both BTT and FTT
function combineQuestionsByCategory(btt_questions, ftt_questions, category) {
  const combinedQuestions = [
      ...btt_questions.filter(question => question.category === category),
      ...ftt_questions.filter(question => question.category === category),
  ];
  return combinedQuestions;
}

const Quiz = ({ type }) => {
  const location = useLocation();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
  const [mistakes, setMistakes] = useState([]);
  const [isQuizEnded, setIsQuizEnded] = useState(false);


  let questions;

  // useEffect(() => {
  //   // Check if the user has existing mistakes in the database
  //   axios.get('http://localhost:3001/v1/api/quiz/review')
  //     .then((response) => {
  //       console.log(response.data)
  //       console.log(response.data.data)

  //       // If the user has a mistakes array, initialize "mistakes" accordingly
  //       if (response.data.data !== null) {
  //         // setUserHasMistakes(true);
  //         setMistakes(response.data.data);
  //         console.log("response.data is not null")
          
  //         // For "review," use the mistakes array as the question set
  //         if (type === 'review') {
  //           questions = mistakes;
  //         }
  //       }
  //       // user does not have previous mistakes
  //       else {
  //         return ("You don't have any mistakes to review. Start a new quiz!")
  //       }
  //   });
  // }, [type]);

  if (type === "review") {
    axios.get('http://localhost:3001/v1/api/quiz/review')
      .then((response) => {
        console.log(response.data)
        console.log(response.data.data)

        // If the user has a mistakes array, set this as question bank for "review"
        if (response.data.data !== null) {
          // setUserHasMistakes(true);
          // setMistakes(response.data.data);
          console.log("response.data is not null")
          questions = response.data.data
          
        }
        // user does not have previous mistakes
        else {
          return ("You don't have any mistakes to review. Start a new quiz!")
        }
    });
  }
  

  // Import the BTT and FTT questions accordingly
  if (type === 'btt') {
    questions = btt_questions
  }
  else if (type === 'ftt') {
    questions = ftt_questions
  }
  else if (type === "topic") {
    
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('category'); // Get the selected category from the URL
    questions = combineQuestionsByCategory(btt_questions, ftt_questions, selectedCategory)
  }
  // console.log("bttquiz.js" + questions)

  const onClickNext = () => {
    if (activeQuestion < questions.length - 1) {
        setActiveQuestion(activeQuestion + 1);
        setSelectedAnswerIndex(null) // Reset selected answer index
        
      } else {
        storeResultsToDatabase();
        setShowResult(true);
      }

  }

  useEffect(() => {
    console.log('Mistakes:', mistakes);
  }, [mistakes]);

  const onAnswerSelected = (index) => {
    
    if (selectedAnswerIndex === null) {
        setSelectedAnswerIndex(index);
        const isCorrect = questions[activeQuestion].answers[index].correct;
  
        if (!isCorrect) { // selected wrong answer
          console.log(mistakes)

          if (mistakes !== null) {

            // Check if the question is already in the "mistakes" array
            const found = mistakes.some((item) => {
              return Object.keys(item).every((key) => questions[activeQuestion][key] === item[key]);
            });
            if (!found) { // question is not in mistakes array yet
              // Update mistakes array
              setMistakes([...mistakes, questions[activeQuestion]]);
            }
          } else {
            // no existing mistakes
            setMistakes([...mistakes, questions[activeQuestion]]);
          }
          // console.log(mistakes);

          setResult((prev) => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }));

          
        } else { // answer is correct
          setResult((prev) => ({
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }));

        }
      }
    
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  const endQuiz = () => {
    setShowResult(true);
    setIsQuizEnded(true);
  };

  const storeResultsToDatabase = () => {
    // Create a request object
    const requestData = {
      type: type,
      score: result.correctAnswers,
      mistakes: mistakes,
    };

    // Send the quiz results to the backend
    axios.post('http://localhost:3001/v1/api/quiz', requestData)
      .then((response) => {
        // Handle the response if needed
        console.log('Mistakes saved successfully:' + response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error saving mistakes:', error);
      });
  };

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
            <button onClick={endQuiz}>End Quiz</button>
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>

          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Your score: <span>{ 100 * result.correctAnswers / (activeQuestion + 1)}%</span>
          </p>
          <p>
            Total Questions:<span> {activeQuestion + 1}</span>
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

          <Link to="/review-quiz">
            <button id="review" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Review Mistakes</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Quiz;