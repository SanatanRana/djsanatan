import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-16 bg-surface-container-lowest border-t border-white/5">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div>
          <h3 className="font-syne text-2xl font-bold text-on-surface mb-4">RANA DJ EVENTS</h3>
          <p className="text-on-surface-variant max-w-sm text-base leading-relaxed">
            Curating the world's most exclusive soundscapes. Premium DJ talent for luxury events and high-production nightlife.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <h6 className="font-bold text-primary tracking-widest text-[10px] uppercase">Navigation</h6>
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Home</Link>
            <Link to="/packages" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Packages</Link>
            <Link to="/gallery" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Gallery</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-bold text-primary tracking-widest text-[10px] uppercase">Connect</h6>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Contact Us</Link>
            <Link to="/login" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Sign In</Link>
            <Link to="/register" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Create Account</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant text-xs font-semibold">© {new Date().getFullYear()} RANA DJ EVENTS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">public</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">share</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">music_note</span>
        </div>
      </div>
    </footer>
  )
}
