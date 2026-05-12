import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Disc } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-neutral-100 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Decorative Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/8 rounded-full blur-3xl -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -z-10 animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Mini header */}
      <header className="px-6 py-6 border-b border-white/5 bg-brand-bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all">
            <div className="bg-gradient-to-br from-brand-primary to-amber-500 p-2 rounded-lg shadow-lg shadow-brand-primary/15">
              <Disc className="w-5 h-5 text-white animate-[spin_8s_linear_infinite]" />
            </div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-accent bg-clip-text text-transparent font-poppins">
              Rana DJ Events
            </h1>
          </Link>
          <Link to="/" className="text-xs font-semibold text-neutral-500 hover:text-neutral-200 transition-colors duration-300">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Form Area */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <Outlet />
      </main>

      {/* Mini footer */}
      <footer className="py-6 px-6 text-center text-neutral-700 text-[11px] border-t border-white/5">
        <p>© {new Date().getFullYear()} Rana DJ Events. Authenticated Secure Connection.</p>
      </footer>
    </div>
  )
}
