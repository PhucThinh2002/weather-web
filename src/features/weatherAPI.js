import axios from "../services/axiosConfig.js";

const API_KEY = "50c659426e4c4531a9e171350251204";
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
    const normalizedQuery = normalizeSearchQuery(query);
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: normalizedQuery,
        lang: "vi",
      },
    });

     // Lọc kết quả phù hợp hơn với query gốc
     const filteredResults = response.data.filter((location) => {
      const normalizedName = normalizeSearchQuery(location.name);
      const normalizedRegion = normalizeSearchQuery(location.region || "");
      const normalizedCountry = normalizeSearchQuery(location.country || "");
      
      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedRegion.includes(normalizedQuery) ||
        normalizedCountry.includes(normalizedQuery)
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
    console.log(response.data.forecast) 
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
