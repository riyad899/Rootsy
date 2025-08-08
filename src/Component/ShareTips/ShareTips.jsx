import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { useNavigate } from 'react-router-dom';
import CopilotChat from '../CopilotChat.jsx/CopilotChat';
import '@copilotkit/react-ui/styles.css';
import { motion } from 'framer-motion';
import { FaLeaf, FaUser, FaEnvelope, FaBook, FaEye, FaTags, FaClipboardList } from 'react-icons/fa';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

export const ShareTips = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Use centralized API hooks
  const { data: users = [] } = UseApiousSecure.useUsers();
  const createTipMutation = UseApiousSecure.useCreateTip();

  const [formData, setFormData] = useState({
    title: '',
    plantType: '',
    difficulty: 'Easy',
    description: '',
    category: 'Plant Care',
    availability: 'Public',
    userName: '',
    userEmail: ''
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize user data when component mounts or user changes
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/share-tips' } });
      return;
    }

    if (users.length > 0) {
      const AuthEmail = user.email.toLowerCase();
      // Find the current user from the fetched list
      const currentUser = users.find(u => u.email.toLowerCase() === AuthEmail);

      if (currentUser) {
        setFormData(prev => ({
          ...prev,
          userName: currentUser.name || '',
          userEmail: currentUser.email || ''
        }));
      } else {
        // Fallback: only set email if user not found
        setFormData(prev => ({
          ...prev,
          userEmail: user.email || ''
        }));
      }
    }
  }, [user, navigate, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!formData.title || !formData.plantType || !formData.description) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the data to send to the backend
      const tipData = {
        title: formData.title,
        plantType: formData.plantType,
        difficulty: formData.difficulty,
        description: formData.description,
        category: formData.category,
        availability: formData.availability,
        userName: formData.userName,
        userEmail: formData.userEmail,
        createdAt: new Date().toISOString()
      };

      console.log(tipData);

      // Use the mutation to create the tip
      await createTipMutation.mutateAsync(tipData);

      // On success, redirect to tips page with success message
      navigate('/my-tips', { state: { message: 'Tip shared successfully!' } });
    } catch (err) {
      setError(err.message || 'Failed to share tip');
      console.error('Error sharing tip:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="mt-[100px] min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 border border-emerald-100">
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          <p className="text-center text-emerald-600 font-medium mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[100px] min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <FaLeaf className="w-6 h-6 text-emerald-300" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 border border-emerald-200 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
              <FaLeaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            <span className="font-serif italic bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Share</span> Your Garden Tip
          </h1>
          <p className="text-emerald-600 text-lg max-w-2xl mx-auto">
            Help fellow gardeners grow with your wisdom and experience
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaClipboardList className="w-4 h-4 mr-2 text-emerald-600" />
              Tip Title <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., How I Grow Perfect Tomatoes Indoors"
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-emerald-300"
              required
            />
          </motion.div>

          {/* Plant Type and Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaLeaf className="w-4 h-4 mr-2 text-emerald-600" />
                Plant Type/Topic <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="plantType"
                value={formData.plantType}
                onChange={handleChange}
                placeholder="e.g., Tomatoes, Roses, Composting"
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-emerald-300"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaBook className="w-4 h-4 mr-2 text-teal-600" />
                Difficulty Level <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-emerald-300"
              >
                <option value="Easy">🌱 Easy</option>
                <option value="Medium">🌿 Medium</option>
                <option value="Hard">🌳 Hard</option>
              </select>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Share your detailed tips, experiences, and step-by-step instructions..."
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-emerald-300 resize-none"
              required
            />
          </motion.div>

          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaUser className="w-4 h-4 mr-2 text-emerald-600" />
                Your Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                readOnly
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg bg-emerald-50/50 cursor-not-allowed text-emerald-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="w-4 h-4 mr-2 text-teal-600" />
                Your Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                readOnly
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg bg-emerald-50/50 cursor-not-allowed text-emerald-700"
              />
            </motion.div>
          </div>

          {/* Category and Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaTags className="w-4 h-4 mr-2 text-emerald-600" />
                Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-emerald-300"
              >
                <option value="Plant Care">🌱 Plant Care</option>
                <option value="Composting">♻️ Composting</option>
                <option value="Vertical Gardening">🏗️ Vertical Gardening</option>
                <option value="Container Gardening">🪴 Container Gardening</option>
                <option value="Indoor Gardening">🏠 Indoor Gardening</option>
                <option value="Pest Control">🐛 Pest Control</option>
              </select>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaEye className="w-4 h-4 mr-2 text-teal-600" />
                Visibility <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-emerald-300"
              >
                <option value="Public">🌍 Public (Visible to everyone)</option>
                <option value="Hidden">🔒 Hidden (Only visible to you)</option>
              </select>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-6"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 text-white font-medium rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sharing Your Tip...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FaLeaf className="w-5 h-5" />
                  <span>Share Your Garden Wisdom</span>
                </div>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>

      {/* CopilotChat with updated styling */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className='mt-8 max-w-3xl mx-auto z-10 relative'
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-1 shadow-xl">
          <div className="bg-white rounded-xl">
            <CopilotChat className="rounded-xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};