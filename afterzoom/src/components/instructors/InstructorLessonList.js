import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InstructorSidebar from '../dashboards/sidebar/instructorSidebar'


function InstructorLessonList() {
  return (
      <Container fluid>
          <Row>
              <Col lg={2} md={2} sm={2} id="sidebar">
                <InstructorSidebar/>
              </Col>
              <Col lg={10} md={10} sm={10} id="main-content">
                This is where all the bookings go
              </Col>
          </Row>
      </Container>
  );
}

export default InstructorLessonList;
