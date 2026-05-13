import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'

// Public Pages
import Home from '../pages/public/Home'
import Packages from '../pages/public/Packages'
import Gallery from '../pages/public/Gallery'
import Contact from '../pages/public/Contact'
import BookEvent from '../pages/public/BookEvent'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Customer Dashboard Pages
import CustomerDashboard from '../pages/customer/CustomerDashboard'
import Bookings from '../pages/customer/Bookings'
import Transactions from '../pages/customer/Transactions'

// Admin Dashboard Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManagePackages from '../pages/admin/ManagePackages'
import ManageBookings from '../pages/admin/ManageBookings'

// Private Route Guards
function RequireAuth({ children, requireAdmin = false }) {
  const { user, isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/customer" replace />
  }

  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Public Facing Guest Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookEvent />} />
      </Route>

      {/* 2. Authentication Flow Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 3. Secure Customer Dashboard Routes */}
      <Route 
        path="/customer" 
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>

      {/* 4. Secure Admin Console Routes */}
      <Route 
        path="/admin" 
        element={
          <RequireAuth requireAdmin={true}>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="packages" element={<ManagePackages />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>

      {/* 5. Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
