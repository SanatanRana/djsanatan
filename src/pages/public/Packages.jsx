import React from 'react'
import { Sparkles, Music, Sliders, Zap, Star } from 'lucide-react'
import PackageCard from '../../components/package/PackageCard'

export default function Packages() {
  const packagesList = [
    {
      name: 'Club Essentials',
      price: 15000,
      duration: 5.0,
      code: 'CLUB_ESS_DJ',
      icon: Music,
      isPopular: false,
      features: [
        '2000W High-Fidelity Club Speaker Rig',
        '2x High-Output Subwoofers',
        'Basic Moving Head Smart Lighting Array',
        '1x Professional Wired Shure Microphone',
        'Standard Performance DJ Stand Console',
        'Ideal for audiences of up to 150 guests'
      ]
    },
    {
      name: 'Festival Pro',
      price: 30000,
      duration: 7.0,
      code: 'FESTIVAL_PRO_DJ',
      icon: Zap,
      isPopular: true,
      features: [
        '10000W Heavy concert Line-Array System',
        '6x Smart Bass Subwoofers',
        'Intelligent Sync Truss-Mounted Light Rigs',
        '2x Pro Vocal Wireless Mics + Mixing Board',
        'CO2 High-Pressure Cold Pyrotechnics FX',
        'Ideal for festivals up to 800 audiences'
      ]
    },
    {
      name: 'Private VIP',
      price: 45000,
      duration: 9.0,
      code: 'PRIVATE_VIP_DJ',
      icon: Star,
      isPopular: false,
      features: [
        '20000W Extreme Dual Line-Array Stadium Setup',
        '12x High-Decibel Smart Bass Cabinets',
        'Full Stage Laser Trussing + LED Matrix Screen',
        'Pro Shure Vocal Headsets + Dedicated Mixer',
        'Full Stage CO2 Blast Columns + Cold Sparks FX',
        'Ideal for mega wedding/concert setups >1500'
      ]
    }
  ]

  const comparisonSpecs = [
    { spec: 'Maximum Sound Power Output', club: '2000 Watts', festival: '10,000 Watts', vip: '20,000 Watts' },
    { spec: 'Line-Array Audio Support', club: '❌ No', festival: '✅ Dual Arrays', vip: '✅ Quad Stadium Towers' },
    { spec: 'CO2 & Sparks Pyro Sync', club: '❌ No', festival: '✅ Basic Sync (6x)', vip: '✅ Full Stadium Pyro Sync' },
    { spec: 'Microphones Provided', club: '1x Wired Mic', festival: '2x Wireless Pro Mics', vip: '4x Pro Wireless & Headsets' },
    { spec: 'LED Stage Display', club: '❌ No', festival: '❌ No', vip: '✅ 15ft LED Screen Matrix' },
    { spec: 'Dual Sound Generator Backup', club: '❌ No', festival: '❌ No', vip: '✅ 100% Power Fault Safety' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-16 md:gap-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-brand-primary/6 rounded-full blur-3xl -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-[250px] h-[250px] bg-brand-accent/4 rounded-full blur-3xl -z-10 animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 animate-fade-in">
        <span className="inline-flex items-center gap-2 self-center bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs px-4 py-2 rounded-full font-bold tracking-widest uppercase font-poppins shadow-md">
          <Sparkles className="w-4 h-4 text-brand-primary-light" />
          Elite Tailored Audio Arrangements
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight font-poppins">
          Select Your{' '}
          <span className="bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-accent bg-clip-text text-transparent">
            Sound Dimension
          </span>
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
          From compact, high-impact private clubs to grand outdoor stadium festivals, we deliver industry-standard sound engineering tailored to your crowd.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packagesList.map((pkg, idx) => (
          <PackageCard key={idx} pkg={pkg} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className="flex flex-col gap-8 md:gap-10 mt-6 md:mt-12">
        <div className="text-center md:text-left max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">Technical Features Comparison</h3>
          <p className="text-neutral-500 text-xs md:text-sm mt-2">Compare specific setups and select the engineering rig that matches your venue footprint perfectly.</p>
        </div>

        <div className="glass-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/3">
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-neutral-300 font-poppins">Audio Rig Specification</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-brand-primary-light font-poppins">Club Essentials</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-brand-primary font-poppins">Festival Pro</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-brand-accent font-poppins">Private VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonSpecs.map((row, index) => (
                  <tr key={index} className="hover:bg-white/2 transition-all duration-150">
                    <td className="p-6 text-xs font-semibold text-neutral-200 font-sans">{row.spec}</td>
                    <td className="p-6 text-xs text-neutral-500 font-medium">{row.club}</td>
                    <td className="p-6 text-xs text-neutral-300 font-bold">{row.festival}</td>
                    <td className="p-6 text-xs text-white font-extrabold">{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
