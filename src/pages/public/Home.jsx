import React from 'react'
import Hero from '../../components/home/Hero'
import Features from '../../components/home/Features'
import OurDj from '../../components/home/OurDj'
import FeaturedPackage from '../../components/home/FeaturedPackage'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Features />
      <OurDj />
      <FeaturedPackage />
    </div>
  )
}
