import { Form } from "react-bootstrap";
import { ChangeEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function DriversComponent() {
    return (
        <Row>
            <Col md={3} className="border-end h-100 position-sticky">
                <div>
                    <h1 className="fs-6 hellix-bold py-3 border-bottom align-content-center">Filter</h1>
                    <Form>
                        <h6 className="hellix-bold">CATEGORY</h6>
                        <div key="5-seater" className="">
                        <Form.Check // prettier-ignore
                            type="checkbox"
                            id="popular"
                            label="popular"
                        />
                        </div>
                    </Form>
                </div>
            </Col>
            <Col md={9}>
                <div>
                <Container className="py-4">
                    <Row>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>John</Card.Title>
                                <Card.Text>
                                Driver for 10 years
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Max</Card.Title>
                                <Card.Text>
                                Driver for 25 years
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Steven</Card.Title>
                                <Card.Text>
                                Driver for 1343432 years
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
                </div>
            </Col>
        </Row>
        );
    }
    export default DriversComponent;
