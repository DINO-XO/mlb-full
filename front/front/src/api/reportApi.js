import axios from "axios";

const BASE_URL = "https://mlb-lab.onrender.com/api/reports";

// ✅ UPLOAD REPORT
export const uploadReport = (bookingId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${BASE_URL}/upload/${bookingId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ DOWNLOAD REPORT
export const downloadReport = (bookingId) => {
  return axios.get(`${BASE_URL}/download/${bookingId}`, {
    responseType: "blob",
  }).then(res => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.pdf");
    document.body.appendChild(link);
    link.click();
  });
};
