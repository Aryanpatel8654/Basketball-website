import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export default function Hero({ onAddToCart }) {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-white pt-28 pb-12 overflow-hidden z-20 pointer-events-none"
    >
      {/* Huge Background Typography (behind the basketball) */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden -z-10">
        <h1 className="font-display font-extrabold text-[15vw] leading-none tracking-tighter text-[#141414] uppercase opacity-85 select-none">
          SPALDING
        </h1>
      </div>

      {/* Headline & Small Badge (Top/Middle Area) */}
      <div className="w-[90%] max-w-6xl flex flex-col items-start mt-8 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4"
        >
          <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
          Series Gold Edition
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="font-display text-4xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95]"
        >
          PRECISION <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-500 to-yellow-500">
            CRAFTED.
          </span>
        </motion.h2>
      </div>

      {/* Bottom Area: Pricing / Description & ADD TO CART Button */}
      <div className="w-[90%] max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-auto">
        
        {/* Product Details (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xs pointer-events-auto"
        >
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Price:</span>
            <span className="text-3xl font-display font-black text-brand-orange text-glow">$34.99</span>
          </div>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
            Engineered with premium composite leather. Designed for elite athletes, offering exceptional bounce, soft touch, and high-traction grip across both indoor and outdoor courts.
          </p>
        </motion.div>

        {/* Action Button (Bottom Center/Right) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-auto flex justify-center md:justify-end pointer-events-auto"
        >
          <button
            onClick={onAddToCart}
            className="btn-orange-glow w-full md:w-auto px-10 py-5 rounded-full bg-brand-orange hover:bg-orange-500 text-brand-black font-display font-extrabold text-base tracking-wider uppercase flex items-center justify-center gap-3 transition-colors duration-300 transform active:scale-95 shadow-[0_10px_35px_rgba(255,106,0,0.4)]"
          >
            <ShoppingCart className="w-5 h-5 fill-brand-black" />
            Add To Cart
          </button>
        </motion.div>

      </div>
    </section>
  );
}
