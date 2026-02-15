import React from 'react';
import { GraduationCap, MapPin, Calendar, Trophy } from 'lucide-react';
import { education } from '../data/mockData';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-[#1a1f3a] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00ff88] font-mono text-sm uppercase tracking-wider border border-[#00ff88]/30 px-4 py-2 rounded-full">
              Academic Background
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-[#00ff88]">Education</span> & Qualifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] mx-auto" />
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="relative bg-[#151b35] border-2 border-[#00d4ff]/30 rounded-lg p-8 group hover:border-[#00d4ff]/60 hover:shadow-xl hover:shadow-[#00d4ff]/20 transition-all duration-300"
            >
              {/* Current Badge */}
              {edu.current && (
                <div className="absolute -top-3 right-8">
                  <span className="bg-[#00ff88] text-[#0a0e27] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Current
                  </span>
                </div>
              )}

              {/* Achievement Badge */}
              {edu.achievement && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-[#ffa500] text-[#0a0e27] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Trophy size={14} />
                    Top Performer
                  </span>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                    <GraduationCap className="text-[#00d4ff]" size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Degree & Institution */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  {edu.specialization && (
                    <p className="text-[#00ff88] font-semibold mb-2">
                      Specialization: {edu.specialization}
                    </p>
                  )}
                  <p className="text-xl text-gray-300 mb-4">{edu.institution}</p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mb-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#00d4ff]" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#00d4ff]" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {/* Grade/Achievement */}
                  {edu.grade && (
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#ffa500]/10 border border-[#ffa500]/30 rounded-lg">
                        <span className="text-[#ffa500] font-bold">{edu.grade}</span>
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
