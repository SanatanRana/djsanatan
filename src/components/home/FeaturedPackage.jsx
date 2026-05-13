import React from 'react'
import { CheckCircle, Clock, DollarSign, Calendar } from 'lucide-react'

export default function FeaturedPackage() {
  const includes = [
    '10000W Premium Concert Line-Array Sound',
    '6x Automated High-Pressure CO2 Blast Jets',
    'Pro Vocal Shure Mics with Intelligent Mixing',
    'Custom Sync Multi-LED Panel Matrix',
    'Fully Dynamic Beat and Pyro Synced Show'
  ]

  return (
    <section className="max-w-7xl w-full mx-auto px-6 pb-12">
      <div className="bg-gradient-to-b from-brand-bg-elevated/60 to-brand-bg-card/60 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/8 rounded-full blur-3xl -z-10 animate-glow-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl -z-10 animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Package Description */}
          <div className="flex flex-col gap-6">
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-brand-primary/20 w-fit">
              Ultimate Hot Seller
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white font-poppins">
              Rana Elite DJ Concert Package
            </h3>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              Our flagship show-stopping layout complete with live visuals, pro mic systems, customizable smoke streams, and dedicated performance hours.
            </p>

            <div className="flex flex-col gap-3.5 bg-brand-bg-card border border-neutral-800 p-5 rounded-2xl">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Clock className="w-4.5 h-4.5 text-brand-primary" />
                <span>Duration: <strong>7.0 Event Hours</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <DollarSign className="w-4.5 h-4.5 text-brand-primary-light" />
                <span>Price Tier: <strong>30,000.00 INR</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Calendar className="w-4.5 h-4.5 text-brand-accent" />
                <span>Booking Code: <strong>ELITE_PREMIUM_DJ</strong></span>
              </div>
            </div>
          </div>

          {/* Included Features */}
          <div className="bg-brand-bg-card border border-neutral-800 p-8 rounded-2xl flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase font-poppins">Included Features</h4>
            <ul className="flex flex-col gap-3.5">
              {includes.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                  <CheckCircle className="w-5 h-5 text-brand-success flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
