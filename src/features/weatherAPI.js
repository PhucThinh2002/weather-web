import axios from "axios";

// API Key được lấy từ WeatherAPI
const API_KEY = "1f6ced3bfab143cda1e44028240205";

// Base URL của WeatherAPI
const BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Hàm lấy dữ liệu thời tiết tại vị trí hiện tại dựa vào latitude và longitude
 * @param {number} lat - Latitude của vị trí
 * @param {number} lon - Longitude của vị trí
 * @returns {Promise<Object>} - Dữ liệu thời tiết trả về từ API
 */
export const getWeatherData = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: query, // Có thể là tên địa điểm hoặc tọa độ
        days: 3, // Lấy dự báo cho 3 ngày
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi kết nối tới WeatherAPI:", error);
    throw error; // Ném lỗi để xử lý sau
  }
};
