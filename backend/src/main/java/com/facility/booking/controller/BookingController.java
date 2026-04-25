package com.facility.booking.controller;

import com.facility.booking.dto.request.BookingRequest;
import com.facility.booking.exception.AccessDeniedException;
import com.facility.booking.model.Booking;
import com.facility.booking.model.User;
import com.facility.booking.service.AuthService;
import com.facility.booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final AuthService authService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest request,
                                                  @AuthenticationPrincipal User user,
                                                  @RequestHeader(value = "Authorization", required = false) String authorization) {
        User currentUser = resolveCurrentUser(user, authorization);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(request, currentUser));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<Booking>> getMyBookings(
            @AuthenticationPrincipal User user,
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) Booking.BookingStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User currentUser = resolveCurrentUser(user, authorization);
        return ResponseEntity.ok(bookingService.getMyBookings(currentUser.getId(), status, page, size));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Booking>> getAllBookings(
            @RequestParam(required = false) Booking.BookingStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(bookingService.getAllBookings(status, page, size));
    }

    @GetMapping("/resource/{resourceId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<Booking>> getBookingsByResource(
            @PathVariable String resourceId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(bookingService.getBookingsByResource(resourceId, page, size));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Booking> approveBooking(@PathVariable String id,
                                                   @AuthenticationPrincipal User user,
                                                   @RequestHeader(value = "Authorization", required = false) String authorization) {
        User currentUser = resolveCurrentUser(user, authorization);
        return ResponseEntity.ok(bookingService.approveBooking(id, currentUser));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Booking> rejectBooking(@PathVariable String id,
                                                  @RequestBody Map<String, String> body,
                                                  @AuthenticationPrincipal User user,
                                                  @RequestHeader(value = "Authorization", required = false) String authorization) {
        User currentUser = resolveCurrentUser(user, authorization);
        return ResponseEntity.ok(bookingService.rejectBooking(id, body.get("reason"), currentUser));
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Booking> cancelBooking(@PathVariable String id,
                                                  @AuthenticationPrincipal User user,
                                                  @RequestHeader(value = "Authorization", required = false) String authorization) {
        User currentUser = resolveCurrentUser(user, authorization);
        return ResponseEntity.ok(bookingService.cancelBooking(id, currentUser));
    }

    private User resolveCurrentUser(User principalUser, String authorization) {
        if (principalUser != null) {
            return principalUser;
        }

        User tokenUser = authService.getCurrentUserFromToken(authorization);
        if (tokenUser != null) {
            return tokenUser;
        }

        throw new AccessDeniedException("Authentication required");
    }
}
