import axios from "axios";

/**
 * IMPORTANT:
 * This must point to your DEPLOYED backend.
 * Do NOT use localhost in production.
 */
const API_URL = "https://mlb-lab.onrender.com/api/auth";

// ================= LOGIN (PATIENT / TECHNICIAN) =================
export const loginUser = ({ email, password, role }) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
    role, // "PATIENT" | "TECHNICIAN"
  });
};

// ================= REGISTER (PATIENT ONLY) =================
export const registerUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};
