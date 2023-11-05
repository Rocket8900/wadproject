import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    render() {
        const { student, bookings } = this.props;
        const { id: studentId, selfie, name, age, email, gender, type, language, instructor, instructorId:stuInstructorId, reviews,bookings:stuBookings,chatHistory } = student;
        const { id: bookingId, lessons:lesson, studentId: bookingStudentId, instructorId:bookInstructorId, status } = bookings || {}; 
        if ((!bookings || !lesson) && stuInstructorId===null) {
            const monthlyDataPoints = Array.from({ length: 12 }, () => ({
                y: 0,
                label: ''
            }));

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
        if (!bookings || !lesson) {
            const monthlyDataPoints = Array.from({ length: 12 }, () => ({
                y: 0,
                label: ''
            }));

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
