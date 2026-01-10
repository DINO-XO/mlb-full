import { useEffect, useState } from "react";
import { getUserBookings } from "../api/bookingApi";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUserBookings(user.id)
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user.id]);

  const total = bookings.length;
  const completed = bookings.filter(b => b.status === "COMPLETED").length;
  const inProgress = bookings.filter(b => b.status === "IN_PROGRESS").length;
  const booked = bookings.filter(b => b.status === "BOOKED").length;

  const StatCard = ({ title, value, color }) => (
    <div className="card text-center p-6" style={{ borderTop: `4px solid ${color}` }}>
      <h4 className="text-secondary text-sm font-medium mb-2 uppercase tracking-wide">{title}</h4>
      <span className="text-3xl font-bold" style={{ color: color }}>{value}</span>
    </div>
  );

  return (
    <div className="container py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-secondary">Welcome back, {user.name}</p>
        </div>
        <Button onClick={() => navigate("/book")}>
          + Book New Test
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tests" value={total} color="var(--primary)" />
        <StatCard title="Completed" value={completed} color="var(--secondary)" />
        <StatCard title="In Progress" value={inProgress} color="var(--warning)" />
        <StatCard title="Booked" value={booked} color="#3B82F6" />
      </div>

      {/* BOOKINGS */}
      <h3 className="text-xl font-bold mb-4">Recent Bookings</h3>

      {loading ? (
        <div className="text-center py-8 text-secondary">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <Card className="text-center p-8">
          <div className="text-4xl mb-4">🩺</div>
          <h3 className="text-lg font-bold mb-2">No bookings found</h3>
          <p className="text-secondary mb-4">You haven't booked any tests yet.</p>
          <Button onClick={() => navigate("/book")}>Book a Test</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map(b => (
            <Card key={b.id} className="relative overflow-hidden transition-shadow hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{b.labTest.testName}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  backgroundColor: b.status === 'COMPLETED' ? '#DCFCE7' : b.status === 'IN_PROGRESS' ? '#FEF3C7' : '#DBEAFE',
                  color: b.status === 'COMPLETED' ? '#166534' : b.status === 'IN_PROGRESS' ? '#D97706' : '#1E40AF'
                }}>
                  {b.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-secondary">Slot Time</p>
                <p className="font-medium">{b.slotTime}</p>
              </div>

              {b.status === "COMPLETED" && (
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate("/reports")}
                  style={{ fontSize: '0.875rem' }}
                >
                  View Report
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
