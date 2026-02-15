import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { profileData } from '../data/mockData';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact/submit`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message, {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#00d4ff',
            color: '#0a0e27',
            fontWeight: '600'
          }
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to send message. Please try again.';
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#FF3838',
          color: '#ffffff',
          fontWeight: '600'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0a0e27] relative overflow-hidden">
      <Toaster />
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1675602488512-bdd631490fcb')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00d4ff] font-mono text-sm uppercase tracking-wider border border-[#00d4ff]/30 px-4 py-2 rounded-full">
              Let's Connect
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Get In <span className="text-[#00d4ff]">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow tech enthusiasts.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-4 p-4 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg hover:border-[#00d4ff]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                    <Mail className="text-[#00d4ff]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold group-hover:text-[#00d4ff] transition-colors duration-300">
                      {profileData.email}
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg">
                  <div className="w-12 h-12 bg-[#00ff88]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="text-[#00ff88]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-semibold">{profileData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href={profileData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg flex items-center justify-center hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="text-[#00d4ff] group-hover:scale-110 transition-transform duration-300" size={24} />
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg flex items-center justify-center hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <Github className="text-[#00d4ff] group-hover:scale-110 transition-transform duration-300" size={24} />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  className="w-14 h-14 bg-[#151b35] border border-[#00d4ff]/20 rounded-lg flex items-center justify-center hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300 group"
                  aria-label="Email"
                >
                  <Mail className="text-[#00d4ff] group-hover:scale-110 transition-transform duration-300" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#151b35] border border-[#00d4ff]/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors duration-300 resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-[#00d4ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00ff88] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
