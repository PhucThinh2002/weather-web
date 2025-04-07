import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { getWeatherData } from "../../features/weatherAPI";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Rain from "../../assets/rain.png";
import Ultraviolet from "../../assets/ultraviolet.png";
import PartlySunny from "../../assets/partly-sunny.png";
import sunCloudy from "../../assets/sun-cloudy.png";

const Dashboard = ({ searchCountry }) => {
  const [weather, setWeather] = useState(null); // Dữ liệu thời tiết hiện tại
  const [otherCities, setOtherCities] = useState([]); // Danh sách các thành phố khác

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const country = searchCountry || "auto:ip"; // Nếu không tìm kiếm, lấy vị trí hiện tại
        const data = await getWeatherData(country);
        setWeather(data);

        // Lấy dữ liệu cho các thành phố ngẫu nhiên
        const randomCities = ["France", "Japan", "USA", "China"];
        const promises = randomCities.map((city) => getWeatherData(city));
        const results = await Promise.all(promises);
        setOtherCities(results);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
      }
    };

    fetchWeatherData();
  }, [searchCountry]); // Chạy lại khi `searchCountry` thay đổi


  const formatDate = (daysToAdd = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <section className="dashboard-section">
      {/* Vị trí hiện tại */}
      <div className="home">
        <div className="feed-1">
          <div className="feeds">
            {weather ? (
              <>
                <img
                  src={`https:${weather?.current?.condition?.icon || ""}`}
                  alt="Weather Icon"
                />

                <div>
                  <div>
                    <span>{weather.location.country}</span>
                    <span>{weather.current.condition.text}</span>
                  </div>
                  <div>
                    <span>
                      {weather.current.temp_c} <sup>o</sup>C
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <span>Đang tải thông tin thời tiết...</span>
            )}
          </div>
          <div className="feed">
            <div>
              <div>
                <img
                  src={`https:${weather?.forecast?.forecastday?.[0]?.day?.condition?.icon || ""}`}
                  alt="Weather Icon"
                />
                <span>
                  {weather?.forecast?.forecastday?.[0]?.day?.avgtemp_c || "--"}{" "}
                  <sup>o</sup>C
                </span>
              </div>
              <div>
                <span>{formatDate(0)}</span>
              </div>
            </div>
            <div>
              <div>
                <img
                  src={`https:${weather?.forecast?.forecastday?.[1]?.day?.condition?.icon || ""}`}
                  alt="Weather Icon"
                />
                <span>
                  {weather?.forecast?.forecastday?.[1]?.day?.avgtemp_c || "--"}{" "}
                  <sup>o</sup>C
                </span>
              </div>
              <div>
                <span>{formatDate(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Highlights */}
        <div className="highlights">
          <h2>Today's Highlights</h2>
          <div className="all-highlights">
            <div>
              <div>
                <img src={Compass} alt="Feel Like" />
                <div>
                  <span>Feel Like</span>
                  <span>
                    {weather?.current?.feelslike_c || "Normal"} <sup>o</sup>C
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <img src={sunCloudy} alt="Cloud" />
                <div>
                  <span>Cloud</span>
                  <span>{weather?.current?.condition?.text || "Heave"}</span>
                </div>
              </div>
              <div>
                <span>
                  {weather?.current?.cloud || "--"} <sup>%</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={Rain} alt="Rain" />
                <div>
                  <span>Rain</span>
                  <span>
                    {weather?.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain || "Normal"}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <img src={Drops} alt="Humidity" />
                <div>
                  <span>Humidity</span>
                  <span>
                    {weather?.current?.humidity || "Heavy"}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <img src={Ultraviolet} alt="Ultraviolet" />
                <div>
                  <span>Ultraviolet</span>
                  <span>
                    {weather?.current?.uv || "Heavy"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <img src={PartlySunny} alt="Wind" />
                <div>
                  <span>Wind</span>
                  <span>
                    {weather?.current?.wind_kph || "Normal"} km/h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Other Cities */}
      <div className="cities">
        <h2>Other Countries</h2>
        <div className="all-cities">
          {otherCities.length > 0 ? (
            otherCities.map((cityWeather, index) => (
              <div key={index}>
                <div>
                  <img
                    src={`https:${cityWeather?.current?.condition?.icon || ""}`}
                    alt={`${cityWeather?.location?.country || "Unknown"} Weather Icon`}
                  />
                  <div>
                    <span>{cityWeather?.location?.country || "Unknown"}</span>
                    <span>
                      {cityWeather?.current?.condition?.text}. High:{" "}
                      {cityWeather?.forecast?.forecastday?.[0]?.day?.maxtemp_c || "--"}° Low:{" "}
                      {cityWeather?.forecast?.forecastday?.[0]?.day?.mintemp_c || "--"}°
                    </span>
                  </div>
                </div>
                <div>
                  <span>{cityWeather?.current?.temp_c || "--"} <sup>o</sup>C</span>
                </div>
              </div>
            ))
          ) : (
            <p>Đang tải dữ liệu thành phố...</p>
          )}

        </div>
        <button className="button">
          <span>See More</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>

      </div>
    </section>
  );
};

export default Dashboard;
