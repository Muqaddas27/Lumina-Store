
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const AuthView: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-10 text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xl">L</div>
            <span className="text-2xl font-bold tracking-tight text-white">LUMINA</span>
          </Link>
          <h2 className="text-white font-bold text-xl opacity-90">Welcome to Premium Shopping</h2>
        </div>
        <div className="p-8">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
        <input 
          type="password" 
          required 
          placeholder="••••••••"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">
        Sign In
      </button>
      <div className="text-center text-sm text-gray-500">
        Don't have an account? <Link to="/auth/register" className="text-indigo-600 font-bold hover:underline">Sign up</Link>
      </div>
    </form>
  );
};

const RegisterForm = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name + '@example.com');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
        <input 
          type="email" 
          required 
          placeholder="you@example.com"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
        <input 
          type="password" 
          required 
          placeholder="••••••••"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">
        Create Account
      </button>
      <div className="text-center text-sm text-gray-500">
        Already have an account? <Link to="/auth/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
      </div>
    </form>
  );
};

export default AuthView;
