package com.example.medical_lab_full.controller;

import com.example.medical_lab_full.dto.BookingRequest;
import com.example.medical_lab_full.entity.Booking;
import com.example.medical_lab_full.entity.BookingStatus;
import com.example.medical_lab_full.service.BookingService;
import lombok.Value;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ✅ BOOK TEST
    @PostMapping
    public Booking book(@RequestBody BookingRequest request) {
        return bookingService.bookTest(request);
    }

    // ✅ PATIENT BOOKINGS
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    // ✅ TECHNICIAN BOOKINGS
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ UPDATE STATUS
    @PutMapping("/{id}/status")
    public Booking updateStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status) {
        return bookingService.updateStatus(id, status);
    }

    // ✅ FETCH BOOKED SLOTS
    @GetMapping("/slots/{testId}")
    public List<LocalTime> getBookedSlots(@PathVariable Long testId) {
        return bookingService.getBookedSlots(testId);
    }
}
