import api from './api'

const packageService = {
  // Public - Get all active packages
  getAllPackages: async () => {
    const response = await api.get('/packages')
    return response.data.data
  },

  // Admin - Get single package
  getPackageById: async (id) => {
    const response = await api.get(`/packages/${id}`)
    return response.data.data
  },

  // Admin - Create a new package
  createPackage: async (packageData) => {
    const response = await api.post('/packages', packageData)
    return response.data.data
  },

  // Admin - Update an existing package
  updatePackage: async (id, packageData) => {
    const response = await api.put(`/packages/${id}`, packageData)
    return response.data.data
  },

  // Admin - Delete a package
  deletePackage: async (id) => {
    const response = await api.delete(`/packages/${id}`)
    return response.data.data || response.data
  }
}

export default packageService
