import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import CanvasJSReact from '@canvasjs/react-charts';
import BASE_URL from "../../apiConfig";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph() {
  const [bookings, setBookings] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("access_token"); // Make sure 'getCookie' is defined
        const decodedToken = jwtDecode(token).user;

        const bookingResponse = await axios.get(
          `${BASE_URL}/v1/api/booking/instructor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(bookingResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const lesson = [];

  console.log(bookings);

  if (bookings) {
    bookings.forEach((booking) => {
      if (booking.lessons) {
        lesson.push(...booking.lessons);
      }
    });
  }

  const monthlyDataPoints = Array.from({ length: 12 }, () => ({
    y: 0,
    label: ''
  }));

  if (lesson && lesson.length > 0) {
    lesson.forEach((lesson) => {
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
      fontWeight: "bold",
    },
    axisY: {
      title: "Number of Lessons",
      fontFamily: "Nunito",
    },
    toolTip: {
      shared: true,
      fontFamily: "Nunito",
    },
    data: [{
      type: "spline",
      name: "Lessons",
      showInLegend: true,
      dataPoints: monthlyDataPoints,
    }],
    height: 180
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Graph;
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  