import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { experience } from '../data/mockData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#1a1f3a] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00ff88] font-mono text-sm uppercase tracking-wider border border-[#00ff88]/30 px-4 py-2 rounded-full">
              Professional Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Work <span className="text-[#00ff88]">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] mx-auto" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-8 pb-12 border-l-2 border-[#00d4ff]/30 last:pb-0 group hover:border-[#00d4ff]/60 transition-colors duration-300"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#00d4ff] rounded-full group-hover:scale-150 transition-transform duration-300" style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }} />
              
              {/* Content Card */}
              <div className="bg-[#151b35] border border-[#00d4ff]/20 rounded-lg p-6 group-hover:border-[#00d4ff]/50 group-hover:shadow-lg group-hover:shadow-[#00d4ff]/20 transition-all duration-300">
                {/* Company & Position */}
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-[#00d4ff] font-semibold mb-2">
                      <Briefcase size={18} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                  <span className="px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] rounded-full text-xs font-mono">
                    {exp.type}
                  </span>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3 mb-6">
                  {exp.responsibilities.map((resp, rIndex) => (
                    <div key={rIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{resp}</p>
                    </div>
                  ))}
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIndex) => (
                    <span
                      key={sIndex}
                      className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/5 px-3 py-1 rounded border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
