import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from '../dashboards/sidebar/Sidebar'
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function Simulator() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");
                console.log(token)
                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;

                const studentResponse = await axios.get(

                    `http://localhost:3001/v1/api/student/profile/${studentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStudent(studentResponse.data.data);

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); 
        
    }, []); 

    if (student === null) {
        return <div>Loading...</div>;
    }

  return (
      <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                <Sidebar student={student}/>
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content">
                This is where we enter the matrix
                <Link to="/simulatorSceneOne">
                Scene one
              </Link>
                
              </Col>
          </Row>
      </Container>
  );
}

export default Simulator;
