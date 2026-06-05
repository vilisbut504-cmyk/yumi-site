import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhyYumi } from '@/components/WhyYumi'
import { Audience } from '@/components/Audience'
import { FutureLines } from '@/components/FutureLines'
import { Quiz } from '@/components/Quiz'
import { Quality } from '@/components/Quality'
import { HowItWorks } from '@/components/HowItWorks'
import { Trust } from '@/components/Trust'
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
        <WhyYumi />
        <Audience />
        <FutureLines />
        <Quiz />
        <Quality />
        <HowItWorks />
        <Trust />
        <Delivery />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
