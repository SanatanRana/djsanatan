import api from './api'

const djOwnerService = {
  // Public - Get all DJ Owners (admins)
  getAllDjOwners: async () => {
    const response = await api.get('/dj-owners')
    return response.data.data
  },
}

export default djOwnerService
