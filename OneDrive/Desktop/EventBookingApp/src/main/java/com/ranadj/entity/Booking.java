package com.ranadj.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

/**
 * Entity representing an event Booking.
 */
@Entity
@Table(name = "bookings", indexes = {
    @Index(name = "idx_booking_event_date_status", columnList = "event_date, booking_status"),
    @Index(name = "idx_booking_timeslot", columnList = "start_time, end_time")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private DjPackage djPackage;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "event_location", nullable = false)
    private String eventLocation;

    @Column(name = "guest_count", nullable = false)
    private Integer guestCount;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "advance_amount", nullable = false)
    private BigDecimal advanceAmount;

    @Column(name = "remaining_amount", nullable = false)
    private BigDecimal remainingAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "booking_status", nullable = false)
    @Builder.Default
    private BookingStatus bookingStatus = BookingStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "special_notes", columnDefinition = "TEXT")
    private String specialNotes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Payment> payments;
}
