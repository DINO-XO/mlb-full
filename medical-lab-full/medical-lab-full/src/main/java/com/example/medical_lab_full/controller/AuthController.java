package com.example.medical_lab_full.controller;

import com.example.medical_lab_full.dto.LoginRequest;
import com.example.medical_lab_full.dto.RegisterRequest;
import com.example.medical_lab_full.entity.User;
import com.example.medical_lab_full.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
