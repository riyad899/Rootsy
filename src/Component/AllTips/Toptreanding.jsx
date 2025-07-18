import React, { useState, useMemo } from 'react';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

export const Toptreanding = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Use the centralized API hook
  const { data: allTips = [], isLoading: loading, error: queryError } = UseApiousSecure.useTips();

  // Process tips data
  const tips = useMemo(() => {
    if (!allTips.length) {
      // Fallback demo data for display
      return [
        {
          _id: '1',
          title: 'Perfect Watering Schedule for Indoor Plants',
          description: 'Learn the optimal watering techniques to keep your houseplants thriving year-round.',
          category: 'Interiors',
          difficulty: 'Easy',
          location: 'Indoor Garden'
        },
        {
          _id: '2',
          title: 'Creating a Butterfly Garden Paradise',
          description: 'Transform your outdoor space into a vibrant butterfly sanctuary with these proven methods.',
          category: 'Gardens',
          difficulty: 'Medium',
          location: 'Backyard'
        },
        {
          _id: '3',
          title: 'Urban Balcony Herb Garden Setup',
          description: 'Maximize small spaces with this comprehensive guide to growing fresh herbs in the city.',
          category: 'Urban',
          difficulty: 'Easy',
          location: 'Balcony'
        },
          {
            _id: '4',
            title: 'Seasonal Pruning Techniques',
            description: 'Master the art of pruning with seasonal timing and proper techniques for healthy plant growth.',
            category: 'Maintenance',
            difficulty: 'Hard',
          location: 'Garden'
        },
        {
          _id: '5',
          title: 'Soil Composition for Thriving Plants',
          description: 'Understand soil pH, nutrients, and composition for creating the perfect growing environment.',
          category: 'Gardens',
          difficulty: 'Medium',
          location: 'Outdoor'
        }
      ];
    }

    const publicTips = allTips.filter(tip => tip.availability === 'Public');
    return publicTips.slice(0, 5); // Limit to 5 tips
  }, [allTips]);

  const error = queryError?.message;

  const handleViewPost = (postId) => {
    console.log('Navigating to post:', postId);
  };

  const categories = ['All', 'Gardens', 'Interiors', 'Maintenance', 'Urban', ...new Set(tips.map(tip => tip.category))];

  const filteredTips = activeCategory === 'All'
    ? tips.slice(0, 5)
    : tips.filter(tip => tip.category === activeCategory).slice(0, 5);

  const getCardGradient = (index) => {
    return 'from-emerald-600 to-teal-600';
  };

  const getIconForCategory = (category) => {
    switch (category?.toLowerCase()) {
      case 'interiors':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'gardens':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'urban':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'maintenance':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-emerald-700 font-semibold mt-4 text-lg">Loading Amazing Tips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold text-xl">Oops! Something went wrong</p>
          <p className="text-gray-500 mt-2">But don't worry, we have some demo tips for you!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      <div className="relative z-10 mx-4 lg:mx-10">
        {/* Header Section */}
        <div className="py-16 px-4 text-center">
          <div className="relative inline-block">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              <span className="font-serif italic bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Top</span> Trending Tips
            </h1>
          </div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover <span className="font-semibold text-emerald-700">curated gardening insights</span> and professional landscaping advice
          </p>
        </div>

        {/* Tips Grid */}
        <div className="px-6 pb-20 max-w-6xl mx-auto">
          {filteredTips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTips.map((tip, index) => (
                <div
                  key={tip._id}
                  className={`group relative transform-gpu perspective-1000 animate-shake-3d hover:animate-shake-intense`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className={`relative bg-gradient-to-r from-emerald-600 to-teal-600 p-1 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:rotateY-12 hover:rotateX-6 hover:scale-105`}>
                    {/* Inner Card */}
                    <div className="bg-white rounded-xl p-6 h-full relative overflow-hidden transform transition-transform duration-500 hover:rotateY-6">
                      {/* Decorative Elements */}
                      <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-emerald-100/40 to-teal-100/20 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-br from-emerald-200/60 to-teal-200/30 rounded-full"></div>

                      {/* Category Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white transform hover:rotate-12 transition-transform duration-300`}>
                            {getIconForCategory(tip.category)}
                          </div>
                          {tip.category && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                              {tip.category}
                            </span>
                          )}
                        </div>
                        {tip.difficulty && (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg transform hover:scale-110 transition-transform duration-300 ${
                            tip.difficulty.toLowerCase() === 'easy'
                              ? 'bg-green-100 text-green-800 shadow-green-200'
                              : tip.difficulty.toLowerCase() === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 shadow-yellow-200'
                              : tip.difficulty.toLowerCase() === 'hard'
                              ? 'bg-red-100 text-red-800 shadow-red-200'
                              : 'bg-gray-100 text-gray-800 shadow-gray-200'
                          }`}>
                            {tip.difficulty}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-2 leading-tight transform hover:scale-105 transition-transform duration-300">
                        {tip.title}
                      </h3>

                      {/* Description */}
                      {tip.description && (
                        <p className="text-gray-600 text-sm line-clamp-4 mb-4 leading-relaxed">
                          {tip.description}
                        </p>
                      )}

                      {/* Location */}
                      {tip.location && (
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <svg className="w-4 h-4 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate font-medium">{tip.location}</span>
                        </div>
                      )}

                      {/* Action Button */}
                      <button
                        onClick={() => handleViewPost(tip._id)}
                        className={`w-full mt-4 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 hover:from-emerald-700 hover:to-teal-700`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>View Tips</span>
                          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>

                      {/* Number Badge */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-3">No Tips Available</h3>
              <p className="text-gray-500 max-w-md mx-auto text-lg">
                No tips found for the selected category. Try selecting a different category or check back later.
              </p>
            </div>
          )}
        </div>

        {/* Enhanced CSS */}
        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .perspective-1000 {
            perspective: 1000px;
          }

          .transform-gpu {
            transform: translate3d(0, 0, 0);
          }

          @keyframes shake-3d {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0);
            }
            10% {
              transform: translate3d(-2px, -1px, 2px) rotateX(1deg) rotateY(-1deg) rotateZ(0.5deg);
            }
            20% {
              transform: translate3d(2px, 1px, -1px) rotateX(-0.5deg) rotateY(1deg) rotateZ(-0.5deg);
            }
            30% {
              transform: translate3d(-1px, 2px, 1px) rotateX(0.5deg) rotateY(-0.5deg) rotateZ(1deg);
            }
            40% {
              transform: translate3d(1px, -2px, -2px) rotateX(-1deg) rotateY(0.5deg) rotateZ(-0.5deg);
            }
            50% {
              transform: translate3d(-2px, 1px, 1px) rotateX(0.5deg) rotateY(-1deg) rotateZ(0.5deg);
            }
            60% {
              transform: translate3d(2px, -1px, -1px) rotateX(-0.5deg) rotateY(1deg) rotateZ(-1deg);
            }
            70% {
              transform: translate3d(-1px, -2px, 2px) rotateX(1deg) rotateY(-0.5deg) rotateZ(0.5deg);
            }
            80% {
              transform: translate3d(1px, 2px, -2px) rotateX(-1deg) rotateY(0.5deg) rotateZ(-0.5deg);
            }
            90% {
              transform: translate3d(-2px, -1px, 1px) rotateX(0.5deg) rotateY(-1deg) rotateZ(1deg);
            }
          }

          @keyframes shake-intense {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1);
            }
            10% {
              transform: translate3d(-4px, -2px, 4px) rotateX(2deg) rotateY(-2deg) rotateZ(1deg) scale(1.02);
            }
            20% {
              transform: translate3d(4px, 2px, -2px) rotateX(-1deg) rotateY(2deg) rotateZ(-1deg) scale(0.98);
            }
            30% {
              transform: translate3d(-2px, 4px, 2px) rotateX(1deg) rotateY(-1deg) rotateZ(2deg) scale(1.01);
            }
            40% {
              transform: translate3d(2px, -4px, -4px) rotateX(-2deg) rotateY(1deg) rotateZ(-1deg) scale(0.99);
            }
            50% {
              transform: translate3d(-4px, 2px, 2px) rotateX(1deg) rotateY(-2deg) rotateZ(1deg) scale(1.03);
            }
            60% {
              transform: translate3d(4px, -2px, -2px) rotateX(-1deg) rotateY(2deg) rotateZ(-2deg) scale(0.97);
            }
            70% {
              transform: translate3d(-2px, -4px, 4px) rotateX(2deg) rotateY(-1deg) rotateZ(1deg) scale(1.02);
            }
            80% {
              transform: translate3d(2px, 4px, -4px) rotateX(-2deg) rotateY(1deg) rotateZ(-1deg) scale(0.98);
            }
            90% {
              transform: translate3d(-4px, -2px, 2px) rotateX(1deg) rotateY(-2deg) rotateZ(2deg) scale(1.01);
            }
          }

          .animate-shake-3d {
            animation: shake-3d 3s ease-in-out infinite;
          }

          .animate-shake-intense {
            animation: shake-intense 0.8s ease-in-out infinite;
          }

          .hover\\:rotateY-12:hover {
            transform: rotateY(12deg);
          }

          .hover\\:rotateX-6:hover {
            transform: rotateX(6deg);
          }

          .hover\\:rotateY-6:hover {
            transform: rotateY(6deg);
          }

          .hover\\:rotate-1:hover {
            transform: rotate(1deg);
          }

          .hover\\:rotate-12:hover {
            transform: rotate(12deg);
          }

          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }
        `}</style>
      </div>
    </div>
  );
};