import React from 'react';
import { Award, ExternalLink, Calendar, Hash } from 'lucide-react';
import { certifications } from '../data/mockData';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-[#0a0e27] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.3) 1px, transparent 0)
            `,
            backgroundSize: '30px 30px'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00d4ff] font-mono text-sm uppercase tracking-wider border border-[#00d4ff]/30 px-4 py-2 rounded-full">
              Credentials & Achievements
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-[#00d4ff]">Certifications</span> & Training
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] mx-auto" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`bg-[#151b35] border-2 rounded-lg p-8 transition-all duration-300 hover:shadow-xl group ${
                cert.featured
                  ? 'border-[#00d4ff]/50 hover:border-[#00d4ff] hover:shadow-[#00d4ff]/30'
                  : 'border-[#00d4ff]/20 hover:border-[#00d4ff]/40 hover:shadow-[#00d4ff]/20'
              }`}
            >
              {/* Featured Badge */}
              {cert.featured && (
                <div className="flex justify-end mb-4">
                  <span className="text-[#ffa500] bg-[#ffa500]/10 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-[#ffa500]/30">
                    Featured
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                  <Award className="text-[#00d4ff]" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-[#00ff88] font-semibold">{cert.issuer}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {cert.description}
              </p>

              {/* Meta Information */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} className="text-[#00d4ff]" />
                  <span>Issued: {cert.issueDate}</span>
                  {cert.expiryDate && (
                    <>
                      <span className="text-[#00d4ff]">•</span>
                      <span>Expires: {cert.expiryDate}</span>
                    </>
                  )}
                </div>
                {cert.credentialId && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Hash size={16} className="text-[#00d4ff]" />
                    <span className="font-mono">{cert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs font-mono text-[#00ff88] bg-[#00ff88]/5 px-3 py-1 rounded border border-[#00ff88]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* View Credential Button */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/10 transition-all duration-300 group/btn"
                >
                  <span className="font-semibold">View Credential</span>
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
