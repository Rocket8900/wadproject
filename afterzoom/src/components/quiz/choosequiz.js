import React from 'react';
import { Link } from 'react-router-dom';

export function ChooseQuiz() {
    return (

    <div class="quiz-container">
        <h1 class="title-text pb-2">Choose Question Type</h1>
        <div class="quiz">
            <div class="question-image">
                {/* <img id="image" src="./assets/logo.png" alt="" class="d-none"> */}
            </div>
            <h2 id="question" class="mb-4 mt-4"></h2>
            <div id="answer-buttons" class="mt-3">
                <div class="row justify-content-center ">
                    <Link to="/btt-quiz">
                        <button id="btt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">BTT questions</button>
                    </Link>
                    
                    <Link to="/ftt-quiz">
                        <button id="ftt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">FTT questions</button>
                    </Link>
                    
                </div>
            </div>

            {/* <div class="d-grid gap-2 col-4 mx-auto mt-3">
                <button id="next-btn" class="btn btn-secondary text-center">Next</button>
            </div>
            <div class="d-grid gap-2 col-4 mx-auto mt-3">
                <button id="quiz-btn" class="btn btn-dark text-center d-none">Back to quizzes</button>
            </div> */}

        </div>
    </div>
    )
    
}
