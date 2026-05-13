import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
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
        </div>

        <button className="md:hidden material-symbols-outlined text-on-surface-variant" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'close' : 'menu'}
        </button>
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
            <h6 className="font-bold text-on-surface text-sm">Guest User</h6>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">Nightlife Elite</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { name: 'Discover Events', path: '/', icon: 'explore' },
            { name: 'Experience Packages', path: '/packages', icon: 'auto_awesome' },
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
        </nav>
      </aside>

      {/* Backdrop overlay */}
      {isOpen && <div className="fixed inset-0 z-[55] bg-black/50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}
