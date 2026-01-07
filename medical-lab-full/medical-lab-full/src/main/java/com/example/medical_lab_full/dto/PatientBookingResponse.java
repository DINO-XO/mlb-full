package com.example.medical_lab_full.dto;

import java.util.List;

public class PatientBookingResponse {

    private Long patientId;
    private String patientName;
    private List<BookingSummary> bookings;

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public List<BookingSummary> getBookings() {
        return bookings;
    }

    public void setBookings(List<BookingSummary> bookings) {
        this.bookings = bookings;
    }
}
