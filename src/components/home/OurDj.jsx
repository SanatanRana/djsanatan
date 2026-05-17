import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OurDj() {
  const navigate = useNavigate()

  return (
    <section className="py-20 px-6 md:px-16">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-sans text-xs font-semibold tracking-[0.2em] mb-4 block uppercase">
            Meet The Artist
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-bold mb-4">
            Our DJ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* DJ Card */}
        <div className="glass-card hover-lift rounded-2xl overflow-hidden max-w-3xl mx-auto">
          <div className="relative">
            {/* Gradient Header Background */}
            <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/90"></div>
              {/* Decorative Glow */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-primary/20 blur-[60px] rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-secondary/20 blur-[50px] rounded-full"></div>
            </div>

            {/* Avatar + Info */}
            <div className="relative px-6 sm:px-8 pb-8 -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-5">
              {/* Avatar */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl border-4 border-surface shrink-0">
                <span
                  className="material-symbols-outlined text-white text-5xl sm:text-6xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  headphones
                </span>
              </div>

              {/* Text Info */}
              <div className="text-center sm:text-left flex-1 pb-1">
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-on-surface">
                  Rana DJ
                </h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  Professional DJ & Event Sound Specialist
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    Verified
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px]">
                      music_note
                    </span>
                    500+ Events
                  </span>
                </div>
              </div>
            </div>

            {/* Description + CTA */}
            <div className="px-6 sm:px-8 pb-8">
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                With over a decade of experience in the music industry, DJ Rana leads the team to deliver unforgettable experiences with state-of-the-art equipment and unmatched energy. From weddings to corporate events — we curate the perfect vibe.
              </p>
              <button
                onClick={() => navigate('/dj')}
                className="w-full sm:w-auto bg-btn-gradient px-8 py-3.5 rounded-xl font-syne text-sm text-white font-bold uppercase tracking-wider active:scale-95 duration-200 neon-glow-primary flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">
                  visibility
                </span>
                View Our DJs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
