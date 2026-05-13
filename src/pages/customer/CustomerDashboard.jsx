import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import bookingService from '../../services/booking.service'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    total: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await bookingService.getAllBookings()
        const allBookings = data.content ? data.content : data
        
        // Ensure array
        if (Array.isArray(allBookings)) {
          const activeBookings = allBookings.filter(b => ['PENDING', 'CONFIRMED'].includes(b.bookingStatus))
          const completedBookings = allBookings.filter(b => b.bookingStatus === 'COMPLETED')
          
          setStats({
            active: activeBookings.length,
            completed: completedBookings.length,
            total: allBookings.length
          })

          // Get latest 3
          setRecentBookings(allBookings.slice(0, 3))
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">
          Hello, {user?.fullName || 'Valued Client'} 👋
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Welcome back to your event workspace. Plan sound rigs and secure bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: 'event', value: `${stats.active} Active`, label: 'Active Bookings', color: 'text-primary' },
          { icon: 'trending_up', value: `${stats.completed} Total`, label: 'Completed Shows', color: 'text-secondary' },
          { icon: 'receipt_long', value: `${stats.total} Total`, label: 'All Bookings', color: 'text-primary' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card hover-lift p-6 rounded-xl flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold text-on-surface mt-0.5 font-syne">
                {isLoading ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-syne text-xl font-bold text-on-surface">Recent Bookings</h3>
            <Link to="/customer/bookings" className="text-primary text-xs font-bold hover:underline">View All</Link>
          </div>
          {isLoading ? (
             <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
          ) : recentBookings.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recentBookings.map(b => (
                <div key={b.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-white/10 transition" onClick={() => navigate('/customer/bookings')}>
                  <div>
                    <p className="font-bold text-on-surface text-sm">{b.eventType}</p>
                    <p className="text-xs text-on-surface-variant">{b.eventDate} | {b.bookingStatus}</p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] rounded uppercase font-bold tracking-widest ${b.paymentStatus === 'PAID' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                    {b.paymentStatus}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-on-surface-variant text-sm">No recent bookings found.</div>
          )}
        </div>

        <div className="glass-card p-8 rounded-xl flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-btn-gradient flex items-center justify-center neon-glow-primary mb-2">
            <span className="material-symbols-outlined text-white text-3xl">add_circle</span>
          </div>
          <h3 className="font-syne text-xl font-bold text-on-surface">Book Next Event</h3>
          <p className="text-on-surface-variant text-xs mb-4">Choose from our premium pre-configured concert lines.</p>
          <Link to="/packages" className="w-full bg-white/10 border border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all">
            Browse Packages
          </Link>
        </div>
      </div>
    </div>
  )
}
