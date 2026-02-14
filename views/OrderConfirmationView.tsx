
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const OrderConfirmationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useStore();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return <Navigate to="/account/orders" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-500">Thank you for your purchase. Your order number is <span className="font-bold text-indigo-600">#{order.id}</span></p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Details</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.images[0]} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex justify-between items-center">
          <span className="font-bold text-gray-900">Total Paid</span>
          <span className="text-2xl font-extrabold text-gray-900">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          to="/account/orders" 
          className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl text-center hover:bg-gray-50 transition-all"
        >
          View All Orders
        </Link>
        <Link 
          to="/" 
          className="flex-1 bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-center shadow-lg hover:bg-indigo-700 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationView;
