import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import SafeImage from './SafeImage';
import { useTheme } from '../lib/ThemeContext';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useStore();
  const { theme } = useTheme();

  const total = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = originalTotal - total;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={toggleCart}></div>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button 
                onClick={toggleCart} 
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-4">
                  {/* Animated Empty State Container */}
                  <div className="w-full max-w-xs">
                    {/* Large Animated Icon */}
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full blur-2xl opacity-75 animate-pulse"></div>
                      <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center shadow-xl border-4 border-indigo-200 dark:border-indigo-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Your Cart is Empty
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-2">
                        Looks like you haven't added anything yet.
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        Explore our amazing collection and find something you love!
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-8 border border-indigo-200 dark:border-indigo-800">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Easy returns & exchanges</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">24/7 customer support</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={toggleCart}
                      className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mb-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Start Shopping
                    </button>

                    {/* Secondary Text */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-500">
                      Browse our collection and add products to your cart
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li 
                      key={item.id} 
                      className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-md dark:hover:shadow-lg"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-20 h-20 relative">
                          <SafeImage 
                            src={item.images[0]} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-all duration-200" 
                          />
                          <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                            {item.quantity}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-block px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-md capitalize">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Price Info */}
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                              </p>
                              {item.salePrice && item.salePrice < item.price && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls and Remove */}
                      <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-all duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="font-semibold text-gray-900 dark:text-white w-6 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-all duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer - Summary & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3 bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${originalTotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-sm border-t border-gray-100 dark:border-gray-800 pt-3">
                      <span className="text-green-600 dark:text-green-400 font-medium">You save</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-base font-bold border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-indigo-600 dark:text-indigo-400 text-lg">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">Shipping and taxes calculated at checkout</p>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="flex justify-center items-center gap-2 px-6 py-4 rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 1h4l.35 2h13.12l-3.32 8h-10l-2.21-6h-4.04m4 15c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1m12 0c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1" />
                  </svg>
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={toggleCart}
                  className="w-full py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
