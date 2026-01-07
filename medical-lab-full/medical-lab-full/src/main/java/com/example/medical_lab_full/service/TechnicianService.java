package com.example.medical_lab_full.service;

import com.example.medical_lab_full.dto.BookingSummary;
import com.example.medical_lab_full.dto.PatientBookingResponse;
import com.example.medical_lab_full.entity.Booking;
import com.example.medical_lab_full.entity.User;
import com.example.medical_lab_full.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TechnicianService {

    private final BookingRepository bookingRepository;

    public TechnicianService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<PatientBookingResponse> getBookingsGroupedByPatient() {

        List<Booking> bookings = bookingRepository.findAll();

        Map<User, List<Booking>> grouped =
                bookings.stream().collect(Collectors.groupingBy(Booking::getUser));

        List<PatientBookingResponse> response = new ArrayList<>();

        for (Map.Entry<User, List<Booking>> entry : grouped.entrySet()) {

            User patient = entry.getKey();

            PatientBookingResponse dto = new PatientBookingResponse();
            dto.setPatientId(patient.getId());
            dto.setPatientName(patient.getName());

            List<BookingSummary> summaries = entry.getValue().stream()
                    .map(b -> {
                        BookingSummary bs = new BookingSummary();
                        bs.setBookingId(b.getId());
                        bs.setTestName(b.getLabTest().getTestName());
                        bs.setStatus(b.getStatus().name());
                        return bs;
                    })
                    .toList();

            dto.setBookings(summaries);
            response.add(dto);
        }

        return response;
    }
}
