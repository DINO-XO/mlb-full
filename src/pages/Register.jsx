import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import "../components/AuthLayout.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        role
      });

      alert("Registration successful ✅");
      navigate("/");

    } catch (err) {
      alert("Registration failed ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-right">
        <h2>Create Account</h2>
        <p>Register as Patient or Technician</p>

        <form onSubmit={handleRegister} className="auth-form">

          {/* ROLE SELECT */}
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
            className="auth-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="auth-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
