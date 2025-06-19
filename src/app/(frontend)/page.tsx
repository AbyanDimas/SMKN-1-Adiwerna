'use client'

import { HeroSection } from '@/app/(frontend)/components/home/sections/HeroSection'
import { StatsSection } from '@/app/(frontend)/components/home/sections/StatsSection'
import { AboutSection } from '@/app/(frontend)/components/home/sections/AboutSection'
import { ProgramsSection } from '@/app/(frontend)/components/home/sections/ProgramsSection'
import { FacilitiesSection } from '@/app/(frontend)/components/home/sections/FacilitiesSection'
import { AchievementsSection } from '@/app/(frontend)/components/home/sections/AchievementsSection'
import { PartnersSection } from '@/app/(frontend)/components/home/sections/PartnersSection'
import { TestimonialsSection } from '@/app/(frontend)/components/home/sections/TestimonialsSection'
import { ExtracurricularsSection } from '@/app/(frontend)/components/home/sections/ExtracurricularsSection'
import { ActivitiesSection } from '@/app/(frontend)/components/home/sections/ActivitiesSection'
import { TeachersSection } from '@/app/(frontend)/components/home/sections/TeachersSection'
import { GallerySection } from '@/app/(frontend)/components/home/sections/GallerySection'
import { FAQSection } from '@/app/(frontend)/components/home/sections/FAQSection'
import { NewsSection } from '@/app/(frontend)/components/home/sections/NewsSection'
import { CTASection } from '@/app/(frontend)/components/home/sections/CTASection'
import { Footer } from '@/app/(frontend)/components/home/sections/Footer'

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProgramsSection />
      <FacilitiesSection />
      <AchievementsSection />
      <PartnersSection />
      <TestimonialsSection />
      <ExtracurricularsSection />
      <ActivitiesSection />
      <TeachersSection />
      <GallerySection />
      <FAQSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home
