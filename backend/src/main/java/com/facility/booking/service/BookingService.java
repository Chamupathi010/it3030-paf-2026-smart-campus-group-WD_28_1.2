package com.facility.booking.service;

import com.facility.booking.dto.request.BookingRequest;
import com.facility.booking.exception.BookingConflictException;
import com.facility.booking.exception.ResourceNotFoundException;
import com.facility.booking.model.Booking;
import com.facility.booking.model.Notification;
import com.facility.booking.model.Resource;
import com.facility.booking.model.User;
import com.facility.booking.repository.BookingRepository;
import com.facility.booking.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ResourceRepository resourceRepository;
    private final NotificationService notificationService;

    public Booking createBooking(BookingRequest request, User currentUser) {
        if (request.getStartTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Start time must be in the future");
        }

        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        if (!StringUtils.hasText(request.getPurpose())) {
            throw new IllegalArgumentException("Purpose is required");
        }

        Resource resource = resourceRepository.findById(request.getResourceId())
                .filter(r -> !r.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Resource", request.getResourceId()));

        if (request.getAttendeeCount() > resource.getCapacity()) {
            throw new IllegalArgumentException("Attendee count exceeds resource capacity");
        }

        if (resource.getStatus() == Resource.ResourceStatus.OUT_OF_SERVICE) {
            throw new IllegalArgumentException("Resource is out of service and cannot be booked");
        }

        // Conflict detection
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                request.getResourceId(), request.getStartTime(), request.getEndTime());

        if (!conflicts.isEmpty()) {
            throw new BookingConflictException("The resource is already booked during the requested time slot. " +
                    conflicts.size() + " conflicting booking(s) found.");
        }

        Booking booking = Booking.builder()
                .userId(currentUser.getId())
                .userName(currentUser.getName())
                .userEmail(currentUser.getEmail())
                .resourceId(resource.getId())
                .resourceName(resource.getName())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .purpose(request.getPurpose())
                .attendeeCount(request.getAttendeeCount())
                .status(Booking.BookingStatus.PENDING)
                .build();

        return bookingRepository.save(booking);
    }

    public Page<Booking> getMyBookings(String userId, Booking.BookingStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        if (status != null) {
            return bookingRepository.findByUserIdAndStatus(userId, status, pageable);
        }
        return bookingRepository.findByUserId(userId, pageable);
    }

    public Page<Booking> getAllBookings(Booking.BookingStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        if (status != null) {
            return bookingRepository.findByStatus(status, pageable);
        }
        return bookingRepository.findAll(pageable);
    }

    public Page<Booking> getBookingsByResource(String resourceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("startTime").ascending());
        return bookingRepository.findByResourceId(resourceId, pageable);
    }

    public Booking approveBooking(String bookingId, User adminUser) {
        Booking booking = getBookingOrThrow(bookingId);
        if (booking.getStatus() != Booking.BookingStatus.PENDING) {
            throw new IllegalArgumentException("Only pending bookings can be approved");
        }

        List<Booking> approvalConflicts = bookingRepository.findConflictingBookingsExcluding(
                booking.getResourceId(), booking.getId(), booking.getStartTime(), booking.getEndTime());
        if (!approvalConflicts.isEmpty()) {
            throw new BookingConflictException("Cannot approve booking due to overlapping approved/pending booking");
        }

        booking.setStatus(Booking.BookingStatus.APPROVED);
        booking.setApprovedBy(adminUser.getName());
        Booking saved = bookingRepository.save(booking);

        notificationService.createNotification(
                booking.getUserId(),
                "Booking Approved",
                "Your booking for " + booking.getResourceName() + " has been approved.",
                Notification.NotificationType.BOOKING_APPROVED,
                booking.getId()
        );
        return saved;
    }

    public Booking rejectBooking(String bookingId, String reason, User adminUser) {
        Booking booking = getBookingOrThrow(bookingId);
        if (booking.getStatus() != Booking.BookingStatus.PENDING) {
            throw new IllegalArgumentException("Only pending bookings can be rejected");
        }
        if (!StringUtils.hasText(reason)) {
            throw new IllegalArgumentException("Rejection reason is required");
        }
        booking.setStatus(Booking.BookingStatus.REJECTED);
        booking.setRejectionReason(reason.trim());
        Booking saved = bookingRepository.save(booking);

        notificationService.createNotification(
                booking.getUserId(),
                "Booking Rejected",
                "Your booking for " + booking.getResourceName() + " has been rejected. Reason: " + reason,
                Notification.NotificationType.BOOKING_REJECTED,
                booking.getId()
        );
        return saved;
    }

    public Booking cancelBooking(String bookingId, User currentUser) {
        Booking booking = getBookingOrThrow(bookingId);

        boolean isOwner = booking.getUserId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRoles().contains("ADMIN");

        if (!isOwner && !isAdmin) {
            throw new com.facility.booking.exception.AccessDeniedException("You can only cancel your own bookings");
        }

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new IllegalArgumentException("Booking is already cancelled");
        }

        if (booking.getStatus() == Booking.BookingStatus.REJECTED) {
            throw new IllegalArgumentException("Rejected bookings cannot be cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

    private Booking getBookingOrThrow(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", id));
    }
}
