import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";

function WeatherForecast({ bookings }) {
  const [weather, setWeather] = useState(null);
  const [update, setUpdate] = useState(null);
  const [icon, setIcon] = useState(null);
  const now = new Date();
  let mostUpcomingUnixTimestamp;
  let mostUpcomingDate; 
  if (bookings ) {
    if(bookings.lessons.length > 0){
    const upcoming = bookings.lessons;
    mostUpcomingDate = new Date(upcoming[0].date);
  
    for (const event of upcoming) {
      const eventDate = new Date(event.date);
      if (eventDate > now && eventDate < mostUpcomingDate) {
        mostUpcomingDate = eventDate;
      }
    }
  
    mostUpcomingUnixTimestamp = Math.floor(mostUpcomingDate.getTime() / 1000);
  }
  }
  
  useEffect(() => {
    if (mostUpcomingUnixTimestamp) {
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
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          setWeather(response.data.data.data[0].weather[0].main);
          setUpdate(mostUpcomingDate);
          setIcon(response.data.data.data[0].weather[0].icon);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }
  }, [mostUpcomingUnixTimestamp]);
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  return (
    <div
      style={
        weather === 'Rain'
          ? { color: "white", backgroundColor: "grey", width: "200%", textAlign: "center", display: "flex", alignContent: "center", alignItems: "center", height: "200%", borderRadius: "8px" }
          : weather === null
          ? { width: "200%", textAlign: "center", display: "flex", alignContent: "center", alignItems: "center", height: "100%", borderRadius: "8px" }
          : {}
      }
    >
      { weather === null ? (
        <div>
          <h3>No Weather Info Avail</h3>
        </div>
      ) : mostUpcomingUnixTimestamp && (
        <div>
          Your next lesson expected weather: {weather}
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
