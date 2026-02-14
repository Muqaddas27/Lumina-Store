
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.some(p => p.id === product.id);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        {product.salePrice && (
          <div className="absolute top-4 left-4 bg-red-500 dark:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            SALE
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-10"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: isInWishlist ? '#ef4444' : 'currentColor' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 p-3 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link to={`/products/${product.slug}`} className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center flex-shrink-0">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs ml-1 font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">{product.description}</p>
        
        <div className="flex items-center space-x-2">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${(product.salePrice || product.price).toFixed(2)}
          </p>
          {product.salePrice && (
            <p className="text-sm text-gray-400 dark:text-gray-500 line-through">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
