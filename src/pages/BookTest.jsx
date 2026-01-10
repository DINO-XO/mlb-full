import { useEffect, useState } from "react";
import axios from "axios";
import {
  createBooking,
  getBookedSlots
} from "../api/bookingApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function BookTest() {
  const [tests, setTests] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [blockedSlots, setBlockedSlots] = useState({});
  const [loadingTestId, setLoadingTestId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.warn("User missing in localStorage");
    return null;
  }

  /* LOAD TESTS */
  useEffect(() => {
    axios
      .get("https://mlb-lab.onrender.com/api/tests")
      .then(res => {
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
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Book Lab Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map(test => (
          <Card key={test.id} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{test.testName}</h3>
              <span className="text-lg font-bold text-primary">₹{test.price}</span>
            </div>

            <p className="text-secondary mb-6 flex-grow">{test.description}</p>

            <div className="mt-auto">
              <label className="form-label text-sm mb-1">Select Time Slot</label>
              <select
                className="form-input mb-4"
                value={selectedSlots[test.id] || ""}
                onFocus={() => loadBookedSlots(test.id)}
                onChange={e =>
                  setSelectedSlots(prev => ({
                    ...prev,
                    [test.id]: e.target.value
                  }))
                }
              >
                <option value="">Choose a time...</option>
                {TIME_SLOTS.map(slot => {
                  const isBlocked = blockedSlots[test.id]?.includes(slot.value);
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

              <Button
                fullWidth
                disabled={loadingTestId === test.id}
                onClick={() => bookTest(test.id)}
              >
                {loadingTestId === test.id ? "Booking..." : "Book Test"}
              </Button>
            </div>
          </Card>
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
