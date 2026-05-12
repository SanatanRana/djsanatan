export const API_BASE_URL = 'http://localhost:8080/api'

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  PACKAGES: {
    BASE: '/packages',
    BY_ID: (id) => `/packages/${id}`,
  },
  BOOKINGS: {
    BASE: '/bookings',
    BY_ID: (id) => `/bookings/${id}`,
    HISTORY: '/bookings/history',
  },
  AVAILABILITY: {
    CHECK: '/availability',
  },
  PAYMENTS: {
    CREATE_ORDER: '/payments/create-order',
    VERIFY: '/payments/verify',
    HISTORY: '/payments/history',
  },
}
