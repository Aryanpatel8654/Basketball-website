import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ cartCount, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero-section' },
    { label: 'Features', href: '#details-section' },
    { label: 'Collection', href: '#gallery-section' },
    { label: 'Reviews', href: '#testimonials-section' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
        <nav className="glass-card px-6 md:px-8 py-4 rounded-full flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-300">
          
          {/* Logo */}
          <a 
            href="#hero-section" 
            onClick={(e) => handleScroll(e, '#hero-section')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-3 h-3 bg-brand-orange rounded-full animate-pulse-slow group-hover:scale-125 transition-transform duration-300" />
            <span className="font-display font-extrabold tracking-[0.25em] text-white text-base md:text-lg group-hover:text-brand-orange transition-colors duration-300">
              SPALDING
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-gray-400 hover:text-white text-sm font-medium tracking-wider transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Cart Icon & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <div 
              onClick={onCartClick}
              className="relative p-2 text-white hover:text-brand-orange transition-colors duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-brand-black text-[11px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,106,0,0.6)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 w-[92%] glass-card rounded-3xl p-6 flex flex-col gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.9)] border border-white/5 z-40 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-gray-300 hover:text-white py-3 border-b border-white/5 text-base font-semibold tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#footer"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-brand-orange font-semibold py-3 hover:underline text-base"
            >
              Contact Support
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
