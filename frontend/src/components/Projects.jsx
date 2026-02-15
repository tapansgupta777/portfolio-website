import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/mockData';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-[#0a0e27] relative overflow-hidden">
      {/* Background with Circuit Image */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562408590-e32931084e23')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00d4ff] font-mono text-sm uppercase tracking-wider border border-[#00d4ff]/30 px-4 py-2 rounded-full">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Notable <span className="text-[#00d4ff]">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] mx-auto" />
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center group`}
            >
              {/* Project Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-lg border-2 border-[#00d4ff]/30 group-hover:border-[#00d4ff]/60 transition-all duration-300">
                  <div className="aspect-video bg-[#151b35] relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60" />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#00d4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 space-y-4">
                {/* Category Badge */}
                <div className="inline-block">
                  <span className="text-[#00ff88] font-mono text-xs uppercase tracking-wider bg-[#00ff88]/10 px-3 py-1 rounded-full border border-[#00ff88]/30">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white group-hover:text-[#00d4ff] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {project.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/5 px-3 py-1 rounded border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#00ff88] transition-all duration-300 hover:scale-105">
                    <ExternalLink size={18} />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[#00d4ff]/50 text-[#00d4ff] font-semibold rounded-lg hover:bg-[#00d4ff]/10 transition-all duration-300">
                    <Github size={18} />
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
