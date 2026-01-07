package com.example.medical_lab_full.controller;

import com.example.medical_lab_full.dto.PatientBookingResponse;
import com.example.medical_lab_full.entity.Booking;
import com.example.medical_lab_full.service.BookingService;
import com.example.medical_lab_full.service.TechnicianService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technician")
@CrossOrigin
public class TechnicianController {

    private final BookingService bookingService;
    private final TechnicianService technicianService;

    public TechnicianController(BookingService bookingService,
                                TechnicianService technicianService) {
        this.bookingService = bookingService;
        this.technicianService = technicianService;
    }

    // OLD API (keep)
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ NEW API (patient-wise)
    @GetMapping("/patient-bookings")
    public List<PatientBookingResponse> getPatientWiseBookings() {
        return technicianService.getBookingsGroupedByPatient();
    }
}
