import React, { useState } from 'react';
import './style.css'; // Import  CSS file

const FeedbackCard = ({ feedback, onExpand }) => {
  const { date, content } = feedback;

  return (
    <div className="feedback-card">
      <div className="feedback-content">
        <strong>Date:</strong> {date}
        <br />
        <strong>Feedback:</strong> {content.slice(0, 100)}...
        <button onClick={() => onExpand(feedback)}>Expand</button>
      </div>
    </div>
  );
};

const StudentDashboard = ({ feedbackData, students, userId }) => {
  const studentFeedback = feedbackData
    .filter((feedback) => feedback.student === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const [expandedFeedback, setExpandedFeedback] = useState(null);

  const handleExpandFeedback = (feedback) => {
    setExpandedFeedback(feedback);
  };

  return (
    <div>
      <h1>Student Feedback Dashboard</h1>
      <h2>Your Feedback:</h2>
      <div className="feedback-list">
        {studentFeedback.map((feedback, index) => (
          <FeedbackCard
            key={index}
            feedback={feedback}
            onExpand={handleExpandFeedback}
          />
        ))}
      </div>
      {expandedFeedback && (
        <div className="expanded-feedback">
          <h3>Expanded Feedback</h3>
          <strong>Date:</strong> {expandedFeedback.date}
          <br />
          <strong>Feedback:</strong> {expandedFeedback.content}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
    // Add more student data as needed
  ]);

  const [feedbackData, setFeedbackData] = useState([
    {
      student: 1,
      content: 'Great progress!',
      date: '2023-10-16 14:30',
    },
    {
      student: 2,
      content: 'Work on parking skills.',
      date: '2023-10-15 11:15',
    },
    // Add more feedback data as needed
  ]);

  const userId = 1; // Replace with the actual student's user ID

  return (
    <div>
      <StudentDashboard feedbackData={feedbackData} students={students} userId={userId} />
    </div>
  );
};

export default App;
