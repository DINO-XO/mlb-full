package com.example.medical_lab_full.controller;

import com.example.medical_lab_full.entity.Booking;
import com.example.medical_lab_full.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final BookingService bookingService;

    public PatientController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ✅ NOW THIS METHOD EXISTS
    @GetMapping("/bookings/{userId}")
    public List<Booking> getMyBookings(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }
}
