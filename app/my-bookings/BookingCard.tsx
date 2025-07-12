'use client';

import { useState } from 'react';

interface BookingCardProps {
  booking: any;
  onCancel: (bookingId: string) => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = new Date(booking.pickupDate) > new Date();
  const canCancel = isUpcoming && booking.status === 'confirmed';

  const handleCancel = () => {
    onCancel(booking.id);
    setShowCancelModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0">
              <img 
                src={`https://readdy.ai/api/search-image?query=$%7Bbooking.car%3F.name%20%7C%7C%20rental%20car%7D%20professional%20automotive%20photography&width=200&height=150&seq=booking-${booking.id}&orientation=landscape`}
                alt={booking.car?.name || 'Car'}
                className="w-full h-full object-cover object-top rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{booking.car?.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-calendar-line"></i>
                  <span>{formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line"></i>
                  <span>{booking.pickupLocation?.split(' - ')[0] || 'Location'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-user-line"></i>
                  <span>{booking.customerInfo?.firstName} {booking.customerInfo?.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-price-tag-line"></i>
                  <span className="font-semibold text-blue-600">
                    ${booking.car?.price}/day
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
            
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>

        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-mono">{booking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Location:</span>
                    <span>{booking.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return Location:</span>
                    <span>{booking.returnLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booked On:</span>
                    <span>{formatDate(booking.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{booking.customerInfo?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{booking.customerInfo?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">License:</span>
                    <span>{booking.customerInfo?.driverLicense}</span>
                  </div>
                </div>
              </div>
            </div>

            {booking.extras && booking.extras.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Additional Services</h4>
                <div className="flex flex-wrap gap-2">
                  {booking.extras.map((extra: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {extra.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Cancel Booking</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelModal(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}