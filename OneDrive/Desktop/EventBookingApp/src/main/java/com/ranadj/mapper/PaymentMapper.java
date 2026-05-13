package com.ranadj.mapper;

import com.ranadj.dto.PaymentResponse;
import com.ranadj.entity.Payment;
import org.springframework.stereotype.Component;

/**
 * Mapper component converting Payment database entities into safe transfer DTO payloads.
 */
@Component
public class PaymentMapper {

    /**
     * Converts a Payment entity into a PaymentResponse DTO.
     */
    public PaymentResponse toResponse(Payment payment) {
        if (payment == null) {
            return null;
        }
        return PaymentResponse.builder()
                .id(payment.getId())
                .bookingId(payment.getBooking().getId())
                .razorpayOrderId(payment.getRazorpayOrderId())
                .razorpayPaymentId(payment.getRazorpayPaymentId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .paidAt(payment.getPaidAt())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}
