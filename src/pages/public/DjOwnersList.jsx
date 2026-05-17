import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import djOwnerService from '../../services/djowner.service'

export default function DjOwnersList() {
  const navigate = useNavigate()
  const [owners, setOwners] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOwners()
  }, [])

  const fetchOwners = async () => {
    try {
      const data = await djOwnerService.getAllDjOwners()
      setOwners(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch DJ owners:', err)
      setError('Failed to load DJ owners. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 px-6 md:px-16 py-16 md:py-20 max-w-[1280px] mx-auto text-center">
          <span className="text-secondary font-sans text-xs font-semibold tracking-[0.2em] mb-4 block uppercase">
            Meet Our Artists
          </span>
          <h1 className="font-syne text-3xl sm:text-4xl md:text-[56px] font-extrabold text-on-surface leading-tight mb-4 tracking-[-0.02em]">
            Our DJ Owners
          </h1>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore our talented DJ professionals. Click on any DJ to view
            their full profile, event packages, photos, and videos.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
        </div>
      </section>

      {/* Owners Grid */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto pb-24 -mt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">
              progress_activity
            </span>
            <p className="text-on-surface-variant uppercase tracking-widest font-semibold text-xs">
              Loading DJ Owners...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-error/10 rounded-xl border border-error/30 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-error mb-4 block">
              error
            </span>
            <p className="text-on-surface font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 text-primary underline text-sm font-bold"
            >
              Retry
            </button>
          </div>
        ) : owners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {owners.map((owner, idx) => (
              <div
                key={owner.id}
                onClick={() => navigate(`/dj/${owner.id}`)}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer hover-lift group animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Card Header Gradient */}
                <div className="h-24 sm:h-28 bg-gradient-to-r from-primary/25 via-secondary/15 to-primary/25 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/80"></div>
                </div>

                {/* Avatar + Info */}
                <div className="relative px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl border-4 border-surface mb-4 group-hover:scale-105 transition-transform duration-300">
                    <span
                      className="material-symbols-outlined text-white text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      headphones
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-on-surface mb-1">
                    {owner.fullName}
                  </h3>

                  {/* Contact */}
                  <div className="flex items-center gap-2 text-secondary mt-1">
                    <span className="material-symbols-outlined text-[16px]">
                      call
                    </span>
                    <span className="text-sm font-semibold">{owner.phone}</span>
                  </div>

                  {/* Verified Badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full mt-3">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    Verified DJ
                  </span>

                  {/* CTA */}
                  <button className="mt-5 w-full py-3 rounded-lg border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary-container transition-all duration-300 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      visibility
                    </span>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">
              person_off
            </span>
            <p className="text-on-surface-variant">
              No DJ owners available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
