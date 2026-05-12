import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-neutral-50 flex flex-col font-sans">
      {/* Header */}
      <Navbar />

      {/* Embedded Route View */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
