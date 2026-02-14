
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTheme } from '../lib/ThemeContext';
import { getAvatarFallback, getAvatarBackgroundColor } from '../lib/avatarUtils';
import { CATEGORIES } from '../lib/constants';

const Header: React.FC = () => {
  const { cart, user, wishlist, toggleCart, logout } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-morphism border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800/90">
        {/* Top Bar */}
        <div className="bg-indigo-600 dark:bg-indigo-700 text-white text-center py-2 text-xs sm:text-sm font-medium">
          <span>Free shipping on orders over $150 | 30-Day Returns</span>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold tracking-tight text-indigo-600 hidden sm:block">LUMINA</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Home
              </Link>
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1">
                  <span>Categories</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Categories Dropdown */}
                <div className="absolute left-0 w-56 mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {CATEGORIES.map((cat) => (
                    <Link 
                      key={cat.id}
                      to={`/category/${cat.slug}`} 
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg mr-3 object-cover" />
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                  <Link 
                    to="/search?q=" 
                    className="block px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border-t border-gray-100 dark:border-gray-700 mt-2"
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
              <Link to="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden lg:block relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-none rounded-full px-4 py-2 text-sm w-48 focus:w-64 transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Mobile Search Button */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors hidden sm:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-1 focus:outline-none">
                    <div className={`h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs font-bold text-white ${getAvatarBackgroundColor(user.name)}`}>
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="h-full w-full rounded-full object-cover" />
                      ) : (
                        getAvatarFallback(user.name)
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden xl:block">{user.name.split(' ')[0]}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 dark:text-gray-500 hidden xl:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 w-56 mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                    </div>
                    {user.role === 'ADMIN' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-bold">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Admin Dashboard
                        </span>
                      </Link>
                    )}
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">My Profile</Link>
                    <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">My Orders</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Wishlist</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 border-t border-gray-100 dark:border-gray-700 mt-1">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/auth/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                  Login
                </Link>
              )}

              {/* Cart */}
              <button 
                onClick={toggleCart}
                className="relative px-4 py-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 dark:bg-red-600 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">L</div>
                  <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">LUMINA</span>
                </div>
                <button onClick={closeMobileMenu} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile User Section */}
              {user && (
                <div className="flex items-center space-x-3 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl mb-6">
                  <div className={`h-12 w-12 rounded-full border-2 border-indigo-200 dark:border-indigo-600 flex items-center justify-center text-sm font-bold text-white ${getAvatarBackgroundColor(user.name)}`}>
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      getAvatarFallback(user.name)
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link to="/" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                  <p className="px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Categories</p>
                  {CATEGORIES.map((cat) => (
                    <Link 
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg mr-3 object-cover" />
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
                <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="px-2 py-1 text-xs font-bold text-white bg-pink-500 dark:bg-pink-600 rounded-full">{wishlistCount}</span>
                  )}
                </Link>
                <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
                <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
                <Link to="/faq" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </nav>

              {/* Mobile User Actions */}
              {user ? (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/account" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    My Profile
                  </Link>
                  <Link to="/account/orders" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    My Orders
                  </Link>
                  <button onClick={() => { logout(); closeMobileMenu(); }} className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/auth/login" onClick={closeMobileMenu} className="block w-full px-4 py-3 text-center font-bold text-white bg-indigo-600 dark:bg-indigo-700 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
