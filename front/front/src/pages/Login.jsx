import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import "../components/AuthLayout.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {

    // ✅ FRONTEND VALIDATION
    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    if (!password.trim()) {
      alert("Please enter password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ ROLE BASED REDIRECT
      if (res.data.role === "PATIENT") {
        navigate("/patient");
      } else if (res.data.role === "TECHNICIAN") {
        navigate("/technician");
      } else {
        alert("Unknown role");
      }

    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Medical Lab System</h1>
        <p>
          Secure lab test booking, real-time status tracking, and instant report
          downloads — all in one place.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <span>Please login to your account</span>

          <input
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="auth-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-footer">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
