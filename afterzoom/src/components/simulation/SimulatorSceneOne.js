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
    const [clickCounter, setClickCounter] = useState(0);
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

    const handleReady = (instance) => {
        const markersPlugs = instance.getPlugin(MarkersPlugin);
        markersPlugs.addEventListener("select-marker", (e) => {
          const clickedMarkerId = e.marker.config.id;
      
          console.log(clickCounter)
      
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
                toggleModal();
              }
              alert("Correct!");
              return prevCounter + 1;
            } else {
              // Display a message or handle invalid marker clicks
              alert("Try Again" + prevCounter + clickedMarkerId);
              return prevCounter; // Return the current counter unchanged
            }

          });
        });
      };

    const toggleModal = () => setShowModal(!showModal);


    const plugins = [
        [MarkersPlugin, {
            markers: [
                {
                    id: 'accel',
                    position: { yaw: 3.5, pitch: -0.5 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Accelerate',
                },
                {
                    id: 'signal',
                    position: { yaw: 3.0, pitch: -0.2 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Signal left',
                },
                {
                    id: 'check',
                    position: { yaw: 4.2, pitch: 0 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'Check right for cars',
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
                                src='t-junc.jpg'
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
                                src=''
                                height={"100vh"}
                                plugins={plugins}
                                width={"100%"}
                                onReady={handleReady}
                                littlePlanet={false}
                            ></ReactPhotoSphereViewer>
                        )}
                        {room === "false" && (
                            <ReactPhotoSphereViewer
                                ref={photoSphereRef}
                                src=''
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
                        <p>Congratulations on completing this scenario!</p>
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
