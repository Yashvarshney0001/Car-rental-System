
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20car%20rental%20showroom%20in%20India%20with%20multiple%20affordable%20cars%20including%20Maruti%20Suzuki%20WagonR%20Tata%20Nexon%20Hyundai%20i20%20parked%20in%20organized%20rows%20modern%20Indian%20automotive%20dealership%20bright%20natural%20lighting%20Delhi%20NCR%20car%20rental%20business%20clean%20organized%20display&width=1920&height=1080&seq=hero-car-showroom-india&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="font-pacifico text-blue-400">Rent-A-Wheel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Your Trusted Car Rental Partner in Delhi NCR
          </p>
          <p className="text-lg mb-12 opacity-90">
            Choose from our fleet of reliable and affordable vehicles across Greater Noida and Delhi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                Browse Cars
              </button>
            </Link>
            <Link href="/booking">
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Rent-A-Wheel?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-car-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Affordable Fleet</h3>
              <p className="text-gray-600">Choose from our extensive collection of reliable and budget-friendly vehicles</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-24-hours-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer service across Delhi NCR region</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-check-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fully Insured</h3>
              <p className="text-gray-600">Complete insurance coverage for worry-free driving in NCR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Cars Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Popular Rentals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maruti Suzuki WagonR",
                type: "Compact Hatchback",
                price: "₹1,200/day",
                image: "2023 Maruti Suzuki WagonR official product photography white color tall hatchback car Indian automotive studio lighting clean white background professional car photography front three quarter view"
              },
              {
                name: "Tata Nexon",
                type: "Compact SUV",
                price: "₹2,500/day",
                image: "2023 Tata Nexon official product photography blue metallic color compact SUV Indian automotive studio lighting clean white background professional car photography front three quarter view modern design"
              },
              {
                name: "Hyundai i20",
                type: "Premium Hatchback",
                price: "₹1,800/day",
                image: "2023 Hyundai i20 official product photography red color premium hatchback car Indian automotive studio lighting clean white background professional car photography front three quarter view sporty design"
              }
            ].map((car, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={`https://readdy.ai/api/search-image?query=$%7Bcar.image%7D&width=400&height=300&seq=homepage-car-${index}&orientation=landscape`}
                    alt={car.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <p className="text-gray-600 mb-4">{car.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{car.price}</span>
                    <Link href="/booking">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Delhi NCR?</h2>
          <p className="text-xl mb-8 opacity-90">Book your perfect car today and discover the best of Greater Noida and Delhi</p>
          <Link href="/booking">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Start Your Booking
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-pacifico text-blue-400 mb-6">Rent-A-Wheel</h3>
              <p className="text-gray-400">Your trusted car rental partner in Delhi NCR region.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/cars" className="hover:text-white cursor-pointer">Browse Cars</Link></li>
                <li><Link href="/booking" className="hover:text-white cursor-pointer">Book Now</Link></li>
                <li><Link href="/contact" className="hover:text-white cursor-pointer">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91-9876543210</p>
                <p>✉️ yash@rent-a-wheel.com</p>
                <p>📍 Pari Chowk, Greater Noida</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rent-A-Wheel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
