
'use client';

import Header from '../../components/Header';
import CarCard from './CarCard';
import SearchFilter from './SearchFilter';
import { useState, useEffect } from 'react';

interface Car {
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
}

const mockCars: Car[] = [
  {
    id: '1',
    name: 'Maruti Suzuki WagonR',
    brand: 'Maruti Suzuki',
    category: 'Hatchback',
    price: 1200,
    image: '2023 Maruti Suzuki WagonR official product photography white color tall hatchback car Indian automotive studio lighting clean white background professional car photography front three quarter view',
    features: ['AC', 'Power Steering', 'Central Locking', 'Music System'],
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    available: true
  },
  {
    id: '2',
    name: 'Tata Nexon',
    brand: 'Tata',
    category: 'SUV',
    price: 2500,
    image: '2023 Tata Nexon official product photography blue metallic color compact SUV Indian automotive studio lighting clean white background professional car photography front three quarter view modern design',
    features: ['Touchscreen', 'Reverse Camera', 'Push Start', 'Climate Control'],
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    available: true
  },
  {
    id: '3',
    name: 'Maruti Suzuki Alto',
    brand: 'Maruti Suzuki',
    category: 'Economy',
    price: 800,
    image: '2023 Maruti Suzuki Alto K10 official product photography silver color small hatchback car Indian automotive studio lighting clean white background professional car photography front three quarter view compact design',
    features: ['Basic AC', 'Power Steering', 'Music System', 'Central Locking'],
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 4,
    available: true
  },
  {
    id: '4',
    name: 'Hyundai i10',
    brand: 'Hyundai',
    category: 'Hatchback',
    price: 1000,
    image: '2023 Hyundai Grand i10 NIOS official product photography red color compact hatchback Indian automotive studio lighting clean white background professional car photography front three quarter view',
    features: ['AC', 'Power Windows', 'ABS', 'Airbags'],
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    available: true
  },
  {
    id: '5',
    name: 'Hyundai i20',
    brand: 'Hyundai',
    category: 'Premium',
    price: 1800,
    image: '2023 Hyundai i20 official product photography white pearl color premium hatchback car Indian automotive studio lighting clean white background professional car photography front three quarter view sporty design',
    features: ['Touchscreen', 'Bluetooth', 'Reverse Camera', 'Alloy Wheels'],
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    available: true
  },
  {
    id: '6',
    name: 'Maruti Suzuki Swift',
    brand: 'Maruti Suzuki',
    category: 'Hatchback',
    price: 1500,
    image: '2023 Maruti Suzuki Swift official product photography blue color hatchback car sporty design Indian automotive studio lighting clean white background professional car photography front three quarter view',
    features: ['Touchscreen', 'Steering Controls', 'ABS', 'Airbags'],
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    available: true
  }
];

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: [0, 3000],
    transmission: 'All',
    fuel: 'All'
  });

  useEffect(() => {
    let filtered = cars.filter(car => {
      const categoryMatch = filters.category === 'All' || car.category === filters.category;
      const priceMatch = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      const transmissionMatch = filters.transmission === 'All' || car.transmission === filters.transmission;
      const fuelMatch = filters.fuel === 'All' || car.fuel === filters.fuel;
      
      return categoryMatch && priceMatch && transmissionMatch && fuelMatch;
    });

    setFilteredCars(filtered);
  }, [filters, cars]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Browse Our Fleet</h1>
          <p className="text-gray-600 text-lg">Choose from our wide selection of reliable vehicles in Delhi NCR</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SearchFilter 
              filters={filters} 
              setFilters={setFilters}
              totalCars={filteredCars.length}
            />
          </div>
          
          <div className="lg:w-3/4">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-car-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
