import React from 'react'

export default function Features() {
  const stats = [
    {
      icon: 'nightlife',
      value: '500+',
      label: 'EVENTS COMPLETED',
      color: 'text-primary',
    },
    {
      icon: 'headphones',
      value: '50+',
      label: 'ELITE DJS',
      color: 'text-secondary',
    },
    {
      icon: 'groups',
      value: '100k+',
      label: 'HAPPY GUESTS',
      color: 'text-primary',
    },
  ]

  return (
    <section className="py-16 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1280px] mx-auto">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card hover-lift p-8 rounded-xl flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: `${idx * 0.15}s` }}>
            <span
              className={`material-symbols-outlined text-[48px] ${stat.color} mb-4`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {stat.icon}
            </span>
            <h3 className={`font-syne text-4xl md:text-5xl font-extrabold ${stat.color}`}>{stat.value}</h3>
            <p className="font-sans text-xs font-semibold text-on-surface-variant tracking-widest uppercase mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
