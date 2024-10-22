import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import AboutUs from '../components/AboutUs';
import Industries from '../components/Industries';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Agency',
  description: 'An amazing agency website',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <AboutUs />
      <Industries />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
