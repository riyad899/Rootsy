import React from 'react';
import { FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';
import leaf from '../../images/t.png';
import { NavLink } from 'react-router';

export const UndeerSide = () => {
  return (
    <footer
      className="relative text-white pt-12 pb-6"
      style={{
        backgroundColor: '#124a2f',
        backgroundImage: `url(${leaf})`,
        backgroundSize: '100px auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#124a2f]/90 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <FaLeaf className="h-8 w-8 text-green-300" />
              <span className="ml-2 text-2xl font-semibold">Rootsy</span>
            </div>
            <p className="text-gray-300">
              A platform for gardening enthusiasts to share tips, find local gardeners, ask plant care questions, post or join gardening events, and connect over shared interests like composting, hydroponics, balcony gardens, etc.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaPinterest className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-green-300 pb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaPhone className="w-4 h-4 mt-1 text-green-300 flex-shrink-0" />
                <span className="ml-3 text-gray-300">+880 XXXXXXXX</span>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="w-4 h-4 mt-1 text-green-300 flex-shrink-0" />
                <span className="ml-3 text-gray-300">office@example.com</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 text-green-300 flex-shrink-0" />
                <span className="ml-3 text-gray-300">123 Garden Lane, Greenville</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-green-300 pb-2">Quick Links</h3>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block text-gray-300 hover:text-white transition-colors ${
                    isActive ? 'text-white font-medium' : ''
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/explore-gardeners"
                className={({ isActive }) =>
                  `block text-gray-300 hover:text-white transition-colors ${
                    isActive ? 'text-white font-medium' : ''
                  }`
                }
              >
                Explore Gardeners
              </NavLink>
              <NavLink
                to="/browse-tips"
                className={({ isActive }) =>
                  `block text-gray-300 hover:text-white transition-colors ${
                    isActive ? 'text-white font-medium' : ''
                  }`
                }
              >
                Browse Tips
              </NavLink>
              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  `block text-gray-300 hover:text-white transition-colors ${
                    isActive ? 'text-white font-medium' : ''
                  }`
                }
              >
                Terms & Conditions
              </NavLink>
              <NavLink
                to="/privacy"
                className={({ isActive }) =>
                  `block text-gray-300 hover:text-white transition-colors ${
                    isActive ? 'text-white font-medium' : ''
                  }`
                }
              >
                Privacy Policy
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-green-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Rootsy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};