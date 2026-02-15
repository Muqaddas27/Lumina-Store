
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import SafeImage from '../components/SafeImage';

const OrderConfirmationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useStore();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return <Navigate to="/account/orders" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-6 py-12 sm:py-16 overflow-x-hidden">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4 sm:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Order Confirmed!</h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 px-4">Thank you for your purchase. Your order number is <span className="font-bold text-indigo-600 dark:text-indigo-400">#{order.id}</span></p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order Details</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                  <SafeImage src={item.images[0]} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0" alt={item.name} />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
          <span className="font-bold text-gray-900 dark:text-gray-100">Total Paid</span>
          <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          to="/account/orders" 
          className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-4 px-6 sm:px-8 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          View All Orders
        </Link>
        <Link 
          to="/" 
          className="flex-1 bg-indigo-600 dark:bg-indigo-700 text-white font-bold py-4 px-6 sm:px-8 rounded-xl text-center shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationView;


