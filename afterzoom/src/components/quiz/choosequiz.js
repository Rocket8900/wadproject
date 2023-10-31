import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../dashboards/sidebar/Sidebar';
import jwtDecode from "jwt-decode";
import styles from './choose.module.css';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export function ChooseQuiz() {

    const [student, setStudent] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ["Safety and Defensive Driving", "Rules and Regulations", "Road Signs and Signals", "Vehicle Operation and Controls"];
    // const [bookings, setBookings] = useState(null);
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

        // const fetchStudentBookings = async () => {
        //     try {
        //         const token = getCookie("access_token");
        //         const decodedToken = jwtDecode(token).user;
        //         const studentId = decodedToken.id;
        //         const response = await axios.get(
        //             `http://localhost:3001/v1/api/booking/student/${studentId}`,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             }
        //         );
        //         setBookings(response.data);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };

        fetchStudentProfile();
        // fetchStudentBookings();
    }, []);

    if (student === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className={styles.container}>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar student={student} />
                </Col>
                <Col lg={10} md={10} sm={10} id={styles["main-content"]}>
                    <h1 className={`title-text pb-2 ${styles.h1}`}>Choose Question Type</h1>

                    <div className="row" id={styles.cards}>
                        <div className={`col-md-5 col-sm-10 ${styles.cardstyle}`}>
                        <div className={`${styles.card} ${styles["card-1"]}`}>
                            <h3 className={styles.h3}>Basic Theory Test</h3>
                            <p className={styles.p}>A curated set of practice quizzes for the BTT.</p>
                            <Link to="/btt-quiz">
                                <button id="btt" className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Start</button>
                            </Link>
                            
                        </div>
                        </div>
                        <div className={`col-md-5 col-sm-10 ${styles.cardstyle}`}>
                        <div className={`${styles.card} ${styles["card-2"]}`}>
                            <h3 className={styles.h3}>Final Theory Test</h3>
                            <p className={styles.p}>A curated set of practice quizzes for the FTT.</p>
                            <Link to="/ftt-quiz">
                                <button id="ftt" className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Start</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    
                    <div className="row" id={styles.cards}>
                        <div className={`col-md-5 col-sm-10 ${styles.cardstyle}`}>
                        <div className={`${styles.card} ${styles.cardrow2} ${styles["card-3"]}`}>
                            <h3 className={styles.h3}>Practice by Topics</h3>
                            <p className={styles.p}>Choose practice quizzes by topic to target your weak areas.</p>
                            <select
                                    id="categoryDropdown"
                                    className="form-select"
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    value={selectedCategory}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                            </select>
                            <Link to={`/topical-quiz?category=${selectedCategory}`}>
                                <button id="topic" className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Start</button>
                            </Link>
                        </div>
                        </div>

                        <div className={`col-md-5 col-sm-10 ${styles.cardstyle}`}>
                        <div className={`${styles.card} ${styles.cardrow2} ${styles["card-4"]}`}>
                            <h3 className={styles.h3}>Review Mistakes</h3>
                            <p className={styles.p}>Review all your mistakes from previous practice quizzes.</p>
                            <Link to="/review-quiz">
                                <button id="review" className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Review</button>
                            </Link>
                        </div>
                        </div>
                        
                    </div>



                </Col>
            </Row>
        </Container>
    )
    
}
