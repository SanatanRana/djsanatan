import api from './api'
import { ENDPOINTS } from '../constants/endpoints'

const authService = {
  /**
   * Authenticate user credentials against the backend login API.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} The standard Spring ApiResponse containing AuthResponse.
   */
  login: async (email, password) => {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password })
    return response.data
  },

  /**
   * Register a new user with the specified details.
   * @param {Object} registerData
   * @param {string} registerData.fullName
   * @param {string} registerData.email
   * @param {string} registerData.phone
   * @param {string} registerData.password
   * @param {string} registerData.role
   * @returns {Promise<Object>} The standard Spring ApiResponse containing UserResponse.
   */
  register: async ({ fullName, email, phone, password, role }) => {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, {
      fullName,
      email,
      phone,
      password,
      role,
    })
    return response.data
  },
}

export default authService
