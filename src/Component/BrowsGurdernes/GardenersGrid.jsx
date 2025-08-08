import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

const GardenersGrid = () => {
  const [filteredGardeners, setFilteredGardeners] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Use the centralized API hook for tips and users
  const { tips, users, isLoading: loading, isError, error } = UseApiousSecure.useTipsAndUsers();

  const gardeners = users.data || [];
  const tipsData = tips.data || [];

  function countUserTips(tipsData, userEmail) {
    return tipsData.filter(tip => tip.userEmail === userEmail).length;
  }

  function getAccountAge(createdAt) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - createdDate.getFullYear();
    let months = currentDate.getMonth() - createdDate.getMonth();
    let days = currentDate.getDate() - createdDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    let result = "";

    if (years > 0) {
      result += `${years} year${years > 1 ? "s" : ""} `;
    }
    if (months > 0 || years > 0) {
      result += `${months} month${months > 1 ? "s" : ""} `;
    }
    result += `${days} day${days > 1 ? "s" : ""} `;

    return result.trim();
  }

  useEffect(() => {
    if (gardeners.length > 0) {
      setFilteredGardeners(gardeners);
    }
  }, [gardeners]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGardeners(gardeners);
    } else {
      const filtered = gardeners.filter(gardener =>
        gardener.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGardeners(filtered);
    }
  }, [searchTerm, gardeners]);

  const handleFindFriendsClick = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm('');
    }
  };

  const handleSuggestions = () => {
    toast.info('Suggestion feature coming soon!');
  };

  const handleMessageGardener = (gardener) => {
    navigate('/messages');
    toast.success(`Starting conversation with ${gardener.name}`);
  };

  const handleViewProfile = (gardener) => {
    navigate('/my-profile');
    toast.info(`Viewing ${gardener.name}'s profile`);
  };

  const handleMoreOptions = (gardener) => {
    toast.info(`More options for ${gardener.name} coming soon!`);
  };

  const handleLoadMore = () => {
    toast.info('Load more functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{borderTopColor: '#00C950', borderBottomColor: '#00C950'}}></div>
        <span className="ml-3 text-gray-600">Loading gardeners...</span>
      </div>
    );
  }

  if (isError || error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading gardeners</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error || 'Failed to load data'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gardeners.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No gardeners found</h3>
        <p className="mt-1 text-sm text-gray-500">Check back later to see our growing community!</p>
      </div>
    );
  }

  return (
    <div className="mt-[110px] max-w-5xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gardening Friends</h1>
            <p className="text-gray-600 mt-1">{filteredGardeners.length} gardeners in your community</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleFindFriendsClick}
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors duration-200 text-sm font-medium"
              style={{backgroundColor: '#00C950'}}
            >
              {showSearch ? 'Cancel' : 'Find Friends'}
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
              onClick={handleSuggestions}
            >
              Suggestions
            </button>
          </div>
        </div>

        {/* Search Box */}
        {showSearch && (
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Search gardeners by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Friends List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredGardeners.length > 0 ? (
            filteredGardeners.map((gardener) => (
              <div
                key={gardener._id}
                className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* Profile Picture */}
                  <div className="relative flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                      src={gardener.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                      alt={`${gardener.name}'s profile`}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                      }}
                    />
                    {/* Online Status Indicator */}
                    <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                      gardener.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {gardener.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600">
                            <span className="inline-flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              Gardening for {getAccountAge(gardener.createdAt)}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="inline-flex items-center">
                              <svg className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {countUserTips(tipsData, gardener.email)} tips shared
                            </span>
                          </p>
                        </div>
                        {gardener.otherInfo && (
                          <p className="text-sm text-gray-500 mt-1 italic truncate">
                            "{gardener.otherInfo}"
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 ml-4">
                        <button
                          className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors duration-200"
                          style={{backgroundColor: '#00C950'}}
                          onClick={() => handleMessageGardener(gardener)}
                        >
                          Message
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
                          onClick={() => handleViewProfile(gardener)}
                        >
                          View Profile
                        </button>
                        <div className="relative">
                          <button
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => handleMoreOptions(gardener)}
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mutual Connections or Additional Info */}
                <div className="mt-3 ml-20 flex items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Member since {new Date(gardener.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                  <span className="mx-2">•</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    gardener.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {gardener.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No gardeners found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>

      {/* Load More Button */}
      {filteredGardeners.length > 0 && (
        <div className="mt-6 text-center">
          <button
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-[70px] hover:bg-gray-300 transition-colors duration-200 font-medium"
            onClick={handleLoadMore}
          >
            Load More Gardeners
          </button>
        </div>
      )}
    </div>
  );
};

GardenersGrid.propTypes = {
  gardeners: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      image: PropTypes.string,
      otherInfo: PropTypes.string
    })
  )
};

export default GardenersGrid;