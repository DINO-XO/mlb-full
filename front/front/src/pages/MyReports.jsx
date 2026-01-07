import { useEffect, useState } from "react";
import { getUserBookings } from "../api/bookingApi";
import { downloadReport } from "../api/reportApi";
import "../components/Layout.css";

export default function MyReports() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoading(true);
    getUserBookings(user.id)
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user.id]);

  return (
    <div className="reports-page">

      <div className="reports-header">
        <h2 className="reports-title">My Reports</h2>
      </div>

      {/* SKELETON */}
      {loading && (
        <div className="reports-grid">
          {[1, 2].map(i => (
            <div key={i} className="report-card skeleton">
              <div className="skeleton-title"></div>
              <div className="skeleton-pill"></div>
              <div className="skeleton-btn"></div>
            </div>
          ))}
        </div>
      )}

      {/* REAL DATA */}
      {!loading && (
        <div className="reports-grid">
          {bookings.map(b => (
            <div key={b.id} className="report-card fade-in">

              <div className="report-top">
                <h3 className="test-name">{b.labTest.testName}</h3>
                <span className={`status-pill ${b.status}`}>
                  {b.status}
                </span>
              </div>

              {b.status?.toUpperCase() === "COMPLETED" && (
                <button
                  className="download-btn"
                  onClick={() => downloadReport(b.id)}
                >
                  ⬇ Download Report
                </button>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
