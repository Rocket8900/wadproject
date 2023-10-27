import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../dashboards/sidebar/Sidebar';
import './choose.css'


export function ChooseQuiz() {
    return (
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar />
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                    <h1 class="title-text pb-2">Choose Question Type</h1>

                    <div class="row" id="cards">
                        <div class="col-md-5">
                        <div class="card card-1">
                            <h3>Basic Theory Test</h3>
                            <p>A curated set of practice quizzes for the BTT.</p>
                            <Link to="/btt-quiz">
                                <button id="btt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">BTT questions</button>
                            </Link>
                            
                        </div>
                        </div>
                        <div class="col-md-5">
                        <div class="card card-2">
                            <h3>Final Theory Test</h3>
                            <p>A curated set of practice quizzes for the FTT.</p>
                            <Link to="/ftt-quiz">
                                <button id="ftt" class="btn btn-outline-primary mb-4 text-center col-12 me-sm-4 col-sm-5">FTT questions</button>
                            </Link>
                        </div>
                        </div>
                        
                    </div>



                </Col>
            </Row>
        </Container>
    )
    
}
