import React from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center gap-8 animate-fade-in">
        <div>
          <span className="text-xs bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-3 py-1 rounded-full uppercase tracking-widest font-bold">Contact</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-poppins">Get In Touch With Us</h2>
          <p className="text-neutral-400 mt-4 text-sm md:text-base leading-relaxed">
            Planning a grand wedding or music festival? Reach out directly and let our expert sound engineers customize the perfect system layout for your venue.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="bg-brand-bg-elevated p-3 rounded-xl border border-neutral-800 text-brand-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-600 font-semibold uppercase">Email Support</p>
              <p className="text-sm font-semibold text-white">support@ranadjevents.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-brand-bg-elevated p-3 rounded-xl border border-neutral-800 text-brand-primary-light">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-600 font-semibold uppercase">Hotline Number</p>
              <p className="text-sm font-semibold text-white">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-brand-bg-elevated p-3 rounded-xl border border-neutral-800 text-brand-accent">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-600 font-semibold uppercase">Office Headquarters</p>
              <p className="text-sm font-semibold text-white">Cuttack, Odisha, India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-bg-card border border-neutral-800 p-8 rounded-3xl animate-slide-up">
        <h3 className="text-xl font-bold text-white font-poppins">Send a Message</h3>
        <p className="text-xs text-neutral-500 mt-1">We typically reply within 2 hours during event seasons</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-neutral-500">Your Name</label>
            <input type="text" placeholder="Your Name" className="bg-brand-bg border border-neutral-800 text-sm p-3.5 rounded-xl text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all duration-300" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-neutral-500">Email Address</label>
            <input type="email" placeholder="you@example.com" className="bg-brand-bg border border-neutral-800 text-sm p-3.5 rounded-xl text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all duration-300" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-neutral-500">Your Inquiry Description</label>
            <textarea rows="4" placeholder="Describe your event details..." className="bg-brand-bg border border-neutral-800 text-sm p-3.5 rounded-xl text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all duration-300" required></textarea>
          </div>

          <button className="bg-gradient-to-r from-brand-primary to-amber-500 hover:from-brand-primary-deep hover:to-amber-600 text-white font-semibold text-xs py-4 rounded-xl mt-2 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/25">
            Submit Message
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
