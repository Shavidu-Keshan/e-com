import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
                
                <div className="h-64 sm:h-80 w-full overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop" 
                        alt="Fashion Store" 
                        className="w-full h-full object-cover"
                    />
                </div>

                
                <div className="p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
                        About <span className="text-blue-600">FashionZone</span>
                    </h1>
                    
                    <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                        <p>
                            Welcome to FashionZone! We started with a simple vision: to create a destination where everyone can find high-quality, trendy clothing that doesn't break the bank.
                        </p>
                        
                        <p>
                            Whether you are looking for smart casuals for the office, comfortable weekend wear, or a show-stopping outfit for a night out, we have carefully curated our collections to meet your every need.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
                            <h2 className="text-xl font-bold text-blue-800 mb-3">Our Mission</h2>
                            <p className="text-blue-900">
                                To empower individuals to express their true selves through accessible, sustainable, and stylish fashion while providing an exceptional shopping experience from start to finish.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link 
                            to="/products" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 w-full sm:w-auto text-center"
                        >
                            Start Shopping Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}