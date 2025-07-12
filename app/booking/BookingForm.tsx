
'use client';

import { useState } from 'react';

interface BookingFormProps {
  bookingData: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function BookingForm({ bookingData, onUpdate, onNext, onPrevious }: BookingFormProps) {
  const [formData, setFormData] = useState({
    pickupDate: bookingData.pickupDate || '',
    returnDate: bookingData.returnDate || '',
    pickupLocation: bookingData.pickupLocation || '',
    returnLocation: bookingData.returnLocation || '',
    firstName: bookingData.customerInfo?.firstName || '',
    lastName: bookingData.customerInfo?.lastName || '',
    email: bookingData.customerInfo?.email || '',
    phone: bookingData.customerInfo?.phone || '',
    driverLicense: bookingData.customerInfo?.driverLicense || '',
    extras: bookingData.extras || []
  });

  const locations = [
    'Pari Chowk, Greater Noida',
    'Delhi Airport Terminal 3',
    'Connaught Place, New Delhi',
    'Sector 18, Noida',
    'Gurgaon Cyber City',
    'Dwarka Metro Station'
  ];

  const availableExtras = [
    { id: 'gps', name: 'GPS Navigation', price: 200 },
    { id: 'insurance', name: 'Full Insurance', price: 500 },
    { id: 'child-seat', name: 'Child Seat', price: 300 },
    { id: 'wifi', name: 'Mobile WiFi', price: 150 }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExtraToggle = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((id: string) => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const handleSubmit = () => {
    const customerInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      driverLicense: formData.driverLicense
    };

    onUpdate({
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      pickupLocation: formData.pickupLocation,
      returnLocation: formData.returnLocation,
      customerInfo,
      extras: formData.extras
    });

    // Save to localStorage (simulating database)
    const booking = {
      id: Date.now().toString(),
      ...bookingData,
      ...formData,
      customerInfo,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('rentawheelBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('rentawheelBookings', JSON.stringify(existingBookings));

    onNext();
  };

  const isFormValid = formData.pickupDate && formData.returnDate && formData.pickupLocation && 
                     formData.firstName && formData.lastName && formData.email && formData.phone && formData.driverLicense;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
      
      <form id="booking-form" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              min={formData.pickupDate || new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
            <div className="relative">
              <select
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select pickup location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Return Location</label>
            <div className="relative">
              <select
                name="returnLocation"
                value={formData.returnLocation}
                onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select return location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Driver License Number</label>
              <input
                type="text"
                name="driverLicense"
                value={formData.driverLicense}
                onChange={(e) => handleInputChange('driverLicense', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {availableExtras.map(extra => (
              <label key={extra.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.extras.includes(extra.id)}
                  onChange={() => handleExtraToggle(extra.id)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <span className="font-medium">{extra.name}</span>
                  <span className="text-blue-600 font-semibold ml-2">+${extra.price}/day</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button 
            type="button"
            onClick={onPrevious}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Previous
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
