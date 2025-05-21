import React from 'react';
import GoogleButton from 'react-google-button';

import { motion } from 'framer-motion';
import { FaUser, FaLock, FaGoogle } from 'react-icons/fa';
import { NavLink } from 'react-router';

export const Login = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#124A2F] to-[#0D3521] flex items-center justify-center p-4"
    >
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 mt-[100px]">
        {/* Left side - Branding/Illustration */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="hidden lg:block flex-1 text-center"
        >
          <motion.img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="Login Illustration"
            className="w-full max-w-md mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.h1
            className="text-4xl font-bold text-white mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to access your account
          </motion.p>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-[#124A2F] to-[#1a6d45]"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-8"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold text-center text-gray-800 mb-8"
              >
                Sign In
              </motion.h2>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaUser className="mr-2 text-[#124A2F]" />
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaLock className="mr-2 text-[#124A2F]" />
                  Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="••••••••"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-end mb-6">
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-[#124A2F] hover:text-[#0D3521] transition-colors"
                >
                  Forgot password?
                </NavLink>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(18, 74, 47, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#124A2F] to-[#1a6d45] text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Login
              </motion.button>

              <motion.div variants={itemVariants} className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center"
              >
                <GoogleButton
                  onClick={() => { console.log('Google button clicked') }}
                  className="w-full flex justify-center"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="text-center mt-6 text-gray-600"
              >
                Don't have an account?{' '}
                <NavLink
                  to="/signup"
                  className="text-[#124A2F] font-medium hover:text-[#0D3521] transition-colors"
                >
                  Sign up
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};