import axios from "../services/axiosConfig.js";

// const API_KEY = "1f6ced3bfab143cda1e44028240205";
const API_KEY = "dba9582a4ba244e4970115223250304";
const BASE_URL = "http://api.weatherapi.com/v1";

export const searchLocation = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
        lang: "vi",
      },
    });

    // Bỏ qua bước lọc nếu không cần thiết
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

export const getWeatherData = async (location, days = 7) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: days, // Số ngày forecast (1-14)
        aqi: "no", // Không lấy dữ liệu chất lượng không khí
        alerts: "no", // Không lấy cảnh báo thời tiết
        // lang: "vi" // Ngôn ngữ tiếng Việt
      },
    });

    // Kiểm tra cấu trúc dữ liệu trả về
    if (!response.data.forecast?.forecastday) {
      throw new Error("Invalid forecast data structure");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
