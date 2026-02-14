
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { INITIAL_PRODUCTS } from '../lib/constants';

const AdminView: React.FC = () => {
  const { user } = useStore();
  const location = useLocation();

  if (user?.role !== 'ADMIN') {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-500 mt-2">You need administrator privileges to view this page.</p>
        <Link to="/" className="text-indigo-600 mt-4 block underline">Return to Shop</Link>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', path: '/admin' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Customers', path: '/admin/users' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar */}
        <nav className="w-full md:w-64 space-y-2 flex-shrink-0">
          <h2 className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-4 mb-4">Admin Console</h2>
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-xl font-medium transition-all ${location.pathname === item.path ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[600px]">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="*" element={<div className="py-20 text-center text-gray-500 dark:text-gray-400 italic">This module is coming soon in the next update.</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$24,560', change: '+12%', color: 'bg-green-100 text-green-700' },
    { label: 'Active Orders', value: '142', change: '+5%', color: 'bg-indigo-100 text-indigo-700' },
    { label: 'New Customers', value: '28', change: '+18%', color: 'bg-blue-100 text-blue-700' },
    { label: 'Stock Alerts', value: '4', change: '-2%', color: 'bg-red-100 text-red-700' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-gray-500">{s.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.color}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold">New order #LUM-5421</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900">$129.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Inventory</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm">+ Add Product</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {INITIAL_PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-bold text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-4 text-sm capitalize">{p.category}</td>
                <td className="py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="py-4 font-bold text-sm">${p.price}</td>
                <td className="py-4 text-right space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">Edit</button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminView;


