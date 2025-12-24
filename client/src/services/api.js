import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor để log requests (optional - for debugging)
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để handle responses
api.interceptors.response.use(
  (response) => {
    console.log(
      `📥 ${response.config.method.toUpperCase()} ${response.config.url} - ${
        response.status
      }`
    );
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.message}`);
    return Promise.reject(error);
  }
);

export const trackVisit = async () => {
  try {
    const response = await api.post("/track-visit", {
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    });
    return response.data;
  } catch (error) {
    console.error("Error tracking visit:", error);
    throw error;
  }
};

export const getVisitCount = async () => {
  try {
    const response = await api.get("/visit-count");
    return response.data;
  } catch (error) {
    console.error("Error getting visit count:", error);
    throw error;
  }
};

export const getVisits = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/visits?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error getting visits:", error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await api.get("/stats");
    return response.data;
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
};

export default api;
