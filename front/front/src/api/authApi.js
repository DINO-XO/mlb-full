import axios from "axios";

const API_URL = "https://mlb-lab.onrender.com/api/auth";

// ✅ LOGIN
export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

// ✅ REGISTER
export const registerUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};
