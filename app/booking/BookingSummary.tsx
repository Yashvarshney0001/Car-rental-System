'use client';

import { useMemo } from 'react';

interface BookingSummaryProps {
  bookingData: any;
  selectedCar: any;
}

export default function BookingSummary({ bookingData, selectedCar }: BookingSummaryProps) {
  const availableExtras = [
    { id: 'gps', name: 'GPS Navigation', price: 200 },
    { id: 'insurance', name: 'Full Insurance', price: 500 },
    { id: 'child-seat', name: 'Child Seat', price: 300 },
    { id: 'wifi', name: 'Mobile WiFi', price: 150 }
  ];

  const summary = useMemo(() => {
    if (!selectedCar || !bookingData.pickupDate || !bookingData.returnDate) {
      return null;
    }

    const pickup = new Date(bookingData.pickupDate);
    const returnDate = new Date(bookingData.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));

    const basePrice = selectedCar.price * days;
    const extrasPrice = (bookingData.extras || []).reduce((total: number, extraId: string) => {
      const extra = availableExtras.find(e => e.id === extraId);
      return total + (extra ? extra.price * days : 0);
    }, 0);

    const subtotal = basePrice + extrasPrice;
    const tax = subtotal * 0.18; 
    const total = subtotal + tax;

    return {
      days,
      basePrice,
      extrasPrice,
      subtotal,
      tax,
      total
    };
  }, [selectedCar, bookingData.pickupDate, bookingData.returnDate, bookingData.extras]);

  if (!selectedCar) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
        <p className="text-gray-500">Select a car to see pricing details</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

      <div className="mb-6">
        <div className="h-32 bg-gray-200 rounded-lg mb-3">
          <img 
            src={`https://readdy.ai/api/search-image?query=$%7BselectedCar.image%7D&width=300&height=200&seq=summary-${selectedCar.id}&orientation=landscape`}
            alt={selectedCar.name}
            className="w-full h-full object-cover object-top rounded-lg"
          />
        </div>
        <h4 className="font-semibold">{selectedCar.name}</h4>
        <p className="text-gray-600 text-sm">{selectedCar.category}</p>
      </div>

      {bookingData.pickupDate && bookingData.returnDate && (
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Pickup:</span>
            <span>{new Date(bookingData.pickupDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Return:</span>
            <span>{new Date(bookingData.returnDate).toLocaleDateString()}</span>
          </div>
          {bookingData.pickupLocation && (
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="text-right text-xs">{bookingData.pickupLocation.split(' - ')[0]}</span>
            </div>
          )}
        </div>
      )}

      {summary && (
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span>Car rental ({summary.days} days)</span>
            <span>₹{summary.basePrice}</span>
          </div>

          {bookingData.extras && bookingData.extras.length > 0 && (
            <div className="space-y-2">
              {bookingData.extras.map((extraId: string) => {
                const extra = availableExtras.find(e => e.id === extraId);
                return extra ? (
                  <div key={extraId} className="flex justify-between text-sm text-gray-600">
                    <span>{extra.name}</span>
                    <span>₹{extra.price * summary.days}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{summary.subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>GST (18%)</span>
            <span>₹{(summary.subtotal * 0.18).toFixed(2)}</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-600">₹{(summary.subtotal * 1.18).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center text-blue-800 text-sm">
          <i className="ri-information-line text-blue-600 mr-2"></i>
          <span>Free cancellation up to 24 hours before pickup</span>
        </div>
      </div>
    </div>
  );
}
