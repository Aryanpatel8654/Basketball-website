import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!container || !text1 || !text2) return;

    // Timeline for text transitions matching the basketball zoom
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      }
    });

    // Reset initial states
    gsap.set(text1, { opacity: 0, y: 50 });
    gsap.set(text2, { opacity: 0, y: 50 });

    // Step 1: Text 1 fades in
    tl.to(text1, { opacity: 1, y: 0, duration: 1.5 })
      // Step 2: Text 1 holds
      .to(text1, { duration: 1 })
      // Step 3: Text 1 fades out, Text 2 fades in
      .to(text1, { opacity: 0, y: -50, duration: 1.5 })
      .to(text2, { opacity: 1, y: 0, duration: 1.5 }, '-=1')
      // Step 4: Text 2 holds
      .to(text2, { duration: 1 })
      // Step 5: Text 2 fades out at the end
      .to(text2, { opacity: 0, y: -50, duration: 1.5 });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="showcase-section" 
      className="relative h-[250vh] w-full bg-transparent select-none z-20"
    >
      {/* Sticky container that keeps elements in place during the scroll zoom */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-end px-[5%] md:px-[8%] pointer-events-none">
        
        {/* Giant layout columns */}
        <div className="w-full md:max-w-md lg:max-w-lg flex flex-col justify-center h-full relative">
          
          {/* Background Big Orange Glow for Showcase Text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-orange/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

          {/* Text Block 1 */}
          <div 
            ref={text1Ref} 
            className="absolute inset-x-0 flex flex-col items-start gap-4 text-left pointer-events-auto"
          >
            <span className="font-display font-extrabold text-brand-orange text-sm tracking-[0.2em] uppercase">
              01 / Detail Texture
            </span>
            <h3 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none">
              MICRO-PEBBLED <br />
              COMPOSITE
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mt-2">
              Get closer to the leather. Our microscopic pebbles are engineered to draw sweat away from the surface, ensuring a perfect hand seal even during high-intensity games.
            </p>
            <div className="w-16 h-[2px] bg-brand-orange mt-4" />
          </div>

          {/* Text Block 2 */}
          <div 
            ref={text2Ref} 
            className="absolute inset-x-0 flex flex-col items-start gap-4 text-left pointer-events-auto"
          >
            <span className="font-display font-extrabold text-brand-orange text-sm tracking-[0.2em] uppercase">
              02 / Internal Rig
            </span>
            <h3 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none">
              CONSTANT BOUNCE <br />
              CORE
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mt-2">
              Inside is a thick nylon-wound butyl bladder, which ensures consistent circular structure and perfect bounce rebound, meeting professional league play specifications.
            </p>
            <div className="w-16 h-[2px] bg-brand-orange mt-4" />
          </div>

        </div>

      </div>
    </div>
  );
}
