import { useEffect, useState } from "react";
import axios from "axios";
import {
  createBooking,
  getBookedSlots
} from "../api/bookingApi";
import "../components/BookTest.css";

export default function BookTest() {
  const [tests, setTests] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [blockedSlots, setBlockedSlots] = useState({});
  const [loadingTestId, setLoadingTestId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔴 CRITICAL FIX: prevent silent crash
  if (!user) {
    console.warn("User missing in localStorage");
    return null; // UI untouched
  }

  /* LOAD TESTS */
  useEffect(() => {
    console.log("🚀 Loading tests...");

    axios
      .get("https://mlb-lab.onrender.com/api/tests")
      .then(res => {
        console.log("📦 Tests received:", res.data);
        setTests(res.data);
      })
      .catch(err => {
        console.error("❌ Failed to load tests", err);
        setTests([]);
      });
  }, []);

  /* FETCH BOOKED SLOTS */
  const loadBookedSlots = async (testId) => {
    if (blockedSlots[testId]) return;

    try {
      const res = await getBookedSlots(testId);
      console.log(`📅 Slots for test ${testId}:`, res.data);

      setBlockedSlots(prev => ({
        ...prev,
        [testId]: res.data
      }));
    } catch (err) {
      console.error("❌ Failed to load slots", err);
      setBlockedSlots(prev => ({
        ...prev,
        [testId]: []
      }));
    }
  };

  /* BOOK TEST */
  const bookTest = async (testId) => {
    const slotTime = selectedSlots[testId];

    if (!slotTime) {
      alert("Please select a time slot");
      return;
    }

    setLoadingTestId(testId);

    try {
      await createBooking({
        userId: user.id,
        testId,
        slotTime
      });

      alert("Test booked successfully ✅");

      setBlockedSlots(prev => ({
        ...prev,
        [testId]: [...(prev[testId] || []), slotTime]
      }));

    } catch (err) {
      console.error("❌ Booking failed", err);
      alert("Booking failed ❌");
    } finally {
      setLoadingTestId(null);
    }
  };

  return (
    <div className="book-page">
      <h1 className="book-title">Book Lab Test</h1>

      <div className="test-list">
        {tests.map(test => (
          <div key={test.id} className="book-card">

            <div className="card-header">
              <h3>{test.testName}</h3>
              <span className="price">₹{test.price}</span>
            </div>

            <p className="desc">{test.description}</p>

            <select
              className="slot-select"
              value={selectedSlots[test.id] || ""}
              onFocus={() => loadBookedSlots(test.id)}
              onChange={e =>
                setSelectedSlots(prev => ({
                  ...prev,
                  [test.id]: e.target.value
                }))
              }
            >
              <option value="">Select Time Slot</option>

              {TIME_SLOTS.map(slot => {
                const isBlocked =
                  blockedSlots[test.id]?.includes(slot.value);

                return (
                  <option
                    key={slot.value}
                    value={slot.value}
                    disabled={isBlocked}
                  >
                    {slot.label} {isBlocked ? "(Booked)" : ""}
                  </option>
                );
              })}
            </select>

            <button
              className="book-btn"
              disabled={loadingTestId === test.id}
              onClick={() => bookTest(test.id)}
            >
              {loadingTestId === test.id ? "Booking..." : "Book Test"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

/* SLOT OPTIONS */
const TIME_SLOTS = [
  { label: "09:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "02:00 PM", value: "14:00" },
  { label: "03:00 PM", value: "15:00" },
  { label: "04:00 PM", value: "16:00" },
];
