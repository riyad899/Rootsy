import React, { useState, useEffect } from 'react';

export const Toptreanding = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://backend-test-blush.vercel.app/tips');

        if (!response.ok) {
          throw new Error(`Failed to fetch tips: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const publicTips = data.filter(tip => tip.availability === 'Public');
        setTips(publicTips);
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleViewPost = (postId) => {
    // Handle navigation to post details
    console.log('Navigating to post:', postId);
    // You can implement your navigation logic here
  };

  const categories = ['All', 'Gardens', 'Interiors', 'Maintaince', 'Urban', ...new Set(tips.map(tip => tip.category))];

  const filteredTips = activeCategory === 'All'
    ? tips
    : tips.filter(tip => tip.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading tips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Something went wrong</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-10'>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="py-16 px-4 text-center">
        <h1 className="text-5xl font-bold text-[#1AB052] mb-4 tracking-tight">
          Top Trending Tips
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover curated gardening insights and professional landscaping advice
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="px-6 pb-20 max-w-7xl mx-auto">
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTips.map((tip) => (
              <div
                key={tip._id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl relative cursor-pointer"
                     onClick={() => handleViewPost(tip._id)}>
                  <img
                    src={tip.imageUrl || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'}
                    alt={tip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay with View Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button
                      className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPost(tip._id);
                      }}
                    >
                      View Tips
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    {tip.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {tip.category}
                      </span>
                    )}
                    {tip.difficulty && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tip.difficulty.toLowerCase() === 'easy'
                          ? 'bg-green-100 text-green-800'
                          : tip.difficulty.toLowerCase() === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : tip.difficulty.toLowerCase() === 'hard'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tip.difficulty}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 leading-tight">
                    {tip.title}
                  </h3>

                  {tip.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {tip.description}
                    </p>
                  )}

                  {tip.location && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{tip.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Tips Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No tips found for the selected category. Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
    </div>
  );
};

export default Toptreanding;