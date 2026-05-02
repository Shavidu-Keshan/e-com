import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black mb-16">See What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-gray-800/50 p-10 rounded-3xl border border-gray-700 backdrop-blur-sm">
            <div className="flex justify-center text-yellow-400 mb-6 text-2xl">
              ★★★★★
            </div>
            <p className="text-lg text-gray-300 italic mb-8 leading-relaxed">
              "I've been shopping at FashionZone for 3 years. Their delivery is unbelievable—I often get my orders the very next day. Quality is always top notch!"
            </p>
            <h4 className="font-bold text-white">— Sarah Jenkins</h4>
            <span className="text-sm text-gray-500">Verified Buyer</span>
          </div>
          {/* Review 2 */}
            <div className="bg-gray-800/50 p-10 rounded-3xl border border-gray-700 backdrop-blur-sm">
            <div className="flex justify-center text-yellow-400 mb-6 text-2xl">
              ★★★★★
            </div>
            <p className="text-lg text-gray-300 italic mb-8 leading-relaxed">
              "The only place I trust for trendy styles. Their customer support genuinely cares, exchanging sizes was absolutely painless."
            </p>
            <h4 className="font-bold text-white">— Mike Roberts</h4>
            <span className="text-sm text-gray-500">Verified Buyer</span>
          </div>
          {/* Review 3 */}
            <div className="bg-gray-800/50 p-10 rounded-3xl border border-gray-700 backdrop-blur-sm">
            <div className="flex justify-center text-yellow-400 mb-6 text-2xl">
              ★★★★★
            </div>
            <p className="text-lg text-gray-300 italic mb-8 leading-relaxed">
              "Awesome prices for the quality you get. Their summer collection completely revitalized my wardrobe. Highly recommended!"
            </p>
            <h4 className="font-bold text-white">— Emily Chen</h4>
            <span className="text-sm text-gray-500">Verified Buyer</span>
          </div>
        </div>
      </div>
    </section>
  );
}