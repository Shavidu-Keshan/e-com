import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToActionSection from '../components/CallToActionSection';

export default function Intro() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      
    </div>
  );
}