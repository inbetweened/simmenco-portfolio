import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

/**
 * Home page — single-scroll narrative.
 * Each section is self-contained and manages its own reveal animations.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
