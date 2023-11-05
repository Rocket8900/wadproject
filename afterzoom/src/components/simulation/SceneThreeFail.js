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

function Scene3fail() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();
    const [room, setRoom] = useState("starter"); // Declare state unconditionally
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");

                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;

                const studentResponse = await axios.get(
                    `http://47.128.71.161:3001/v1/api/student/profile/${studentId}`,
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
        if (clickedMarkerId === "turnBack") {
            navigate("/simulatorScene3a"); 
              }
        });
    }

    const plugins = [
        [MarkersPlugin, {
            markers: [
                {
                    id: 'turnBack',
                    position: { yaw: 0.1, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Move forward in the same direction to head back to the previous position',
                }                  
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
                                src='wrong-park.jpg'
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
                    <Modal.Header>
                        <Modal.Title>Oops!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You turned too much and your car is now vertical!</p>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={toggleModal}>
                            CONTINUE
                            </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
    );
}

export default Scene3fail;
