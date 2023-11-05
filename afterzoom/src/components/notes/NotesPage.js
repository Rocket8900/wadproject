
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../dashboards/sidebar/Sidebar";
import Notes from "./Notes";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jwtDecode from "jwt-decode";
import ThreeDotsWave from "../loader/loader";


export default function NotesPage() {
    const [student, setStudent] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [notes, setNotes] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");
                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;

                const studentResponse = await axios.get(

                    `http://13.212.56.111:3001/v1/api/student/profile/${studentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStudent(studentResponse.data.data);


                const bookingsResponse = await axios.get(
                    `http://13.212.56.111:3001/v1/api/booking/student/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBookings(bookingsResponse.data.data[0]);


                const notesResponse = await axios.get(
                    `http://13.212.56.111:3001/v1/api/note/list`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setNotes(notesResponse.data.data);

    
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); 
        
    }, []); 

    if (bookings === null || student === null) {
        return <ThreeDotsWave/>;
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
                    <Sidebar student={student} bookings={bookings} />i
                </Col>
                <Col lg={10} md={10} sm={10} xs={10} id="notes">
                    <Notes notes={notes} />
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
