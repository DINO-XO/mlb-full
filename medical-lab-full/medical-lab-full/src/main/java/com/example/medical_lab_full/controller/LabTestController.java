package com.example.medical_lab_full.controller;

import com.example.medical_lab_full.entity.LabTest;
import com.example.medical_lab_full.service.LabTestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin
public class LabTestController {

    private final LabTestService labTestService;

    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @GetMapping
    public List<LabTest> getAllTests() {
        return labTestService.getAllTests();
    }
}
