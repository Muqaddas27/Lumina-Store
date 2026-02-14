
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

const CheckoutView: React.FC = () => {
  const { cart, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const orderId = `LUM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const newOrder = {
      id: orderId,
      userId: user?.id || 'guest',
      items: [...cart],
      total: total,
      status: 'PROCESSING' as const,
      createdAt: new Date().toISOString(),
      paymentMethod: 'Stripe Credit Card',
      shippingAddress: {
        fullName: 'Test User',
        street: '123 Fake Street',
        city: 'Anytown',
        zipCode: '12345',
        country: 'United States'
      }
    };
    
    placeOrder(newOrder);
    setLoading(false);
    navigate(`/order-confirmation/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your cart is empty</h2>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 mt-4 block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-16">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8">Shipping Details</h2>
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Full Name</label>
                <input type="text" required className="w-full bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue={user?.name} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Address</label>
                <input type="text" required className="w-full bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">City</label>
                <input type="text" required className="w-full bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Zip Code</label>
                <input type="text" required className="w-full bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Payment Information</h3>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <div className="p-4 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg mb-4">
                  Demo Mode: You can use any dummy card details.
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                  <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input type="text" placeholder="CVV" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className={`w-full mt-10 py-4 px-8 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {loading ? <span>Processing...</span> : <span>Confirm & Pay ${total.toFixed(2)}</span>}
            </button>
          </form>
        </div>

        <div className="mt-16 lg:mt-0">
          <div className="bg-white rounded-3xl p-8 sticky top-24 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Order</h3>
            <ul className="divide-y divide-gray-100 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-white">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">${((item.salePrice || item.price) * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Shipping</p>
                <p>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-gray-900">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
