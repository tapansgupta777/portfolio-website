import React from 'react';
import { ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { profileData } from '../data/mockData';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587845323226-bad89242c735')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27]/80 to-[#0a0e27]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Greeting */}
          <div className="mb-6 animate-fadeIn">
            <span className="inline-block px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] text-sm font-mono uppercase tracking-wider">
              Welcome to my Portfolio
            </span>
          </div>

          {/* Name with Glow Effect */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent animate-glow">
              {profileData.name}
            </span>
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl text-gray-300 mb-4 font-light animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {profileData.title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#8892b0] mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            {profileData.subtitle}
          </p>

          {/* Tagline with Circuit Accent */}
          <div className="flex items-center justify-center gap-3 mb-12 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ff88]" />
            <p className="text-[#00ff88] font-mono text-sm uppercase tracking-wider">
              {profileData.tagline}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00ff88]" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fadeInUp" style={{ animationDelay: '1s' }}>
            <button
              onClick={() => {
                const element = document.querySelector('#projects');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-4 bg-[#00d4ff] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#00ff88] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/50 cursor-pointer"
            >
              View My Work
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-semibold rounded-lg hover:bg-[#00d4ff]/10 transition-all duration-300 cursor-pointer"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            <a
              href={profileData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#00d4ff] cursor-pointer hover:text-[#00ff88] transition-colors duration-300"
        aria-label="Scroll to About"
      >
        <ArrowDown size={32} />
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 40px rgba(0, 255, 136, 0.6)); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
