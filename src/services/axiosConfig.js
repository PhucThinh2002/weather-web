import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
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
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
