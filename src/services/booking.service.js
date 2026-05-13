import api from './api'

const bookingService = {
  // Public/Customer - Create a new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData)
    return response.data.data
  },

  // Customer/Admin - Get all bookings (Backend checks role via token)
  getAllBookings: async () => {
    const response = await api.get('/bookings')
    return response.data.data
  },

  // Customer/Admin - Get single booking details
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`)
    return response.data.data
  },

  // Admin - Update booking (e.g., Status to CONFIRMED or COMPLETED)
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData)
    return response.data.data
  },

  // Admin - Delete booking
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`)
    return response.data.data || response.data
  },

  // Customer/Admin - Cancel booking request
  cancelBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/cancel`)
    return response.data.data || response.data
  }
}

export default bookingService
