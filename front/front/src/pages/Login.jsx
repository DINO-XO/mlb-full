import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "../components/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT"); // ✅ DEFAULT ROLE
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({
        email,
        password,
        role, // ✅ ALWAYS SENT
      });

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(res.data));

      // Role-based redirect
      if (res.data.role === "TECHNICIAN") {
        navigate("/technician");
      } else {
        navigate("/patient");
      }

    } catch (err) {
      alert("Invalid credentials ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-right">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>

        <form onSubmit={handleLogin} className="auth-form">

          {/* ✅ ROLE SELECT (THIS FIXES 500 ERROR) */}
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
            placeholder="Email address"
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

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
