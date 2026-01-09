import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT"); // ✅ REQUIRED

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://mlb-lab.onrender.com/api/auth/login",
        { email, password, role }
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "TECHNICIAN") {
        navigate("/technician");
      } else {
        navigate("/patient");
      }

    } catch (err) {
      alert("Invalid credentials ❌");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="auth-form">

        {/* ✅ ROLE SELECT — THIS FIXES 500 */}
        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="PATIENT">Patient</option>
          <option value="TECHNICIAN">Technician</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
    </div>
  );
}
