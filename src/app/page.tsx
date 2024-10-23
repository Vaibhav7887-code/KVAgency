import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Industries from '@/components/Industries';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Agency',
  description: 'An amazing agency website',
};

export default function Home() {
  return (
    <main className="relative">
      <ParallaxSection>
        <Hero />
      </ParallaxSection>
      
      <ParallaxSection>
        <Services />
      </ParallaxSection>
      
      <ParallaxSection>
        <Portfolio />
      </ParallaxSection>
      
      <ParallaxSection>
        <Industries />
      </ParallaxSection>
      
      <ParallaxSection>
        <Testimonials />
      </ParallaxSection>
      
      <ParallaxSection>
        <CTA />
      </ParallaxSection>
      
      <Footer />
    </main>
  );
}
