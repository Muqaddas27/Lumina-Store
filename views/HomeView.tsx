
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../lib/constants';
import ProductCard from '../components/ProductCard';
import SafeImage from '../components/SafeImage';

const HomeView: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const featuredProducts = INITIAL_PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = INITIAL_PRODUCTS.slice(0, 16);
  const bestSellers = INITIAL_PRODUCTS.filter(p => p.reviewsCount > 1000).slice(0, 12);
  const onSale = INITIAL_PRODUCTS.filter(p => p.salePrice).slice(0, 8);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 text-white w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Elegance in <br /><span className="text-indigo-400">Every Detail</span>
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-gray-200 mb-10 leading-relaxed opacity-90">
            Discover our curated collection of premium electronics, fashion, and home essentials designed for the modern lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/category/electronics" 
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg active:scale-95"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about" 
              className="inline-flex justify-center items-center px-8 py-4 border-2 border-white text-base font-bold rounded-xl text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Shop by Category</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Explore our wide range of premium products.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <SafeImage src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Browse Products &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 bg-white dark:bg-gray-800 py-16 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Weekly Favorites</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Our most popular products this week.</p>
          </div>
          <Link to="/search?q=" className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300">View All Products</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {[
          { icon: '🚀', title: 'Free Shipping', desc: 'On all orders over $150' },
          { icon: '🛡️', title: '2 Year Warranty', desc: 'Comprehensive protection' },
          { icon: '↩️', title: '30-Day Returns', desc: 'No-questions-asked returns' }
        ].map((item, i) => (
          <div key={i} className="flex items-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mr-6">{item.icon}</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100">{item.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">New Arrivals</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Just landed in our store. Be the first to own the latest gear.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-16 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Best Sellers</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Customer favorites that everyone's talking about.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Products on Sale */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Special Offers</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Limited time deals you don't want to miss.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {onSale.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6">
        <div className="bg-indigo-900 dark:bg-indigo-950 rounded-2xl md:rounded-3xl overflow-hidden relative p-6 md:p-16 text-center text-white">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stay in the Loop</h2>
            <p className="text-indigo-200 dark:text-indigo-300 mb-8">Subscribe to our newsletter and get 10% off your first purchase plus exclusive early access to new releases.</p>
            {subscribed && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-400 text-green-200 rounded-xl animate-pulse">
                ✓ Thanks for subscribing! Check your email for special offers.
              </div>
            )}
            <form className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-6 py-4 rounded-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-400 dark:hover:bg-indigo-500 font-bold rounded-xl transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;


