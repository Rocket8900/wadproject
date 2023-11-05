import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    render() {
        const { quiz } = this.props;

        // Filter quiz data based on quiz type (BTT and FTT)
        const bttQuizzes = quiz.filter(item => item.type === 'btt');
        const fttQuizzes = quiz.filter(item => item.type === 'ftt');

        const calculateMonthlyScores = (quizzes) => {
            const monthlyScores = {
                Jan: { totalScore: 0, count: 0 },
                Feb: { totalScore: 0, count: 0 },
                Mar: { totalScore: 0, count: 0 },
                Apr: { totalScore: 0, count: 0 },
                May: { totalScore: 0, count: 0 },
                Jun: { totalScore: 0, count: 0 },
                Jul: { totalScore: 0, count: 0 },
                Aug: { totalScore: 0, count: 0 },
                Sept: { totalScore: 0, count: 0 },
                Oct: { totalScore: 0, count: 0 },
                Nov: { totalScore: 0, count: 0 },
                Dec: { totalScore: 0, count: 0 }
            };

            quizzes.forEach(item => {
                const createdAt = new Date(item.created_at);
                const month = createdAt.toLocaleString('en-us', { month: 'short' });
                const score = parseInt(item.score.split('/')[0]);

                if (!isNaN(score)) {
                    monthlyScores[month].totalScore += score;
                    monthlyScores[month].count += 1;
                }
            });

            return Object.keys(monthlyScores).map(month => {
                const averageScore = monthlyScores[month].count > 0
                    ? monthlyScores[month].totalScore / monthlyScores[month].count
                    : 0;
                return { y: averageScore, label: month };
            });
        };

        const bttDataPoints = calculateMonthlyScores(bttQuizzes);
        const fttDataPoints = calculateMonthlyScores(fttQuizzes);

        const options = {
            animationEnabled: true,
            title: {
                text: "Quiz Scores",
                fontFamily: "Nunito",
                fontWeight: "bold"
            },
            axisY: {
                title: "Average Quiz Scores",
                fontFamily: "Nunito"
            },
            toolTip: {
                shared: true,
                fontFamily: "Nunito"
            },
            data: [
                {
                    type: "spline",
                    name: "BTT",
                    showInLegend: true,
                    dataPoints: bttDataPoints
                },
                {
                    type: "spline",
                    name: "FTT",
                    showInLegend: true,
                    dataPoints: fttDataPoints
                }
            ],
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
