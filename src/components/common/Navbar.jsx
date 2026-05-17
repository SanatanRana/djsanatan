import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'Our DJ', path: '/dj' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 neon-glow-primary">
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-primary cursor-pointer md:hidden" onClick={() => setIsOpen(true)}>menu</button>
          <Link to="/" className="font-syne text-xl md:text-2xl font-bold tracking-tighter text-primary">RANA DJ EVENTS</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-sans text-xs uppercase tracking-[0.05em] font-semibold transition-all hover:text-secondary ${
                location.pathname === link.path ? 'text-secondary font-bold' : 'text-on-surface-variant'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to={isAdmin ? '/admin/dashboard' : '/customer/dashboard'}
                className="font-sans text-xs uppercase tracking-wider font-semibold transition-all hover:text-primary text-on-surface-variant"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="border border-white/20 hover:border-error/50 hover:text-error px-6 py-2.5 rounded-full font-sans text-xs text-on-surface-variant active:scale-95 duration-150 font-bold uppercase tracking-wider cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-sans text-xs uppercase tracking-wider font-semibold transition-all hover:text-primary ${
                  location.pathname === '/login' ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Sign In
              </Link>
              <button
                onClick={() => navigate('/book')}
                className="bg-btn-gradient px-6 py-2.5 rounded-full font-sans text-xs text-white active:scale-95 duration-150 shadow-lg font-bold uppercase tracking-wider"
              >
                Book Now
              </button>
            </>
          )}
        </div>

      </header>

      {/* Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-[60] flex flex-col p-6 h-full w-80 rounded-r-xl bg-surface/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-12">
          <span className="font-syne text-2xl font-bold text-primary">RANA DJ</span>
          <button className="material-symbols-outlined text-on-surface" onClick={() => setIsOpen(false)}>close</button>
        </div>

        <div className="flex items-center gap-4 mb-12 p-4 glass-card rounded-xl">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
          <div>
            <h6 className="font-bold text-on-surface text-sm">{isAuthenticated ? user?.fullName : 'Guest User'}</h6>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">{isAuthenticated ? user?.role : 'Nightlife Elite'}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { name: 'Discover Events', path: '/', icon: 'explore' },
            { name: 'Experience Packages', path: '/packages', icon: 'auto_awesome' },
            { name: 'Our DJ', path: '/dj', icon: 'headphones' },
            { name: 'Visual Gallery', path: '/gallery', icon: 'photo_library' },
            { name: 'VIP Contact', path: '/contact', icon: 'stars' },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setIsOpen(false); }}
              className={`flex items-center gap-4 p-4 rounded-lg font-bold text-sm transition-all ${
                location.pathname === item.path ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span> {item.name}
            </button>
          ))}

          <div className="border-t border-white/5 my-4"></div>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => { navigate(isAdmin ? '/admin/dashboard' : '/customer/dashboard'); setIsOpen(false); }}
                className="flex items-center gap-4 p-4 rounded-lg font-bold text-sm text-secondary hover:bg-white/5 transition-all text-left"
              >
                <span className="material-symbols-outlined">dashboard</span> Dashboard
              </button>
              <button
                onClick={() => { logout(); navigate('/'); setIsOpen(false); }}
                className="flex items-center gap-4 p-4 rounded-lg font-bold text-sm text-error hover:bg-error/10 transition-all text-left"
              >
                <span className="material-symbols-outlined">logout</span> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate('/login'); setIsOpen(false); }}
              className="flex items-center gap-4 p-4 rounded-lg font-bold text-sm text-primary hover:bg-white/5 transition-all text-left"
            >
              <span className="material-symbols-outlined">login</span> Sign In
            </button>
          )}
        </nav>
      </aside>

      {/* Backdrop overlay */}
      {isOpen && <div className="fixed inset-0 z-[55] bg-black/50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}
