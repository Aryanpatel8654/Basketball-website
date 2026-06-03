import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Details from './components/Details';
import Showcase from './components/Showcase';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BasketballScene from './components/BasketballScene';
import CartDrawer from './components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const product = {
    id: 'spalding-series-gold',
    name: 'Spalding Gold Edition',
    subtitle: 'Series Gold • Official Size 7',
    price: 34.99,
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    triggerToast('Added to Cart Successfully!');
  };

  const handleBuyNow = () => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems; // If already in cart, just open drawer
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    triggerToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="relative bg-brand-black min-h-screen text-white select-none">
      
      {/* 3D Basketball Canvas Background */}
      <BasketballScene />

      {/* Floating Navbar */}
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Main Overlay Content */}
      <main className="relative w-full overflow-hidden" style={{ zIndex: 10 }}>
        
        {/* Hero Section */}
        <Hero onAddToCart={handleAddToCart} />

        {/* Details/Specifications Section */}
        <Details />

        {/* Scroll Zoom Showcase Section */}
        <Showcase />

        {/* Media Photo Gallery Grid */}
        <Gallery />

        {/* Slider Testimonials Section */}
        <Testimonials />

        {/* CTA "Buy Now" Section */}
        <CTA onBuyNow={handleBuyNow} />

      </main>

      {/* Footer Details */}
      <Footer />

      {/* Premium Toast Notifier */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-8 left-1/2 glass-card-orange px-6 py-4 rounded-full flex items-center gap-3 z-50 border border-brand-orange/40 shadow-[0_15px_40px_rgba(255,106,0,0.3)] pointer-events-auto"
          >
            <div className="p-1 bg-brand-orange text-brand-black rounded-full flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-display font-extrabold text-xs md:text-sm tracking-wider uppercase text-white">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
