import axios from "axios";

const instance = axios.create({
  baseURL: "https://video-uploader-backend-five.vercel.app/api/v1", // Added https://
});

instance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("localStorage not available");
  }
  return config;
});

export default instance;