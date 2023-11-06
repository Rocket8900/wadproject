import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InstructorSidebar from "./sidebar/instructorSidebar";
import MainContent from "./maincontent/MainContent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jwtDecode from "jwt-decode";
import InstructorMainContent from './maincontent/InstructorMainContent'
import "./Dashboard.css"
import ThreeDotsWave from "../loader/loader";
import BASE_URL from "../apiConfig";


export function InstructorDashboard() {
    
    const [instructor, setInstructor] = useState(null);
    const [bookings, setBookings] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");
                const decodedToken = jwtDecode(token).user;
                const instructorId = decodedToken.id;

                const instructorResponse = await axios.get(

                    `${BASE_URL}/v1/api/instructor/profile/${instructorId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInstructor(instructorResponse.data.data);


                const bookingResponse = await axios.get(

                    `${BASE_URL}/v1/api/booking/instructor`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBookings(bookingResponse.data.data);

    

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); 
        
    }, []); 

    if (instructor === null) {
        return <ThreeDotsWave/>;
    }
    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
                    <InstructorSidebar instructor={instructor} />
                </Col>
                <Col lg={10} md={10} sm={10} xs={10}  id="main-content">
                    <InstructorMainContent instructor={instructor} bookings={bookings}/>
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
