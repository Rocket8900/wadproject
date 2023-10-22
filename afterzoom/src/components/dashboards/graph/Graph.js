import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {	
	render() {
		const options = {
			animationEnabled: true,	
			title:{
				text: "Simulation Score (Data ToBeRetrieved)",
                fontFamily: "Nunito",
                fontWeight: "bold"
			},
			axisY : {
				title: "Score in Percentage",
                fontFamily: "Nunito"
			},
			toolTip: {
				shared: true,
                fontFamily: "Nunito"
			},
			data: [{
				type: "spline",
				name: "BTT",
				showInLegend: true,
				dataPoints: [
					{ y: 20, label: "Jan" },
					{ y: 45, label: "Feb" },
					{ y: 50, label: "Mar" },
					{ y: 50, label: "Apr" },
					{ y: 51, label: "May" },
					{ y: 60, label: "Jun" },
					{ y: 50, label: "Jul" },
					{ y: 40, label: "Aug" },
					{ y: 40, label: "Sept" },
					{ y: 70, label: "Oct" },
					{ y: 75, label: "Nov" },
					{ y: 80, label: "Dec" }
				]
			},
			{
				type: "spline",
				name: "FTT",
				showInLegend: true,
				dataPoints: [
					{ y: 10, label: "Jan" },
					{ y: 30, label: "Feb" },
					{ y: 20, label: "Mar" },
					{ y: 50, label: "Apr" },
					{ y: 70, label: "May" },
					{ y: 70, label: "Jun" },
					{ y: 75, label: "Jul" },
					{ y: 70, label: "Aug" },
					{ y: 85, label: "Sept" },
					{ y: 90, label: "Oct" },
					{ y: 90, label: "Nov" },
					{ y: 91, label: "Dec" }
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
