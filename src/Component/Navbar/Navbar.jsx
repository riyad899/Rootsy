import React, { useContext, useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import leaf from '../../images/t.png';
import { BsClock } from "react-icons/bs";
import { CiPhone, CiMail, CiTwitter } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaPinterest, FaLeaf, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import { router } from '../../Routes/routes';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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
    <div className={`fixed w-full z-20 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Top Navbar with Leaf Background */}
      <div
        className={`w-screen transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-[50px] opacity-100'
        } flex items-center bg-[#124a2f] bg-[length:100px_auto] bg-repeat`}
        style={{ backgroundImage: `url(${leaf})` }}
      >
        <div className='w-9/12 mx-auto flex justify-between items-center'>
          <Marquee pauseOnHover className='w-10/12 hidden md:flex'>
            <div className='flex gap-10 items-center text-white text-sm'>
              <div className='flex items-center gap-2'>
                <CiPhone className='w-5 h-5' />
                <span>+880XXXXXXXXX</span>
              </div>
              <div className='flex items-center gap-2'>
                <BsClock className='w-5 h-5' />
                <span>Mon - Fri: 9:00 - 19:00 / Closed on Weekends</span>
              </div>
              <div className='flex items-center gap-2'>
                <CiMail className='w-5 h-5' />
                <span>office@example.com</span>
              </div>
            </div>
          </Marquee>

          {/* Social Media Icons */}
          <div className='flex gap-2 items-center'>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center hover:scale-110 transition-transform'><CiTwitter /></button>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center hover:scale-110 transition-transform'><FaFacebookF /></button>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center hover:scale-110 transition-transform'><FaInstagram /></button>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center hover:scale-110 transition-transform'><FaPinterest /></button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : (isHomePage ? 'bg-transparent' : 'bg-white shadow-md')
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between transition-all duration-300 ${
            isScrolled ? 'h-14' : 'h-16'
          }`}>
            {/* Logo and main nav items */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <FaLeaf className={`transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? 'h-6 w-6 text-green-600'
                    : 'h-8 w-8 text-white'
                }`} />
                <span className={`ml-2 font-semibold transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-lg text-green-600'
                    : 'text-xl text-white'
                }`}>Rootsy</span>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {filteredNavLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) => {
                      let baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:scale-105";

                      if (isScrolled || !isHomePage) {
                        return isActive
                          ? `${baseClasses} border-green-500 text-gray-900`
                          : `${baseClasses} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;
                      } else {
                        return isActive
                          ? `${baseClasses} border-white text-white`
                          : `${baseClasses} border-transparent text-white/80 hover:border-white/50 hover:text-white`;
                      }
                    }}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right side items - Login/Signup buttons or Profile */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform hover:scale-110"
                      id="user-menu"
                      aria-expanded={isProfileOpen}
                      aria-haspopup="true"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      onKeyDown={handleProfileKeyDown}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className={`rounded-full border-2 transition-all duration-300 ${
                          isScrolled || !isHomePage
                            ? 'h-7 w-7 border-gray-200'
                            : 'h-8 w-8 border-white/50'
                        }`}
                        src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                        alt={`${user.displayName || 'User'} profile picture`}
                      />
                    </button>
                  </div>
                  {/* Profile dropdown menu */}
                  {isProfileOpen && (
  <div
    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white/95 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="user-menu"
  >
    {/* User Info Section */}
    <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
      <div className="font-medium">{user.displayName || 'User'}</div>
      <div className="text-xs text-gray-500 truncate">{user.email}</div>
    </div>

    {/* Navigation Links */}
    <div className="py-1">
      <button
        onClick={() => {
          // Navigate to profile
          // router.push('/profile') or your navigation method
          setIsProfileOpen(false);
        }}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        role="menuitem"
        tabIndex="0"
      >
        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Profile
      </button>

      <NavLink to="/my-tips">
      <button
        onClick={() => {
        navigate('/my-tips'); // Adjust this to your routing method
          setIsProfileOpen(false);
        }}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        role="menuitem"
        tabIndex="0"
      >
        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Tips
      </button>
      </NavLink>

      <NavLink
  to="/share-tip"
  onClick={() => setIsProfileOpen(false)}
  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
  role="menuitem"
>
  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
  Share Tips
</NavLink>

      <button
        onClick={() => {
          // Navigate to buy plants
          // router.push('/buy-plants') or your navigation method
          setIsProfileOpen(false);
        }}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        role="menuitem"
        tabIndex="0"
      >
        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
        Buy Plants
      </button>

      <button
        onClick={() => {
          // Navigate to sell plants
          // router.push('/sell-plants') or your navigation method
          setIsProfileOpen(false);
        }}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        role="menuitem"
        tabIndex="0"
      >
        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Sell Plants
      </button>

          <button
        onClick={() => {
          // Navigate to sell plants
          // router.push('/sell-plants') or your navigation method
          setIsProfileOpen(false);
        }}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        role="menuitem"
        tabIndex="0"
      >
      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
       Gardening Calender
      </button>

      <button
        onClick={() => {
          // Navigate to settings
          // router.push('/settings') or your navigation method
          setIsProfileOpen(false);
        }}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        role="menuitem"
        tabIndex="0"
      >
        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings
      </button>
    </div>

    {/* Logout Section */}
    <div className="border-t border-gray-200 pt-1">
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
                <div className="flex space-x-4">
                  <NavLink
                    to="/login"
                    className={`inline-flex items-center px-4 py-2 border font-medium rounded-md shadow-sm transition-all duration-300 hover:scale-105 ${
                      isScrolled || !isHomePage
                        ? 'text-sm border-transparent text-white bg-green-600 hover:bg-green-700'
                        : 'text-sm border-white text-white bg-transparent hover:bg-white hover:text-green-600'
                    }`}
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={`inline-flex items-center px-4 py-2 border font-medium rounded-md shadow-sm transition-all duration-300 hover:scale-105 ${
                      isScrolled || !isHomePage
                        ? 'text-sm border-transparent text-green-700 bg-green-100 hover:bg-green-200'
                        : 'text-sm border-white/50 text-white bg-white/10 hover:bg-white hover:text-green-600'
                    }`}
                  >
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                    : 'text-white hover:text-white hover:bg-white/10'
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

        {/* Mobile menu */}
        <div className={`sm:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        } ${
          isScrolled || !isHomePage ? 'bg-white/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'
        }`} id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {filteredNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ${isActive
                    ? 'border-green-500 text-gray-900 bg-green-50'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {user ? (
              <div className="mt-4 pt-4 border-t border-gray-200 px-4">
                <div className="flex items-center mb-4">
                  <img
                    className="h-10 w-10 rounded-full mr-3"
                    src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                    alt={`${user.displayName || 'User'} profile picture`}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{user.displayName || 'User'}</div>
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
              <div className="mt-4 pt-4 border-t border-gray-200">
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-300"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-green-100 hover:bg-green-200 transition-all duration-300"
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