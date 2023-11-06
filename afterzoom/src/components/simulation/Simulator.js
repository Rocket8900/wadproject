import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from '../dashboards/sidebar/Sidebar'
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './simulator.module.css';
import ThreeDotsWave from "../loader/loader";
import BASE_URL from "../apiConfig";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function Simulator() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");

                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;

                const studentResponse = await axios.get(

                    `${BASE_URL}/v1/api/student/profile/${studentId}`,
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
        return <ThreeDotsWave/>;
    }

  return (
      <Container fluid>
          <div className={`row ${styles.row}`}>
              <Col lg={2} md={2} sm={2} xs={2} id="sidebar">
                <Sidebar student={student}/>
              </Col>
              <Col lg={10} md={10} sm={10} xs={10} id={styles["main-content"]}>
                <h1>This is where we enter the matrix</h1>

                <div className={`${styles.container} row d-flex`}>
                    <div className={`col-md-3 col-sm-10 ${styles.card}`}>
                            <div className="image-container">
                                <img src="https://cdn.dribbble.com/users/674925/screenshots/4749353/media/e2f370153a90139d89c57e9ac459b991.gif" className={styles["card-img-top"]}></img>
                            </div>
                                <div className={styles["card-body"]}>
                                <h3>Level 1</h3>
                                <p>What to do at a T-Junction</p>
                                <Link to="/simulatorSceneOne">
                                    <button className={`btn btn-outline-primary text-center col-lg-8 col-sm-12`}>Enter Scene 1</button>
                                </Link>
                            </div>
                    </div>

                    <div className={`col-md-3 col-sm-10 ${styles.card}`}>
                            <div className="image-container">
                                <img src="https://cdn.dribbble.com/users/3406038/screenshots/6328629/car_on_road.gif" className={styles["card-img-top"]}></img>
                            </div>
                                <div className={styles["card-body"]}>
                                <h3>Level 2</h3>
                                <p>Basic Overtaking</p>
                                <Link to="/simulatorSceneTwo">
                                    <button className={`btn btn-outline-primary text-center col-lg-8 col-sm-12`}>Enter Scene 2</button>
                                </Link>
                            </div>
                    </div>

                    <div className={`col-md-3 col-sm-10 ${styles.card}`}>
                            <div className="image-container">
                                <img src="https://cdn.dribbble.com/users/330915/screenshots/6720147/4_share_dribbble.gif" className={styles["card-img-top"]}></img>
                            </div>
                                <div className={styles["card-body"]}>
                                <h3>Level 3</h3>
                                <p>Parallel Parking</p>
                                <Link to="/simulatorSceneThree">
                                    <button className={`btn btn-outline-primary text-center col-lg-8 col-sm-12`}>Enter Scene 3</button>
                                </Link>
                            </div>
                    </div>

                </div>
                
                
              </Col>
          </div>
      </Container>
  );
}

export default Simulator;
