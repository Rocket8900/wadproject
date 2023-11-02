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



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function SimulatorSceneOne() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();
    const [room, setRoom] = useState("starter"); // Declare state unconditionally

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
            if (e.marker.config.id === 'true') {
                setRoom("true");
            } else {
                setRoom("false");
            }
        });
    }

    const plugins = [
        [MarkersPlugin, {
            markers: [
                {
                    id: 'true',
                    position: { yaw: 0.32, pitch: 0.11 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'This is for true',
                },
                {
                    id: 'false',
                    position: { yaw: 0.52, pitch: 0.31 },
                    image: 'download.png',
                    size: { width: 32, height: 32 },
                    anchor: 'bottom center',
                    zoomLvl: 100,
                    tooltip: 'This is for false',
                },
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
                                src='filmdrafttwo.jpg'
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
                                src={sceneTwo}
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
                                src={sceneThree}
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
        </Container>
    );
}

export default SimulatorSceneOne;
