import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function InstructorDetail() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState({});

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        // Fetch individual instructor data based on the 'id' parameter
        const response = await axios.get(`http://localhost:3001/v1/api/instructor/list/${id}`);
        setInstructor(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInstructorData();
  }, [id]);

  return (
    <div>
      {instructor && Object.keys(instructor).length > 0 ? (
        <>
          <h2>{instructor.name}</h2>
          <p>Experience: {instructor.experience} years</p>
          <p>Gender: {instructor.gender}</p>
          <Link to={`/chat`}><Button variant="primary">Chat with instructor!</Button></Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InstructorDetail;
