import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        🧪 <span>Medical Lab System</span>
      </div>

      {/* CENTER */}
      {!isAuthPage && user && (
        <div className="navbar-center">
          <span className={`role-pill ${user.role.toLowerCase()}`}>
            {user.role === "PATIENT"
              ? "Patient Dashboard"
              : "Technician Dashboard"}
          </span>
        </div>
      )}

      {/* RIGHT */}
      {!isAuthPage && user && (
        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
