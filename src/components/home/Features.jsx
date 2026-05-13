import React from 'react'
import { Music, Flame, CheckCircle } from 'lucide-react'

export default function Features() {
  const featureList = [
    {
      icon: Music,
      title: 'High-Fidelity Audio',
      desc: 'Line-array systems tailored specifically to venue acoustics, delivering clean vocals and powerful sub-bass.',
      bg: 'bg-brand-primary/10',
      border: 'border-brand-primary/20',
      iconColor: 'text-brand-primary'
    },
    {
      icon: Flame,
      title: 'Visual Pyro FX',
      desc: 'Coordinated cold-fire sparks, smoke blowers, and smart light systems programmed specifically to drop beats.',
      bg: 'bg-brand-primary-light/10',
      border: 'border-brand-primary-light/20',
      iconColor: 'text-brand-primary-light'
    },
    {
      icon: CheckCircle,
      title: 'Instant Safe Pay',
      desc: 'Seamlessly secure bookings using our state-of-the-art Razorpay transaction gateway with dynamic HMAC security.',
      bg: 'bg-brand-accent/10',
      border: 'border-brand-accent/20',
      iconColor: 'text-brand-accent'
    }
  ]

  return (
    <section className="max-w-7xl w-full mx-auto px-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featureList.map((feature, index) => (
          <div
            key={index}
            className="glass-card hover-lift p-8 rounded-2xl flex flex-col gap-4 border border-white/5 animate-slide-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className={`${feature.bg} ${feature.border} p-3 rounded-xl w-fit border`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <h3 className="text-lg font-bold text-white font-poppins">{feature.title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
