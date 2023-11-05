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


        const monthlyDataPoints = Array.from({ length: 12 }, () => ({
            y: 0,
            label: ''
        }));

        if (lesson && lesson.length > 0) {
            lesson.forEach(lesson => {
                const lessonDate = new Date(lesson.date);
                const monthIndex = lessonDate.getMonth();
                monthlyDataPoints[monthIndex].y++;
                monthlyDataPoints[monthIndex].label = lessonDate.toLocaleString('default', { month: 'short' });
            });
        }

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
            }],
            height: 300
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default Graph;
