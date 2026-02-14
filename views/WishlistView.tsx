
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const WishlistView: React.FC = () => {
  const { wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">My Wishlist</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later.</p>
        </div>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Continue Shopping</Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[400px]">
          <div className="text-center py-20">
            <div className="mb-6 flex justify-center text-gray-300 dark:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Save items you love to your wishlist and they'll appear here.</p>
            <Link to="/" className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all">
              Find Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;


