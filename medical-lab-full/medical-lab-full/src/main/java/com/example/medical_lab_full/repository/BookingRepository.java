package com.example.medical_lab_full.repository;

import com.example.medical_lab_full.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;   // ✅ REQUIRED
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    boolean existsByLabTestIdAndSlotTime(Long labTestId, LocalTime slotTime);

    List<Booking> findByLabTestId(Long labTestId);
}
