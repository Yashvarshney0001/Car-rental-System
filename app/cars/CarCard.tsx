
'use client';

import Link from 'next/link';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    features: string[];
    transmission: string;
    fuel: string;
    seats: number;
    available: boolean;
  };
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={`https://readdy.ai/api/search-image?query=$%7Bcar.image%7D&width=400&height=300&seq=car-${car.id}&orientation=landscape`}
          alt={car.name}
          className="w-full h-full object-cover object-top"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Not Available
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{car.name}</h3>
          <p className="text-gray-600 text-sm">{car.category}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <i className="ri-user-line mr-1"></i>
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center">
            <i className="ri-settings-line mr-1"></i>
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-gas-station-line mr-1"></i>
            <span>{car.fuel}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">₹{car.price}</span>
            <span className="text-gray-600 text-sm">/day</span>
          </div>
          <Link href={`/booking?car=${car.id}`}>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                car.available
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!car.available}
            >
              {car.available ? 'Book Now' : 'Unavailable'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
