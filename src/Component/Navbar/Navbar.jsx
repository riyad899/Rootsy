import React, { useContext, useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import leaf from '../../images/t.png';
import { BsClock } from "react-icons/bs";
import { CiPhone, CiMail, CiTwitter } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaPinterest, FaLeaf, FaSignInAlt, FaUserPlus, FaFire, FaShoppingCart, FaBell, FaEnvelope } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import { router } from '../../Routes/routes';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [fireCount, setFireCount] = useState(42); // Demo fire count
  const [cartCount, setCartCount] = useState(3); // Demo cart count
  const { user, logOut } = useContext(AuthContext);

  const location = useLocation();

  // Enhanced scroll detection effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scroll state for styling changes
      setIsScrolled(currentScrollY > 50);

      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const throttledScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = throttledScroll();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [lastScrollY]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsProfileOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProfileKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsProfileOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', private: false },
    { name: 'Explore Gardeners', href: '/explore', private: false },
    { name: 'Browse Tips', href: '/tips', private: false },
    { name: 'Buy Plants', href: '/buy-plants', private: true },
    { name: 'Sell Plants', href: '/sell-plants', private: true },
  ];

  // Filter nav links based on authentication
  const filteredNavLinks = navLinks.filter(link => !link.private || user);

  const isHomePage = location.pathname === '/';

  return (
    <div className={`fixed w-full z-20 transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ease-in-out ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-emerald-100'
        : (isHomePage ? 'bg-transparent' : 'bg-white shadow-md border-b border-emerald-100')
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-18'
            }`}>
            {/* Logo and main nav items */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <FaLeaf className={`transition-all duration-300 ${isScrolled || !isHomePage
                  ? 'h-7 w-7 text-emerald-600'
                  : 'h-9 w-9 text-emerald-700'
                  }`} />
                <span className={`ml-2 font-bold transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ${isScrolled || !isHomePage
                  ? 'text-xl'
                  : 'text-2xl'
                  }`}>Rootsy</span>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {filteredNavLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) => {
                      let baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:scale-105";

                      if (isScrolled || !isHomePage) {
                        return isActive
                          ? `${baseClasses} border-emerald-500 text-emerald-700`
                          : `${baseClasses} border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-700`;
                      } else {
                        return isActive
                          ? `${baseClasses} border-emerald-300 text-emerald-800`
                          : `${baseClasses} border-transparent text-emerald-700/90 hover:border-emerald-300/70 hover:text-emerald-800`;
                      }
                    }}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right side items - Fire count, Cart, Login/Signup buttons or Profile */}
            <div className="flex items-center space-x-4">
              {/* Fire Count Button */}
              <button className={`relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                ? 'text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200'
                : 'text-orange-600 bg-orange-50/80 hover:bg-orange-100/80 border border-orange-200/60 backdrop-blur-sm'
                }`}>
                <FaFire className="w-4 h-4 mr-1" />
                <span className="text-sm font-bold">{fireCount}</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </button>

              {/* Cart Button */}
              <button className={`relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                : 'text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/60 backdrop-blur-sm'
                }`}>
                <FaShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className={`relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                : 'text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 backdrop-blur-sm'
                }`}>
                <FaEnvelope className="w-4 h-4" />
              </button>

              {/* Notification Button */}
              <button className={`relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                ? 'text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200'
                : 'text-gray-700 bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/60 backdrop-blur-sm'
                }`}>
                <FaBell className="w-4 h-4 text-[#007A55]" />
              </button>




              {/* User Profile or Auth Buttons */}
              <div className="hidden sm:flex sm:items-center">
                {user ? (
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform hover:scale-110"
                        id="user-menu"
                        aria-expanded={isProfileOpen}
                        aria-haspopup="true"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        onKeyDown={handleProfileKeyDown}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className={`rounded-full border-2 transition-all duration-300 ${isScrolled || !isHomePage
                            ? 'h-10 w-10 border-emerald-200'
                            : 'h-12 w-12 border-emerald-300/70'
                            }`}
                          src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                          alt={`${user.displayName || 'User'} profile picture`}
                        />
                      </button>
                    </div>
                    {/* Profile dropdown menu */}
                    {isProfileOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 bg-white/95 backdrop-blur-md ring-1 ring-emerald-200 ring-opacity-50 focus:outline-none border border-emerald-100"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        {/* User Info Section */}
                        <div className="px-4 py-3 text-sm text-gray-700 border-b border-emerald-100">
                          <div className="font-medium text-emerald-800">{user.displayName || 'User'}</div>
                          <div className="text-xs text-gray-500 truncate">{user.email}</div>
                        </div>


                        <div className="py-1">
                          <NavLink to="/profile" onClick={() => setIsProfileOpen(false)}>
                            <button
                              onClick={() => {
                                setIsProfileOpen(false);
                              }}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                              role="menuitem"
                              tabIndex="0"
                            >
                              <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Profile
                            </button>
                          </NavLink>



                          <NavLink to="/dashboard" onClick={() => setIsProfileOpen(false)}>
                            <button
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                              role="menuitem"
                              tabIndex="0"
                            >
                              <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              Dashboard
                            </button>
                          </NavLink>



                          <NavLink
                            to="/share-tip"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            Share Tips
                          </NavLink>

                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                            tabIndex="0"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            Buy Plants
                          </button>

                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                            tabIndex="0"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Sell Plants
                          </button>

                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                            tabIndex="0"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Gardening Calendar
                          </button>

                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                            tabIndex="0"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </button>
                        </div>

                        {/* Logout Section */}
                        <div className="border-t border-emerald-100 pt-1">
                          <button
                            onClick={handleLogOut}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            role="menuitem"
                            tabIndex="0"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <NavLink
                      to="/login"
                      className={`inline-flex items-center px-4 py-2 border font-medium rounded-lg shadow-sm transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                        ? 'text-sm border-transparent text-white bg-emerald-600 hover:bg-emerald-700'
                        : 'text-sm border-emerald-300/70 text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100/80 backdrop-blur-sm'
                        }`}
                    >
                      <FaSignInAlt className="mr-2" />
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className={`inline-flex items-center px-4 py-2 border font-medium rounded-lg shadow-sm transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                        ? 'text-sm border-transparent text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                        : 'text-sm border-teal-300/70 text-teal-800 bg-teal-50/80 hover:bg-teal-100/80 backdrop-blur-sm'
                        }`}
                    >
                      <FaUserPlus className="mr-2" />
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  type="button"
                  className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-all duration-300 ${isScrolled || !isHomePage
                    ? 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                    : 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/80'
                    }`}
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Hamburger icon */}
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6 transition-transform`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {/* Close icon */}
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6 transition-transform`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
          } ${isScrolled || !isHomePage ? 'bg-white/95 backdrop-blur-md border-t border-emerald-100' : 'bg-white/95 backdrop-blur-md border-t border-emerald-100'
          }`} id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {/* Mobile Fire and Cart buttons */}
            <div className="flex justify-center space-x-4 px-4 py-3 border-b border-emerald-100">
              <button className="flex items-center px-4 py-2 rounded-full text-orange-600 bg-orange-50 border border-orange-200 font-medium">
                <FaFire className="w-4 h-4 mr-2" />
                <span className="text-sm font-bold">{fireCount}</span>
              </button>
              <button className="relative flex items-center px-4 py-2 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-200 font-medium">
                <FaShoppingCart className="w-4 h-4 mr-2" />
                <span className="text-sm">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {filteredNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ${isActive
                    ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                    : 'border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {user ? (
              <div className="mt-4 pt-4 border-t border-emerald-200 px-4">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full mr-3 border-2 border-emerald-200"
                    src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                    alt={`${user.displayName || 'User'} profile picture`}
                  />
                  <div>
                    <div className="font-medium text-emerald-800">{user.displayName || 'User'}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-emerald-200 px-4 space-y-2">
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-300"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-all duration-300"
                >
                  <FaUserPlus className="mr-2" />
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};