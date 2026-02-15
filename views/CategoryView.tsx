
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../lib/constants';
import ProductCard from '../components/ProductCard';
import SafeImage from '../components/SafeImage';

const CategoryView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = CATEGORIES.find(c => c.slug === slug);
  
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(1000);

  const products = useMemo(() => {
    let filtered = INITIAL_PRODUCTS.filter(p => p.category === slug);
    filtered = filtered.filter(p => (p.salePrice || p.price) <= priceRange);
    
    if (sortBy === 'price-low') filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    if (sortBy === 'price-high') filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    
    return filtered;
  }, [slug, sortBy, priceRange]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold">Category not found</h2>
        <Link to="/" className="text-indigo-600 mt-4 block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10 overflow-x-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden mb-10 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative h-48 sm:h-64 md:h-80">
          <SafeImage 
            src={category.image} 
            alt={category.name} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 md:px-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white capitalize mb-2 sm:mb-4">{category.name}</h1>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl">Browse our latest collection in {category.name}. From premium essentials to daily favorites.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Sort By</h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Max Price: ${priceRange}</h3>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="text-indigo-900 font-bold mb-2">Need help?</h4>
            <p className="text-indigo-700 text-sm mb-4">Our AI assistant can help you find the perfect product.</p>
            <button
              className="text-indigo-600 font-bold text-sm hover:underline"
              onClick={() => window.dispatchEvent(new Event('lumina:open-chat'))}
            >
              Chat Now
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-500">No products found matching your criteria.</p>
              <button onClick={() => setPriceRange(1000)} className="text-indigo-600 mt-4 font-bold">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;


