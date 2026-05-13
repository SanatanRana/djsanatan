import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import packageService from '../../services/package.service'
import PackageCard from '../../components/package/PackageCard'

export default function Packages() {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageService.getAllPackages()
        // Spring boot pageable or list response
        const packageList = data.content ? data.content : data
        setPackages(packageList.filter(pkg => pkg.active))
      } catch (err) {
        console.error('Error fetching packages:', err)
        setError('Failed to load packages. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackages()
  }, [])

  return (
    <div className="animate-slide-up px-6 md:px-16 max-w-[1280px] mx-auto pb-24">
      {/* Header */}
      <section className="text-center mb-20">
        <h1 className="font-syne text-3xl md:text-[72px] font-extrabold text-primary mb-6 mt-10 tracking-[-0.02em] leading-tight">
          EXPERIENCE PACKAGES
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Select from our curated entertainment tiers designed to transform any space into a high-energy sonic landscape.
        </p>
      </section>

      {/* States */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          <p className="text-on-surface-variant uppercase tracking-widest font-semibold text-xs">Loading Packages...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="text-center py-20 bg-error/10 rounded-xl border border-error/30 max-w-2xl mx-auto">
          <span className="material-symbols-outlined text-4xl text-error mb-4">error</span>
          <p className="text-on-surface font-semibold">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-6 text-primary underline text-sm font-bold">Retry</button>
        </div>
      )}

      {/* Package Cards */}
      {!isLoading && !error && packages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {packages.map((pkg, idx) => {
            // Determine popular package based on logic or name (for demo purposes)
            const isPopular = pkg.price >= 25000 && pkg.price <= 35000
            const featuresList = Array.isArray(pkg.features) ? pkg.features : []

            return (
              <PackageCard
                key={pkg.id}
                pkg={{ ...pkg, isPopular, features: featuresList }}
                onBook={() => navigate(`/book?packageId=${pkg.id}`)}
              />
            )
          })}
        </div>
      )}

      {!isLoading && !error && packages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-on-surface-variant">No active packages available at the moment.</p>
        </div>
      )}
    </div>
  )
}
