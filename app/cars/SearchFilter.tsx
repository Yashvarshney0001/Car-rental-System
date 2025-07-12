
'use client';

import { useState } from 'react';

interface SearchFilterProps {
  filters: {
    category: string;
    priceRange: number[];
    transmission: string;
    fuel: string;
  };
  setFilters: (filters: any) => void;
  totalCars: number;
}

export default function SearchFilter({ filters, setFilters, totalCars }: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['All', 'Economy', 'Hatchback', 'Premium', 'SUV'];
  const transmissions = ['All', 'Manual', 'Automatic'];
  const fuels = ['All', 'Petrol', 'Diesel', 'CNG'];

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      priceRange: [0, 3000],
      transmission: 'All',
      fuel: 'All'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-blue-600 text-sm hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {totalCars} car{totalCars !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-semibold mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-semibold mb-3">Price Range (₹/day)</h4>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹0</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Transmission Filter */}
        <div>
          <h4 className="font-semibold mb-3">Transmission</h4>
          <div className="space-y-2">
            {transmissions.map(transmission => (
              <label key={transmission} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="transmission"
                  value={transmission}
                  checked={filters.transmission === transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{transmission}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Filter */}
        <div>
          <h4 className="font-semibold mb-3">Fuel Type</h4>
          <div className="space-y-2">
            {fuels.map(fuel => (
              <label key={fuel} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="fuel"
                  value={fuel}
                  checked={filters.fuel === fuel}
                  onChange={(e) => handleFilterChange('fuel', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{fuel}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-green-50 rounded-lg">
        <div className="flex items-center text-green-800 text-sm">
          <i className="ri-shield-check-line text-green-600 mr-2"></i>
          <span>All cars are sanitized and insured</span>
        </div>
      </div>
    </div>
  );
}
