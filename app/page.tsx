import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PopularProducts } from '@/components/PopularProducts'
import { CategoryGrid } from '@/components/CategoryGrid'
import { WhyYumi } from '@/components/WhyYumi'
import { TreatPicker } from '@/components/TreatPicker'
import { Quality } from '@/components/Quality'
import { HowItWorks } from '@/components/HowItWorks'
import { KnowledgeTeaser } from '@/components/KnowledgeTeaser'
import { Delivery } from '@/components/Delivery'
import { FAQ } from '@/components/FAQ'
import { LeadForm } from '@/components/LeadForm'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PopularProducts />
        <CategoryGrid />
        <WhyYumi />
        <TreatPicker />
        <Quality />
        <HowItWorks />
        <KnowledgeTeaser />
        <Delivery />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
