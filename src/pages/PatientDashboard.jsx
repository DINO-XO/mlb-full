import { useEffect, useState } from "react";
import { getUserBookings } from "../api/bookingApi";
import { useNavigate } from "react-router-dom";
import "../components/Layout.css";

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

  return (
    <div className="patient-page">

      {/* HEADER */}
      <div className="patient-header">
        <h2 className="page-title">My Bookings</h2>
        <button className="book-btn" onClick={() => navigate("/book")}>
          + Book New Test
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue"><h4>Total Tests</h4><span>{total}</span></div>
        <div className="stat-card green"><h4>Completed</h4><span>{completed}</span></div>
        <div className="stat-card yellow"><h4>In Progress</h4><span>{inProgress}</span></div>
        <div className="stat-card orange"><h4>Booked</h4><span>{booked}</span></div>
      </div>

      {/* BOOKINGS */}
      <div className="booking-grid">
        {loading && [1,2,3].map(i => (
          <div key={i} className="booking-card skeleton" />
        ))}

        {!loading &&
          bookings.map(b => (
            <div key={b.id} className="booking-card fade-in">
              <div className="card-top">
                <h3 className="test-name">{b.labTest.testName}</h3>
                <span className={`status-pill ${b.status}`}>
                  {b.status}
                </span>
              </div>

              {/* ✅ SLOT TIME DISPLAY (ADDED) */}
              <p className="slot-text">
                Slot Time: <b>{b.slotTime}</b>
              </p>

              {b.status === "COMPLETED" && (
                <button
                  className="report-btn"
                  onClick={() => navigate("/reports")}
                >
                  View / Download Report
                </button>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}
