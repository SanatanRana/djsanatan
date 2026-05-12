import React from 'react'
import Hero from '../../components/home/Hero'
import Features from '../../components/home/Features'
import FeaturedPackage from '../../components/home/FeaturedPackage'

export default function Home() {
  return (
    <div className="bg-brand-bg text-neutral-100 flex flex-col font-sans">
      <Hero />
      <Features />
      <FeaturedPackage />
    </div>
  )
}
