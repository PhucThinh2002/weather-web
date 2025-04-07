import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default instance;
