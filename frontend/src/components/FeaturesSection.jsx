import React from 'react';

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24 border-t border-gray-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 mb-4">Why FashionZone?</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">We've spent years perfecting the right blend of quality, affordability, and lightning-fast logistics to bring you an unmatched shopping experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 rotate-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">10+ Years</h3>
          <p className="text-gray-500 text-sm leading-relaxed">A decade of excellence. Trusted in modern apparel retail with thousands of happy repeat customers.</p>
        </div>
        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 -rotate-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Enjoy free and lightning-fast shipping right to your doorstep on all orders above $50.</p>
        </div>
        {/* Feature 3 */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 rotate-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
          <p className="text-gray-500 text-sm leading-relaxed">100% safe checkout with end-to-end encryption. Your privacy and security is our top priority.</p>
        </div>
        {/* Feature 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-600 -rotate-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Painstakingly curated materials guaranteed to last, ensuring you look great in every season.</p>
        </div>
      </div>
    </section>
  );
}