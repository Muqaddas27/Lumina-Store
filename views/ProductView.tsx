
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_PRODUCTS } from '../lib/constants';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const ProductView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = INITIAL_PRODUCTS.find(p => p.slug === slug);
  const { addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-indigo-600 mt-4 block">Back to Home</Link>
      </div>
    );
  }

  const relatedProducts = INITIAL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{product.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        {/* Image Gallery */}
        <div className="flex flex-col">
          <div className="aspect-square bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
            <img 
              src={product.images[activeImage] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-center object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-indigo-600' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{product.name}</h1>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>★</span>
              ))}
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">${(product.salePrice || product.price).toFixed(2)}</p>
            {product.salePrice && (
              <p className="ml-4 text-xl text-gray-400 dark:text-gray-500 line-through">${product.price.toFixed(2)}</p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Description</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-700 shadow-lg active:scale-95 transition-all flex justify-center items-center"
            >
              Add to Cart
            </button>
            <button className="p-4 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Free Worldwide Delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">2 Year Official Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-gray-100 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductView;
