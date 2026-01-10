import { useLocation, useNavigate } from "react-router-dom";
import Button from "./ui/Button";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (isAuthPage) return null;

  return (
    <nav className="flex items-center justify-between" style={{
      padding: '1rem 2rem',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* LEFT */}
      <div className="flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
        <span>🧪</span>
        <span>MedLab Pro</span>
      </div>

      {/* CENTER */}
      {user && (
        <div className="flex items-center">
          {/* Could add nav links here later */}
        </div>
      )}

      {/* RIGHT */}
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600
            }}>
              {user.name ? user.name[0] : 'U'}
            </div>
            <div className="text-sm font-medium">
              <span style={{ display: 'block', lineHeight: 1 }}>{user.name || 'User'}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.role}</span>
            </div>
          </div>
          <Button variant="secondary" onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
