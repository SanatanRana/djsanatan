import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Calendar, Disc, TrendingUp, Compass } from 'lucide-react'

export default function CustomerDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">
          Hello, {user?.fullName || 'Valued Client'} 👋
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Welcome back to your event workspace. Here you can plan sound rigs and secure booking payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-primary/10 p-3.5 rounded-xl text-brand-primary">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-wide">Active Bookings</p>
            <p className="text-lg font-bold text-white mt-0.5">0 Active</p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-primary-light/10 p-3.5 rounded-xl text-brand-primary-light">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-wide">Completed Shows</p>
            <p className="text-lg font-bold text-white mt-0.5">0 Total</p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-accent/10 p-3.5 rounded-xl text-brand-accent">
            <Disc className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-wide">Refund Sheets</p>
            <p className="text-lg font-bold text-white mt-0.5">0 Invoices</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-bg-card border border-neutral-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white font-poppins">Ready to Book Your Next Event Sound?</h3>
          <p className="text-neutral-500 text-xs">Choose from our premium pre-configured concert lines or customize dynamic configurations.</p>
        </div>
        <Link to="/customer/bookings" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-amber-500 text-white font-semibold text-xs px-6 py-3.5 rounded-xl shadow-md shadow-brand-primary/15 hover:shadow-brand-primary/25 transition-all duration-300">
          <Compass className="w-4.5 h-4.5" />
          Create New Booking
        </Link>
      </div>
    </div>
  )
}
