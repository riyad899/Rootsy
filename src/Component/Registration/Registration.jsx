import React, { useContext } from 'react';
import GoogleButton from 'react-google-button';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; // Fixed import
import { AuthContext } from '../../Provider/AuthContext';

export const Registration = () => {
  const { createUser,setUser } = useContext(AuthContext);




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

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.url.value;
    const password = form.password.value;
    const confirmPass = form.confirmPass.value;
    createUser(email, password).then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
    })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#124A2F] to-[#0D3521] flex items-center justify-center p-4"
    >
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 mt-[150px] mb-[20px]">
        {/* Left side - Branding/Illustration */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="hidden lg:block flex-1 text-center"
        >
          <motion.img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
            alt="Registration Illustration"
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
            Create Your Account
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join us today and get started
          </motion.p>
        </motion.div>

        {/* Right side - Registration Form */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-[#124A2F] to-[#1a6d45]"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-8"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2"
              >
                <FaUserPlus className="text-[#124A2F]" />
                Register
              </motion.h2>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaUser className="mr-2 text-[#124A2F]" />
                  Full Name
                </label>
                <motion.input
                  name="name"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="John Doe"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-[#124A2F]" />
                  Email Address
                </label>
                <motion.input
                  name="email"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-[#124A2F]" />
                  Photo URL
                </label>
                <motion.input
                  name="url"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="url"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="Photo URL"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaLock className="mr-2 text-[#124A2F]" />
                  Password
                </label>
                <motion.input
                  name="password"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaLock className="mr-2 text-[#124A2F]" />
                  Confirm Password
                </label>
                <motion.input
                  name="confirmPass"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6 flex items-center">
                <input type="checkbox" id="terms" className="mr-2 rounded text-[#124A2F] focus:ring-[#124A2F]" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-[#124A2F] hover:underline">Terms and Conditions</a>
                </label>
              </motion.div>

              <motion.button
                type='submit'
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(18, 74, 47, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#124A2F] to-[#1a6d45] text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Create Account
              </motion.button>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center pt-[20px]"
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
                Already have an account?{' '}
                <NavLink
                  to="/login"
                  className="text-[#124A2F] font-medium hover:text-[#0D3521] transition-colors"
                >
                  Sign in
                </NavLink>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};