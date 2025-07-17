import React, { useContext, useState } from 'react';
import GoogleButton from 'react-google-button';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

export const Registration = () => {
  const { createUser, setUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Use centralized API hooks
  const createUserMutation = UseApiousSecure.useCreateUser();
  const createApiUserMutation = UseApiousSecure.useCreateApiUser();

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

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

  const checkPasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, confirmPass, ...userProfile } = Object.fromEntries(formData.entries());

    // Clear previous errors
    setErrorMessage('');

    // Basic password match validation
    if (password !== confirmPass) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet) {
      setErrorMessage("Password doesn't meet all requirements");
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const completeProfile = {
        ...userProfile,
        email,
        createdAt: new Date().toISOString(),
        role: 'user',
        status: 'active'
      };

      // Use the mutation to create user
      await createUserMutation.mutateAsync(completeProfile);

      setUser(userCredential.user);

      toast.success('🎉 Successfully registered!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(`❌ Registration failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Create user profile with Google data
      const userProfile = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: 'google',
        createdAt: new Date().toISOString(),
        role: 'user',
        status: 'active'
      };

      // Use the alternative API user mutation for Google signup
      await createApiUserMutation.mutateAsync(userProfile);

      toast.success('🎉 Google registration successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(`❌ Google registration failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      <ToastContainer />
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

              {errorMessage && (
                <motion.div
                  variants={itemVariants}
                  className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errorMessage}
                </motion.div>
              )}

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
                  name="photoURL"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                  type="url"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all"
                  placeholder="https://example.com/photo.jpg"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaLock className="mr-2 text-[#124A2F]" />
                  Password
                </label>
                <div className="relative">
                  <motion.input
                    name="password"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all pr-10"
                    placeholder="••••••••"
                    required
                    onChange={(e) => checkPasswordRequirements(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#124A2F]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside">
                    <li className={passwordRequirements.length ? 'text-green-500' : 'text-gray-500'}>
                      At least 8 characters
                    </li>
                    <li className={passwordRequirements.uppercase ? 'text-green-500' : 'text-gray-500'}>
                      At least one uppercase letter
                    </li>
                    <li className={passwordRequirements.lowercase ? 'text-green-500' : 'text-gray-500'}>
                      At least one lowercase letter
                    </li>
                    <li className={passwordRequirements.number ? 'text-green-500' : 'text-gray-500'}>
                      At least one number
                    </li>
                    <li className={passwordRequirements.specialChar ? 'text-green-500' : 'text-gray-500'}>
                      At least one special character
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                  <FaLock className="mr-2 text-[#124A2F]" />
                  Confirm Password
                </label>
                <div className="relative">
                  <motion.input
                    name="confirmPass"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(18, 74, 47, 0.5)" }}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#124A2F] transition-all pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#124A2F]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6 flex items-center">
                <input type="checkbox" id="terms" className="mr-2 rounded text-[#124A2F] focus:ring-[#124A2F]" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-[#124A2F] hover:underline">Terms and Conditions</a>
                </label>
              </motion.div>

              <motion.button
                type="submit"
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
                  onClick={handleGoogleSignIn}
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