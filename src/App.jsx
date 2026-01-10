import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import BookTest from "./pages/BookTest";
import MyReports from "./pages/MyReports";

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient"
          element={
            <PrivateRoute role="PATIENT">
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/technician"
          element={
            <PrivateRoute role="TECHNICIAN">
              <TechnicianDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/book"
          element={
            <PrivateRoute role="PATIENT">
              <BookTest />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute role="PATIENT">
              <MyReports />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
