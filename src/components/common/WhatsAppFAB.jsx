import React from 'react'

export default function WhatsAppFAB() {
  return (
    <a
      className="fixed bottom-24 md:bottom-12 right-6 md:right-12 z-[40] group cursor-pointer"
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-3">
        <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
          Chat on WhatsApp
        </span>
        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] group-hover:scale-110 transition-transform duration-300">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
        </div>
      </div>
    </a>
  )
}
