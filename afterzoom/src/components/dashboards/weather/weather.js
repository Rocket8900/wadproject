

import React, { useState, useEffect } from 'react';

import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

function WeatherForecast( bookings ) {

  const [weater, setWeather] = useState(null);
  const [update, setUpdate] = useState(null);
  const [icon, setIcon] = useState(null)
  const upcoming = bookings.bookings.lessons
  const now = new Date();
  let mostUpcomingDate = new Date(upcoming[0].date);

for (const event of upcoming) {
  const eventDate = new Date(event.date);
  if (eventDate > now && eventDate < mostUpcomingDate) {
    mostUpcomingDate = eventDate;
  }
}
let mostUpcomingUnixTimestamp = Math.floor(mostUpcomingDate.getTime() / 1000);
  useEffect(() => {
      
      const fetchData = async () => {
          try {
              const token = getCookie("access_token");
              const decodedToken = jwtDecode(token).user;
              const instructorId = decodedToken.id;

              const response = await axios.post(
                `http://localhost:3001/v1/api/weather`,
                {
                  "dt": mostUpcomingUnixTimestamp,
                  "lat": "1.3521",
                  "lon": "103.8198",
                  "apiKey": "e57dece87ef87648d306135d6f2f527c"
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setWeather(response.data.data.data[0].weather[0].main);
              setUpdate(mostUpcomingDate);
              setIcon(response.data.data.data[0].weather[0].icon)
  

          } catch (error) {
              console.error(error);
          }
      };
  
      fetchData(); 
      
  }, []); 

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}




  return (
    <div
    style={
        weater === 'Rain'
        ? {color:"white", backgroundColor:"grey", width:"200%", textAlign:"center", display:"flex", alignContent:"center",alignItems:"center", height:"200%", borderRadius:"8px"}
        : weater === null
        ? { backgroundColor: 'red', color: 'white', width:"200%", textAlign:"center", display:"flex", alignContent:"center",alignItems:"center", height:"100%", borderRadius:"8px" }
        : {} 
    }
  >
    {weater === null ? (
      <div>
        <h3>No Weather Info Avail</h3>

      </div>
    ) : weater === false ? (
      <div>
        <h3>Unread Messages</h3>
      </div>
    ) : (
      <div>{weater}<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" /></div>
    )}
  </div>

  );
}

export default WeatherForecast;
