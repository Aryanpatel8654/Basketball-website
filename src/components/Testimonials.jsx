import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'Pro League Point Guard',
    quote: 'The perfect basketball.',
    review: 'The grip on this ball is unlike anything I’ve played with. Even in high-humidity indoor gyms, the moisture-wicking technology keeps the surface tactile and sticky.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Division 1 Head Coach',
    quote: 'Unrivaled circularity & bounce.',
    review: 'Consistency is everything in training. The bounce response is perfectly uniform across the entire surface. We use them for all our elite shooting drills.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Derrick Hall',
    role: 'Streetball Creator',
    quote: 'Tough as nails, feels premium.',
    review: 'Most composite leather balls get shredded on concrete. This one has held up for 4 months of outdoor blacktop play, and the grip remains exceptional.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Framer motion variants for slide transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      id="testimonials-section" 
      className="relative min-h-[90vh] w-full bg-transparent text-white px-[5%] py-24 flex flex-col justify-center items-center overflow-hidden z-20"
    >
      {/* Background neon radial glow */}
      <div className="absolute right-[10%] bottom-[10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange text-xs md:text-sm font-semibold tracking-widest uppercase block mb-3"
          >
            Player Endorsements
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight"
          >
            TRUSTED BY THE BEST
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="w-full relative min-h-[350px] flex items-center justify-center">
          
          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:-left-16 p-3 rounded-full border border-white/5 bg-white/5 hover:bg-brand-orange hover:text-brand-black hover:border-brand-orange text-white transition-all duration-300 transform active:scale-90 z-30 hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 lg:-right-16 p-3 rounded-full border border-white/5 bg-white/5 hover:bg-brand-orange hover:text-brand-black hover:border-brand-orange text-white transition-all duration-300 transform active:scale-90 z-30 hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div className="w-full max-w-2xl px-4 overflow-hidden py-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative flex flex-col items-center text-center"
              >
                {/* Large Quote Mark */}
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-orange/10 transform rotate-180" />

                {/* Star Rating */}
                <div className="flex gap-1 mb-6 text-brand-orange">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                  ))}
                </div>

                {/* Big Quote */}
                <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-wide mb-6 leading-tight">
                  "{testimonials[activeIndex].quote}"
                </h3>

                {/* Review Paragraph */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8 max-w-xl">
                  {testimonials[activeIndex].review}
                </p>

                {/* Author Info */}
                <div className="mt-auto">
                  <h4 className="font-display font-extrabold text-base tracking-widest text-brand-orange uppercase">
                    {testimonials[activeIndex].name}
                  </h4>
                  <span className="text-xs text-gray-500 font-medium tracking-wider uppercase mt-1 block">
                    {testimonials[activeIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3.5 h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex 
                  ? 'bg-brand-orange w-8 shadow-[0_0_10px_rgba(255,106,0,0.6)]' 
                  : 'bg-gray-700 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
