
'use client';

import Header from '../../components/Header';
import BookingForm from './BookingForm';
import BookingSummary from './BookingSummary';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface BookingData {
  car: any;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    driverLicense: string;
  };
  extras: string[];
  totalPrice: number;
}

const mockCars = [
  {
    id: '1',
    name: 'Maruti Suzuki WagonR',
    brand: 'Maruti Suzuki',
    category: 'Hatchback',
    price: 1200,
    image: 'Maruti Suzuki WagonR white color compact hatchback car in Indian urban setting clean modern background affordable family car Delhi NCR'
  },
  {
    id: '2',
    name: 'Tata Nexon',
    brand: 'Tata',
    category: 'SUV',
    price: 2500,
    image: 'Tata Nexon compact SUV blue color modern Indian SUV parked in Delhi setting clean urban background popular rental vehicle'
  },
  {
    id: '3',
    name: 'Maruti Suzuki Alto',
    brand: 'Maruti Suzuki',
    category: 'Economy',
    price: 800,
    image: 'Maruti Suzuki Alto K10 silver color small hatchback car Indian roads clean background budget friendly car Delhi Greater Noida'
  },
  {
    id: '4',
    name: 'Hyundai i10',
    brand: 'Hyundai',
    category: 'Hatchback',
    price: 1000,
    image: 'Hyundai Grand i10 red color compact hatchback Indian urban setting clean modern background popular city car Delhi NCR'
  },
  {
    id: '5',
    name: 'Hyundai i20',
    brand: 'Hyundai',
    category: 'Premium',
    price: 1800,
    image: 'Hyundai i20 premium hatchback white color stylish compact car Indian market clean modern background popular rental choice Greater Noida'
  },
  {
    id: '6',
    name: 'Maruti Suzuki Swift',
    brand: 'Maruti Suzuki',
    category: 'Hatchback',
    price: 1500,
    image: 'Maruti Suzuki Swift hatchback car blue color sporty design Indian roads clean background popular rental car Delhi NCR'
  }
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const carId = searchParams.get('car');

  const [selectedCar, setSelectedCar] = useState(carId ? mockCars.find(car => car.id === carId) : null);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      driverLicense: ''
    },
    extras: [],
    totalPrice: 0
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleBookingUpdate = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const handleCarSelect = (car: any) => {
    setSelectedCar(car);
    setBookingData(prev => ({ ...prev, car }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Car</h1>
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm ${
                  step <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step === 1 ? 'Select Car' : step === 2 ? 'Details' : 'Confirmation'}
                </span>
                {step < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Select Your Car</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockCars.map(car => (
                    <div 
                      key={car.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedCar?.id === car.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleCarSelect(car)}
                    >
                      <div className="h-32 bg-gray-200 rounded-lg mb-4">
                        <img 
                          src={`https://readdy.ai/api/search-image?query=${car.image}&width=300&height=200&seq=booking-car-${car.id}&orientation=landscape`}
                          alt={car.name}
                          className="w-full h-full object-cover object-top rounded-lg"
                        />
                      </div>
                      <h3 className="font-semibold text-lg">{car.name}</h3>
                      <p className="text-gray-600">{car.category}</p>
                      <p className="text-blue-600 font-bold text-xl">${car.price}/day</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={handleNext}
                    disabled={!selectedCar}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <BookingForm 
                bookingData={bookingData}
                onUpdate={handleBookingUpdate}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Booking Confirmation</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <i className="ri-check-circle-fill text-green-500 text-2xl mr-3"></i>
                    <div>
                      <h3 className="text-green-800 font-semibold">Booking Confirmed!</h3>
                      <p className="text-green-700">Your rental has been successfully booked.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Booking Reference</h4>
                    <p className="text-gray-600">RAW{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Next Steps</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Check your email for confirmation details</li>
                      <li>• Bring your driver's license and credit card</li>
                      <li>• Arrive 15 minutes early for pickup</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <BookingSummary 
              bookingData={bookingData}
              selectedCar={selectedCar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
