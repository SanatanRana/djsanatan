import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import bookingService from '../../services/booking.service'
import packageService from '../../services/package.service'
import paymentService from '../../services/payment.service'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState({
    packages: 0,
    bookings: 0,
    confirmed: 0,
    revenue: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsRes, packagesRes, paymentsRes] = await Promise.all([
          bookingService.getAllBookings(),
          packageService.getAllPackages(),
          paymentService.getPaymentHistory()
        ])
        
        const allBookings = bookingsRes.content ? bookingsRes.content : bookingsRes
        const allPackages = packagesRes.content ? packagesRes.content : packagesRes
        const allPayments = Array.isArray(paymentsRes) ? paymentsRes : []

        if (Array.isArray(allBookings)) {
          const confirmedBookings = allBookings.filter(b => b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'COMPLETED')
          // Revenue = sum of actual verified SUCCESS payments (single source of truth)
          const totalRevenue = allPayments
            .filter(p => p.paymentStatus === 'SUCCESS')
            .reduce((sum, p) => sum + (p.amount || 0), 0)
          
          setStats({
            packages: Array.isArray(allPackages) ? allPackages.length : 0,
            bookings: allBookings.length,
            confirmed: confirmedBookings.length,
            revenue: totalRevenue
          })

          setRecentBookings(allBookings.slice(0, 5))
        }
      } catch (err) {
        console.error('Failed to load admin dashboard data', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">Admin Console Panel</h2>
        <p className="text-on-surface-variant text-sm mt-1">Manage packages, bookings, and transaction reports.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: 'inventory_2', value: `${stats.packages} Total`, label: 'Total Packages', color: 'text-primary', link: '/admin/packages' },
          { icon: 'event_available', value: `${stats.confirmed} Active`, label: 'Confirmed Bookings', color: 'text-secondary', link: '/admin/bookings' },
          { icon: 'receipt_long', value: `${stats.bookings} Total`, label: 'Total Requests', color: 'text-primary', link: '/admin/bookings' },
          { icon: 'payments', value: `₹${stats.revenue.toLocaleString('en-IN')}`, label: 'Total Revenue', color: 'text-success', link: '/admin/bookings' },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(stat.link)}
            className="glass-card hover-lift p-6 rounded-xl flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold text-on-surface mt-0.5 font-syne">
                {isLoading ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
        <h3 className="font-syne text-xl font-bold text-on-surface">Recent Booking Requests</h3>
        {isLoading ? (
           <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
        ) : recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface-variant">
              <thead className="text-xs uppercase bg-white/5 text-on-surface">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Event Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr 
                    key={b.id} 
                    onClick={() => navigate('/admin/bookings')}
                    className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
                  >
                    <td className="px-4 py-3 font-bold text-on-surface">{b.eventType}</td>
                    <td className="px-4 py-3">{b.eventDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[10px] rounded uppercase font-bold tracking-widest ${b.bookingStatus === 'CONFIRMED' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">₹{b.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8 text-on-surface-variant text-sm">No bookings found.</div>
        )}
      </div>
    </div>
  )
}
