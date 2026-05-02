import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToActionSection() {
  return (
    <section className="py-24 text-center max-w-4xl mx-auto px-4">
      <div className="bg-blue-600 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl rounded-full bg-white w-64 h-64 mix-blend-overlay"></div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Start Your Style Journey</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
          Join thousands of happy customers who have already discovered their new favorite outfits at FashionZone.
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-blue-800 px-10 py-5 rounded-full font-black text-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-xl relative z-10"
        >
          Explore Collections
        </Link>
      </div>
    </section>
  );
}