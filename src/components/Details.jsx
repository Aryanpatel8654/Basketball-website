import { motion } from 'framer-motion';
import { Award, Shield, Disc, Layers } from 'lucide-react';

export default function Details() {
  const specs = [
    {
      id: 1,
      title: 'Premium Leather',
      desc: 'Top-tier composite leather with moisture-wicking technology for ultimate grip control.',
      icon: <Layers className="w-5 h-5 text-brand-orange" />,
      dotX: '62%',
      dotY: '30%',
      lineX1: 45,
      lineY1: 30,
      lineX2: 61.5,
      lineY2: 30,
      align: 'left',
    },
    {
      id: 2,
      title: 'Competition Grade',
      desc: 'Meets official size and weight standards used by professional leagues globally.',
      icon: <Award className="w-5 h-5 text-brand-orange" />,
      dotX: '88%',
      dotY: '38%',
      lineX1: 99,
      lineY1: 38,
      lineX2: 88.5,
      lineY2: 38,
      align: 'right',
    },
    {
      id: 3,
      title: 'Indoor / Outdoor',
      desc: 'Engineered rubber core enables superior durability on blacktop as well as hardwood.',
      icon: <Disc className="w-5 h-5 text-brand-orange" />,
      dotX: '58%',
      dotY: '68%',
      lineX1: 45,
      lineY1: 68,
      lineX2: 57.5,
      lineY2: 68,
      align: 'left',
    },
    {
      id: 4,
      title: 'High Durability',
      desc: 'Reinforced butyl bladder ensures optimal air pressure retention and structure.',
      icon: <Shield className="w-5 h-5 text-brand-orange" />,
      dotX: '85%',
      dotY: '74%',
      lineX1: 96,
      lineY1: 74,
      lineX2: 85.5,
      lineY2: 74,
      align: 'right',
    },
  ];

  return (
    <section 
      id="details-section" 
      className="relative min-h-screen w-full flex items-center bg-transparent text-white px-[5%] py-24 overflow-hidden z-20"
    >
      {/* SVG Tracer Lines (Desktop only) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 5 }}>
        {specs.map((spec) => (
          <motion.line
            key={`line-${spec.id}`}
            x1={`${spec.lineX1}%`}
            y1={`${spec.lineY1}%`}
            x2={spec.dotX}
            y2={spec.dotY}
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="8 4"
            initial={{ strokeDashoffset: 100 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>

      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center h-full relative" style={{ zIndex: 10 }}>
        
        {/* Header Title */}
        <div className="max-w-xl mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-orange text-xs md:text-sm font-semibold tracking-widest uppercase block mb-3"
          >
            Engineering Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight"
          >
            BUILT FOR THE COURT
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed font-light"
          >
            Designed with elite materials and rigorous athletic engineering to provide consistent control, premium rebound bounce, and maximum tactile feel in any game.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[500px]">
          
          {/* Left Side Specs (Desktop) / Grid of Specs (Mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {specs
              .filter((s) => s.align === 'left')
              .map((spec, index) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300 group hover:shadow-[0_10px_25px_rgba(255,106,0,0.08)]"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-brand-orange/10 rounded-xl group-hover:bg-brand-orange/20 transition-colors duration-300">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                        {spec.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mt-2 leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Center Space: Occuppied by the 3D Basketball Canvas on Desktop */}
          <div className="lg:col-span-2 h-[200px] lg:h-auto pointer-events-none" />

          {/* Right Side Specs */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {specs
              .filter((s) => s.align === 'right')
              .map((spec, index) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300 group hover:shadow-[0_10px_25px_rgba(255,106,0,0.08)]"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-brand-orange/10 rounded-xl group-hover:bg-brand-orange/20 transition-colors duration-300">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                        {spec.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mt-2 leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

        </div>

      </div>

      {/* Floating Indicator Dots overlaying the 3D Canvas (Desktop only) */}
      {specs.map((spec) => (
        <div
          key={`dot-overlay-${spec.id}`}
          className="absolute hidden lg:flex items-center justify-center pointer-events-none"
          style={{
            left: spec.dotX,
            top: spec.dotY,
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        >
          {/* Pulse concentric rings */}
          <span className="absolute w-6 h-6 rounded-full bg-brand-orange/30 animate-ping opacity-75" />
          <span className="absolute w-4 h-4 rounded-full bg-brand-orange/60 animate-pulse" />
          {/* Inner core */}
          <span className="relative w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_8px_#FF6A00]" />
        </div>
      ))}
    </section>
  );
}
