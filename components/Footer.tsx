
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
              {/* Social icons (Mock) */}
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm"></div>
                </a>
              ))}
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
