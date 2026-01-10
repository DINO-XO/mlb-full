import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
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

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
        role
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
      <div className="glass-card" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-6 stagger-1">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
            MedLab Pro.
          </h1>
          <p className="text-secondary">Join Us Today</p>
        </div>

        <form onSubmit={handleRegister} className="stagger-2">
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

          {/* Name */}
          <div className="form-group relative">
            <label className="form-label text-sm text-secondary">Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <UserIcon />
              </div>
              <input
                className="form-input"
                style={{ paddingLeft: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.8)' }}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="form-group relative">
            <label className="form-label text-sm text-secondary">Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <LockIcon />
              </div>
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.8)' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group relative">
            <label className="form-label text-sm text-secondary">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <LockIcon />
              </div>
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.8)' }}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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
            {loading ? "Create Account" : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary stagger-3">
          Already have an account? <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
        </div>
      </div>
    </div>
  );
}
