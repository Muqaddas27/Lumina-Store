
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import SafeImage from '../components/SafeImage';

const CartView: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-6 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover something new today!</p>
        <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 dark:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-10">Shopping Cart ({cart.length} items)</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
            {cart.map((item) => (
              <li key={item.id} className="flex py-8 sm:py-10">
                <div className="flex-shrink-0 w-24 sm:w-32 aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <SafeImage src={item.images[0]} alt={item.name} className="w-full h-full object-center object-cover" />
                </div>

                <div className="ml-6 flex-1 flex flex-col justify-between">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">
                          <Link to={`/products/${item.slug}`}>{item.name}</Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">{item.category}</p>
                      <p className="mt-2 text-base font-bold text-gray-900 dark:text-gray-100">
                        ${(item.salePrice || item.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
                      <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl px-2 sm:px-3 py-1 bg-white dark:bg-gray-800">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">-</button>
                        <span className="mx-2 sm:mx-4 font-bold text-gray-900 dark:text-gray-100 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="mt-16 lg:mt-0 lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-600">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base text-gray-600">
                <p>Shipping</p>
                <p>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-xl font-extrabold text-gray-900">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full flex justify-center items-center px-6 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="mt-6 flex flex-col space-y-4">
               <div className="flex items-center space-x-2 text-xs text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
                 <span>Secure 256-bit SSL encrypted payments</span>
               </div>
               <p className="text-xs text-center text-indigo-600">Free shipping on orders over $150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;


