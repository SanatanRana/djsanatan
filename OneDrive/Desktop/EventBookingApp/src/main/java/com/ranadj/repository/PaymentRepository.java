package com.ranadj.repository;

import com.ranadj.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing Payment database operations.
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    /**
     * Finds a payment record by its Razorpay Order ID.
     */
    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    /**
     * Retrieves the list of payments associated with bookings belonging to a specific user.
     */
    List<Payment> findByBookingUserId(Long userId);
}
