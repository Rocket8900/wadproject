import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './sidebar/Sidebar';
import MainContent from './maincontent/MainContent'; 




function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export function StudentDashboard() {
    return (    
        <Container fluid>
            <Row>
                <Col lg={2} md={2} sm={2} id="sidebar">
                    <Sidebar />
                </Col>
                <Col lg={10} md={10} sm={10} id="main-content">
                    <MainContent />
                </Col>
            </Row>
        </Container>

    );
}