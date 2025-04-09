import axios from "axios";

const API_KEY = "1f6ced3bfab143cda1e44028240205";

const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherData = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: query, 
        days: 7, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi kết nối tới WeatherAPI:", error);
    throw error; 
  }
};
