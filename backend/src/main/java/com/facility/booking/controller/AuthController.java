package com.facility.booking.controller;

import com.facility.booking.dto.request.LoginRequest;
import com.facility.booking.dto.request.RegisterRequest;
import com.facility.booking.dto.response.AuthResponse;
import com.facility.booking.model.User;
import com.facility.booking.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(@AuthenticationPrincipal User user,
                                                       @RequestHeader(value = "Authorization", required = false) String authorization) {
        if (user == null) {
            user = authService.getCurrentUserFromToken(authorization);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        return ResponseEntity.ok(authService.getCurrentUser(user));
    }
}
