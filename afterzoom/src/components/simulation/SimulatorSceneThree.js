import React, { useState, useEffect } from "react";
import { ReactPhotoSphereViewer, MarkersPlugin,  } from "react-photo-sphere-viewer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from '../dashboards/sidebar/Sidebar';
import sceneOne from './Test_Pano.jpg';
import sceneTwo from './Test_Pano.jpg';
import sceneThree from './Test_Pano.jpg';
import marker from './download.png';
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function SimulatorSceneOne() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();
    const [room, setRoom] = useState("starter"); // Declare state unconditionally
    const [showModal, setShowModal] = useState(false);
    

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
            if (e.marker.config.id === 'turnCorrect') {
                setRoom("turnCorrect");
            } 
            else if (e.marker.config.id === 'turnCorrect1'){
                setRoom("turnCorrect1");
                toggleModal();
            }
        });
    }

    const plugins = [
        [MarkersPlugin, {
            markers: [
                {
                    id: 'check',
                    position: { yaw: 0.85, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Check Mirrors',
                },     
                {
                    id: 'turnCorrect',
                    position: { yaw: 0.1, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Turn the steering wheel right and reverse',
                },
                {
                    id: 'turnCorrect1',
                    position: { yaw: -0.2, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Turn the wheel left and reverse',
                },
                {
                    id: 'turnWrong',
                    position: { yaw: -0.1, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Continue reversing in the same direction',
                },
                {
                    id: 'turnBack',
                    position: { yaw: -0.5, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Move forward in the same direction',
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
                                src='pre-park.jpg'
                                height={"100vh"}
                                plugins={plugins}
                                width={"100%"}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                        {room === "turnCorrect" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='mid-park.JPG'
                                height={"100vh"}
                                plugins={plugins}
                                width={"100%"}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                        {room === "turnCorrect1" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='post-park.jpg'
                                height={"100vh"}
                                width={"100%"}
                                plugins={plugins}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                        {room === "turnWrong" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='wrong-park.jpg'
                                height={"100vh"}
                                width={"100%"}
                                plugins={plugins}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                        {room === "turnBack" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='post-park.jpg'
                                height={"100vh"}
                                width={"100%"}
                                plugins={plugins}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                    </div>
                </Col>
            </Row>
            <Modal show={showModal} onHide={toggleModal}>
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

export default SimulatorSceneOne;
