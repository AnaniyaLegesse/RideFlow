import HeroSection from '@/features/home/comonents/HeroSection'
import HowItWorks from '@/features/home/comonents/HowItWorks'
import TrustSignals from '@/features/home/comonents/TrustSignals'
import Testimonials from '@/features/home/comonents/Testimonials'
import PromoOffers from '@/features/home/comonents/PromoOffers'
import HomeBlogSection from '@/features/home/comonents/HomeBlogSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <PromoOffers/>
      <TrustSignals />
      <HomeBlogSection/>
      <Testimonials />
    </main>
  )
}