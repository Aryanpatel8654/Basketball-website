import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function CTA({ onBuyNow }) {
  return (
    <section 
      id="cta-section" 
      className="relative min-h-[90vh] w-full flex flex-col justify-between items-center text-center px-[5%] py-28 overflow-hidden z-20 pointer-events-none"
    >
      {/* Giant backdrop typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none -z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="font-display font-extrabold text-[12vw] leading-none tracking-tighter text-[#121212] uppercase opacity-90"
        >
          READY TO PLAY?
        </motion.h2>
      </div>

      {/* Floating Orange Backlight for the basketball in CTA */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-orange/10 rounded-full filter blur-[90px] pointer-events-none -z-10" />

      {/* Top subtitle */}
      <div className="mt-8">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-brand-orange text-xs md:text-sm font-semibold tracking-[0.25em] uppercase"
        >
          Limited Edition Restock
        </motion.p>
      </div>

      {/* Bottom Button (with mt-64 to clear space for the centered floating basketball) */}
      <div className="mb-8 w-full max-w-sm pointer-events-auto flex flex-col items-center gap-4 mt-[35vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <button
            onClick={onBuyNow}
            className="btn-orange-glow w-full px-12 py-5 rounded-full bg-brand-orange hover:bg-orange-500 text-brand-black font-display font-extrabold text-base tracking-widest uppercase flex items-center justify-center gap-3 transition-colors duration-300 transform active:scale-95 shadow-[0_12px_40px_rgba(255,106,0,0.5)]"
          >
            <CreditCard className="w-5 h-5" />
            Buy Now
          </button>
        </motion.div>
        
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-[11px] font-medium tracking-widest uppercase"
        >
          Secure Checkout • Free 2-Day Shipping
        </motion.span>
      </div>
    </section>
  );
}
