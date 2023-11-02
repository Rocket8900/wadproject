import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    render() {
        const { quiz } = this.props;

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

        quiz.forEach(item => {
            const createdAt = new Date(item.created_at);
            const month = createdAt.toLocaleString('en-us', { month: 'short' });
            const score = parseInt(item.score.split('/')[0]);

            if (!isNaN(score)) {
                monthlyScores[month].totalScore += score;
                monthlyScores[month].count += 1;
            }
        });

        const dataPoints = Object.keys(monthlyScores).map(month => {
            const averageScore = monthlyScores[month].count > 0
                ? monthlyScores[month].totalScore / monthlyScores[month].count
                : 0;
            return { y: averageScore, label: month };
        });

        const options = {
			animationEnabled: true,	
			title:{
				text: "Your Scores",
                fontFamily: "Nunito",
                fontWeight: "bold"
			},
			axisY : {
				title: "Quiz Scores",
                fontFamily: "Nunito"
			},
			toolTip: {
				shared: true,
                fontFamily: "Nunito"
			},
            data: [{
                type: "spline",
                name: "Average Quiz Scores",
                showInLegend: true,
                dataPoints: dataPoints
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
