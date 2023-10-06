// Question Types
// 1. MCQs | Multiple Choice | single

export const quiz = {
    topic: 'Javascript',
    level: 'Beginner',
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [
      {
        question: 'What is DIPS?',
        choices: ['Driver Improvement Points System Rules', 'Driver Improvement Passengers Safety Rules', 'Driver Incident Points System Rules'],
        type: 'MCQs',
        correctAnswer: 'Driver Improvement Points System Rules',
      },
      {
        question: 'When is tailgating acceptable?',
        choices: ['When you want the vehicle in front to speed up', 'When you want the vehicle in front to give way', 'Tailgating is never acceptable'],
        type: 'MCQs',
        correctAnswer: 'Tailgating is never acceptable',
      },
      {
        question:
          'A probationary driver who has accumulated 13 or more demerit points within the first 12 months will',
        choices: ['be fined only', 'get his/her license revoked', 'be jailed only'],
        type: 'MCQs',
        correctAnswer: 'get his/her license revoked',
      },
      {
        question: 'The Provisional Driving License is valid for',
        choices: ['6 months.', '8 months.', '12 months.'],
        type: 'MCQs',
        correctAnswer: '6 months.',
      },
    ],
  }