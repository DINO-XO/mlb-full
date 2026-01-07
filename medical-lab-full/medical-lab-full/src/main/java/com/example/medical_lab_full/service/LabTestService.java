package com.example.medical_lab_full.service;

import com.example.medical_lab_full.entity.LabTest;
import com.example.medical_lab_full.repository.LabTestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabTestService {

    private final LabTestRepository labTestRepository;

    public LabTestService(LabTestRepository labTestRepository) {
        this.labTestRepository = labTestRepository;
    }

    public List<LabTest> getAllTests() {
        return labTestRepository.findAll();
    }
}

