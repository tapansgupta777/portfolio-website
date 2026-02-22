import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#00d4ff]/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
<button
  onClick={scrollToTop}
  className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#00d4ff] transition-colors duration-300 group cursor-pointer"
>
  <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
    <Cpu className="text-[#00d4ff]" size={22} />
  </div>

  <span className="italic font-['Times_New_Roman'] flex items-center gap-1 leading-none">
    g<sub className="text-[0.65em] align-sub">m</sub>
    <span className="mx-1">=</span>

    <span className="flex flex-col items-center text-sm leading-[1.05]">
      <span className="border-b border-current px-1 pb-[1px]">
        ∂I<sub className="text-[0.65em] align-sub">DS</sub>
      </span>
      <span className="px-1 pt-[1px]">
        ∂V<sub className="text-[0.65em] align-sub">GS</sub>
      </span>
    </span>
  </span>
</button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 font-medium relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <a
            href="#contact"
            className="hidden lg:block px-6 py-3 bg-[#00d4ff] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#00ff88] transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#00d4ff] transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <nav className="bg-[#0a0e27]/98 backdrop-blur-md border-t border-[#00d4ff]/20">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 font-medium py-2 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-6 py-3 bg-[#00d4ff] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#00ff88] transition-all duration-300 text-center cursor-pointer"
            >
              Hire Me
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
