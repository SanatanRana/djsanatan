import React from 'react'
import { Disc, Users, Package, Flame } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">Admin Console Panel</h2>
        <p className="text-neutral-500 text-sm mt-1">Direct globally active sound packages, calendar slots, and transaction reports.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">Total Packages</p>
            <p className="text-lg font-bold text-white mt-0.5">3 Active</p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-primary-light/10 p-3 rounded-xl text-brand-primary-light">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">Total Clients</p>
            <p className="text-lg font-bold text-white mt-0.5">12 Users</p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-accent/10 p-3 rounded-xl text-brand-accent">
            <Disc className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">Confirmed Bookings</p>
            <p className="text-lg font-bold text-white mt-0.5">4 Confirmed</p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-brand-success/10 p-3 rounded-xl text-brand-success">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">Total Revenue</p>
            <p className="text-lg font-bold text-white mt-0.5">1,20,000 INR</p>
          </div>
        </div>
      </div>
    </div>
  )
}
