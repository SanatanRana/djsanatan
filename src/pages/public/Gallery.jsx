import React from 'react'

export default function Gallery() {
  const galleryItems = [
    { id: 1, type: 'img', span: 'tall', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqeMzZvOJRrUVBkHxFnqDqDZ1DN8iTVLobRByGxISlVW7F093iqPs3jYvShhDang9pZMJXVKpM9psgmk9ie3_nuG7omf6Fb0NPUZVwdiNrllKf9EzCi_eDzAXij8nQNyYZgS3DSt_kZLf5CAl-y4ah8YfndEv7EsnKPqspiFU1SIYLyCP4Wi27zLSvCN5HloQVmQ070e4YZ3lDbbo9g7VuqIN2WuYVh86S6WBrIO7bGW8HF7krFk3TX1BQ0jc1geVz43ovRBjqKg', label: 'Neon Pulse Berlin', cat: 'MAIN STAGE' },
    { id: 2, type: 'vid', span: 'square', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWpxh4QfpHmUyT7Y2sTiq7GbZcDljbJpxVnRzkl2tC1rtH5G4Gu9006rJa55qXX9ZjUvDlOaqlAm1RdfR5Jeqr0EYxFCcqYjdtMtxOo8Q81QCZoRh-s-j4nVCLpBMr6yoZhNQxE0ZSJkRrxXISEBo6KwLG_NjISkFkLx2PhQtE5a-diolZeuPm2XZxmCgbmJHHNhGavWeDgF4WYWfTKsnw4_IQsQ0_gPzzOi2EyHSqCm8CaH21Ivt9DBZQPaG7qev_0SQVj_Ds-w', label: 'Live Setup', cat: 'GEAR' },
    { id: 3, type: 'img', span: 'standard', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpPImTq-opoikkO8cv0E5uUeytlPbn7aYZVzOVoYAVEMoXmA5RIeM3yaqau4Y_Z_7kn8ei2ukSnoxBrqxInB1gVhHtTC2EHpvewfBV3cDU7VLjEN8PdlVSVjuuHoXhyyzoNaNl8zKhWEGzwdUi9U1CjM27qWy2pTP9zAR-i2FF7ypvIXo9QqX6EyDRQlZ3jRH34n2a_ESqyO_fIBFQTbOwCookwN4_i2Q5SPOvO_SqEOZSJ0Zq80KiWieoGKUsVBH230W9WtFNEQ', label: 'VIP Lounge', cat: 'ATMOSPHERE' },
    { id: 4, type: 'img', span: 'wide', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8gVoyumG9bem126AqgBnlILK-IwonsOP6RLE8Nndqsf7u6IYHbi24J-lPDVq32DJCfocac6wxMm-QJT0plMl_95ZSsxmUVlUqQwhQa7NJZBwt7T4UulgxMYi3RpWlxPwETxpVq8vAmztjV7MRwRbSvWSwewMYUuSnqpaeUhnDJtpmjDKCCPZBQIfPSzLLnVOKYleK0Ljwm75LC68f3cmO1DsnhCODXYgWBTZ4jSgH9exsJRwxVMdG1u0IXRzNwO8XQuEFeBhwYg', label: 'Rooftop Summit', cat: 'EXCLUSIVE' },
    { id: 5, type: 'img', span: 'standard', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjegrEjAJXa6QrpMYQgfulBqYKrKuk08zCnyTcNd8ZGRNCN8NESAqrJtUBsWIsVu3F_M44llX-teaI1n-PQv8GZmcl_5BTRiBsJeS0kdtvftsYIRIOk2CVQa5fQmr-lr4p9nloXQ6ZA2GDVRjc-zXfD4WmvHdYAiFhrZRcxT1PrS5CRY5JVfLkXxynmzDVIt0fXHRWLUUevkTUBWoMWUFH99jSeeWfpN2RKlegsWipgKG7ng7LjI8oXllyccMVIRM03VhnFAy47Q', label: 'Shimmer Detail', cat: 'PRODUCTION' },
    { id: 6, type: 'vid', span: 'tall', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlwrshIQime3hnSZNN7nVGucGYJmp0xObf4MkmrDBSwSxx4gXvROR-mNRurt4kYrqxnoNoXwGsgBZGem4JY0P2N2rUrFJcKOMB6CIHJKFW5K62BpjDzfAkgOa9XG3koJkeldF1_z4I7deD_2u0jFlYnY7ZrNZXsrXnjW4s1Q4chJo-DGNSd-Ux8yrsmCE9_S6vsla-rMrL7t9EXZa512S4zUT9SOJsMFKxZaIZq217JnRJRVYtY4pwUz7482NO7uURm_N_FGaixQ', label: 'Artist Perspective', cat: 'PERFORMANCE' },
  ]

  return (
    <div className="animate-fade-in px-6 md:px-16 max-w-[1280px] mx-auto pb-24">
      {/* Header */}
      <section className="mb-16 mt-10">
        <span className="text-secondary font-sans text-xs font-semibold tracking-[0.2em] mb-4 block uppercase">Visual Experience</span>
        <h2 className="font-syne text-3xl md:text-[72px] font-extrabold leading-none mb-6 tracking-[-0.02em]">THE NIGHTLIFE ANTHOLOGY</h2>
        <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">Capturing the electric pulse of the world's most exclusive dance floors.</p>
      </section>

      {/* Masonry Gallery */}
      <div className="masonry-grid">
        {galleryItems.map(item => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-xl glass-card group cursor-pointer ${
              item.span === 'tall' ? 'masonry-item-tall' :
              item.span === 'wide' ? 'masonry-item-wide' :
              item.span === 'square' ? 'masonry-item-square' : ''
            }`}
          >
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.src} alt={item.label} />

            {/* Video Play Button */}
            {item.type === 'vid' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-primary font-sans text-xs font-semibold uppercase tracking-widest">{item.cat}</span>
              <h3 className="font-syne text-white text-xl font-bold">{item.label}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
