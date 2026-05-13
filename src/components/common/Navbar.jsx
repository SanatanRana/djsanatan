import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disc, Menu, X, Calendar, LogIn } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Packages', path: '/packages' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-brand-primary to-amber-500 p-2.5 rounded-xl shadow-lg shadow-brand-primary/20 group-hover:shadow-brand-primary/40 transition-shadow duration-300">
              <Disc className="w-6 h-6 text-white animate-[spin_8s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-accent bg-clip-text text-transparent font-poppins">
                Rana DJ Events
              </h1>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold font-sans">
                Ultimate Premium Beats
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-white/5 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white bg-gradient-to-r from-brand-primary to-amber-500 shadow-md shadow-brand-primary/15'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                isActive('/login') ? 'text-white bg-white/5' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LogIn className="w-4 h-4 text-brand-primary" />
              Sign In
            </Link>
            <Link
              to="/customer/bookings"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-primary to-amber-500 hover:from-brand-primary-deep hover:to-amber-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-brand-primary/30"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-white/5 transition-all focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6 text-brand-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full transition-all duration-300 ease-in-out border-b border-white/5 bg-black/95 backdrop-blur-xl shadow-2xl ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-brand-primary to-amber-500 text-white'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-white/5 transition-all duration-200"
            >
              <LogIn className="w-4 h-4 text-brand-primary" />
              Sign In
            </Link>
            <Link
              to="/customer/bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-amber-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all duration-200"
            >
              <Calendar className="w-4.5 h-4.5" />
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
