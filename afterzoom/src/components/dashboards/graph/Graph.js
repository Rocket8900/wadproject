import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import "./Graph.css"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    constructor(props) {
        super(props);
        this.chartContainerRef = React.createRef();
    }

    calculateChartHeight = () => {
        const breakpoints = [
            { width: 0, height: 150 },
            { width: 768, height: 200 },
            { width: 1024, height: 300 },
        ];
    
        // Access the DOM element using this.chartContainerRef.current
        const container = this.chartContainerRef.current;
    
        if (!container) {
            return 200; // Default height
        }
    
        const containerWidth = container.offsetWidth;
    
        let height = 150;
    
        for (const breakpoint of breakpoints) {
            if (containerWidth >= breakpoint.width) {
                height = breakpoint.height;
            } else {
                break;
            }
        }
    
        return height;
    }
    

    render() {
        const { student, bookings } = this.props;
        const { id: studentId, selfie, name, age, email, gender, type, language, instructor, instructorId:stuInstructorId, reviews,bookings:stuBookings,chatHistory } = student;
        const { id: bookingId, lessons:lesson, studentId: bookingStudentId, instructorId:bookInstructorId, status } = bookings || {};         
        
        const ChartHeight = this.calculateChartHeight();
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
                height: ChartHeight,
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
                height: ChartHeight,
            };

            return (
                    <CanvasJSChart options={options} className="forceFit"/>
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
            }],
            height: ChartHeight,
        };

        return (
                <CanvasJSChart options={options} className="forceFit"/>
        );
    }
}

export default Graph;
