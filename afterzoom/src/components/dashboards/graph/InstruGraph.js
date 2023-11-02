import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    render() {
		const { instructor, bookings } = this.props;
        const {
            id: instructorId,
            picture:instructorPicture,
            name: instructorName,
            age: instructorAge,
            affiliation: instructorAffiliation,
            gender: instructorGender,
            email: instructorEmail,
            password: instructorPassword,
            language: instructorLanguage,
            experience: instructorExperience,
            type: instructorType,
            carModel: instructorCarModel,
            students: instructorStudents,
            bookings: instructorBookings,
            reviews: instructorReviews,
            chatHistory: instructorChats
          } = instructor;
		const { id: bookingId, lessons:lesson, studentId: bookingStudentId, instructorId:bookInstructorId, status } = bookings || {}; 
		if ((!bookings || !bookings.lesson) && instructorStudents===null) {
            return <div>No lesson data available. Got to Find a Student First !</div>;
        }
		if (!bookings || !bookings.lesson) {
            return <div>No lesson data available.</div>;
        }

        const monthlyDataPoints = Array.from({ length: 12 }, () => ({
            y: 0,
            label: ''
        }));

        lesson.forEach(lesson => {
            const lessonDate = new Date(lesson.date);
            const monthIndex = lessonDate.getMonth();
            monthlyDataPoints[monthIndex].y++;
            monthlyDataPoints[monthIndex].label = lessonDate.toLocaleString('default', { month: 'short' });
        });

        const options = {
            animationEnabled: true,
            title: {
                text: "Lesson Trends",
                fontFamily: "Nunito",
                fontWeight: "bold"
            },
            axisY: {
                title: "Number of Lessons",
                fontFamily: "Nunito"
            },
            toolTip: {
                shared: true,
                fontFamily: "Nunito"
            },
            data: [{
                type: "spline",
                name: "Lessons",
                showInLegend: true,
                dataPoints: monthlyDataPoints
            }]
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default Graph;
