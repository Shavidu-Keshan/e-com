import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HeroSection() {

    const navigate = useNavigate();
  return (
    <section className="relative bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex flex-col items-start text-left mb-12 md:mb-0 z-10">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4">
            Welcome to the future of retail
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Fashion<span className="text-blue-600">Zone</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            Redefining everyday style. We bring you the latest trends with uncompromising quality and affordable prices. Your ultimate fashion destination.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Shop Now
            </Link>
            <a
              href="#features"
              className="bg-gray-100 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 relative w-full flex justify-center">
          {/* Decorative background blob */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-full blur-3xl opacity-60 transform scale-110"></div>
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop" 
            alt="Fashion model" 
            className="relative z-10 w-full max-w-md h-[550px] object-cover rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
}