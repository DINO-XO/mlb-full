import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT"); // ✅ DEFAULT

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
        role, // ✅ IMPORTANT
      });

      // save user/technician
      localStorage.setItem("user", JSON.stringify(res.data));

      // role based redirect
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

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="auth-input"
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
