import React from 'react';
import { Linkedin, Github, Mail, Heart, Cpu } from 'lucide-react';
import { profileData } from '../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0e27] border-t border-[#00d4ff]/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Cpu className="text-[#00d4ff]" size={24} />
              </div>
              <span className="text-white font-bold text-xl font-mono">TAPAN.DEV</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Electronics Engineer specializing in VLSI Design & Technology. Building innovative solutions at the intersection of hardware and software.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Education'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Connect</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              >
                <Mail size={18} />
                <span>{profileData.email}</span>
              </a>
              <div className="flex gap-4 pt-2">
                <a
                  href={profileData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg flex items-center justify-center hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="text-[#00d4ff]" size={18} />
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg flex items-center justify-center hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="text-[#00d4ff]" size={18} />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  className="w-10 h-10 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg flex items-center justify-center hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="text-[#00d4ff]" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#00d4ff]/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              © {currentYear} Tapan Gupta. Made with{' '}
              <Heart size={14} className="text-[#00d4ff] fill-[#00d4ff] animate-pulse" />{' '}
              and lots of circuits
            </p>
            <p className="text-gray-500 text-xs font-mono">
              Designed for VLSI Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
