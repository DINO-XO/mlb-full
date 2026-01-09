import axios from "axios";

const API_URL = "https://mlb-lab.onrender.com/api/auth";

// ✅ LOGIN (PATIENT / TECHNICIAN)
export const loginUser = ({ email, password, role }) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
    role // "PATIENT" or "TECHNICIAN"
  });
};

// ✅ REGISTER (PATIENT ONLY – unchanged logic)
export const registerUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};
