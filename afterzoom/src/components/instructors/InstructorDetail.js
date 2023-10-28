import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";

function InstructorDetail() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState({});

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        const decodedToken = jwtDecode(token).user; 
        const token = Cookie.get('access_token'); 
        const id = decodedToken.id;
        // Fetch individual instructor data based on the 'id' parameter
        console.log(id)
        const response = await axios.get(`http://localhost:3001/v1/api/instructor/list/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Add the cookie value to the authorization header
          }
        });
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
