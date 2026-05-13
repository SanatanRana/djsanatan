import api from './api'

const paymentService = {
  // Customer - Create Razorpay order
  createOrder: async (bookingId, amount) => {
    const response = await api.post('/payments/create-order', {
      bookingId,
      amount
    })
    return response.data.data
  },

  // Customer - Verify successful payment from frontend SDK
  verifyPayment: async (paymentVerificationData) => {
    /* 
      paymentVerificationData should contain:
      - razorpayOrderId
      - razorpayPaymentId
      - razorpaySignature
      - paymentMethod (e.g., 'UPI', 'CARD')
    */
    const response = await api.post('/payments/verify', paymentVerificationData)
    return response.data.data || response.data
  },

  // Customer/Admin - View transaction history
  getPaymentHistory: async () => {
    const response = await api.get('/payments/history')
    return response.data.data
  }
}

export default paymentService
