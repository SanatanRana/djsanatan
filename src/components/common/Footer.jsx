import React from 'react'
import { Link } from 'react-router-dom'
import { Disc, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-bg-card border-t border-white/5 py-16 px-6 relative overflow-hidden">
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl -z-10 animate-glow-pulse"></div>
      <div className="absolute top-0 left-1/3 w-60 h-60 bg-brand-accent/3 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-primary to-amber-500 p-2 rounded-lg">
              <Disc className="w-5 h-5 text-white animate-[spin_8s_linear_infinite]" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent font-poppins">
              Rana DJ Events
            </h2>
          </Link>
          <p className="text-neutral-500 text-xs leading-relaxed">
            Delivering elite, concert-grade sound engineering, customized pixel light mapping, and unforgettable musical vibes for grand events across India.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="p-2 bg-white/5 hover:bg-brand-primary/20 text-neutral-500 hover:text-brand-primary rounded-lg border border-white/5 transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.01 3.71.054 2.39.11 3.4 1.124 3.514 3.513.045.925.055 1.28.055 3.71s-.01 2.784-.055 3.71a12.526 12.526 0 0 1-3.513 3.513c-.925.045-1.28.055-3.71.055s-2.784-.01-3.71-.055a11.5 11.5 0 0 1-3.514-3.513c-.045-.925-.055-1.28-.055-3.71s.01-2.784.055-3.71a11.51 11.51 0 0 1 3.514-3.513c.925-.045 1.28-.055 3.71-.055m0-2c-2.475 0-2.785.01-3.757.055a13.526 13.526 0 0 0-4.477 1.637C2.083 3.197.803 4.477.307 6.477.26 6.67.222 6.874.19 7.07c-.045.972-.055 1.282-.055 3.757s.01 2.785.055 3.757c.032.196.07.4.117.593.496 2 1.776 3.28 3.776 3.776.193.047.397.085.593.117.972.045 1.282.055 3.757.055s2.785-.01 3.757-.055c.196-.032.4-.07.593-.117 2-.496 3.28-1.776 3.776-3.776.047-.193.085-.397.117-.593.045-.972.055-1.282.055-3.757s-.01-2.785-.055-3.757a13.14 13.14 0 0 0-1.637-4.477c-.503-2.003-1.783-3.283-3.783-3.783C15.1.022 14.796.015 12.315 0zM12 5.83a6.17 6.17 0 1 0 6.17 6.17A6.178 6.178 0 0 0 12 5.83zm0 10.16a3.99 3.99 0 1 1 3.99-3.99 4.002 4.002 0 0 1-3.99 3.99zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-brand-primary/20 text-neutral-500 hover:text-brand-primary rounded-lg border border-white/5 transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-brand-primary/20 text-neutral-500 hover:text-brand-primary rounded-lg border border-white/5 transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider font-poppins">Quick Navigation</h3>
          <ul className="flex flex-col gap-2.5 text-xs text-neutral-500">
            <li><Link to="/" className="hover:text-brand-primary transition-all duration-300">Home Portal</Link></li>
            <li><Link to="/packages" className="hover:text-brand-primary transition-all duration-300">Sound Packages</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-primary transition-all duration-300">Events Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-brand-primary transition-all duration-300">Contact Support</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider font-poppins">Contact Office</h3>
          <ul className="flex flex-col gap-3 text-xs text-neutral-500">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-primary" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-primary-light" />
              <span>support@ranadjevents.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Cuttack, Odisha, India</span>
            </li>
          </ul>
        </div>

        {/* Bookings */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider font-poppins">Event Bookings</h3>
          <p className="text-neutral-500 text-xs leading-relaxed">
            Ready to secure elite concert line-arrays for your venue? Sign in to manage your bookings and calculate advance payments securely.
          </p>
          <Link to="/register" className="text-brand-primary hover:text-brand-primary-light text-xs font-semibold inline-flex items-center gap-1.5 transition-all duration-300">
            Create Free Account →
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 text-center text-neutral-600 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Rana DJ Events. All rights reserved.</p>
        <p className="text-neutral-700">Crafted with React, Tailwind CSS v4 & shadcn/ui.</p>
      </div>
    </footer>
  )
}
