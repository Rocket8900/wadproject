import React, { useState, useEffect } from "react";
import { ReactPhotoSphereViewer, MarkersPlugin,  } from "react-photo-sphere-viewer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from '../dashboards/sidebar/Sidebar';
import marker from './download.png';
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function Scene3success() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();
    const [room, setRoom] = useState("starter"); // Declare state unconditionally
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);

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

    const photoSphereRef = React.createRef(); 
    const toggleModal = () => setShowModal(!showModal);   

    const handleReady = (instance) => {
        const markersPlugs = instance.getPlugin(MarkersPlugin);
        markersPlugs.addEventListener("select-marker", (e) => {
        const clickedMarkerId = e.marker.config.id;
        if (clickedMarkerId === "turnCorrect1") {
            navigate("/simulatorScene3success"); 
              }
        else if (clickedMarkerId === "turnWrong"){
            navigate("/simulatorScene3fail");
        }
        });
    }

    const plugins = [
        [MarkersPlugin, {
            markers: [
                                 
            ]
        }],
    ];

    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar student={student}/>
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                    <div className="App">
                        {room === "starter" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='post-park.jpg'
                                height={"100vh"}
                                plugins={plugins}
                                width={"100%"}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                    </div>
                </Col>
            </Row>
            <Modal show={showModal} onHide={toggleModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Congratulations!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Succesful park! Congratulations on completing this scenario!</p>
                        <p>Close this pop-up, or click the link below to choose a new level!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={`/simulator`}>
                            <Button variant="secondary" onClick={toggleModal}>
                                Choose a new level
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
        </Container>
    );
}

export default Scene3success;
