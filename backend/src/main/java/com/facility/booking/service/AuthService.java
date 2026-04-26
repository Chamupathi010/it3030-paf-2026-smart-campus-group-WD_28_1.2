package com.facility.booking.service;

import com.facility.booking.dto.request.LoginRequest;
import com.facility.booking.dto.request.RegisterRequest;
import com.facility.booking.dto.response.AuthResponse;
import com.facility.booking.exception.ResourceNotFoundException;
import com.facility.booking.model.User;
import com.facility.booking.repository.UserRepository;
import com.facility.booking.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.Set;

@Slf4j
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider("LOCAL")
                .roles(Set.of("USER"))
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getRoles());

        return buildAuthResponse(savedUser, token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new IllegalArgumentException("Account is disabled");
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRoles());
        return buildAuthResponse(user, token);
    }

    public AuthResponse getCurrentUser(User user) {
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRoles());
        return buildAuthResponse(user, token);
    }

    public User getCurrentUserFromToken(String authorizationHeader) {
        if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }

        String token = authorizationHeader.substring(7);
        if (!jwtTokenProvider.validateToken(token)) {
            return null;
        }

        String userId = jwtTokenProvider.getUserIdFromToken(token);
        return userRepository.findById(userId).orElse(null);
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .picture(user.getPicture())
                .roles(user.getRoles())
                .expiresAt(LocalDateTime.now().plusDays(1))
                .build();
    }
}
