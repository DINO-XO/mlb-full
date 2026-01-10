import { useEffect, useState } from "react";
import {
  getAllBookings,
  uploadReport,
  updateBookingStatus,
} from "../api/bookingApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

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
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Technician Dashboard</h1>
        <div style={{ width: '300px' }}>
          <Input
            placeholder="Search patient..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {["ALL", "COMPLETED", "BOOKED", "IN_PROGRESS"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`btn ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '9999px', padding: '0.5rem 1rem' }}
          >
            {s.replace('_', ' ')}
            <span style={{
              marginLeft: '0.5rem',
              background: statusFilter === s ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface-alt)',
              padding: '0.1rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem'
            }}>{counts[s]}</span>
          </button>
        ))}
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
            <div key={username} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{username}</h2>
                  <p className="text-secondary text-sm">{visibleTests.length} Test(s)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleTests.map(test => {
                  const uploadState = uploading[test.id];
                  const isUpdating = updating[test.id];

                  return (
                    <Card key={test.id} className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold">{test.labTest.testName}</h3>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontWeight: 600,
                          backgroundColor: test.status === 'COMPLETED' ? '#DCFCE7' : test.status === 'IN_PROGRESS' ? '#FEF3C7' : '#DBEAFE',
                          color: test.status === 'COMPLETED' ? '#166534' : test.status === 'IN_PROGRESS' ? '#D97706' : '#1E40AF'
                        }}>
                          {test.status}
                        </span>
                      </div>

                      <div className="text-sm border-t border-b py-2 mb-4" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex justify-between mb-1">
                          <span className="text-secondary">Booking ID:</span>
                          <span className="font-medium">#{test.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Slot Time:</span>
                          <span className="font-medium">{test.slotTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {test.status !== "COMPLETED" && (
                          <Button
                            variant={isUpdating ? "secondary" : "primary"}
                            disabled={isUpdating}
                            onClick={() => markCompleted(test.id)}
                            fullWidth
                          >
                            {isUpdating ? "Updating..." : "Mark as Completed"}
                          </Button>
                        )}

                        <label className={`btn ${uploadState === 'done' ? 'btn-secondary' : 'btn-secondary'} flex justify-center items-center gap-2 cursor-pointer`}
                          style={{
                            border: uploadState === 'done' ? '1px solid var(--secondary)' : '1px dashed var(--primary)',
                            color: uploadState === 'done' ? 'var(--secondary)' : 'var(--primary)'
                          }}
                        >
                          <input
                            type="file"
                            hidden
                            onChange={e => handleUpload(test.id, e.target.files[0])}
                          />
                          {uploadState === "uploading" ? "Uploading..." :
                            uploadState === "done" ? "✔ Uploaded" :
                              uploadState === "error" ? "❌ Failed" :
                                "⬆ Upload Report (PDF)"}
                        </label>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
