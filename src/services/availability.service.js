import api from './api'

const availabilityService = {
  // Public - Check if a time slot is available
  checkAvailability: async (date, startTime, endTime, adminId) => {
    const response = await api.get(`/availability`, {
      params: { date, startTime, endTime, adminId }
    })
    return response.data.data || response.data
  },

  lockSlot: async (adminId, eventDate, startTime, endTime) => {
    const response = await api.post(`/slots/lock`, { adminId, eventDate, startTime, endTime })
    return response.data
  },

  unlockSlot: async (adminId, eventDate) => {
    const response = await api.post(`/slots/unlock`, { adminId, eventDate })
    return response.data
  }
}

export default availabilityService
