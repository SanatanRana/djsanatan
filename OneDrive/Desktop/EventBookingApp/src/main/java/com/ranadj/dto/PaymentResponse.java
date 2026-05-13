package com.ranadj.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Payload class representing a read-only view of a Payment transaction.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private Long bookingId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private BigDecimal amount;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;
}
