import React from 'react';
import { Cpu, Award, Target } from 'lucide-react';
import { profileData } from '../data/mockData';

const About = () => {
  const highlights = [
    {
      icon: Cpu,
      title: "VLSI Specialization",
      description: "Focused on VLSI Design & Technology with hands-on experience in circuit design and embedded systems"
    },
    {
      icon: Award,
      title: "#1 Rank Holder",
      description: "Secured 1st Rank across all three years in Diploma with First Class Distinction"
    },
    {
      icon: Target,
      title: "Red Hat Certified",
      description: "RHCSA certified with expertise in Linux system administration and automation"
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#0a0e27] relative overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1494083306499-e22e4a457632')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00d4ff] font-mono text-sm uppercase tracking-wider border border-[#00d4ff]/30 px-4 py-2 rounded-full">
              Get to know me
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            About <span className="text-[#00d4ff]">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Image/Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-lg border-2 border-[#00d4ff]/30 bg-[#151b35] p-8">
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1494083306499-e22e4a457632"
                    alt="Microchip"
                    className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 border-2 border-[#00d4ff] opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300" style={{ filter: 'blur(8px)' }} />
              </div>
              
              {/* Decorative Circuit Lines */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#00ff88]/50 rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#00ff88]/50 rounded-br-lg" />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                {profileData.about}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#151b35]/50 border border-[#00d4ff]/20 rounded-lg hover:border-[#00d4ff]/50 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                      <Icon className="text-[#00d4ff]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{highlight.title}</h3>
                      <p className="text-gray-400 text-sm">{highlight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
