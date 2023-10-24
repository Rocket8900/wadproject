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
					{ y: 70, label: "Apr" },
					{ y: 80, label: "May" },
					{ y: 0, label: "Jun" },
					{ y: 0, label: "Jul" },
					{ y: 0, label: "Aug" },
					{ y: 0, label: "Sept" },
					{ y: 0, label: "Oct" },
					{ y: 0, label: "Nov" },
					{ y: 0, label: "Dec" }
				]
			},
			{
				type: "spline",
				name: "FTT",
				showInLegend: true,
				dataPoints: [
					{ y: 0, label: "Jan" },
					{ y: 0, label: "Feb" },
					{ y: 0, label: "Mar" },
					{ y: 0, label: "Apr" },
					{ y: 0, label: "May" },
					{ y: 0, label: "Jun" },
					{ y: 0, label: "Jul" },
					{ y: 70, label: "Aug" },
					{ y: 80, label: "Sept" },
					{ y: 50, label: "Oct" },
					{ y: 50, label: "Nov" },
					{ y: 70, label: "Dec" }
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
