import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Search, X, Heart } from 'lucide-react';
import CopilotChat from '../CopilotChat.jsx/CopilotChat';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

export const Alltips = () => {
  // Use centralized API hooks
  const { tips, users, likes, isLoading: loading, isError, error } = UseApiousSecure.useTipsUsersAndLikes();

  const [filteredTips, setFilteredTips] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extract data from queries
  const tipsData = tips.data || [];
  const usersData = users.data || [];
  const likesData = likes.data || [];

  // Calculate time since post was created
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

  // Get user by ID
  const getUserById = (userId) => {
    return usersData.find(user => user._id === userId) || null;
  };

  // Count likes for a tip
  const getLikeCount = (tipId) => {
    return likesData.filter(like => like.id === tipId).length;
  };

  // Update filtered tips when data or filters change
  useEffect(() => {
    if (tipsData.length > 0) {
      console.log('Total tips received:', tipsData.length); // Debug log
      console.log('Total users received:', usersData.length); // Debug log
      console.log('Total likes received:', likesData.length); // Debug log

      setFilteredTips(tipsData);
    }
  }, [tipsData, usersData, likesData]);

  // Handle error state
  if (isError || error) {
    console.error('Error fetching data:', error); // Debug log
    return (
      <div className="p-4 text-red-500 text-center">
        Error: {error || 'Failed to load data'}
      </div>
    );
  }

  // Apply filters when they change
  useEffect(() => {
    let result = [...tipsData];

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

    if (difficultyFilter !== 'all') {
      result = result.filter(tip =>
        tip.difficulty && tip.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(tip =>
        tip.category && tip.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    console.log('Filtered tips count:', result.length); // Debug log
    setFilteredTips(result);
  }, [difficultyFilter, categoryFilter, searchQuery, tipsData, usersData]);

  const clearSearch = () => setSearchQuery('');
  const toggleFilters = () => setShowFilters(!showFilters);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '#00AB46';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#64748B';
    }
  };

  const getUserAvatar = (user) => {
    if (user?.avatar) return user.avatar;
    return `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-[155px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Gardening Tips ({filteredTips.length})</h2>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tips..."
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          onClick={toggleFilters}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Categories</option>
              <option value="Plant Care">Plant Care</option>
              <option value="Composting">Composting</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Flowers">Flowers</option>
            </select>
          </div>
        </div>
      )}

      {/* Tips List */}
      {filteredTips.length === 0 ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <p className="font-medium">No tips found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTips.map((tip) => {
            const user = getUserById(tip.userId);
            const likeCount = getLikeCount(tip._id);

            return (
              <div key={tip._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden flex h-64">
                {/* Image Section - Fixed Size */}
                <div className="w-1/3 h-full bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={tip.imageUrl || "https://via.placeholder.com/300x256?text=No+Image"}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x256?text=No+Image";
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="w-2/3 p-4 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{tip.title}</h3>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                      style={{
                        backgroundColor: `${getDifficultyColor(tip.difficulty)}20`,
                        color: getDifficultyColor(tip.difficulty)
                      }}
                    >
                      {tip.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">{tip.description}</p>

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tip.plantType}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tip.category}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tip.availability}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={getUserAvatar(user || { name: tip.userName })}
                          alt={user?.name || tip.userName}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{user?.name || tip.userName}</p>
                          <p className="text-xs text-gray-500">{getTimeAgo(tip.createdAt)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500">
                        <Heart className="h-4 w-4" fill="#EF4444" color="#EF4444" />
                        <span className="text-sm">{likeCount}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => console.log('View tip:', tip._id)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CopilotChat component for tips assistance */}
      <CopilotChat />
    </div>
  );
};