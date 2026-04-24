package com.facility.booking.repository;

import com.facility.booking.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    Page<Booking> findByUserId(String userId, Pageable pageable);

    Page<Booking> findByUserIdAndStatus(String userId, Booking.BookingStatus status, Pageable pageable);

    List<Booking> findByResourceId(String resourceId);

    Page<Booking> findByResourceId(String resourceId, Pageable pageable);

    /**
     * Conflict detection: existing.start < newEnd AND existing.end > newStart
     * Only check PENDING and APPROVED bookings
     */
    @Query("{ 'resourceId': ?0, 'status': { $in: ['PENDING', 'APPROVED'] }, 'startTime': { $lt: ?2 }, 'endTime': { $gt: ?1 } }")
    List<Booking> findConflictingBookings(String resourceId, LocalDateTime newStart, LocalDateTime newEnd);

    /**
     * Conflict detection excluding a specific booking (for updates)
     */
    @Query("{ 'resourceId': ?0, 'status': { $in: ['PENDING', 'APPROVED'] }, 'startTime': { $lt: ?3 }, 'endTime': { $gt: ?2 }, '_id': { $ne: ?1 } }")
    List<Booking> findConflictingBookingsExcluding(String resourceId, String excludeId, LocalDateTime newStart, LocalDateTime newEnd);

    Page<Booking> findAll(Pageable pageable);

    Page<Booking> findByStatus(Booking.BookingStatus status, Pageable pageable);
}
