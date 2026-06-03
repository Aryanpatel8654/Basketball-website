import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
      title: 'STREETCOURT CLASSIC',
      category: 'Legacy series',
      gridClass: 'col-span-1 md:col-span-2 h-[450px] md:h-[600px]',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop',
      title: 'OUTDOOR FLIGHT',
      category: 'High durability',
      gridClass: 'col-span-1 h-[210px] md:h-[288px]',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop',
      title: 'THE NET / DETAILED',
      category: 'Competition grade',
      gridClass: 'col-span-1 h-[210px] md:h-[288px]',
    },
  ];

  return (
    <section 
      id="gallery-section" 
      className="relative min-h-screen w-full bg-transparent text-white px-[5%] py-24 z-20"
    >
      {/* Background Ambient Glow */}
      <div className="absolute left-[15%] top-[30%] w-[450px] h-[450px] bg-brand-orange/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto flex flex-col">
        
        {/* Gallery Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-md">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-orange text-xs md:text-sm font-semibold tracking-widest uppercase block mb-3"
            >
              Visual Showcase
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight"
            >
              MADE FOR GREATNESS
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-xs md:text-sm font-light max-w-xs md:text-right leading-relaxed"
          >
            A visual documentation of the Spalding legacy on the asphalt and the hardwood. Captured in high definition.
          </motion.p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Main Visual: Left Column (Span 2 col on Desktop, spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className={`${images[0].gridClass} relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5`}
          >
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80 z-10 transition-opacity group-hover:opacity-90 duration-300" />
            
            {/* Image */}
            <img
              src={images[0].src}
              alt={images[0].title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Hover details badge (bottom left) */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
              <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">
                {images[0].category}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-wider">
                {images[0].title}
              </h3>
            </div>
            
            {/* Corner arrow overlay */}
            <div className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 transform translate-x-2 translate-y-[-8px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
              <span className="font-display text-sm font-bold">→</span>
            </div>
          </motion.div>

          {/* Right Column Stack (Contains Image 2 & 3) */}
          <div className="col-span-1 flex flex-col gap-6">
            {images.slice(1).map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`${img.gridClass} relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5`}
              >
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80 z-10 transition-opacity group-hover:opacity-90 duration-300" />
                
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Details */}
                <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-0.5">
                  <span className="text-brand-orange text-[10px] font-bold tracking-widest uppercase">
                    {img.category}
                  </span>
                  <h3 className="font-display font-black text-base text-white uppercase tracking-wider">
                    {img.title}
                  </h3>
                </div>

                {/* Arrow */}
                <div className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 transform translate-x-2 translate-y-[-8px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-display text-xs font-bold">→</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
