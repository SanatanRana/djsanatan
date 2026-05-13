package com.ranadj.service.impl;

import com.ranadj.dto.BookingRequest;
import com.ranadj.dto.BookingResponse;
import com.ranadj.entity.*;
import com.ranadj.exception.ApiException;
import com.ranadj.mapper.BookingMapper;
import com.ranadj.repository.BookingRepository;
import com.ranadj.repository.PackageRepository;
import com.ranadj.repository.UserRepository;
import com.ranadj.service.BookingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

/**
 * Service implementation for managing Bookings.
 */
@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final PackageRepository packageRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              BookingMapper bookingMapper,
                              PackageRepository packageRepository,
                              UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.packageRepository = packageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BookingResponse createBooking(BookingRequest request, User currentUser) {
        // 1. Time validations
        if (request.getStartTime().isAfter(request.getEndTime()) || request.getStartTime().equals(request.getEndTime())) {
            throw new ApiException("End time must be strictly after start time", HttpStatus.BAD_REQUEST);
        }

        // 2. Fetch User
        User bookingUser = currentUser;
        if (currentUser.getRole() == Role.ADMIN && request.getUserId() != null) {
            bookingUser = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ApiException("User not found with id: " + request.getUserId(), HttpStatus.NOT_FOUND));
        }

        // 3. Fetch Package
        DjPackage djPackage = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new ApiException("Package not found with id: " + request.getPackageId(), HttpStatus.NOT_FOUND));

        if (!djPackage.isActive()) {
            throw new ApiException("Cannot create booking for an inactive package", HttpStatus.BAD_REQUEST);
        }

        // 4. Calculate Financials
        BigDecimal totalAmount = djPackage.getPrice();
        BigDecimal advanceAmount = request.getAdvanceAmount();
        if (advanceAmount.compareTo(totalAmount) > 0) {
            throw new ApiException("Advance amount cannot exceed the total package price of " + totalAmount, HttpStatus.BAD_REQUEST);
        }
        BigDecimal remainingAmount = totalAmount.subtract(advanceAmount);

        // 5. Calculate Payment Status
        PaymentStatus paymentStatus = PaymentStatus.PENDING;
        if (advanceAmount.compareTo(totalAmount) == 0) {
            paymentStatus = PaymentStatus.PAID;
        } else if (advanceAmount.compareTo(BigDecimal.ZERO) > 0) {
            paymentStatus = PaymentStatus.PARTIAL;
        }

        // 6. Map and build booking
        Booking booking = bookingMapper.toEntity(request);
        booking.setUser(bookingUser);
        booking.setDjPackage(djPackage);
        booking.setTotalAmount(totalAmount);
        booking.setRemainingAmount(remainingAmount);
        booking.setPaymentStatus(paymentStatus);

        // Allow Admin to pre-assign status
        if (currentUser.getRole() == Role.ADMIN && request.getBookingStatus() != null) {
            try {
                booking.setBookingStatus(BookingStatus.valueOf(request.getBookingStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new ApiException("Invalid booking status: " + request.getBookingStatus(), HttpStatus.BAD_REQUEST);
            }
        } else {
            booking.setBookingStatus(BookingStatus.PENDING);
        }

        // 7. Check for confirmed slot conflicts (any booking, pending or confirmed, is blocked if there's already a CONFIRMED overlap)
        if (booking.getBookingStatus() != BookingStatus.CANCELLED && booking.getBookingStatus() != BookingStatus.REJECTED) {
            boolean hasOverlap = bookingRepository.existsOverlappingConfirmedBooking(
                    booking.getEventDate(),
                    booking.getStartTime(),
                    booking.getEndTime(),
                    null
            );
            if (hasOverlap) {
                throw new ApiException("Double-Booking Intercepted: This timeslot is already confirmed for another event.", HttpStatus.BAD_REQUEST);
            }
        }

        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toResponse(savedBooking);
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest request, User currentUser) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ApiException("Booking not found with id: " + id, HttpStatus.NOT_FOUND));

        // 1. Security check
        if (currentUser.getRole() != Role.ADMIN) {
            if (!booking.getUser().getId().equals(currentUser.getId())) {
                throw new ApiException("Access Denied: You are not authorized to update this booking", HttpStatus.FORBIDDEN);
            }
            if (booking.getBookingStatus() != BookingStatus.PENDING) {
                throw new ApiException("Access Denied: You can only modify bookings that are in PENDING status", HttpStatus.BAD_REQUEST);
            }
        }

        // 2. Time validations
        if (request.getStartTime().isAfter(request.getEndTime()) || request.getStartTime().equals(request.getEndTime())) {
            throw new ApiException("End time must be strictly after start time", HttpStatus.BAD_REQUEST);
        }

        // 3. Fetch package and update financials if changed
        DjPackage djPackage = booking.getDjPackage();
        if (!booking.getDjPackage().getId().equals(request.getPackageId())) {
            djPackage = packageRepository.findById(request.getPackageId())
                    .orElseThrow(() -> new ApiException("Package not found with id: " + request.getPackageId(), HttpStatus.NOT_FOUND));
            if (!djPackage.isActive()) {
                throw new ApiException("Cannot update booking to an inactive package", HttpStatus.BAD_REQUEST);
            }
            booking.setDjPackage(djPackage);
        }

        BigDecimal totalAmount = djPackage.getPrice();
        BigDecimal advanceAmount = request.getAdvanceAmount();
        if (advanceAmount.compareTo(totalAmount) > 0) {
            throw new ApiException("Advance amount cannot exceed the total package price of " + totalAmount, HttpStatus.BAD_REQUEST);
        }
        BigDecimal remainingAmount = totalAmount.subtract(advanceAmount);

        PaymentStatus paymentStatus = PaymentStatus.PENDING;
        if (advanceAmount.compareTo(totalAmount) == 0) {
            paymentStatus = PaymentStatus.PAID;
        } else if (advanceAmount.compareTo(BigDecimal.ZERO) > 0) {
            paymentStatus = PaymentStatus.PARTIAL;
        }

        // Update fields
        bookingMapper.updateEntity(booking, request);
        booking.setTotalAmount(totalAmount);
        booking.setRemainingAmount(remainingAmount);
        booking.setPaymentStatus(paymentStatus);

        // Admin-only updates
        if (currentUser.getRole() == Role.ADMIN) {
            if (request.getBookingStatus() != null) {
                try {
                    booking.setBookingStatus(BookingStatus.valueOf(request.getBookingStatus().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    throw new ApiException("Invalid booking status: " + request.getBookingStatus(), HttpStatus.BAD_REQUEST);
                }
            }
            if (request.getPaymentStatus() != null) {
                try {
                    booking.setPaymentStatus(PaymentStatus.valueOf(request.getPaymentStatus().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    throw new ApiException("Invalid payment status: " + request.getPaymentStatus(), HttpStatus.BAD_REQUEST);
                }
            }
        } else {
            // Customer is allowed to self-cancel by setting request fields if desired
            if (request.getBookingStatus() != null && "CANCELLED".equalsIgnoreCase(request.getBookingStatus())) {
                booking.setBookingStatus(BookingStatus.CANCELLED);
            }
        }

        // 4. Overlap checks
        if (booking.getBookingStatus() != BookingStatus.CANCELLED && booking.getBookingStatus() != BookingStatus.REJECTED) {
            boolean hasOverlap = bookingRepository.existsOverlappingConfirmedBooking(
                    booking.getEventDate(),
                    booking.getStartTime(),
                    booking.getEndTime(),
                    booking.getId()
            );
            if (hasOverlap) {
                throw new ApiException("Double-Booking Intercepted: This timeslot is already confirmed for another event.", HttpStatus.BAD_REQUEST);
            }
        }

        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toResponse(savedBooking);
    }

    @Override
    public void cancelBooking(Long id, User currentUser) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ApiException("Booking not found with id: " + id, HttpStatus.NOT_FOUND));

        if (currentUser.getRole() != Role.ADMIN && !booking.getUser().getId().equals(currentUser.getId())) {
            throw new ApiException("Access Denied: You are not authorized to cancel this booking", HttpStatus.FORBIDDEN);
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingResponse getBookingById(Long id, User currentUser) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ApiException("Booking not found with id: " + id, HttpStatus.NOT_FOUND));

        if (currentUser.getRole() != Role.ADMIN && !booking.getUser().getId().equals(currentUser.getId())) {
            throw new ApiException("Access Denied: You are not authorized to view this booking", HttpStatus.FORBIDDEN);
        }

        return bookingMapper.toResponse(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookingResponse> getAllBookings(Pageable pageable, User currentUser) {
        Page<Booking> bookingsPage;

        if (currentUser.getRole() == Role.ADMIN) {
            bookingsPage = bookingRepository.findAll(pageable);
        } else {
            bookingsPage = bookingRepository.findByUserId(currentUser.getId(), pageable);
        }

        return bookingsPage.map(bookingMapper::toResponse);
    }

    @Override
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ApiException("Booking not found with id: " + id, HttpStatus.NOT_FOUND);
        }
        bookingRepository.deleteById(id);
    }
}
