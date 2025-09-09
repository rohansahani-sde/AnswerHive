import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base url
  // withCredentials: true, // if you are using cookies/JWT
});



// Har request se pehle token add kar do
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Login ke baad jo save kiya tha
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
