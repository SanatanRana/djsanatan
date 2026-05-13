import React from 'react'
import { Link } from 'react-router-dom'
import { Music, ArrowRight, Disc, Star, Zap, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 py-12 md:py-24 text-center overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-primary/8 rounded-full blur-3xl -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-12 left-1/3 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-brand-accent/5 rounded-full blur-3xl -z-10 animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/3 right-10 w-[200px] h-[200px] bg-brand-primary/5 rounded-full blur-3xl -z-10 animate-float"></div>

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-10 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-4 py-2 rounded-full shadow-lg shadow-brand-primary/5">
          <Zap className="w-4 h-4 text-brand-accent animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-200">
            Next-Gen Concert Sound &amp; Visuals
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-poppins max-w-4xl animate-slide-up">
          Crafting Extraordinary{' '}
          <span className="bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-accent bg-clip-text text-transparent">
            Sensory Experiences
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Rana DJ Events orchestrates breath-taking concert sound rigs, custom synchronized pixel mappings, and heart-pounding bass for luxury weddings and corporate festivals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/customer/bookings"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-brand-primary to-amber-500 hover:from-brand-primary-deep hover:to-amber-600 text-white font-bold text-sm px-8 py-4.5 rounded-2xl shadow-xl shadow-brand-primary/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-primary/30"
          >
            Book Your Event
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/packages"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 hover:border-brand-primary/30 text-neutral-200 hover:text-white font-semibold text-sm px-8 py-4.5 rounded-2xl shadow-md transition-all duration-300"
          >
            Explore Packages
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl mt-12 md:mt-16">
          {[
            { value: '500+', label: 'Concert Shows', icon: Music, color: 'text-brand-primary' },
            { value: '20+', label: 'Line-Arrays', icon: Disc, color: 'text-brand-primary-light' },
            { value: '100k+', label: 'Active Audiences', icon: Zap, color: 'text-brand-accent' },
            { value: '4.9★', label: 'Google Rating', icon: Award, color: 'text-brand-success' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card hover-lift p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 border border-white/5 relative group"
              style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
            >
              <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-extrabold text-white font-poppins">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-neutral-500 font-medium mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
