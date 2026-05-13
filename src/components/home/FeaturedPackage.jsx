import React from 'react'

export default function FeaturedPackage() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface-container-lowest">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-syne text-3xl md:text-5xl font-bold mb-4">Client Echoes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="glass-card-heavy p-10 md:p-12 rounded-2xl relative hover-lift">
            <span className="material-symbols-outlined absolute top-8 right-8 text-primary/20 text-[64px]">format_quote</span>
            <p className="text-base md:text-lg italic mb-8 relative z-10 leading-relaxed text-on-surface">
              "Rana DJ Events didn't just provide music; they designed an atmosphere. The transition from cocktail hour to the main event was seamless."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
              <div>
                <h5 className="font-bold text-on-surface text-sm">Marcus Chen</h5>
                <p className="text-on-surface-variant text-xs font-semibold">Creative Director, Apex Global</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="glass-card-heavy p-10 md:p-12 rounded-2xl relative hover-lift">
            <span className="material-symbols-outlined absolute top-8 right-8 text-secondary/20 text-[64px]">format_quote</span>
            <p className="text-base md:text-lg italic mb-8 relative z-10 leading-relaxed text-on-surface">
              "The professionalism and level of talent provided were unmatched. They delivered a set that perfectly matched our brand's luxury aesthetic."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary"></div>
              <div>
                <h5 className="font-bold text-on-surface text-sm">Elena Rodriguez</h5>
                <p className="text-on-surface-variant text-xs font-semibold">Event Lead, VOGUE Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
