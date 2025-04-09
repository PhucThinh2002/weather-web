import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherData } from "../../features/weatherAPI";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

const Dashboard = ({ searchCountry }) => {
  const [weather, setWeather] = useState(null);
  const [otherCities, setOtherCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const savedLocations = useSelector(state => state.locations);

  // Hàm lấy danh sách thành phố ngẫu nhiên
  const getRandomCities = () => {
    const cities = ["Paris", "Tokyo", "New York", "London", "Berlin", "Sydney", 
                   "Dubai", "Singapore", "Moscow", "Beijing"];
    return [...cities].sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Lấy thời tiết vị trí hiện tại hoặc vị trí tìm kiếm
        const currentLocation = searchCountry || "auto:ip";
        const currentData = await getWeatherData(currentLocation);
        setWeather(currentData);

        // Lấy thời tiết các thành phố ngẫu nhiên
        const randomCities = savedLocations.length > 0 
          ? savedLocations.map(loc => loc.name)
          : getRandomCities();
        
        const citiesData = await Promise.all(
          randomCities.map(city => getWeatherData(city).catch(e => null))
        );
        
        setOtherCities(citiesData.filter(Boolean));
        setError(null);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchCountry, savedLocations]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      {/* Current Weather */}
      <div className="current-weather dashboard-section">
        <div className="location-info">
          <h2>{weather?.location?.name}, {weather?.location?.country}</h2>
          <p>{new Date(weather?.location?.localtime).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        
        <div className="weather-main">
          <WeatherIcon condition={weather?.current?.condition?.text} />
          <div className="temperature">
            <span>{weather?.current?.temp_c}°C</span>
            <p>{weather?.current?.condition?.text}</p>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span>Feels Like</span>
            <span>{weather?.current?.feelslike_c}°C</span>
          </div>
          <div className="detail-item">
            <span>Humidity</span>
            <span>{weather?.current?.humidity}%</span>
          </div>
          <div className="detail-item">
            <span>Wind</span>
            <span>{weather?.current?.wind_kph} km/h</span>
          </div>
          <div className="detail-item">
            <span>UV Index</span>
            <span>{weather?.current?.uv}</span>
          </div>
        </div>
      </div>
      
      {/* Forecast */}
      <div className="forecast dashboard-section">
        <h3>3-Day Forecast</h3>
        <div className="forecast-items">
          {weather?.forecast?.forecastday?.map((day, index) => (
            <div key={index} className="forecast-item">
              <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <WeatherIcon condition={day.day.condition.text} small />
              <div className="temps">
                <span className="max-temp">{day.day.maxtemp_c}°</span>
                <span className="min-temp">{day.day.mintemp_c}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Forecast
<div className="forecast dashboard-section">
  <h3>7-Day Forecast</h3>
  <div className="forecast-scroll-wrapper">
    <div className="forecast-items scrollable-row">
      {weather?.forecast?.forecastday?.map((day, index) => (
        <div key={index} className="forecast-item">
          <p className="forecast-date">
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          <WeatherIcon condition={day.day.condition.text} small />
          <div className="temps">
            <span className="max-temp">{day.day.maxtemp_c}°</span>
            <span className="min-temp">{day.day.mintemp_c}°</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div> */}
      {/* Other Locations */}
      <div className="other-locations dashboard-section">
        <h3>Other Locations</h3>
        <div className="location-cards">
          {otherCities.map((city, index) => (
            city && (
              <div key={index} className="location-card">
                <h4>{city.location.name}, {city.location.country}</h4>
                <div className="card-content">
                  <WeatherIcon condition={city.current.condition.text} small />
                  <span>{city.current.temp_c}°C</span>
                </div>
                <p>{city.current.condition.text}</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;