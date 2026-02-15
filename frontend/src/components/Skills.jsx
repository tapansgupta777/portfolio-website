import React from 'react';
import { Cpu, Code, Server, Wrench } from 'lucide-react';
import { skills } from '../data/mockData';

const iconMap = {
  Cpu: Cpu,
  Code: Code,
  Server: Server,
  Wrench: Wrench
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-[#1a1f3a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.3) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '40px 40px'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00ff88] font-mono text-sm uppercase tracking-wider border border-[#00ff88]/30 px-4 py-2 rounded-full">
              Technical Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Skills & <span className="text-[#00ff88]">Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] mx-auto" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skills.map((skillCategory, index) => {
            const Icon = iconMap[skillCategory.icon];
            return (
              <div
                key={index}
                className="group relative bg-[#151b35] border border-[#00d4ff]/20 rounded-lg p-8 hover:border-[#00d4ff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/20"
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00d4ff]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                    <Icon className="text-[#00d4ff]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#00d4ff] transition-colors duration-300">
                    {skillCategory.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-1 gap-3">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className="w-2 h-2 bg-[#00ff88] rounded-full group-hover/item:scale-150 transition-transform duration-300" />
                      <span className="text-gray-300 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
