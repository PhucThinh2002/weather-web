import React from "react";
import "./WeatherIcon.css";

const weatherIcons = {
  "Sunny": "sunny-outline",
  "Clear": "moon-outline",
  "Partly cloudy": "partly-sunny-outline",
  "Cloudy": "cloud-outline",
  "Overcast": "cloudy-outline",
  "Rain": "rainy-outline",
  "Snow": "snow-outline",
  "Thunderstorm": "thunderstorm-outline",
};

const WeatherIcon = ({ condition, small = false }) => {
  const iconName = weatherIcons[condition] || "cloud-outline";
  
  return (
    <div className={`weather-icon ${small ? "small" : ""}`}>
      <ion-icon name={iconName}></ion-icon>
    </div>
  );
};

export default WeatherIcon;