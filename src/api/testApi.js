import axios from "axios";

const BASE_URL = "https://mlb-lab.onrender.com/api/tests";

export function getAllTests() {
  return axios.get(BASE_URL);
}
