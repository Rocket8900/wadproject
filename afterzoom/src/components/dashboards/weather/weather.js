    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    const WeatherForecast = ({bookings}) => {
    const nextBooking = bookings.lessons[0].date
    console.log(nextBooking)
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = '15dc85ebe7cbb83169531e78bf93bedc'; 
    const selectedDateObj = new Date(nextBooking);
    const selectedDate = selectedDateObj.toISOString().split('T')[0]; 
    const selectedTime = selectedDateObj.toISOString().split('T')[1].split('.')[0];

    const fetchData = async () => {
        try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=SINGAPORE&cnt=8&appid=${apiKey}&dt=${selectedDate} ${selectedTime}`
        );
        console.log(response.data)
        console.log(response.data.list[0].weather[0].main)
        setWeatherData(response.data.list[0]);
        } catch (error) {
        console.error('Error fetching weather data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [selectedDate, selectedTime]);
    return (
        <div>
        {weatherData ? (
            <div>
            <h4>Weather details for your next lesson:</h4>
            <p>Date and Time: {weatherData.dt_txt}</p>
            <p>Weather Condition: {weatherData.weather[0].description}</p>
            </div>
        ) : (
            <p>No weather data available    .</p>
        )}
        </div>
    );
    };

    export default WeatherForecast;
