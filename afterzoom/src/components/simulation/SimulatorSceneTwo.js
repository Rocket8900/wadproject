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
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function SimulatorSceneTwo() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();
    const [room, setRoom] = useState("starter"); // Declare state unconditionally
    const [clickCounter, setClickCounter] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(true);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const navigate = useNavigate();


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

    const handleReady = (instance) => {
        const markersPlugs = instance.getPlugin(MarkersPlugin);
        markersPlugs.addEventListener("select-marker", (e) => {
          const clickedMarkerId = e.marker.config.id;
      
          // Use the functional form of setClickCounter
          setClickCounter(prevCounter => {
            // Check if the clicked marker is the next one in the sequence
            if (
              (clickedMarkerId === "signal" && prevCounter === 0) ||
              (clickedMarkerId === "check" && prevCounter === 1) ||
              (clickedMarkerId === "accel" && prevCounter === 2)
            ) {
              if (prevCounter === 2) {
                setRoom("true");
                navigate("/simulatorSceneTwoA")
                return toggleModal();
              }
              toggleModal3();
              return prevCounter + 1;
            } else {
              // Display a message or handle invalid marker clicks
              toggleModal2()
              return prevCounter; // Return the current counter unchanged
            }
          });
        });
      };
      
    const toggleModal = () => setShowModal(!showModal);
    const toggleModal1 = () => setShowModal1(!showModal1);
    const toggleModal2 = () => setShowModal2(!showModal2);
    const toggleModal3 = () => setShowModal3(!showModal3);


    const plugins = [
        [MarkersPlugin, {
            markers: [
                {
                    id: 'signal',
                    position: { yaw: 0, pitch: -0.2 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Signal Right',
                },
                {
                    id: 'check',
                    position: { yaw: 1.1, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Check Right Mirror for cars',
                },
                {
                    id: 'accel',
                    position: { yaw: 0.5, pitch: -0.5 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Accelerate',
                }
            ]
        }],
    ];

    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
                    <Sidebar student={student}/>
                </Col>
                <Col lg={10} md={10} sm={10} xs={10} id="main-content">
                    <div className="App">
                        {room === "starter" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='pre-overtake.jpg'
                                height={"100vh"}
                                plugins={plugins}
                                width={"100%"}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                        {room === "true" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src='post-overtake.jpg'
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
                        <p>Succesful overtake! Congratulations on completing this scenario!</p>
                        <p>Close this pop-up to view your overtake, or click the link below to choose a new level!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={`/simulator`}>
                            <Button variant="secondary" onClick={toggleModal}>
                                Choose a new level
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
                <Modal show={showModal1} onHide={toggleModal1} centered>
                    <Modal.Header>
                        <Modal.Title>Welcome to the SIMULATION</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You find yourself behind a slow moving truck and in a position to overtake. How should you proceed?</p>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={toggleModal1}>
                                BEGIN
                            </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showModal2} onHide={toggleModal2} centered>
                    <Modal.Header>
                        <Modal.Title>Oops!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>That's not the correct step!</p>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={toggleModal2}>
                                CONTINUE
                            </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showModal3} onHide={toggleModal3} centered>
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Good work! What's next?</p>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={toggleModal3}>
                                CONTINUE
                            </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
    );
}

export default SimulatorSceneTwo;
