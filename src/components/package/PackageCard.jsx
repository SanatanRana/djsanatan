import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PackageCard({ pkg, onBook }) {
  const navigate = useNavigate()
  const { name, price, durationHours, description, features, isPopular } = pkg

  return (
    <div className={`glass-card p-8 rounded-xl flex flex-col h-full relative overflow-hidden group transition-all duration-300 ${
      isPopular
        ? 'ring-2 ring-primary scale-100 md:scale-105 z-10 shadow-[0_0_30px_rgba(221,183,255,0.2)]'
        : ''
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-on-primary-container px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <h3 className={`font-syne text-2xl md:text-3xl font-bold text-on-surface mb-2 ${isPopular ? 'mt-6' : ''}`}>{name}</h3>
      <div className="text-secondary font-bold text-3xl md:text-4xl mb-6 font-syne">
        ₹{price.toLocaleString('en-IN')}{' '}
        <span className="text-xs font-normal text-on-surface-variant uppercase tracking-wider">/ Event</span>
      </div>
      <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-4 mb-12 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-on-surface">
            <span className={`material-symbols-outlined text-xl ${isPopular ? 'text-secondary' : 'text-primary'}`}>check_circle</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onBook ? onBook : () => navigate('/contact')}
        className={`w-full py-4 font-bold rounded-lg transition-all duration-300 text-sm uppercase tracking-wider ${
          isPopular
            ? 'bg-gradient-to-r from-primary to-secondary text-on-primary-container hover:shadow-[0_0_25px_rgba(76,215,246,0.5)] font-extrabold'
            : 'border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary'
        }`}
      >
        Book Now
      </button>
    </div>
  )
}
