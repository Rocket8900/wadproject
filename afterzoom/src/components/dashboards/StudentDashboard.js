import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function StudentDashboard() {
    return (
        <Container>
            {/* Top 3 Buttons */}
            <div className="d-grid gap-2 mx-auto">
                <Link to="/find-instructor">
                    <button class="button" type="button">Find an Instructor</button>
                </Link>

                <Link to="/test-questions">
                    <button class="button" type="button">BTT/FTT Test Questions</button>
                </Link>

                <Link to="/community-chat">
                    <button class="button" type="button">Community Chat</button>
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