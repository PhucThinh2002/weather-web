import axios from "../services/axiosConfig.js";

const API_KEY = "dba9582a4ba244e4970115223250304";
const BASE_URL = "https://api.weatherapi.com/v1";

// Hàm chuẩn hóa chuỗi tìm kiếm
const normalizeSearchQuery = (query) => {
  return query
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .toLowerCase()
    .trim();
};

export const searchLocation = async (query) => {
  try {
    // Giữ nguyên chuỗi tiếng Việt, không bỏ dấu
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query, // Giữ nguyên query gốc
        lang: "vi", // Ngôn ngữ tiếng Việt
      },
    });

    // Lọc kết quả phù hợp với query gốc
    const filteredResults = response.data.filter((location) => {
      return (
        location.name.includes(query) ||
        (location.region && location.region.includes(query)) ||
        location.country.includes(query)
      );
    });

    return filteredResults.length > 0 ? filteredResults : response.data;
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
