import React from 'react'
import { Check, X, CalendarCheck } from 'lucide-react'

export default function ManageBookings() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">Global Bookings Console</h2>
        <p className="text-slate-400 text-sm mt-1">Review active, pending, or completed customer event requests worldwide.</p>
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
        <div className="bg-brand-primary/10 p-4 rounded-full text-brand-primary">
          <CalendarCheck className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-poppins">No Registered Bookings</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            Client bookings are fetched in real-time from the backend. They will show up here for validation, approvals, and balance verification.
          </p>
        </div>
      </div>
    </div>
  )
}
