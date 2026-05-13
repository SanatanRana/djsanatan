import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center px-6 md:px-16 overflow-hidden">
      {/* Background DJ Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGgKbqTDrXXSi_eX6lDK_Nh00zngmnP3Qog_BBQmhsHjX4lvou2DdxOEQn6ln5E_dt3CgUxrk85upXW3F-D9gXWzFcI3B0ysX83dZOUrKMoOlh9JCfcoTxotGcnc6KvT2_td6DEgaVL8a7qZuUDKbvKvPH-tIQns4uQYfwrfnZRYBU2_0tQYGMVosN3m_IKe1jz-jMgLqc0oj1CljN4hW3eVHuUGIih4oiJPnknhUiDS48im37rlN_TwfbHhSzgcS0m2W2cRAZrg"
          alt="DJ performing live at a nightclub"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl animate-fade-in">
        <h1 className="font-syne text-[42px] sm:text-[56px] md:text-[72px] font-extrabold leading-tight mb-6 tracking-[-0.02em]">
          Elevate Your Event with{' '}
          <span className="text-gradient">World-Class Beats</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
          From intimate VIP lounges to massive festival stages, we curate the soundscapes of the world's most exclusive nights.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/contact')}
            className="bg-btn-gradient px-10 py-4 rounded-xl font-syne text-base md:text-lg text-white glass-card-heavy active:scale-95 duration-200 neon-glow-primary font-bold"
          >
            Book Your Set
          </button>
          <button
            onClick={() => navigate('/packages')}
            className="glass-card px-10 py-4 rounded-xl border border-secondary/30 font-syne text-base md:text-lg text-secondary active:scale-95 duration-200 font-bold"
          >
            Explore Packages
          </button>
        </div>
      </div>
    </section>
  )
}
