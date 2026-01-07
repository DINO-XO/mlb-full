package com.example.medical_lab_full.repository;

import com.example.medical_lab_full.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {
}

