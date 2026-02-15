import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, credentials);
      
      if (response.data.access_token) {
        // Store token in localStorage
        localStorage.setItem('admin_token', response.data.access_token);
        
        toast.success('Login successful!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: '#00d4ff',
            color: '#0a0e27',
            fontWeight: '600'
          }
        });
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF3838',
          color: '#ffffff',
          fontWeight: '600'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center relative overflow-hidden px-6">
      <Toaster />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
              <Lock className="text-[#00d4ff]" size={28} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#151b35] border-2 border-[#00d4ff]/30 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-300 mb-2 font-semibold">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors duration-300"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2 font-semibold">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border border-[#00d4ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d4ff] transition-colors duration-300"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-[#00d4ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00ff88] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Back to Portfolio */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
