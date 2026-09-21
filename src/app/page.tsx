import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import Services from '@/components/Services';
import BusinessSolutions from '@/components/BusinessSolutions';
import ProjectGrid from '@/components/ProjectGrid';
import Testimonials from '@/components/Testimonials';
import Process from '@/components/Process';
import WhyNara from '@/components/WhyNara';
import About from '@/components/About';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import ScrollRevealInit from '@/components/ScrollRevealInit';

export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustSection />
        <Services />
        <BusinessSolutions />
        <ProjectGrid />
        <Testimonials />
        <Process />
        <WhyNara />
        <About />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

