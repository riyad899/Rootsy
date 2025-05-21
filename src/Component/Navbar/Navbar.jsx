import React from 'react';
import Marquee from "react-fast-marquee";
import leaf from '../../images/t.png';
import { BsClock } from "react-icons/bs";
import { CiPhone, CiMail, CiTwitter } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaLeaf, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { NavLink } from 'react-router';


export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mock user data
  const user = {
    name: 'Jane Gardener',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/', private: false },
    { name: 'Explore Gardeners', href: '/explore', private: false },
    { name: 'Browse Tips', href: '/tips', private: false },
    { name: 'Share a Garden Tip', href: '/share-tip', private: true },
    { name: 'My Tips', href: '/my-tips', private: true },
  ];

  return (
    <div className="fixed w-full z-50">
      {/* Top Navbar with Leaf Background */}
      <div
        className={`w-screen h-[50px] flex items-center bg-[#124a2f] bg-[length:100px_auto] bg-repeat transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${leaf})` }}
      >
        <div className='w-9/12 mx-auto flex justify-between items-center '>
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
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center'><CiTwitter /></button>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center'><FaFacebookF /></button>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center'><FaInstagram /></button>
            <button className='text-white w-[30px] h-[30px] flex items-center justify-center'><FaPinterest /></button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 border border-b-emerald-950/30 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and main nav items */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <FaLeaf className={`h-8 w-8 transition-colors duration-300 ${isScrolled ? 'text-green-600' : 'text-white'}`} />
                <span className={`ml-2 text-xl font-semibold transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white'}`}>Rootsy</span>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => {
                  if (link.private && !isLoggedIn) return null;
                  return (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      className={({ isActive }) => {
                        let baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300";

                        if (isActive) {
                          return `${baseClasses} border-green-500 text-white`;
                        }else{
                          `${baseClasses} text-stone-950`
                        }

                        let inactiveTextColor = isScrolled
                          ? "text-black hover:border-gray-300 hover:text-gray-700"
                          : "text-white hover:border-gray-200 hover:text-gray-200";

                        return `${baseClasses} border-transparent ${inactiveTextColor}`;
                      }}
                    >
                      {link.name}
                    </NavLink>

                  );
                })}
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isLoggedIn ? (
                /* User profile dropdown */
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.photo}
                        alt="User profile"
                        title={user.name}
                      />
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-white ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <button
                        onClick={toggleLogin}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login/Signup buttons */
                <div className="flex space-x-4">
                  <NavLink
                    to="/login"
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors duration-300 ${isScrolled
                      ? 'text-white bg-green-600 hover:bg-green-700'
                      : 'text-green-700 bg-white hover:bg-gray-100'
                      }`}
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors duration-300 ${isScrolled
                      ? 'text-green-700 bg-green-100 hover:bg-green-200'
                      : 'text-white bg-green-600 hover:bg-green-700'
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
                className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled ? 'text-gray-400 hover:text-gray-500' : 'text-white hover:text-gray-200'
                  } hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500`}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
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
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
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
        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                if (link.private && !isLoggedIn) return null;
                return (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) =>
                      `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                        ? 'border-green-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              {!isLoggedIn ? (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <NavLink
                    to="/login"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="mt-2 w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-green-100 hover:bg-green-200"
                  >
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </NavLink>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photo}
                      alt="User profile"
                    />
                    <span className="ml-3 text-base font-medium text-gray-800">{user.name}</span>
                  </div>
                  <button
                    onClick={toggleLogin}
                    className="mt-2 w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};