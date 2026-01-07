package com.example.medical_lab_full.controller;

import com.example.medical_lab_full.entity.Report;
import com.example.medical_lab_full.service.ReportService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // ===== UPLOAD =====
    @PostMapping("/upload/{bookingId}")
    public Report uploadReport(@PathVariable Long bookingId,
                               @RequestParam("file") MultipartFile file) throws Exception {

        return reportService.uploadReport(bookingId, file);
    }

    // ===== DOWNLOAD =====
    @GetMapping("/download/{bookingId}")
    public ResponseEntity<Resource> downloadReport(@PathVariable Long bookingId) {

        Resource resource = reportService.downloadReport(bookingId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
