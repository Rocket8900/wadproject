import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {	
	render() {
		const options = {
			animationEnabled: true,	
			title:{
				text: "Your Lesson Trend (Data ToBeRetrieved)",
                fontFamily: "Nunito",
                fontWeight: "bold"
			},
			axisY : {
				title: "Number of Lessons",
                fontFamily: "Nunito"
			},
			toolTip: {
				shared: true,
                fontFamily: "Nunito"
			},
			data: [{
				type: "spline",
                name: "number of lessons",
				showInLegend: true,
				dataPoints: [
					{ y: 2, label: "Jan" },
					{ y: 4, label: "Feb" },
					{ y: 5, label: "Mar" },
					{ y: 0, label: "Apr" },
					{ y: 0, label: "May" },
					{ y: 0, label: "Jun" },
					{ y: 7, label: "Jul" },
					{ y: 9, label: "Aug" },
					{ y: 5, label: "Sept" },
					{ y: 2, label: "Oct" },
					{ y: 2, label: "Nov" },
					{ y: 2, label: "Dec" }
				]
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
