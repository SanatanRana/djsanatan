import React, { useState, useEffect } from 'react'
import bookingService from '../../services/booking.service'
import paymentService from '../../services/payment.service'
import { toast } from 'sonner'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Payment Simulation Modal States
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [checkoutStep, setCheckoutStep] = useState(0) // 0: Idle, 1: Creating Order, 2: Checkout Window, 3: Verifying, 4: Success
  const [createdOrder, setCreatedOrder] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('UPI')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getAllBookings()
      setBookings(data.content ? data.content : data)
    } catch (error) {
      toast.error('Failed to fetch bookings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking request?')) {
      try {
        const toastId = toast.loading('Processing cancellation...')
        await bookingService.cancelBooking(id)
        toast.dismiss(toastId)
        toast.success('Booking request cancelled successfully')
        fetchBookings()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel booking')
      }
    }
  }

  const startPaymentFlow = async (booking) => {
    setSelectedBooking(booking)
    setCheckoutStep(1) // Step 1: Initialize
    
    try {
      // Create Razorpay Order ID via backend
      const orderRes = await paymentService.createOrder(booking.id, booking.remainingAmount)
      setCreatedOrder(orderRes)
      setCheckoutStep(2) // Step 2: Show payment fields
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to initialize payment order')
      closeCheckout()
    }
  }

  const simulatePaymentSuccess = async () => {
    if (!createdOrder) return
    
    setCheckoutStep(3) // Step 3: Verifying Signature
    
    try {
      // Simulate Razorpay callback params
      const verificationData = {
        razorpayOrderId: createdOrder.razorpayOrderId,
        razorpayPaymentId: `pay_mock_${Date.now()}`,
        razorpaySignature: 'mock_signature_approved', // verified securely by com.ranadj.service.impl.PaymentServiceImpl
        paymentMethod: paymentMethod
      }

      await paymentService.verifyPayment(verificationData)
      setCheckoutStep(4) // Step 4: Success Confirmed
      fetchBookings() // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment verification failed')
      setCheckoutStep(2) // Fallback to payment screen
    }
  }

  const closeCheckout = () => {
    setSelectedBooking(null)
    setCreatedOrder(null)
    setCheckoutStep(0)
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in relative">
      <div>
        <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">My Bookings</h2>
        <p className="text-on-surface-variant text-sm mt-1">Manage your event requests and payments.</p>
      </div>

      <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
        {isLoading ? (
           <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
        ) : bookings.length > 0 ? (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-syne text-xl font-bold text-on-surface">{b.eventType}</h3>
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {b.eventDate}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {b.startTime} - {b.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">location_on</span> {b.eventLocation}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-[10px] rounded uppercase font-bold tracking-widest ${
                      b.bookingStatus === 'CONFIRMED' 
                        ? 'bg-success/20 text-success' 
                        : b.bookingStatus === 'CANCELLED'
                        ? 'bg-error/20 text-error'
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {b.bookingStatus}
                    </span>
                    <span className={`px-2 py-1 text-[10px] rounded uppercase font-bold tracking-widest ${
                      b.paymentStatus === 'PAID' 
                        ? 'bg-success/20 text-success' 
                        : b.paymentStatus === 'PARTIAL'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary/20 text-secondary'
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant">Total: ₹{b.totalAmount}</p>
                    <p className="text-sm font-bold text-primary">Due: ₹{b.remainingAmount}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Pay Advance Button */}
                    {b.bookingStatus === 'CONFIRMED' && b.remainingAmount > 0 && (
                      <button 
                        onClick={() => startPaymentFlow(b)}
                        className="bg-btn-gradient px-5 py-2 rounded-lg font-sans text-xs text-white font-bold uppercase tracking-wider hover:shadow-lg transition-all active:scale-95"
                      >
                        Pay Advance
                      </button>
                    )}

                    {/* Customer Cancellation Button */}
                    {b.bookingStatus === 'PENDING' && (
                      <button 
                        onClick={() => handleCancelBooking(b.id)}
                        className="border border-error/40 text-error/80 hover:bg-error hover:text-white px-5 py-2 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">event_note</span>
            <p className="text-on-surface-variant text-sm">You haven't made any bookings yet.</p>
          </div>
        )}
      </div>

      {/* RETAIL GRADE SIMULATED RAZORPAY CHECKOUT MODAL OVERLAY */}
      {checkoutStep > 0 && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-md p-8 rounded-2xl border border-white/10 flex flex-col gap-6 relative animate-scale-up shadow-2xl">
            
            {/* Close button for safety */}
            {checkoutStep !== 3 && (
              <button 
                onClick={closeCheckout} 
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}

            {/* Modal Step 1: Creating Order */}
            {checkoutStep === 1 && (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
                <h3 className="font-syne text-lg font-bold text-on-surface">Initializing Secure Transaction</h3>
                <p className="text-xs text-on-surface-variant max-w-[300px]">Generating unique Razorpay Order ID and sync ledger on Spring Boot backend...</p>
              </div>
            )}

            {/* Modal Step 2: Simulated Checkout Portal */}
            {checkoutStep === 2 && createdOrder && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-white/5 pb-4 text-center">
                  <div className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">RAZORPAY CHECKOUT TERMINAL</div>
                  <h3 className="font-syne text-xl font-bold text-on-surface">{selectedBooking.eventType}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Order Ref: {createdOrder.razorpayOrderId}</p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Remaining Balance</span>
                    <span className="font-bold text-on-surface">₹{selectedBooking.remainingAmount}</span>
                  </div>
                  <div className="flex justify-between text-primary font-bold border-t border-white/5 pt-2 mt-1">
                    <span>Payable Now</span>
                    <span>₹{createdOrder.amount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block ml-1">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'UPI', label: 'UPI / QR', icon: 'qr_code' },
                      { id: 'CARD', label: 'Card', icon: 'credit_card' },
                      { id: 'NETBANKING', label: 'Netbank', icon: 'account_balance' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all gap-1 ${
                          paymentMethod === method.id 
                            ? 'bg-primary/20 border-primary text-primary font-bold' 
                            : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{method.icon}</span>
                        <span className="text-[10px]">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={simulatePaymentSuccess}
                  className="w-full bg-btn-gradient hover:shadow-lg text-white font-sans font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span> Simulate Successful Checkout
                </button>
              </div>
            )}

            {/* Modal Step 3: Server Signature Verification */}
            {checkoutStep === 3 && (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                <span className="material-symbols-outlined animate-spin text-secondary text-4xl">vpn_key</span>
                <h3 className="font-syne text-lg font-bold text-on-surface">Cryptographic Verification</h3>
                <p className="text-xs text-on-surface-variant max-w-[300px]">Securing transaction callback, calculating SHA-256 HMAC signature, and confirming payment clearance...</p>
              </div>
            )}

            {/* Modal Step 4: Success Confirmed */}
            {checkoutStep === 4 && (
              <div className="flex flex-col items-center justify-center text-center py-6 gap-5 animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success neon-glow-success mb-2">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <div>
                  <h3 className="font-syne text-2xl font-black text-success tracking-tight">Payment Confirmed!</h3>
                  <p className="text-xs text-on-surface-variant max-w-[280px] mt-1.5">Your booking advance was registered successfully. Status updated to Partial or Paid.</p>
                </div>

                <div className="w-full border-t border-b border-white/5 py-4 flex flex-col gap-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Transaction ID</span>
                    <span className="font-mono text-on-surface font-bold">pay_mock_{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Method Used</span>
                    <span className="font-bold text-on-surface uppercase">{paymentMethod}</span>
                  </div>
                </div>

                <button
                  onClick={closeCheckout}
                  className="w-full bg-white/10 hover:bg-white/15 text-on-surface py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
