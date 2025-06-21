import React from 'react';
import { FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import leafPattern from '../../images/t.png';

export const UndeerSide = () => {
  return (
    <footer className="relative text-white pt-16 pb-8 bg-[#0d3a23]">
      {/* Subtle leaf pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${leafPattern})`,
          backgroundSize: '150px auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d3a23] to-[#0d3a23]/90 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <FaLeaf className="h-6 w-6 text-emerald-300" />
              </div>
              <span className="ml-3 text-2xl font-light tracking-wider">ROOTSY</span>
            </div>
            <p className="text-gray-300/80 text-sm leading-relaxed">
              A premier platform for gardening enthusiasts to cultivate connections, share expertise, and grow together through shared passions for horticulture and sustainable living.
            </p>
            <div className="flex space-x-4 pt-2">
              {[FaFacebookF, FaInstagram, FaPinterest, FaTwitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-emerald-300 border-b border-emerald-300/30 pb-3">
              Navigation
            </h3>
            <nav className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/explore-gardeners", label: "Explore Gardeners" },
                { path: "/browse-tips", label: "Browse Tips" },
                { path: "/events", label: "Gardening Events" }
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block text-sm text-gray-300/80 hover:text-emerald-300 transition-colors duration-300 ${
                      isActive ? 'text-emerald-300' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-emerald-300 border-b border-emerald-300/30 pb-3">
              Resources
            </h3>
            <nav className="space-y-3">
              {[
                { path: "/blog", label: "Gardening Blog" },
                { path: "/guides", label: "Plant Care Guides" },
                { path: "/tools", label: "Gardening Tools" },
                { path: "/community", label: "Community Forum" }
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block text-sm text-gray-300/80 hover:text-emerald-300 transition-colors duration-300 ${
                      isActive ? 'text-emerald-300' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-emerald-300 border-b border-emerald-300/30 pb-3">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-1.5 bg-white/5 rounded-full mr-3 mt-0.5">
                  <FaMapMarkerAlt className="w-3 h-3 text-emerald-300" />
                </div>
                <span className="text-sm text-gray-300/80">123 Garden Lane<br />Greenville, GT 12345</span>
              </div>
              <div className="flex items-start">
                <div className="p-1.5 bg-white/5 rounded-full mr-3 mt-0.5">
                  <FaPhone className="w-3 h-3 text-emerald-300" />
                </div>
                <span className="text-sm text-gray-300/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <div className="p-1.5 bg-white/5 rounded-full mr-3 mt-0.5">
                  <FaEnvelope className="w-3 h-3 text-emerald-300" />
                </div>
                <span className="text-sm text-gray-300/80">contact@rootsy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} Rootsy. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <NavLink
              to="/privacy"
              className="text-xs text-gray-400/60 hover:text-emerald-300 transition-colors duration-300"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms"
              className="text-xs text-gray-400/60 hover:text-emerald-300 transition-colors duration-300"
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/cookies"
              className="text-xs text-gray-400/60 hover:text-emerald-300 transition-colors duration-300"
            >
              Cookie Policy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};