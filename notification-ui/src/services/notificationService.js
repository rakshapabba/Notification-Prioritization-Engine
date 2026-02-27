import axios from "axios";

// If using proxy in package.json
const API_URL = "/api/notifications";

// If NOT using proxy
// const API_URL = "http://localhost:8080/api/notifications";

export const getNotifications = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addNotification = async (notification) => {
  const response = await axios.post(API_URL, notification);
  return response.data;
};