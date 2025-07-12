'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-pacifico text-blue-600">Rent-A-Wheel</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Home
            </Link>
            <Link href="/cars" className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Browse Cars
            </Link>
            <Link href="/booking" className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Book Now
            </Link>
            <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 cursor-pointer">
              My Bookings
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <button className="text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap">
                Sign Up
              </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                Home
              </Link>
              <Link href="/cars" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                Browse Cars
              </Link>
              <Link href="/booking" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                Book Now
              </Link>
              <Link href="/my-bookings" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                My Bookings
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                Contact
              </Link>
              <div className="border-t pt-2">
                <Link href="/login" className="block px-3 py-2 text-blue-600 hover:text-blue-700 cursor-pointer">
                  Sign In
                </Link>
                <Link href="/register" className="block px-3 py-2 text-blue-600 hover:text-blue-700 cursor-pointer">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}