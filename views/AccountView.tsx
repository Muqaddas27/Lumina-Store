
import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const AccountView: React.FC = () => {
  const { user, logout } = useStore();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar */}
        <nav className="w-full md:w-64 space-y-2 flex-shrink-0">
          <div className="flex items-center space-x-3 px-4 mb-6 md:mb-8">
            <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-sm font-bold text-white bg-indigo-600">
              {user.image ? <img src={user.image} className="w-full h-full rounded-full object-cover" alt={user.name} /> : user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-100 leading-none">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
            </div>
          </div>
          <Link to="/account" className="block px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Profile Overview</Link>
          <Link to="/account/edit" className="block px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Edit Profile</Link>
          <Link to="/account/orders" className="block px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">My Orders</Link>
          <Link to="/account/wishlist" className="block px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Wishlist</Link>
          <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">Logout</button>
        </nav>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[500px]">
          <Routes>
            <Route path="/" element={<ProfileOverview user={user} />} />
            <Route path="/edit" element={<EditProfile user={user} />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="*" element={<div className="py-20 text-center text-gray-500 dark:text-gray-400 italic">Page coming soon.</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const ProfileOverview = ({ user }: { user: any }) => (
  <div>
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Profile</h1>
      <Link to="/account/edit" className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 font-medium text-sm transition-colors">
        Edit Profile
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full border-2 border-indigo-100 dark:border-indigo-600 flex items-center justify-center text-lg font-bold text-white bg-indigo-600 overflow-hidden">
            {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Account Role</label>
            <p className="text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 inline-block px-3 py-1 rounded-full font-bold">{user.role}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Account Security</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline\">Change Password</button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2\">Last changed 3 months ago</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800\">
          <div className="flex items-center justify-between mb-4\">
            <h3 className="font-bold text-gray-900 dark:text-gray-100\">Email Verified</h3>
            <svg xmlns="http://www.w3.org/2000/svg\" className="h-6 w-6 text-green-600 dark:text-green-400\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor\">
              <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300\">Your email address is verified and secure.</p>
        </div>
      </div>
    </div>
  </div>
);

const EditProfile = ({ user }: { user: any }) => {
  const { updateProfile } = useStore();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    image: user.image || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h1>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-green-800 font-medium">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
          <img src={formData.image || user.image} alt={formData.name} className="w-24 h-24 rounded-full border-4 border-indigo-100 object-cover" />
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Profile Picture URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">Enter a URL for your profile picture</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-blue-900">Profile Information</h4>
              <p className="text-xs text-blue-700 mt-1">Your profile information is stored securely and will be updated across all your sessions.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Link to="/account" className="px-6 py-2.5 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const OrdersList = () => {
  const { orders } = useStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Order History</h1>
      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-gray-500 italic mb-2">No orders found yet.</p>
          <p className="text-sm text-gray-400 mb-6">Start shopping to see your order history here.</p>
          <Link to="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-2xl p-6 bg-gray-50 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: <span className="font-bold text-indigo-600">#{order.id}</span></p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    order.status === 'PROCESSING' ? 'bg-indigo-100 text-indigo-700' : 
                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={item.images[0]} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500">Total Charged</span>
                <span className="text-xl font-extrabold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountView;


