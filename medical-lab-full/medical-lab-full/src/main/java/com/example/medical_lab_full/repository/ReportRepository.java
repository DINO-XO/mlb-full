package com.example.medical_lab_full.repository;

import com.example.medical_lab_full.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Optional<Report> findByBookingId(Long bookingId);
}
