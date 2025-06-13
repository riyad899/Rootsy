import React, { useState, useEffect } from 'react';
import { MoreVertical, Filter, BookOpen, Star, Clock, User, Search, X } from 'lucide-react';

export const Alltips = () => {
  const [tips, setTips] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTip, setHoveredTip] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Predefined categories list
  const predefinedCategories = [
    'Plant Care',
    'Composting',
    'Vertical Gardening',
    'Container Gardening',
    'Indoor Gardening',
    'Pest Control',
    'Vegetables',
    'Flowers',
    'Herbs',
    'Outdoor'
  ];

  // Function to calculate time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  // Function to get user details by ID
  const getUserById = (userId) => {
    return users.find(user => user._id === userId) || null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tips and users concurrently
        const [tipsResponse, usersResponse] = await Promise.all([
          fetch('https://backend-test-blush.vercel.app/tips'),
          fetch('https://backend-test-blush.vercel.app/users')
        ]);

        if (!tipsResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [tipsData, usersData] = await Promise.all([
          tipsResponse.json(),
          usersResponse.json()
        ]);

        console.log('Tips data:', tipsData);
        console.log('Users data:', usersData);

        const publicTips = tipsData.filter(tip => tip.availability === 'Public');

        setUsers(usersData);
        setTips(publicTips);
        setFilteredTips(publicTips);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...tips];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(tip => {
        const user = getUserById(tip.userId);
        return (
          tip.title?.toLowerCase().includes(query) ||
          tip.description?.toLowerCase().includes(query) ||
          tip.category?.toLowerCase().includes(query) ||
          tip.difficulty?.toLowerCase().includes(query) ||
          user?.name?.toLowerCase().includes(query) ||
          tip.userName?.toLowerCase().includes(query)
        );
      });
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(tip =>
        tip.difficulty && tip.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(tip =>
        tip.category && tip.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredTips(result);
  }, [difficultyFilter, categoryFilter, searchQuery, tips, users]);

  // Clear search function
  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSeeMore = async (tipId) => {
    const selectedTip = tips.find(tip => tip._id === tipId);

    if (selectedTip) {
      console.log("Full Tip Details:", selectedTip);
      console.log("Formatted Tip Details:", JSON.stringify(selectedTip, null, 2));
      console.log('Routing to tip:', tipId);
      alert(`Navigating to tip: ${tipId}`);
    } else {
      console.error(`Tip with ID ${tipId} not found`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '#00AB46';
      case 'medium': return 'bg-amber-500';
      case 'hard': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'indoor':
      case 'indoor gardening': return '🏠';
      case 'outdoor': return '🌳';
      case 'vegetables': return '🥕';
      case 'flowers': return '🌸';
      case 'herbs': return '🌿';
      case 'plant care': return '🌱';
      case 'composting': return '♻️';
      case 'vertical gardening': return '🏗️';
      case 'container gardening': return '🪴';
      case 'pest control': return '🐛';
      default: return '🌱';
    }
  };

  // Get unique categories from tips data and merge with predefined categories
  const uniqueCategoriesFromTips = [...new Set(tips.map(tip => tip.category).filter(Boolean))];
  const allCategories = [...new Set([...predefinedCategories, ...uniqueCategoriesFromTips])];

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-t-transparent" style={{borderColor: '#00AB46', borderTopColor: 'transparent'}}></div>
          <span className="text-gray-700 text-lg font-medium">Loading gardening tips...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-50 min-h-screen flex justify-center items-center p-4">
        <div className="bg-white shadow-xl border border-red-200 rounded-2xl p-8 max-w-md">
          <div className="flex items-center space-x-4">
            <div className="text-red-500 bg-red-100 p-3 rounded-full">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">Error loading tips</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-50 min-h-screen text-gray-800" style={{background: 'linear-gradient(to bottom right, #f0fdf4, #ffffff, #f0fdf4)'}}>
      {/* Compact Header */}
      <div className=" mt-[120px]  " >
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Section - More Compact */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start space-x-3 mb-2">
                <div className="p-2 rounded-xl shadow-md" style={{background: 'linear-gradient(to bottom right, #00AB46, #008a38)'}}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="bg-clip-text text-green-500">
                  Gardening Tips
                </span>
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-green-800 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm" style={{backgroundColor: 'rgba(0,171,70,0.1)', color: '#00AB46', borderColor: 'rgba(0,171,70,0.3)'}}>
                  🌿 {filteredTips.length} tips
                </span>
                {searchQuery && (
                  <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200/50 shadow-sm">
                    🔍 "{searchQuery}"
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`${
                  showFilters
                    ? 'border text-green-800 shadow-md'
                    : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-green-50'
                } backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 border shadow-md hover:shadow-lg font-medium hover:scale-105 text-sm`}
                style={showFilters ? {backgroundColor: 'rgba(0,171,70,0.1)', borderColor: '#00AB46', color: '#00AB46'} : {}}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="text-white px-5 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold hover:scale-105 transform text-sm" style={{background: 'linear-gradient(to right, #00AB46, #008a38, #00AB46)'}}>
                 Upload Tip
              </button>
            </div>
          </div>

          {/* Compact Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 transition-colors duration-300" style={{'--hover-color': '#00AB46'}} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder=" Search tips by title, category, author, or keywords..."
                  className="block w-full pl-12 pr-12 py-3 border-2 rounded-2xl bg-white/80 backdrop-blur-md focus:outline-none focus:ring-3 text-gray-900 placeholder-gray-500 text-sm font-medium transition-all duration-300 hover:bg-white/90"
                  style={{
                    borderColor: 'rgba(0,171,70,0.3)',
                    boxShadow: '0 4px 6px -1px rgba(0,171,70,0.1), 0 2px 4px -1px rgba(0,171,70,0.06)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00AB46';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,171,70,0.1), 0 4px 6px -1px rgba(0,171,70,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0,171,70,0.3)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0,171,70,0.1), 0 2px 4px -1px rgba(0,171,70,0.06)';
                  }}
                />
                {searchQuery ? (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                  >
                    <div className="bg-gray-100 hover:bg-red-100 rounded-full p-1.5">
                      <X className="h-4 w-4" />
                    </div>
                  </button>
                ) : (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <div className="text-white px-3 py-1 rounded-full text-xs font-semibold" style={{background: 'linear-gradient(to right, #00AB46, #008a38)'}}>
                      Search
                    </div>
                  </div>
                )}
              </div>

              {/* Compact search suggestions */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['🌱 Plant Care', '🌿 Herbs', '🥕 Vegetables', '🌸 Flowers', '🏠 Indoor', '🌳 Outdoor'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion.split(' ')[1])}
                    className="bg-white/60 hover:text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md backdrop-blur-sm border border-gray-200/50"
                    style={{'--hover-bg': 'rgba(0,171,70,0.1)', '--hover-border': 'rgba(0,171,70,0.3)', '--hover-text': '#00AB46'}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(0,171,70,0.1)';
                      e.target.style.borderColor = 'rgba(0,171,70,0.3)';
                      e.target.style.color = '#00AB46';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255,255,255,0.6)';
                      e.target.style.borderColor = 'rgba(156,163,175,0.5)';
                      e.target.style.color = 'rgb(75,85,99)';
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Filter Controls */}
          {showFilters && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 border shadow-xl mb-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="w-full sm:w-auto min-w-[180px]">
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full mr-2" style={{backgroundColor: '#00AB46'}}></div>
                    Difficulty
                  </label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full bg-white/90 text-gray-800 border-2 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm"
                    style={{borderColor: 'rgba(0,171,70,0.3)'}}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#00AB46';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0,171,70,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0,171,70,0.3)';
                      e.target.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                    }}
                  >
                    <option value="all">🌟 All Difficulties</option>
                    <option value="easy">🟢 Easy</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="hard">🔴 Hard</option>
                  </select>
                </div>

                <div className="w-full sm:w-auto min-w-[180px]">
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full bg-white/90 text-gray-800 border-2 border-gray-200/50 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-400/30 focus:border-blue-400 shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm"
                  >
                    <option value="all">🌈 All Categories</option>
                    {allCategories.map(category => (
                      <option key={category} value={category}>
                        {getCategoryIcon(category)} {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setDifficultyFilter('all');
                      setCategoryFilter('all');
                      setSearchQuery('');
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-semibold hover:scale-105 transform text-sm"
                  >
                    🔥 Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Grid */}
      <div className='ml-[15px] mr-[15px]'>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredTips.length === 0 ? (
          <div className="text-center py-32">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-8 shadow-xl">
              {searchQuery ? (
                <Search className="h-16 w-16 text-gray-400" />
              ) : (
                <BookOpen className="h-16 w-16 text-gray-400" />
              )}
            </div>
            <h3 className="text-gray-900 text-3xl font-bold mb-4">
              {searchQuery ? '🔍 No tips found for your search' : '📚 No tips match your filters'}
            </h3>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              {searchQuery
                ? `We couldn't find any tips matching "${searchQuery}". Try different keywords or browse all tips!`
                : 'Adjust your filters or search for something specific to discover amazing gardening wisdom.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transform" style={{background: 'linear-gradient(to right, #00AB46, #008a38)'}}
              >
                🌟 Clear search & browse all
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTips.map((tip) => {
              const user = getUserById(tip.userId);
              return (
                <div
                  key={tip._id}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer group border border-gray-100/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transform h-full flex flex-col"
                  onMouseEnter={() => setHoveredTip(tip._id)}
                  onMouseLeave={() => setHoveredTip(null)}
                  onClick={() => handleSeeMore(tip._id)}
                >
                  {/* Photo - Reduced height */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {tip.imageUrl ? (
                      <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl">
                        {getCategoryIcon(tip.category)}
                      </div>
                    )}

                    {/* Difficulty badge */}
                    {tip.difficulty && (
                      <div className="absolute top-2 left-2 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg" style={{backgroundColor: tip.difficulty?.toLowerCase() === 'easy' ? '#00AB46' : tip.difficulty?.toLowerCase() === 'medium' ? '#f59e0b' : tip.difficulty?.toLowerCase() === 'hard' ? '#ef4444' : '#64748b'}}>
                        {tip.difficulty}
                      </div>
                    )}

                    {/* Category badge */}
                    {tip.category && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {tip.category}
                      </div>
                    )}

                    {/* More options */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white/90 hover:bg-white rounded-full p-1.5 text-gray-600 shadow-lg backdrop-blur-sm">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Content - Reduced padding */}
                  <div className="p-4 flex-grow flex flex-col">
                    {/* Title - Smaller font and reduced margin */}
                    <h3 className="text-gray-900 font-semibold text-sm mb-2 line-clamp-2 transition-colors leading-snug" style={{'--hover-color': '#00AB46'}} onMouseEnter={(e) => e.target.style.color = '#00AB46'} onMouseLeave={(e) => e.target.style.color = 'rgb(17,24,39)'}>
                      {tip.title}
                    </h3>

                    {/* User info - Smaller spacing */}
                    <div className="flex items-center space-x-2 mb-2 mt-auto">
                      <div className="w-8 h-5 rounded-full flex items-center justify-center shadow-md" style={{background: 'linear-gradient(to bottom right, #00AB46, #008a38)'}}>
                        {user?.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {user?.name || tip.userName || 'Anonymous Gardener'}
                        </p>
                        <div className="flex items-center space-x-1 text-[10px] text-gray-500">
                          <Clock className="w-2.5 h-2.5" />
                          <span>
                            {tip.createdAt ? getTimeAgo(tip.createdAt) : 'Recently'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats - Smaller text and padding */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px]">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-2.5 h-2.5" />
                          <span>{tip.likes || '0'} likes</span>
                        </div>
                      </div>
                      <div className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{color: '#00AB46', backgroundColor: 'rgba(0,171,70,0.1)'}}>
                        Public
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {filteredTips.length > 0 && (
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-700 px-6 py-2 rounded-3xl transition-all duration-300 border-2 border-gray-200/50 shadow-xl hover:shadow-2xl font-bold text-lg hover:scale-105 transform">
               Load More Tips
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};