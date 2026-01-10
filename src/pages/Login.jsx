import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../styles/animations.css";
import "../styles/animated-background.css";

// SVG Icons
const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    {visible ? (
      <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>
    ) : (
      <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></>
    )}
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password, role });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate(res.data.role === "TECHNICIAN" ? "/technician" : "/patient");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-bg">
      {/* Abstract Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Glass Card */}
      <div className="glass-card">
        <div className="text-center mb-8 stagger-1">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
            MedLab Pro.
          </h1>
          <p className="text-secondary">Welcome Back</p>
        </div>

        <form onSubmit={handleLogin} className="stagger-2">
          {/* Role Toggle */}
          <div className="flex gap-2 mb-6 bg-white/50 p-1 rounded-xl backdrop-blur-sm">
            {['PATIENT', 'TECHNICIAN'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 py-2 text-sm font-medium transition-all"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  background: role === r ? 'white' : 'transparent',
                  color: role === r ? 'var(--primary)' : 'var(--text-secondary)',
                  boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {r === 'PATIENT' ? 'Patient' : 'Technician'}
              </button>
            ))}
          </div>

          {/* Email Field */}
          <div className="form-group relative">
            <label className="form-label text-sm text-secondary">Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <EnvelopeIcon />
              </div>
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.8)' }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group relative">
            <div className="flex justify-between items-center mb-2">
              <label className="form-label text-sm text-secondary mb-0">Password</label>
              <a href="#" className="text-xs font-medium hover:text-primary transition-colors">Forgot Password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                style={{ paddingLeft: '40px', paddingRight: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.8)' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {error && <div className="text-xs text-danger mb-4 text-center bg-red-50 p-2 rounded">{error}</div>}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="stagger-3"
            style={{
              marginTop: '1rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
              boxShadow: '0 4px 14px 0 rgba(255, 126, 139, 0.39)',
              border: 'none',
              padding: '1rem',
              fontSize: '1rem'
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-secondary stagger-3">
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
