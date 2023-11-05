import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { btt_questions } from './btt'; // Import BTT questions
import { ftt_questions } from './ftt'; // Import FTT questions
import './quiz.css';
import Sidebar from '../dashboards/sidebar/Sidebar';
import jwtDecode from "jwt-decode";
import Col from "react-bootstrap/Col";
import styled from '@emotion/styled';

// Function to combine questions of a specific category from both BTT and FTT
function combineQuestionsByCategory(btt_questions, ftt_questions, category) {
  const combinedQuestions = [
      ...btt_questions.filter(question => question.category === category),
      ...ftt_questions.filter(question => question.category === category),
  ];
  return combinedQuestions;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Quiz = ({ type }) => {
  const location = useLocation();
  const [student, setStudent] = useState(null);
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

  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useRef to store the questions
  const questionsRef = useRef([]);
  let questions = questionsRef.current;

  // Use a state variable to control the quiz mode
  const [quizMode, setQuizMode] = useState(type);

  // If pressed review mistakes at result page
  const resetQuiz = () => {
    setQuizMode("review")
    setActiveQuestion(0);
    setShowResult(false);
    setSelectedAnswerIndex(null);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setMistakes([]);
    setIsQuizEnded(false);
  };


  // for sidebar
  useEffect(() => {
    const fetchStudentProfile = async () => {
        try {
            const token = getCookie("access_token");
            const decodedToken = jwtDecode(token).user;
            const studentId = decodedToken.id;
            const response = await axios.get(
                `http://47.128.71.161:3001/v1/api/student/profile/${studentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStudent(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchStudentProfile();
  }, []);


  // for quiz
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (quizMode === 'review') {
          const response = await axios.get('http://47.128.71.161:3001/v1/api/quiz/review');
          // console.log(response.data);
          // console.log(response.data.data);

          // If the user has a mistakes array, set this as the question bank for "review"
          if (response.data.data !== null) {
            questionsRef.current = response.data.data; // Update the ref
          } else {
            setError("You don't have any mistakes to review. Start a new quiz!");
          }
        } else if (quizMode === 'btt') {
          questionsRef.current = btt_questions; // Update the ref
        } else if (quizMode === 'ftt') {
          questionsRef.current = ftt_questions; // Update the ref
        } else if (quizMode === 'topic') {
          const searchParams = new URLSearchParams(location.search);
          const selectedCategory = searchParams.get('category');
          questionsRef.current = combineQuestionsByCategory(btt_questions, ftt_questions, selectedCategory); // Update the ref
        }

        setIsLoading(false);
      } catch (error) {
        // Handle errors
        console.error('Error fetching questions:', error);
        setError('Error fetching questions: ' + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [quizMode, location]);



  const onClickNext = () => {
    if ((activeQuestion < questions.length - 1) & !isQuizEnded) {
        setActiveQuestion(activeQuestion + 1);
        setSelectedAnswerIndex(null) // Reset selected answer index
        
      } else { // if quiz has ended
        storeResultsToDatabase();
        setShowResult(true);
      }

  }

  // useEffect(() => {
  //   console.log('Mistakes:', mistakes);
  // }, [mistakes]);

  const onAnswerSelected = (index) => {
    
    if (selectedAnswerIndex === null) {
        setSelectedAnswerIndex(index);
        const isCorrect = questions[activeQuestion].answers[index].correct;
  
        if (!isCorrect) { // selected wrong answer
          // console.log(mistakes)

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
    storeResultsToDatabase();
  };

  const storeResultsToDatabase = () => {
    // Create a request object
    const percent = 100 * result.correctAnswers / (activeQuestion + 1)

    const token = getCookie("access_token");
    const requestData = {
      type: quizMode,
      score: percent.toString(),
      mistakes: mistakes,
    };

    // Send the quiz results to the backend
    axios.post('http://47.128.71.161:3001/v1/api/quiz', requestData, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })
      .then((response) => {
        // Handle the response if needed
        console.log('Mistakes saved successfully:' + response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error saving mistakes:', error);
      });
  };

  if (student === null) {
    return <div>Loading...</div>;
  }

  // Conditional rendering based on isLoading and error
  if (isLoading) {
    return <div>Quiz is loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (!questions || activeQuestion === null || activeQuestion < 0 || activeQuestion >= questions.length) {
  //   console.log("activeQuestion: " + activeQuestion)
  //   console.log(questions)
  //   return (
  //     <div>Error message goes here...</div>
  //   );
  // }

  if (!questions || questions.length === 0) {
    // If there are no questions or mistakes, display a message and 

    return (
      <div className="emptybody">
        <div className="row">
          <Col lg={2} md={2} sm={2} id="sidebar">
            <Sidebar student={student} />
          </Col>

          <Col lg={10} md={10} sm={10} id="main-content">
            <div className="quiz-container">
              <h2>You have no mistakes.</h2>
              <Link to="/choose-quiz">
                <button>Return to quizzes</button>
              </Link>
            </div>
            
          </Col>
        </div>
      </div>
    );
  }
  

  const currentQuestion = questions[activeQuestion];

  return (
    <div className="pagebody">
        <div className="row">
          <Col lg={2} md={2} sm={2} id="sidebar">
            <Sidebar student={student} />
          </Col>

          <Col lg={10} md={10} sm={10} id="main-content">
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
                  <div className="bottom-buttons">
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
                    <button id="btt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Return to quizzes</button>
                  </Link>

                  <Link to="/review-quiz">
                    <button onClick={resetQuiz} id="review" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Review Mistakes</button>
                  </Link>
                </div>
              )}
            </div>
          </Col>

        </div>
    </div>
  )
}

export default Quiz;