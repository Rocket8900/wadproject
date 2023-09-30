import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function InstructorDashboard() {
    return (
        <Container>
            {/* Top 3 Buttons */}
            <div className="d-grid gap-2 mx-auto">
                <Link to="/view-students">
                    <button class="button" type="button">View Students</button>
                </Link>

                <Link to="/view-bookings">
                    <button class="button" type="button">View Bookings</button>
                </Link>

                <Link to="/calendar">
                    <button class="button" type="button">Calendar</button>
                </Link>
            </div>

            {/* Last row */}
            <div className="row d-inline-flex gap-4">
                <div className="col">
                    <Link to="/past-lessons">
                        <Button variant="dark" className="button">
                            Past Lessons
                        </Button>
                    </Link>
                </div>

                <div className="col">
                    <Link to="/book-lesson">
                        <Button variant="dark" className="button">
                            Book Lesson
                        </Button>
                    </Link>
                </div>

                <div className="col">
                    <Link to="/terminate">
                        <Button variant="dark" className="button">
                            Terminate
                        </Button>
                    </Link>
                </div>

            </div>

        </Container>
    );
}