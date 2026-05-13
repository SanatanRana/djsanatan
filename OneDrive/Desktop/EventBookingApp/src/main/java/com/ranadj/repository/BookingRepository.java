package com.ranadj.repository;

import com.ranadj.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Repository interface for Managing Booking database operations.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Finds paginated bookings for a specific customer.
     */
    Page<Booking> findByUserId(Long userId, Pageable pageable);

    /**
     * Checks if there exists an overlapping CONFIRMED booking on the same event date and time range.
     * Overlap occurs when S1 < E2 AND E1 > S2.
     * Allows excluding a specific booking ID (used for avoiding self-collision during updates).
     */
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.eventDate = :eventDate " +
           "AND b.bookingStatus = com.ranadj.entity.BookingStatus.CONFIRMED " +
           "AND b.startTime < :endTime AND b.endTime > :startTime " +
           "AND (:excludeId IS NULL OR b.id <> :excludeId)")
    boolean existsOverlappingConfirmedBooking(
            @Param("eventDate") LocalDate eventDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("excludeId") Long excludeId);
}
