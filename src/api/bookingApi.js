import axios from "axios";

const API = "https://mlb-lab.onrender.com/api";

export const createBooking = (data) => {
  return axios.post(`${API}/bookings`, data);
};

export const getUserBookings = (userId) => {
  return axios.get(`${API}/bookings/user/${userId}`);
};

export const getAllBookings = () => {
  return axios.get(`${API}/bookings`);
};

export const uploadReport = (bookingId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API}/reports/upload/${bookingId}`, formData);
};

export const updateBookingStatus = (id, status) => {
  return axios.put(`${API}/bookings/${id}/status?status=${status}`);
};

/* ===========================
   ✅ ADD THIS (OPTION 1)
=========================== */
export const getBookedSlots = (testId) => {
  return axios.get(`${API}/bookings/slots/${testId}`);
};
