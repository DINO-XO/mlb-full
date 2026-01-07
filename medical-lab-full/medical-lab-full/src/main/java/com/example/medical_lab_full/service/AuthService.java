package com.example.medical_lab_full.service;

import com.example.medical_lab_full.dto.LoginRequest;
import com.example.medical_lab_full.dto.RegisterRequest;
import com.example.medical_lab_full.entity.Role;
import com.example.medical_lab_full.entity.Technician;
import com.example.medical_lab_full.entity.User;
import com.example.medical_lab_full.repository.TechnicianRepository;
import com.example.medical_lab_full.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;

    public AuthService(UserRepository userRepository,
                       TechnicianRepository technicianRepository) {
        this.userRepository = userRepository;
        this.technicianRepository = technicianRepository;
    }

    // ================= REGISTER (PATIENT ONLY) =================
    public User register(RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.PATIENT);

        return userRepository.save(user);
    }

    // ================= LOGIN (PATIENT + TECHNICIAN) =================
    public Object login(LoginRequest request) {

        // 🔹 Try PATIENT login
        User patient = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (patient != null && patient.getPassword().equals(request.getPassword())) {
            return patient;
        }

        // 🔹 Try TECHNICIAN login
        Technician technician = technicianRepository.findByEmail(request.getEmail()).orElse(null);
        if (technician != null && technician.getPassword().equals(request.getPassword())) {
            return technician;
        }

        throw new RuntimeException("Invalid email or password");
    }
}
