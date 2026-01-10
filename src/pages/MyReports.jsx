import { useEffect, useState } from "react";
import { getUserBookings } from "../api/bookingApi";
import { downloadReport } from "../api/reportApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

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

  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">My Reports</h2>
        <p className="text-secondary">Access your medical test reports</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-secondary">Loading reports...</div>
      ) : completedBookings.length === 0 ? (
        <Card className="text-center p-8">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-bold mb-2">No reports available</h3>
          <p className="text-secondary">Reports will appear here once your tests are completed.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(b => (
            <Card key={b.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{b.labTest.testName}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  backgroundColor: b.status === "COMPLETED" ? '#DCFCE7' : '#DBEAFE',
                  color: b.status === "COMPLETED" ? '#166534' : '#1E40AF'
                }}>
                  {b.status}
                </span>
              </div>

              <div className="mt-auto">
                {b.status?.toUpperCase() === "COMPLETED" ? (
                  <Button
                    onClick={() => downloadReport(b.id)}
                    fullWidth
                  >
                    ⬇ Download Report
                  </Button>
                ) : (
                  <div className="text-center text-sm text-secondary p-2 bg-slate-50 rounded">
                    Report pending
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
