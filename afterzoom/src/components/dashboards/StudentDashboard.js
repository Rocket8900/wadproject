import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./maincontent/MainContent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jwtDecode from "jwt-decode";

export function StudentDashboard() {
    const [student, setStudent] = useState(null);
    const [bookings, setBookings] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");
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


                const bookingsResponse = await axios.get(
                    `http://localhost:3001/v1/api/booking/student/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(bookingsResponse.data.data)
                setBookings(bookingsResponse.data.data[0]);

                // const quizResponse = await axios.get(
                //     `http://localhost:3001/v1/api/quiz`,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //         },
                //     }
                // );
                // console.log(bookingsResponse.data.data)
                // setBookings(bookingsResponse.data.data[0]);

      
                
    

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); 
        
    }, []); 

    if (bookings === null || student === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar student={student} />
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                    <MainContent student={student} bookings={bookings} />
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
