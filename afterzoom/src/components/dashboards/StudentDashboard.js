import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./maincontent/MainContent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function StudentDashboard() {
    const [student, setStudent] = useState(null);
    const [bookings, setBookings] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchStudentBookings = async () => {
            try {
                const token = getCookie("access_token");
                const response = await axios.get(
                    `http://localhost:3001/v1/api/booking/student/f111649e-a3b6-4d51-bd8b-5c5f7acc18a1`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBookings(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudentBookings();
    }, [id]);




    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const token = getCookie("access_token");
                const response = await axios.get(
                    `http://localhost:3001/v1/api/student/profile/f111649e-a3b6-4d51-bd8b-5c5f7acc18a1`,
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

        fetchStudentProfile();
    }, [id]);


    if (student === null) {
        return <div>Loading...</div>;
    }



    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    {/* Pass student data as a prop to Sidebar component */}
                    <Sidebar student={student} />
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                    <MainContent student={student} />
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
