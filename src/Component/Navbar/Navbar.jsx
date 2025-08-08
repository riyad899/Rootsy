import React, { useContext, useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaPinterest, FaLeaf, FaSignInAlt, FaUserPlus, FaFire, FaShoppingCart, FaBell, FaEnvelope, FaHome, FaUsers, FaLightbulb, FaSeedling, FaStore } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [fireCount, setFireCount] = useState(42); // Demo fire count
  const [cartCount, setCartCount] = useState(0);
  const { user, logOut } = useContext(AuthContext);

  const location = useLocation();

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('gardeningCart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    // Initial load
    updateCartCount();

    // Listen for storage changes (when cart is updated in other tabs)
    window.addEventListener('storage', updateCartCount);

    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notification dropdown if clicked outside
      if (isNotificationOpen && !event.target.closest('[aria-labelledby="notification-menu"]') && !event.target.closest('button[aria-expanded="true"]')) {
        setIsNotificationOpen(false);
      }
      // Close inbox dropdown if clicked outside
      if (isInboxOpen && !event.target.closest('[aria-labelledby="inbox-menu"]') && !event.target.closest('button[aria-expanded="true"]')) {
        setIsInboxOpen(false);
      }
      // Close profile dropdown if clicked outside
      if (isProfileOpen && !event.target.closest('[aria-labelledby="user-menu"]') && !event.target.closest('button[aria-expanded="true"]')) {
        setIsProfileOpen(false);
      }
    };

    if (isNotificationOpen || isInboxOpen || isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isNotificationOpen, isInboxOpen, isProfileOpen]);

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
        setIsNotificationOpen(false);
        setIsInboxOpen(false);
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
        setIsNotificationOpen(false);
        setIsInboxOpen(false);
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

  const handleNotificationKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsNotificationOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsNotificationOpen(!isNotificationOpen);
    }
  };

  const handleInboxKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsInboxOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsInboxOpen(!isInboxOpen);
    }
  };

  // Sample messages data
  const sampleMessages = [
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      message: 'Hey! I saw your post about the fiddle leaf fig. Do you have any care tips?',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      sender: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: 'Thanks for the succulent care guide! My plants are thriving now.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      sender: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      message: 'Are you still selling the monstera plant?',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 4,
      sender: 'Garden Club',
      avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=40&h=40&fit=crop&crop=center',
      message: 'Welcome to our monthly newsletter! Check out this month\'s featured plants.',
      time: '1 day ago',
      unread: false
    }
  ];

  const navLinks = [
    { name: 'Home', href: '/', private: false, icon: FaHome },
    { name: 'Explore Gardeners', href: '/explore', private: false, icon: FaUsers },
    { name: 'Browse Tips', href: '/tips', private: false, icon: FaLightbulb },
    { name: 'Buy Plants', href: '/buy-plants', private: true, icon: FaSeedling },
    { name: 'Sell Plants', href: '/sell-plants', private: true, icon: FaStore },
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
                {filteredNavLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
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
                      <IconComponent className="mr-2 h-4 w-4" />
                      {link.name}
                    </NavLink>
                  );
                })}
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
              <NavLink
                to="/cart"
                className={({ isActive }) => {
                  const baseClasses = "relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105";
                  if (isScrolled || !isHomePage) {
                    return isActive
                      ? `${baseClasses} text-emerald-700 bg-emerald-100 border border-emerald-300`
                      : `${baseClasses} text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200`;
                  } else {
                    return isActive
                      ? `${baseClasses} text-emerald-800 bg-emerald-100/90 border border-emerald-300/70 backdrop-blur-sm`
                      : `${baseClasses} text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/60 backdrop-blur-sm`;
                  }
                }}
              >
                <FaShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsNotificationOpen(false);
                    setIsInboxOpen(!isInboxOpen);
                  }}
                  onKeyDown={handleInboxKeyDown}
                  className={`relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                    : 'text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 backdrop-blur-sm'
                  }`}
                  aria-expanded={isInboxOpen}
                  aria-haspopup="true"
                >
                  <FaEnvelope className="w-4 h-4" />
                  {/* Unread messages indicator */}
                  {sampleMessages.filter(msg => msg.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {sampleMessages.filter(msg => msg.unread).length}
                    </span>
                  )}
                </button>

                {/* Inbox dropdown menu */}
                {isInboxOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-96 rounded-xl shadow-lg py-1 bg-white/95 backdrop-blur-md ring-1 ring-emerald-200 ring-opacity-50 focus:outline-none border border-emerald-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="inbox-menu"
                  >
                    {/* Inbox Header */}
                    <div className="px-4 py-3 text-sm text-gray-700 border-b border-emerald-100">
                      <div className="font-medium text-emerald-800 flex items-center justify-between">
                        <span>Messages</span>
                        <FaEnvelope className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>

                    {/* Messages List */}
                    <div className="max-h-80 overflow-y-auto">
                      {sampleMessages.slice(0, 3).map((message) => (
                        <div
                          key={message.id}
                          className={`px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                            message.unread ? 'bg-blue-50/50' : ''
                          }`}
                          onClick={() => {
                            setIsInboxOpen(false);
                            // Navigate to messages page with specific message
                            window.location.href = `/messages?id=${message.id}`;
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={message.avatar}
                              alt={message.sender}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                  {message.sender}
                                </p>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500">{message.time}</span>
                                  {message.unread && (
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full ml-2"></div>
                                  )}
                                </div>
                              </div>
                              <p className={`text-sm ${message.unread ? 'text-gray-900' : 'text-gray-600'} truncate mt-1`}>
                                {message.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Show All Messages Button */}
                    <div className="px-4 py-3 border-t border-emerald-100">
                      <NavLink
                        to="/messages"
                        onClick={() => setIsInboxOpen(false)}
                        className="block w-full text-center px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        Show all messages
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              {/* Notification Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsInboxOpen(false);
                    setIsNotificationOpen(!isNotificationOpen);
                  }}
                  onKeyDown={handleNotificationKeyDown}
                  className={`relative inline-flex items-center px-3 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${isScrolled || !isHomePage
                    ? 'text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    : 'text-gray-700 bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/60 backdrop-blur-sm'
                  }`}
                  aria-expanded={isNotificationOpen}
                  aria-haspopup="true"
                >
                  <FaBell className="w-4 h-4 text-[#007A55]" />
                </button>

                {/* Notification dropdown menu */}
                {isNotificationOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-lg py-1 bg-white/95 backdrop-blur-md ring-1 ring-emerald-200 ring-opacity-50 focus:outline-none border border-emerald-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="notification-menu"
                  >
                    {/* Notification Header */}
                    <div className="px-4 py-3 text-sm text-gray-700 border-b border-emerald-100">
                      <div className="font-medium text-emerald-800 flex items-center justify-between">
                        <span>Notifications</span>
                        <FaBell className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>

                    {/* Notification Content */}
                    <div className="py-4">
                      <div className="flex flex-col items-center justify-center text-center px-4 py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <FaBell className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-1">No notifications</p>
                        <p className="text-gray-400 text-xs">You're all caught up!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>




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
                        onClick={() => {
                          setIsNotificationOpen(false);
                          setIsInboxOpen(false);
                          setIsProfileOpen(!isProfileOpen);
                        }}
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

                          <NavLink
                            to="/buy-plants"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            Buy Plants
                          </NavLink>

                          <NavLink
                            to="/sell-plants"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Sell Plants
                          </NavLink>

                               <NavLink
                            to="/calender"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                               Gardening Calendar
                          </NavLink>

                          <NavLink
                            to="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            role="menuitem"
                          >
                            <svg className="w-4 h-4 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </NavLink>
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

              <NavLink
                to="/cart"
                className="relative flex items-center px-4 py-2 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-200 font-medium hover:bg-emerald-100 transition-colors"
              >
                <FaShoppingCart className="w-4 h-4 mr-2" />
                <span className="text-sm">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>


            </div>

            {filteredNavLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ${isActive
                      ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                      : 'border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50'
                    }`
                  }
                >
                  <IconComponent className="mr-3 h-4 w-4" />
                  {link.name}
                </NavLink>
              );
            })}
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