package com.example.medical_lab_full.dto;

import java.time.LocalTime;

public class BookingRequest {

    private Long userId;
    private Long testId;

    // ✅ SLOT TIME
    private LocalTime slotTime;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public LocalTime getSlotTime() {
        return slotTime;
    }

    public void setSlotTime(LocalTime slotTime) {
        this.slotTime = slotTime;
    }
}
