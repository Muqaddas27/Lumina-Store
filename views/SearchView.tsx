
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { INITIAL_PRODUCTS } from '../lib/constants';
import ProductCard from '../components/ProductCard';

const SearchView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  const results = useMemo(() => {
    if (!query) return [];
    return INITIAL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">Search Results</h1>
        <form onSubmit={handleSearch} className="max-w-2xl relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products, brands, or categories..."
            className="w-full bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-2xl px-6 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {!query ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">Enter a search term to find products.</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">No results found for "<span className="font-bold text-gray-900 dark:text-gray-100">{query}</span>"</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try checking your spelling or using more general terms.</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Found {results.length} products for "{query}"</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchView;
