



import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    render() {
		const { bookings } = this.props;
		const { id: bookingId, lesson, studentId: bookingStudentId, instructorId:bookInstructorId, status } = bookings; 

        const monthlyDataPoints = Array.from({ length: 12 }, () => ({
            y: 0,
            label: ''
        }));

        // Iterate over lessons and update monthly data points
        lesson.forEach(lesson => {
            const lessonDate = new Date(lesson.date);
            const monthIndex = lessonDate.getMonth();
            monthlyDataPoints[monthIndex].y++;
            monthlyDataPoints[monthIndex].label = lessonDate.toLocaleString('default', { month: 'short' });
        });

        const options = {
            animationEnabled: true,
            title: {
                text: "Lessons per Month",
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
