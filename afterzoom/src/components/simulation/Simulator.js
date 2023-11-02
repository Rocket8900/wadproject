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

  return (
      <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                <Sidebar student={student}/>
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content">
                <h1>This is where we enter the matrix</h1>

                <div className="container">
                    <div className={`col-md-3 col-sm-10 ${styles.cardstyle}`}>
                            <div className={`${styles.card} ${styles["card-1"]}`}>
                                <h3>Level 1</h3>
                                <p>Some text for Simulator Scene 1</p>
                                <Link to="/simulatorSceneOne">
                                    <button className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Enter Scene 1</button>
                                </Link>
                                
                            </div>
                    </div>

                    <div className={`col-md-3 col-sm-10 ${styles.cardstyle}`}>
                            <div className={`${styles.card} ${styles["card-2"]}`}>
                                <h3>Level 2</h3>
                                <p>Some text for Simulator Scene 2</p>
                                <Link to="/simulatorSceneTwo">
                                    <button className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Enter Scene 2</button>
                                </Link>
                                
                            </div>
                    </div>

                    <div className={`col-md-3 col-sm-10 ${styles.cardstyle}`}>
                            <div className={`${styles.card} ${styles["card-3"]}`}>
                                <h3>Level 3</h3>
                                <p>Some text for Simulator Scene 3</p>
                                <Link to="/simulatorSceneThree">
                                    <button className={`btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5 ${styles.button}`}>Enter Scene 3</button>
                                </Link>
                                
                            </div>
                    </div>
                </div>
                
                
              </Col>
          </Row>
      </Container>
  );
}

export default Simulator;
