import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../dashboards/sidebar/instructorSidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jwtDecode from "jwt-decode";
import CreatingLessonContent from "../instructors/CreatingLessonContent";


export function CreatingLesson() {
    const [instructor, setInstructor] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");
                const decodedToken = jwtDecode(token).user;
                const instructorId = decodedToken.id;

                const instructorResponse = await axios.get(

                    `http://47.128.71.161:3001/v1/api/instructor/profile/${instructorId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setInstructor(instructorResponse.data.data);


                
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); 
        
    }, []); 

    if (instructor === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar instructor={instructor} />i
                </Col>
                <Col lg={10} md={10} sm={10} id="creatingLessonContent">
                    
                    <CreatingLessonContent instructor={instructor} />
                </Col>
            </Row>
        </Container>
    );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
