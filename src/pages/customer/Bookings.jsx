import React from 'react'
import { Plus, CalendarRange } from 'lucide-react'

export default function Bookings() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">My Bookings</h2>
          <p className="text-slate-400 text-sm mt-1">Review your event schedule, pending balances, and payment confirmations.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md">
          <Plus className="w-4 h-4" />
          New Event Booking
        </button>
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
        <div className="bg-brand-primary/10 p-4 rounded-full text-brand-primary">
          <CalendarRange className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-poppins">No Bookings Found</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            You don't have any event bookings scheduled yet. Click the button above to secure your first package!
          </p>
        </div>
      </div>
    </div>
  )
}
