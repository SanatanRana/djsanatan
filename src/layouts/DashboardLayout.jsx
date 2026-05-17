import React from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col md:flex-row font-sans selection:bg-primary-container/30">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r border-white/5 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          <Link to="/" className="font-syne text-lg font-bold tracking-tighter text-primary">
            RANA DJ EVENTS
          </Link>

          <nav className="flex flex-col gap-1.5">
            <Link
              to={isAdmin ? '/admin/dashboard' : '/customer/dashboard'}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                location.pathname.includes('dashboard')
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Overview
            </Link>

            {!isAdmin && (
              <>
                <Link
                  to="/customer/bookings"
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === '/customer/bookings'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">event</span>
                  My Bookings
                </Link>
                <Link
                  to="/customer/transactions"
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === '/customer/transactions'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">payments</span>
                  Transactions
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin/packages"
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === '/admin/packages'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">inventory_2</span>
                  Manage Packages
                </Link>
                <Link
                  to="/admin/media"
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === '/admin/media'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">perm_media</span>
                  Manage Media
                </Link>
                <Link
                  to="/admin/bookings"
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === '/admin/bookings'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">calendar_month</span>
                  Global Bookings
                </Link>
                <Link
                  to="/admin/transactions"
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === '/admin/transactions'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">payments</span>
                  Transactions
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* User profile & logout */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface truncate max-w-[130px]">{user?.fullName || 'Active User'}</p>
              <p className="text-[10px] text-on-surface-variant truncate max-w-[130px] uppercase tracking-widest">{user?.role || 'User'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg text-sm font-bold text-error hover:bg-error/10 transition-all text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-grow p-6 md:p-10 bg-background overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
