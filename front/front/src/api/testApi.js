import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tests";

export function getAllTests() {
  return axios.get(BASE_URL);
}
