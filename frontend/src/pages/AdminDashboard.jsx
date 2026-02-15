import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Trash2, Eye, BarChart3, Inbox } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total_contacts: 0, unread_contacts: 0, read_contacts: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch contacts and stats
      const [contactsRes, statsRes] = await Promise.all([
        axios.get(`${API}/admin/contacts`, { headers }),
        axios.get(`${API}/admin/stats`, { headers })
      ]);

      setContacts(contactsRes.data.contacts || []);
      setStats(statsRes.data.stats || { total_contacts: 0, unread_contacts: 0, read_contacts: 0 });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        handleLogout();
      } else {
        toast.error('Failed to fetch data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const markAsRead = async (contactId) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(
        `${API}/admin/contacts/${contactId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      fetchData(); // Refresh data
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${API}/admin/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchData(); // Refresh data
      setSelectedContact(null);
      toast.success('Contact deleted');
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="text-[#00d4ff] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      <Toaster />
      
      {/* Header */}
      <div className="bg-[#151b35] border-b border-[#00d4ff]/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage contact submissions</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-transparent border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/10 transition-all duration-300"
              >
                View Portfolio
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF3838] text-white rounded-lg hover:bg-[#FF3838]/80 transition-all duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#151b35] border border-[#00d4ff]/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Inbox className="text-[#00d4ff]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Contacts</p>
                <p className="text-3xl font-bold text-white">{stats.total_contacts}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151b35] border border-[#00ff88]/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00ff88]/10 rounded-lg flex items-center justify-center">
                <Mail className="text-[#00ff88]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Unread</p>
                <p className="text-3xl font-bold text-white">{stats.unread_contacts}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151b35] border border-[#00d4ff]/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-[#00d4ff]" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Read</p>
                <p className="text-3xl font-bold text-white">{stats.read_contacts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="bg-[#151b35] border border-[#00d4ff]/20 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#00d4ff]/20">
            <h2 className="text-xl font-bold text-white">Contact Submissions</h2>
          </div>

          {contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Mail size={48} className="mx-auto mb-4 opacity-50" />
              <p>No contact submissions yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#00d4ff]/20">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-6 hover:bg-[#00d4ff]/5 transition-colors duration-300 ${
                    !contact.read ? 'bg-[#00d4ff]/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                        {!contact.read && (
                          <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-[#00d4ff] hover:underline mb-2 block"
                      >
                        {contact.email}
                      </a>
                      <p className="text-gray-300 mb-3 whitespace-pre-wrap">{contact.message}</p>
                      <p className="text-gray-500 text-sm">{formatDate(contact.timestamp)}</p>
                    </div>

                    <div className="flex gap-2">
                      {!contact.read && (
                        <button
                          onClick={() => markAsRead(contact.id)}
                          className="p-2 bg-[#00ff88]/10 text-[#00ff88] rounded-lg hover:bg-[#00ff88]/20 transition-all duration-300"
                          title="Mark as read"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="p-2 bg-[#FF3838]/10 text-[#FF3838] rounded-lg hover:bg-[#FF3838]/20 transition-all duration-300"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
