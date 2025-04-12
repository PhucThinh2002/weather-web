import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // Thêm timestamp để tránh cache
    config.params = {
      ...config.params,
      _: new Date().getTime(),
    };
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server trả về response với status code ngoài 2xx
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error("No response received:", error.request);
    } else {
      // Lỗi khi thiết lập request
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
