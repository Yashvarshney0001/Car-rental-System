'use client';

import Header from '../../components/Header';
import BookingCard from './BookingCard';
import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  car: any;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  customerInfo: any;
  extras: string[];
  status: string;
  createdAt: string;
  totalPrice?: number;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookings from localStorage (simulating database)
    const savedBookings = localStorage.getItem('rentawheelBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    setLoading(false);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return new Date(booking.pickupDate) > new Date();
    }
    if (filter === 'completed') {
      return new Date(booking.returnDate) < new Date();
    }
    return booking.status === filter;
  });

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('rentawheelBookings', JSON.stringify(updatedBookings));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <i className="ri-loader-4-line text-4xl text-blue-600 animate-spin"></i>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600">Manage your car rental reservations</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-calendar-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' ? "You haven't made any bookings yet." : `No ${filter} bookings found.`}
            </p>
            <a 
              href="/booking"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block cursor-pointer whitespace-nowrap"
            >
              Book Your First Car
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}