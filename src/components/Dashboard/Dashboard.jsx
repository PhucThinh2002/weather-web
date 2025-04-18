import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherData } from "../../features/weatherAPI";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import TemperatureDisplay from "../TemperatureToggle/TemperatureDisplay";

const Dashboard = ({ searchCountry }) => {
  const [weather, setWeather] = useState(null);
  const [otherCities, setOtherCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const savedLocations = useSelector(state => state.locations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentData = await getWeatherData(searchCountry || "auto:ip", 7);

        const citiesToFetch = savedLocations.length > 0
          ? savedLocations.map(loc => loc.name)
          : ["Paris", "Tokyo", "New York", "London"];

        const citiesData = await Promise.all(
          citiesToFetch.map(city =>
            getWeatherData(city, 7)
              .catch(e => {
                console.error(`Error fetching ${city}:`, e);
                return null;
              })
          )
        );

        setWeather(currentData);
        setOtherCities(citiesData.filter(Boolean));

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.error?.message || "Failed to fetch weather data");

        if (err.response?.status === 403) {
          const fallbackData = await getWeatherData(searchCountry || "auto:ip", 3);
          setWeather(fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchCountry, savedLocations]);

  const handleRemoveLocation = (index) => {
    setOtherCities(prevCities => {
      const newCities = [...prevCities];
      newCities.splice(index, 1);
      return newCities;
    });
  };
  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p style={{ color: "white" }}>Loading weather data for your location...</p>
    </div>
  );
  if (error) return <div className="error">{error}</div>;
  if (!weather) return <div className="error">No weather data available</div>;

  return (
    <div className="dashboard-container mobile-view">
      {/* Current Weather */}
      <div className="current-weather dashboard-section">
        <div className="location-info">
          <h2 className="mobile-location">
            {weather?.location?.name}
            {weather?.location?.region && `, ${weather.location.region}`}
            {weather?.location?.country && `, ${weather.location.country}`}
          </h2>
          <p className="mobile-date">{new Date(weather?.location?.localtime).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>

        <div className="weather-main">
          <WeatherIcon condition={weather?.current?.condition?.text} />
          <div className="temperature">
          <TemperatureDisplay tempC={weather?.current?.temp_c} />
            <p>{weather?.current?.condition?.text}</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span>Feels Like </span>
            <TemperatureDisplay tempC={weather?.current?.temp_c} />
          </div>
          <div className="detail-item">
            <span>Humidity </span>
            <span>{weather?.current?.humidity}%</span>
          </div>
          <div className="detail-item">
            <span>Wind </span>
            <span>{weather?.current?.wind_kph} km/h</span>
          </div>
          <div className="detail-item">
            <span>UV Index </span>
            <span>{weather?.current?.uv}</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="forecast dashboard-section mobile-forecast">
        <h3>7-Day Forecast</h3>
        <div className="forecast-scroll-wrapper">
          <div className="forecast-items scrollable-row mobile-forecast-items">
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
                  <TemperatureDisplay tempC={weather?.current?.temp_c} />
                  <TemperatureDisplay tempC={weather?.current?.temp_c} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Other Locations */}
      <div className="other-locations dashboard-section">
        <h3>Other Locations</h3>
        <div className="location-cards">
          {otherCities.map((city, index) => (
            city && (
              <div key={index} className="location-card">
                <div className="card-header">
                  <h4>{city.location.name}, {city.location.country}</h4>
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveLocation(index)}
                    aria-label="Remove location"
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
                <div className="card-content">
                  <WeatherIcon condition={city.current.condition.text} small />
                  <TemperatureDisplay tempC={weather?.current?.temp_c} />
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