package com.example.medical_lab_full.service;

import com.example.medical_lab_full.dto.BookingRequest;
import com.example.medical_lab_full.entity.*;
import com.example.medical_lab_full.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final LabTestRepository labTestRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            LabTestRepository labTestRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.labTestRepository = labTestRepository;
    }

    // ================= EXISTING LOGIC (UNCHANGED) =================

    public Booking bookTest(BookingRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LabTest test = labTestRepository.findById(request.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        // ✅ SLOT BLOCKING (CORRECT)
        if (bookingRepository.existsByLabTestIdAndSlotTime(
                test.getId(),
                request.getSlotTime()
        )) {
            throw new RuntimeException("Selected slot already booked");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setLabTest(test);
        booking.setStatus(BookingStatus.BOOKED);
        booking.setBookingDate(LocalDateTime.now());
        booking.setSlotTime(request.getSlotTime());

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking updateStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    // ================= SLOT FETCH (ONLY ADDITION) =================

    public List<LocalTime> getBookedSlots(Long testId) {
        return bookingRepository.findByLabTestId(testId)
                .stream()
                .map(Booking::getSlotTime)
                .collect(Collectors.toList());
    }
}
