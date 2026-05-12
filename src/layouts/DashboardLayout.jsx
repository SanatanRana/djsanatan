import React from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Disc, Calendar, Package, LogOut, LayoutDashboard, User } from 'lucide-react'

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-brand-bg text-neutral-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-bg-card border-r border-neutral-800 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-primary to-amber-500 p-2.5 rounded-xl shadow-lg shadow-brand-primary/15">
              <Disc className="w-6 h-6 text-white animate-[spin_8s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent font-poppins">
                Rana DJ Dashboard
              </h1>
              <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold font-sans">
                {isAdmin ? 'Admin Console' : 'Customer Hub'}
              </p>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-1.5">
            <Link
              to={isAdmin ? '/admin/dashboard' : '/customer/dashboard'}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                location.pathname === '/admin/dashboard' || location.pathname === '/customer/dashboard'
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/15'
                  : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              Overview
            </Link>

            {!isAdmin && (
              <Link
                to="/customer/bookings"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  location.pathname === '/customer/bookings'
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/15'
                    : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200'
                }`}
              >
                <Calendar className="w-4.5 h-4.5" />
                My Bookings
              </Link>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin/packages"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    location.pathname === '/admin/packages'
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/15'
                      : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200'
                  }`}
                >
                  <Package className="w-4.5 h-4.5" />
                  Manage Packages
                </Link>
                <Link
                  to="/admin/bookings"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    location.pathname === '/admin/bookings'
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/15'
                      : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200'
                  }`}
                >
                  <Calendar className="w-4.5 h-4.5" />
                  Global Bookings
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* User profile & logout */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-neutral-800 p-2 rounded-full border border-neutral-700">
              <User className="w-4.5 h-4.5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white truncate max-w-[130px]">{user?.fullName || 'Active User'}</p>
              <p className="text-[9px] text-neutral-500 truncate max-w-[130px]">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 text-left"
          >
            <LogOut className="w-4.5 h-4.5" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-grow p-6 md:p-10 bg-brand-bg overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
