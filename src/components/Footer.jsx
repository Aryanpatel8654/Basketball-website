export default function Footer() {
  const socialLinks = [
    { 
      label: 'Instagram', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ), 
      href: 'https://instagram.com' 
    },
    { 
      label: 'Twitter', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 22L14 11.5M20 2L10.5 12M2 2h4l12 18h4" />
        </svg>
      ), 
      href: 'https://twitter.com' 
    },
    { 
      label: 'YouTube', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
        </svg>
      ), 
      href: 'https://youtube.com' 
    },
    { 
      label: 'TikTok', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      ), 
      href: 'https://tiktok.com' 
    },
  ];

  return (
    <footer 
      id="footer" 
      className="relative w-full bg-gradient-to-b from-transparent to-[#050505] text-white px-[5%] pt-20 pb-10 border-t border-white/5 z-20"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Info (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <a href="#hero-section" className="flex items-center gap-2 group cursor-pointer w-fit">
              <span className="w-2.5 h-2.5 bg-brand-orange rounded-full group-hover:scale-125 transition-transform" />
              <span className="font-display font-black tracking-[0.2em] text-white text-xl">
                SPALDING
              </span>
            </a>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm">
              The official game ball of elite competitors. Dedicated to supplying athletes with the precision tools required to master their craft.
            </p>
          </div>

          {/* Social Links (Span 3) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-xs tracking-widest text-brand-orange uppercase">
              Follow Us
            </h4>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-xs md:text-sm font-medium tracking-wide flex items-center gap-2.5 transition-colors duration-300 w-fit"
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-brand-orange transition-colors">
                      {social.icon}
                    </span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Span 4) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-xs tracking-widest text-brand-orange uppercase">
              Get In Touch
            </h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-2">
              For general inquiries, orders, or custom partnership leagues.
            </p>
            <a
              href="mailto:hello@basketballx.com"
              className="group text-white hover:text-brand-orange text-sm md:text-base font-bold tracking-wide flex items-center gap-3 transition-colors duration-300 w-fit"
            >
              <span className="p-2.5 rounded-full bg-white/5 group-hover:bg-brand-orange/20 group-hover:text-brand-orange text-white transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </span>
              hello@basketballx.com
            </a>
          </div>

        </div>

        {/* Footer Bottom Divider & Legal Details */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <span className="text-gray-600 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Spalding Inc. All rights reserved.
          </span>
          <div className="flex gap-6 text-gray-600 text-xs">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">FAQs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
