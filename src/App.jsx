import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Global Toast Notifications — Sonner */}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: '#111111',
              color: '#FAFAFA',
              border: '1px solid rgba(249, 115, 22, 0.15)',
              borderRadius: '12px',
              fontSize: '13px',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
          }}
        />

        {/* Routed Pages */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
