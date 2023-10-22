import React, { useState } from 'react';

const FeedbackForm = ({ students, onPostFeedback }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedbackContent(e.target.value);
  };

  const handlePost = () => {
    if (selectedStudent && feedbackContent) {
      const feedbackData = {
        student: selectedStudent,
        content: feedbackContent,
        date: new Date().toLocaleString(),
      };

      onPostFeedback(feedbackData);
      setSelectedStudent('');
      setFeedbackContent('');
    }
  };

  return (
    <div>
      <h2>Post Feedback to Student</h2>
      <div>
        <label>Select Student:</label>
        <select value={selectedStudent} onChange={handleStudentChange}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Feedback:</label>
        <textarea
          value={feedbackContent}
          onChange={handleFeedbackChange}
          placeholder="Provide feedback here"
        />
      </div>
      <button onClick={handlePost}>Post Feedback</button>
    </div>
  );
};

const InstructorFeedbackPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
    // Add more student data as needed
  ]);
  const [feedbackData, setFeedbackData] = useState([]);

  const handlePostFeedback = (feedback) => {
    // Store the feedback data in your state, database, or perform any other necessary action.
    setFeedbackData([...feedbackData, feedback]);
  };

  return (
    <div>
      <h1>Instructor Feedback Page</h1>
      <FeedbackForm students={students} onPostFeedback={handlePostFeedback} />
      <h3>Feedback Data:</h3>
      <ul>
        {feedbackData.map((feedback, index) => (
          <li key={index}>
            <strong>Student:</strong> {students.find((s) => s.id === feedback.student)?.name}
            <br />
            <strong>Date:</strong> {feedback.date}
            <br />
            <strong>Feedback:</strong> {feedback.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorFeedbackPage;
