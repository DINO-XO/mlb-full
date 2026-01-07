package com.example.medical_lab_full.service;

import com.example.medical_lab_full.entity.Booking;
import com.example.medical_lab_full.entity.BookingStatus;
import com.example.medical_lab_full.entity.Report;
import com.example.medical_lab_full.repository.BookingRepository;
import com.example.medical_lab_full.repository.ReportRepository;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final BookingRepository bookingRepository;

    public ReportService(ReportRepository reportRepository,
                         BookingRepository bookingRepository) {
        this.reportRepository = reportRepository;
        this.bookingRepository = bookingRepository;
    }

    // ================= UPLOAD =================
    public Report uploadReport(Long bookingId, MultipartFile file) throws Exception {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        String uploadDir = "reports/";
        Files.createDirectories(Paths.get(uploadDir));

        String filePath = uploadDir + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());

        Report report = new Report();
        report.setFileName(file.getOriginalFilename());
        report.setFileType(file.getContentType());
        report.setFilePath(filePath);
        report.setBooking(booking);

        booking.setStatus(BookingStatus.COMPLETED);

        return reportRepository.save(report);
    }

    // ================= DOWNLOAD =================
    public Resource downloadReport(Long bookingId) {

        Report report = reportRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        return new FileSystemResource(new File(report.getFilePath()));
    }
}
