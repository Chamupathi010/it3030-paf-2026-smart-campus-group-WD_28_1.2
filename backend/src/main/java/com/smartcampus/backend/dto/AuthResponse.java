package com.smartcampus.backend.dto;

import com.smartcampus.backend.enums.Role;

public class AuthResponse {

    private String message;
    private String userId;
    private String fullName;
    private String email;
    private Role role;

    public AuthResponse() {
    }

    public AuthResponse(String message, String userId, String fullName, String email, Role role) {
        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public String getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}