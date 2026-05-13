import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between font-sans relative overflow-hidden selection:bg-primary-container/30">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Mini header */}
      <header className="px-6 py-6 border-b border-white/5 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-syne text-xl font-bold tracking-tighter text-primary hover:opacity-90 transition-all">
            RANA DJ EVENTS
          </Link>
          <Link to="/" className="text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors duration-300 uppercase tracking-wider">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Form Area */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <Outlet />
      </main>

      {/* Mini footer */}
      <footer className="py-6 px-6 text-center text-on-surface-variant/50 text-[11px] border-t border-white/5 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Rana DJ Events. Authenticated Secure Connection.</p>
      </footer>
    </div>
  )
}
