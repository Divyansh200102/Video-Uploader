import axios from "axios";

const instance = axios.create({
  baseURL: "https://video-uploader-alpha.vercel.app/api/v1", // adjust to your backend port
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
