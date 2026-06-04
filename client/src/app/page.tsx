import HeroSection from '@/features/home/components/HeroSection'
import HowItWorks from '@/features/home/components/HowItWorks'
import TrustSignals from '@/features/home/components/TrustSignals'
import Testimonials from '@/features/home/components/Testimonials'
import PromoOffers from '@/features/home/components/PromoOffers'
import HomeBlogSection from '@/features/home/components/HomeBlogSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <PromoOffers/>
      <TrustSignals />
      <HomeBlogSection/>
      <Testimonials />
      <Footer/>
    </main>
  )
}