import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

function BasketballThumb({ className = "w-16 h-16" }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-orange to-orange-700 p-0.5 border border-brand-orange/30 shadow-[0_4px_12px_rgba(255,106,0,0.2)] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)]" />
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-black stroke-[4] stroke-brand-black/95 fill-none opacity-90">
        <circle cx="50" cy="50" r="46" className="fill-brand-orange/10" />
        <path d="M 50 4 A 46 46 0 0 0 50 96" />
        <path d="M 4 50 A 46 46 0 0 0 96 50" />
        <path d="M 15 25 Q 50 50 15 75" />
        <path d="M 85 25 Q 50 50 85 75" />
      </svg>
    </div>
  );
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}) {
  const [step, setStep] = useState(1); // 1: Cart View, 2: Checkout Form, 3: Success Screen
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0.00; // Free Shipping
  const tax = subtotal * 0.08; // 8% Tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.substring(0, 19) }));
      return;
    }
    // Auto-format expiry date
    if (name === 'cardExpiry') {
      const formatted = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.substring(0, 5) }));
      return;
    }
    // Limit CVC length
    if (name === 'cardCvc') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').substring(0, 3) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.cardNumber) {
      alert("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    
    // Simulate payment processing animation
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      onClearCart();
    }, 2000);
  };

  const resetDrawer = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 pointer-events-auto"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] bg-brand-black/95 border-l border-white/10 z-50 flex flex-col justify-between shadow-2xl pointer-events-auto overflow-hidden"
          >
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-brand-orange/10 rounded-full filter blur-[80px] pointer-events-none -z-10" />

            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === 2 && (
                  <button 
                    onClick={() => setStep(1)} 
                    className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h3 className="font-display font-black text-xl md:text-2xl tracking-wider uppercase text-white">
                  {step === 1 && 'Your Cart'}
                  {step === 2 && 'Checkout'}
                  {step === 3 && 'Order Placed'}
                </h3>
              </div>
              <button
                onClick={resetDrawer}
                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
              
              {/* STEP 1: CART ITEMS */}
              {step === 1 && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-4">
                      <div className="p-6 rounded-full bg-white/5 border border-white/5 animate-float-slow">
                        <ShoppingBag className="w-12 h-12 text-brand-orange" />
                      </div>
                      <h4 className="font-display font-bold text-lg tracking-wide text-white">YOUR CART IS EMPTY</h4>
                      <p className="text-gray-400 text-sm max-w-[280px]">
                        Add the limited Gold Edition basketball to unlock elite performance.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-4 px-6 py-3 rounded-full bg-brand-orange/10 hover:bg-brand-orange/20 border border-brand-orange/30 text-brand-orange font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item) => (
                        <div 
                          key={item.id}
                          className="glass-card-orange rounded-2xl p-4 flex gap-4 border border-brand-orange/10 items-center justify-between"
                        >
                          <div className="flex gap-4 items-center">
                            <BasketballThumb />
                            <div>
                              <h5 className="font-display font-black text-sm tracking-wider uppercase text-white">
                                {item.name}
                              </h5>
                              <p className="text-[11px] text-gray-400 font-medium tracking-wide mb-1">
                                {item.subtitle}
                              </p>
                              <span className="font-display font-bold text-brand-orange text-sm">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between h-20 py-1">
                            {/* Remove item */}
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 bg-black/40 rounded-full border border-white/10 p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-white/5 transition-all"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-display font-extrabold text-xs text-white px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-white/5 transition-all"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: CHECKOUT FORM */}
              {step === 2 && (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5 py-2">
                  
                  {/* Glass Card Details */}
                  <div className="glass-card rounded-2xl p-4 border border-white/5 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-1">Total Payable</span>
                    <span className="font-display font-black text-2xl text-brand-orange">${total.toFixed(2)}</span>
                  </div>

                  {/* Customer Information */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-orange">Shipping Details</h4>
                    
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Full Name *</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Email Address *</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Shipping Address *</label>
                      <input 
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="123 Main St, New York, NY"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="flex flex-col gap-3 mt-2">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-orange">Payment Card</h4>
                    
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Card Number *</label>
                      <div className="relative">
                        <input 
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-black/60 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                        <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Expiry Date *</label>
                        <input 
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">CVC *</label>
                        <input 
                          type="password"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          required
                          placeholder="•••"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-wider justify-center mt-2">
                    <Lock className="w-3.5 h-3.5" />
                    Secure SSL Encrypted Payment
                  </div>
                </form>
              )}

              {/* STEP 3: SUCCESS SCREEN */}
              {step === 3 && (
                <div className="h-[65vh] flex flex-col items-center justify-center text-center gap-4 px-4">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="p-5 rounded-full bg-brand-orange/10 border-2 border-brand-orange/30 text-brand-orange shadow-[0_0_40px_rgba(255,106,0,0.2)] mb-2"
                  >
                    <CheckCircle2 className="w-16 h-16 animate-pulse" />
                  </motion.div>

                  <h4 className="font-display font-black text-xl md:text-2xl tracking-widest text-white uppercase">ORDER COMPLETED!</h4>
                  <p className="text-brand-orange text-xs font-semibold tracking-widest uppercase">
                    Your Gold Edition Spalding is secured.
                  </p>
                  
                  <div className="glass-card rounded-2xl p-5 border border-white/5 w-full mt-4 flex flex-col gap-2.5 text-left">
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Estimated Delivery</span>
                      <span className="text-xs text-white font-bold tracking-wide">2 Business Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Shipping Method</span>
                      <span className="text-xs text-white font-bold tracking-wide">FedEx Premium Courier</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs mt-2 max-w-[280px]">
                    We sent a confirmation email with a tracking link to your inbox. Let's hit the court!
                  </p>

                  <button
                    onClick={resetDrawer}
                    className="btn-orange-glow mt-6 w-full py-4.5 rounded-full bg-brand-orange hover:bg-orange-500 text-brand-black font-display font-extrabold text-sm tracking-widest uppercase transition-colors duration-300 transform active:scale-95 shadow-[0_10px_30px_rgba(255,106,0,0.4)]"
                  >
                    Back to Store
                  </button>
                </div>
              )}

            </div>

            {/* Footer Summary (ONLY shown in Step 1 or Step 2 when items exist) */}
            {cartItems.length > 0 && step !== 3 && (
              <div className="p-6 border-t border-white/5 bg-black/60 backdrop-blur-md flex flex-col gap-4">
                
                {/* Cost Breakdown */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-gray-400 font-semibold tracking-wide">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-semibold tracking-wide">
                    <span>Shipping</span>
                    <span className="text-brand-orange uppercase font-bold text-[10px] tracking-wider">Free</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-semibold tracking-wide">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-1">
                    <span className="font-display font-extrabold text-sm uppercase tracking-wide text-white">Total</span>
                    <span className="font-display font-black text-xl text-brand-orange text-glow">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Next Action Button */}
                {step === 1 ? (
                  <button
                    onClick={() => setStep(2)}
                    className="btn-orange-glow w-full py-4 rounded-full bg-brand-orange hover:bg-orange-500 text-brand-black font-display font-extrabold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-colors duration-300 transform active:scale-95 shadow-[0_12px_40px_rgba(255,106,0,0.4)]"
                  >
                    <CreditCard className="w-4 h-4" />
                    Checkout Details
                  </button>
                ) : (
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={isSubmitting}
                    className="btn-orange-glow w-full py-4 rounded-full bg-brand-orange hover:bg-orange-500 disabled:bg-brand-orange/50 disabled:cursor-not-allowed text-brand-black font-display font-extrabold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-colors duration-300 transform active:scale-95 shadow-[0_12px_40px_rgba(255,106,0,0.4)]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4.5 h-4.5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                )}

                {/* Close Drawer Button */}
                {step === 1 && (
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-full hover:bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95"
                  >
                    Continue Shopping
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
