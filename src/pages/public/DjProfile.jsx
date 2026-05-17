import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import mediaService from '../../services/media.service'
import packageService from '../../services/package.service'

export default function DjProfile() {
  const { adminId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [media, setMedia] = useState([])
  const [packages, setPackages] = useState([])
  const [isLoadingMedia, setIsLoadingMedia] = useState(true)
  const [isLoadingPkgs, setIsLoadingPkgs] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)

  useEffect(() => {
    fetchMedia()
    fetchPackages()
  }, [adminId])

  const fetchMedia = async () => {
    try {
      const data = await mediaService.getMediaByAdmin(adminId)
      setMedia(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch media:', err)
    } finally {
      setIsLoadingMedia(false)
    }
  }

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages()
      if (!data) {
        setPackages([])
        return
      }
      const list = data.content ? data.content : (Array.isArray(data) ? data : [])
      setPackages(list.filter((pkg) => pkg.active))
    } catch (err) {
      console.error('Failed to fetch packages:', err)
      setPackages([])
    } finally {
      setIsLoadingPkgs(false)
    }
  }

  const handleBookPackage = (pkgId) => {
    if (!isAuthenticated) {
      // Save intended package and redirect to login
      localStorage.setItem('pendingBookingPackageId', pkgId)
      navigate('/login')
    } else {
      navigate(`/book?packageId=${pkgId}`)
    }
  }

  const filteredMedia =
    activeTab === 'all'
      ? media
      : media.filter((m) => m.mediaType === activeTab.toUpperCase())

  const images = media.filter((m) => m.mediaType === 'IMAGE')
  const videos = media.filter((m) => m.mediaType === 'VIDEO')

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 px-6 md:px-16 py-16 md:py-24 max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shrink-0">
              <span
                className="material-symbols-outlined text-white text-5xl sm:text-6xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                headphones
              </span>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface leading-tight">
                Rana DJ
              </h1>
              <p className="text-on-surface-variant text-sm sm:text-base mt-2 max-w-xl">
                Professional DJ & Event Sound Specialist — crafting the
                soundscapes of the most memorable nights.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-full">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  Verified
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">
                    call
                  </span>
                  +91 98765 43210
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">
                    location_on
                  </span>
                  Cuttack, Odisha
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-16 max-w-[1280px] mx-auto pb-24">
        {/* ═══ Packages Section ═══ */}
        <section className="mt-12 md:mt-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-2xl">
              inventory_2
            </span>
            <h2 className="font-syne text-2xl md:text-3xl font-bold text-on-surface">
              Event Packages
            </h2>
          </div>

          {isLoadingPkgs ? (
            <div className="flex justify-center p-8">
              <span className="material-symbols-outlined animate-spin text-primary text-3xl">
                progress_activity
              </span>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                const features = Array.isArray(pkg.features)
                  ? pkg.features
                  : []
                return (
                  <div
                    key={pkg.id}
                    className="glass-card p-6 rounded-xl flex flex-col h-full hover-lift"
                  >
                    <h3 className="font-syne text-xl font-bold text-on-surface mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-secondary font-bold text-2xl sm:text-3xl mb-4 font-syne">
                      ₹{pkg.price?.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-on-surface-variant uppercase tracking-wider ml-1">
                        / {pkg.durationHours} hrs
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-4 flex-grow leading-relaxed">
                      {pkg.description}
                    </p>
                    {features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {features.slice(0, 4).map((f, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-on-surface"
                          >
                            <span className="material-symbols-outlined text-primary text-[16px]">
                              check_circle
                            </span>
                            {f}
                          </li>
                        ))}
                        {features.length > 4 && (
                          <li className="text-xs text-on-surface-variant">
                            +{features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    )}
                    <button
                      onClick={() => handleBookPackage(pkg.id)}
                      className="w-full py-3 font-bold rounded-lg text-sm uppercase tracking-wider border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all duration-300"
                    >
                      Book This Package
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center p-8 glass-card rounded-xl">
              <p className="text-on-surface-variant text-sm">
                No packages available at the moment.
              </p>
            </div>
          )}
        </section>

        {/* ═══ Media Gallery Section ═══ */}
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl">
                perm_media
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-on-surface">
                Media Gallery
              </h2>
            </div>

            {/* Tab Filters */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All', count: media.length },
                { key: 'image', label: 'Photos', count: images.length },
                { key: 'video', label: 'Videos', count: videos.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-on-primary-container'
                      : 'glass-card text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {isLoadingMedia ? (
            <div className="flex justify-center p-8">
              <span className="material-symbols-outlined animate-spin text-primary text-3xl">
                progress_activity
              </span>
            </div>
          ) : filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-xl overflow-hidden group cursor-pointer hover-lift"
                  onClick={() =>
                    item.mediaType === 'IMAGE' && setLightboxItem(item)
                  }
                >
                  <div className="aspect-video relative bg-surface-container-low">
                    {item.mediaType === 'VIDEO' ? (
                      <video
                        src={item.mediaUrl}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <img
                          src={item.mediaUrl}
                          alt={item.description || 'Event photo'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="material-symbols-outlined text-white text-2xl">
                            zoom_in
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {item.description && (
                    <div className="p-3">
                      <p className="text-xs text-on-surface-variant truncate">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 glass-card rounded-xl">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">
                perm_media
              </span>
              <p className="text-on-surface-variant text-sm">
                No media available yet.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition z-10"
            onClick={() => setLightboxItem(null)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <img
            src={lightboxItem.mediaUrl}
            alt={lightboxItem.description || 'Full size'}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
