import React, { useState } from 'react';
import { FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart, FaArrowUp } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const UndeerSide = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { Icon: FaFacebookF, color: 'hover:text-blue-400', href: '#' },
    { Icon: FaInstagram, color: 'hover:text-pink-400', href: '#' },
    { Icon: FaPinterest, color: 'hover:text-red-400', href: '#' },
    { Icon: FaTwitter, color: 'hover:text-sky-400', href: '#' },
    { Icon: FaLinkedinIn, color: 'hover:text-blue-500', href: '#' },
    { Icon: FaYoutube, color: 'hover:text-red-500', href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer Background with Gradient */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-800 text-white">
        {/* Decorative Top Wave */}
        <div className="relative">
          <svg
            className="w-full h-20 text-white"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 70C672 80 768 100 864 110C960 120 1056 120 1152 110C1248 100 1344 80 1392 70L1440 60V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
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

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          {/* Newsletter Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Stay Rooted with Us
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest gardening tips, plant care guides, and exclusive offers delivered to your inbox
              </p>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent text-white placeholder-emerald-200 px-4 py-2 focus:outline-none"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                  >
                    {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="flex items-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg"
                >
                  <FaLeaf className="h-8 w-8 text-white" />
                </motion.div>
                <span className="ml-4 text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent tracking-wider">
                  ROOTSY
                </span>
              </div>

              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Where gardening dreams take root and flourish. Join our community of passionate gardeners sharing knowledge, tips, and the joy of growing together.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3 pt-4">
                {socialLinks.map(({ Icon, color, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 text-emerald-200 ${color} shadow-lg`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-300 relative">
                Navigation
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              </h3>
              <nav className="space-y-3">
                {[
                  { path: "/", label: "Home", icon: "" },
                  { path: "/explore-gardeners", label: "Explore Gardeners", icon: "" },
                  { path: "/browse-tips", label: "Browse Tips", icon: "" },
                  { path: "/events", label: "Gardening Events", icon: "" }
                ].map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `group flex items-center space-x-3 text-sm text-emerald-100/80 hover:text-emerald-300 transition-all duration-300 hover:translate-x-2 ${
                        isActive ? 'text-emerald-300' : ''
                      }`
                    }
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-300 relative">
                Resources
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              </h3>
              <nav className="space-y-3">
                {[
                  { path: "/blog", label: "Gardening Blog", icon: "" },
                  { path: "/guides", label: "Plant Care Guides", icon: "" },
                  { path: "/tools", label: "Gardening Tools", icon: "" },
                  { path: "/community", label: "Community Forum", icon: "" }
                ].map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `group flex items-center space-x-3 text-sm text-emerald-100/80 hover:text-emerald-300 transition-all duration-300 hover:translate-x-2 ${
                        isActive ? 'text-emerald-300' : ''
                      }`
                    }
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-300 relative">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              </h3>
              <div className="space-y-4">
                {[
                  { Icon: FaMapMarkerAlt, text: "123 Garden Lane\nGreenville, GT 12345", color: "text-emerald-400" },
                  { Icon: FaPhone, text: "+1 (555) 123-4567", color: "text-teal-400" },
                  { Icon: FaEnvelope, text: "contact@rootsy.com", color: "text-emerald-400" }
                ].map(({ Icon, text, color }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className={`p-2 bg-white/10 rounded-lg ${color} group-hover:bg-white/20 transition-all duration-300`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-emerald-100/80 whitespace-pre-line group-hover:text-emerald-200 transition-colors duration-300">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Made with Love */}
              <div className="pt-4 border-t border-emerald-500/30">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center space-x-2 text-emerald-200"
                >
                  <span className="text-sm">Made with</span>
                  <FaHeart className="w-4 h-4 text-red-400" />
                  <span className="text-sm">for gardeners</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-emerald-500/30"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-emerald-200/60 mb-4 md:mb-0">
                © {new Date().getFullYear()} Rootsy. All rights reserved. Growing dreams since 2020.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex space-x-6">
                  {[
                    { to: "/privacy", label: "Privacy Policy" },
                    { to: "/terms", label: "Terms of Service" },
                    { to: "/cookies", label: "Cookie Policy" }
                  ].map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="text-sm text-emerald-200/60 hover:text-emerald-300 transition-colors duration-300"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
                >
                  <FaArrowUp className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></div>
    </footer>
  );
};