
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pt-16 pb-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">LUMINA</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
              Modern e-commerce for the contemporary lifestyle. Premium products, AI-driven recommendations, and seamless shopping experience.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Links */}
              <a href="https://facebook.com/lumina" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition-all group">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 group-hover:fill-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com/lumina" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-white transition-all group">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 group-hover:fill-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.856.969 5 5 0 00-8.315-2.27 5 5 0 00-1.584 6.059 15 15 0 01-10.88-5.48c-1.02.55-2.005 1.23-2.916 2.07a5 5 0 001.548 6.88 5 5 0 01-2.273-.632v.06a5 5 0 004.007 4.9 5 5 0 01-2.25.085 5.004 5.004 0 004.659 3.468 10.005 10.005 0 01-6.169 2.131 14.991 14.991 0 008.134 2.381c9.798 0 15.158-8.612 15.123-16.06 0-.244-.005-.487-.015-.73a10.812 10.812 0 002.658-2.76z"/>
                </svg>
              </a>
              <a href="https://instagram.com/lumina" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-pink-600 dark:hover:bg-pink-700 hover:text-white transition-all group">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 group-hover:fill-white" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/lumina" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-blue-700 dark:hover:bg-blue-800 hover:text-white transition-all group">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 group-hover:fill-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/category/electronics" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Electronics</Link></li>
              <li><Link to="/category/fashion" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Fashion</Link></li>
              <li><Link to="/category/home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home & Living</Link></li>
              <li><Link to="/category/accessories" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQs</Link></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/account" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">My Profile</Link></li>
              <li><Link to="/account/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Order Tracking</Link></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-400 dark:text-gray-500 font-medium">
          <p>&copy; 2026 Lumina Store Inc. All rights reserved.</p>
          <div className="flex space-x-6 items-center">
            <span className="flex items-center"><span className="w-2 h-2 bg-green-500 dark:bg-green-600 rounded-full mr-2"></span> System Status: Online</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
