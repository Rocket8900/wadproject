import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../dashboards/sidebar/Sidebar';
import jwtDecode from "jwt-decode";
import './choose.css'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export function ChooseQuiz() {

    const [student, setStudent] = useState(null);
    const [bookings, setBookings] = useState(null);
    // const { id } = useParams();

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const token = getCookie("access_token");
                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;
                const response = await axios.get(
                    `http://localhost:3001/v1/api/student/profile/${studentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStudent(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchStudentBookings = async () => {
            try {
                const token = getCookie("access_token");
                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;
                const response = await axios.get(
                    `http://localhost:3001/v1/api/booking/student/${studentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBookings(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudentProfile();
        fetchStudentBookings();
    }, []);

    if (student === null || bookings === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar student={student} bookings={bookings}/>
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                    <h1 class="title-text pb-2">Choose Question Type</h1>

                    <div class="row" id="cards">
                        <div class="col-md-5 col-sm-10">
                        <div class="card card-1">
                            <h3>Basic Theory Test</h3>
                            <p>A curated set of practice quizzes for the BTT.</p>
                            <Link to="/btt-quiz">
                                <button id="btt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Start</button>
                            </Link>
                            
                        </div>
                        </div>
                        <div class="col-md-5 col-sm-10">
                        <div class="card card-2">
                            <h3>Final Theory Test</h3>
                            <p>A curated set of practice quizzes for the FTT.</p>
                            <Link to="/ftt-quiz">
                                <button id="ftt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Start</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    
                    <div class="row" id="cards">
                        <div class="col-md-5 col-sm-10">
                        <div class="card card-3">
                            <h3>Practice by Topics</h3>
                            <p>Choose practice quizzes by topic to target your weak areas.</p>
                            <Link to="/topical-quiz">
                                <button id="topic" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Start</button>
                            </Link>
                        </div>
                        </div>

                        <div class="col-md-5 col-sm-10">
                        <div class="card card-4">
                            <h3>Review Mistakes</h3>
                            <p>Review all your mistakes from previous practice quizzes.</p>
                            <Link to="/review-quiz">
                                <button id="review" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">Review</button>
                            </Link>
                        </div>
                        </div>
                        
                    </div>



                </Col>
            </Row>
        </Container>
    )
    
}
