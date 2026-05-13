import React, { useState } from 'react'

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="animate-slide-up px-6 md:px-16 max-w-[1280px] mx-auto pb-24">
      {/* Header */}
      <div className="mb-16 mt-10">
        <h2 className="font-syne text-3xl md:text-[72px] font-extrabold text-primary mb-4 tracking-[-0.02em] leading-tight">LET'S CONNECT</h2>
        <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
          Elevate your next event with world-class entertainment. Reach out for bookings, inquiries, or exclusive VIP access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-7 glass-card p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full"></div>
          <h3 className="font-syne text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">send</span> Send a Request
          </h3>

          {formSubmitted ? (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-primary/30">
              <span className="material-symbols-outlined text-6xl text-primary mb-4">check_circle</span>
              <h4 className="font-syne text-2xl font-bold mb-2">Transmission Received</h4>
              <p className="text-on-surface-variant">Our agents will contact you shortly.</p>
              <button onClick={() => setFormSubmitted(false)} className="mt-8 text-primary underline text-sm font-semibold">Send another request</button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">Name</label>
                  <input required className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-on-surface-variant/50" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">Email</label>
                  <input required className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-on-surface-variant/50" placeholder="john@example.com" type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">Event Date</label>
                <input required className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" type="date" />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">Message</label>
                <textarea required className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-on-surface-variant/50" placeholder="Tell us about your event vision..." rows="4"></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-primary text-on-primary-container font-bold rounded-lg hover:shadow-[0_0_20px_rgba(221,183,255,0.6)] active:scale-[0.98] transition-all text-sm uppercase tracking-wider">
                Transmit Request
              </button>
            </form>
          )}
        </div>

        {/* Contact Channels + Map */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="glass-card p-8 rounded-xl">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-secondary mb-6">Contact Channels</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border-secondary/30 group-hover:border-secondary transition-colors">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant">Email Us</p>
                  <p className="text-white font-bold text-sm">bookings@ranadj.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border-primary/30 group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant">Hotline</p>
                  <p className="text-white font-bold text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden flex-grow group">
            <div className="p-6">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-primary">Headquarters</h3>
              <p className="text-on-surface-variant text-sm">Cuttack, Odisha, India</p>
            </div>
            <div className="h-48 w-full relative grayscale contrast-125 opacity-70 group-hover:opacity-100 transition-opacity">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApUles7Xvi5OU0Cg01FtQlvlxek6eQpt0zvHbXTVTfc5Vq0p7zS7Gdh_eChgfuBTU9XwhlVLzMfD8Ax7Ig7jPuSyJj_ZYQln4F4ijr0BjE2WmhA2zCULF4bv-SBt-BKByuDGI6QbacUMNcrgDb_d-YbHgFlkE8A6zi6vpl7fPCx-Ph6f1H3lpy6YqOumyCJVQp0h3ynqKVvT8UiL1J3Z0iWoDM27JzamfhlNh0IPRZADhCakMjv07Z5CLSyeAYm05Pw_YBzg9xuw" alt="Office location map" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
