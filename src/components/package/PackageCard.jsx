import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock } from 'lucide-react'

export default function PackageCard({ pkg }) {
  const { name, price, duration, code, features, isPopular, icon: Icon } = pkg

  return (
    <div
      className={`glass-card hover-lift rounded-3xl p-8 border relative flex flex-col justify-between h-full transition-all duration-300 ${
        isPopular
          ? 'border-brand-primary/40 shadow-2xl shadow-brand-primary/10 z-10 md:scale-[1.03]'
          : 'border-white/5 shadow-lg'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-amber-500 text-white text-[10px] uppercase font-extrabold tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-brand-primary/30">
          Most Popular Choice
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white font-poppins tracking-tight">{name}</h3>
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">CODE: {code}</span>
          </div>
          <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-6 border-b border-white/5 pb-6">
          <span className="text-3xl md:text-4xl font-extrabold text-white font-poppins">₹{price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-neutral-500 font-medium">/ event</span>
        </div>

        {/* Duration Badge */}
        <div className="flex items-center gap-2 mb-8 bg-brand-bg-card p-2.5 rounded-xl border border-neutral-800">
          <Clock className="w-4 h-4 text-brand-primary" />
          <span className="text-xs text-neutral-300 font-medium">Duration: <strong>{duration} Event Hours</strong></span>
        </div>

        {/* Feature List */}
        <div className="flex flex-col gap-4 mb-8">
          <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-widest font-poppins mb-1">What's Included:</h4>
          <ul className="flex flex-col gap-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-neutral-400 text-xs leading-relaxed">
                <Check className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/customer/bookings"
        className={`w-full py-4 rounded-2xl text-xs font-bold font-poppins text-center transition-all duration-300 hover:scale-[1.02] block ${
          isPopular
            ? 'bg-gradient-to-r from-brand-primary to-amber-500 text-white shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/30'
            : 'bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white border border-white/5'
        }`}
      >
        Book This Package
      </Link>
    </div>
  )
}
