import React from 'react'
import { Sparkles, Image, Video } from 'lucide-react'

export default function Gallery() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-10">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 animate-fade-in">
        <span className="text-xs bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full w-fit self-center uppercase tracking-widest font-bold">Live Visuals</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-poppins">Our Events Gallery</h2>
        <p className="text-neutral-500 text-sm md:text-base">Witness our state-of-the-art concert sound systems and synced pixel mappings live in action.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl overflow-hidden border border-neutral-800 aspect-video bg-brand-bg-card flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] hover:border-brand-primary/30 duration-300 animate-slide-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="bg-brand-primary/15 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                {idx % 2 === 0 ? <Video className="w-6 h-6 text-brand-primary" /> : <Image className="w-6 h-6 text-brand-primary-light" />}
              </div>
              <p className="text-xs font-semibold text-neutral-300">Concert Show #{idx}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
