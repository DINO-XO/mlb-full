import { useEffect, useState } from "react";
import {
  getAllBookings,
  uploadReport,
  updateBookingStatus,
} from "../api/bookingApi";
import "../components/TechnicianDashboard.css";

export default function TechnicianDashboard() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState({});
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    getAllBookings()
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  const grouped = bookings.reduce((acc, b) => {
    const name = b.user?.name || "Unknown";
    acc[name] = acc[name] || [];
    acc[name].push(b);
    return acc;
  }, {});

  const counts = {
    ALL: bookings.length,
    COMPLETED: bookings.filter(b => b.status === "COMPLETED").length,
    BOOKED: bookings.filter(b => b.status === "BOOKED").length,
    IN_PROGRESS: bookings.filter(b => b.status === "IN_PROGRESS").length,
  };

  const markCompleted = async (bookingId) => {
    setUpdating(prev => ({ ...prev, [bookingId]: true }));
    try {
      await updateBookingStatus(bookingId, "COMPLETED");
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status: "COMPLETED" } : b
        )
      );
    } catch {
      alert("Failed to update status");
    }
    setUpdating(prev => {
      const c = { ...prev };
      delete c[bookingId];
      return c;
    });
  };

  const handleUpload = async (bookingId, file) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [bookingId]: "uploading" }));
    try {
      await uploadReport(bookingId, file);
      setUploading(prev => ({ ...prev, [bookingId]: "done" }));
    } catch {
      setUploading(prev => ({ ...prev, [bookingId]: "error" }));
    }
    setTimeout(() => {
      setUploading(prev => {
        const c = { ...prev };
        delete c[bookingId];
        return c;
      });
    }, 2000);
  };

  return (
    <div className="tech-page">
      <h1 className="tech-title">Technician Dashboard</h1>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-buttons">
          {["ALL","COMPLETED","BOOKED","IN_PROGRESS"].map(s => (
            <button
              key={s}
              className={`filter-btn ${statusFilter === s ? "active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
              <span className="count">{counts[s]}</span>
            </button>
          ))}
        </div>

        <input
          className="search-box"
          placeholder="Search patient..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* BOOKINGS */}
      {Object.keys(grouped)
        .filter(name => name.toLowerCase().includes(search.toLowerCase()))
        .map(username => {
          const visibleTests = grouped[username].filter(
            b => statusFilter === "ALL" || b.status === statusFilter
          );
          if (!visibleTests.length) return null;

          return (
            <div key={username} className="patient-section">
              <div className="patient-header">
                <div className="avatar">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="patient-info">
                  <h2>{username}</h2>
                  <p>{visibleTests.length} Test(s)</p>
                </div>
              </div>

              <div className={`test-grid ${visibleTests.length === 1 ? "single-layout" : ""}`}>
                {visibleTests.map(test => {
                  const uploadState = uploading[test.id];
                  const isUpdating = updating[test.id];

                  return (
                    <div
                      key={test.id}
                      className={`test-card ${visibleTests.length === 1 ? "single" : "grid"}`}
                    >
                      <div className="test-top">
                        <h3>{test.labTest.testName}</h3>
                        <span className={`status ${test.status.toLowerCase()}`}>
                          {test.status}
                        </span>
                      </div>

                      <div className="test-meta">
                        Booking ID: <b>{test.id}</b>
                      </div>

                      {/* ✅ SLOT TIME DISPLAY (ADDED) */}
                      <div className="test-meta">
                        Slot Time: <b>{test.slotTime}</b>
                      </div>

                      {test.status !== "COMPLETED" && (
                        <button
                          className="complete-btn"
                          disabled={isUpdating}
                          onClick={() => markCompleted(test.id)}
                        >
                          {isUpdating ? "Updating..." : "Mark as Completed"}
                        </button>
                      )}

                      <label className={`upload-zone ${uploadState || ""}`}>
                        <input
                          type="file"
                          hidden
                          onChange={e =>
                            handleUpload(test.id, e.target.files[0])
                          }
                        />
                        {uploadState === "uploading" && <span>Uploading...</span>}
                        {uploadState === "done" && <span className="success">✔ Uploaded</span>}
                        {!uploadState && (
                          <>
                            <span>⬆ Upload Report</span>
                            <small>PDF only</small>
                          </>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
