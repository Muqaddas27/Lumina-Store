
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomeView from './views/HomeView';
import ProductView from './views/ProductView';
import CategoryView from './views/CategoryView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import AdminView from './views/AdminView';
import AuthView from './views/AuthView';
import AccountView from './views/AccountView';
import SearchView from './views/SearchView';
import WishlistView from './views/WishlistView';
import OrderConfirmationView from './views/OrderConfirmationView';
import ContactView from './views/ContactView';
import AboutView from './views/AboutView';
import FaqView from './views/FaqView';
import AiAssistant from './components/AiAssistant';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 text-slate-900 dark:text-gray-100 transition-colors duration-200">
          <ScrollToTop />
          <Header />
          <CartDrawer />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/products/:slug" element={<ProductView />} />
              <Route path="/category/:slug" element={<CategoryView />} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/wishlist" element={<WishlistView />} />
              <Route path="/checkout" element={<CheckoutView />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationView />} />
              <Route path="/admin/*" element={<AdminView />} />
              <Route path="/auth/*" element={<AuthView />} />
              <Route path="/account/*" element={<AccountView />} />
              <Route path="/contact" element={<ContactView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/faq" element={<FaqView />} />
            </Routes>
          </main>

          <AiAssistant />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
