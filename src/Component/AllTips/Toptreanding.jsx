import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Toptreanding = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

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
    navigate(`/posts/${postId}`);
  };

  const categories = ['All', 'Gardens', 'Interiors', 'Maintaince', 'Urban', ...new Set(tips.map(tip => tip.category))];

  const filteredTips = activeCategory === 'All'
    ? tips
    : tips.filter(tip => tip.category === activeCategory);

  // Enhanced loading animation with gardening theme
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" style={{background: 'linear-gradient(135deg, #EBFDF0 0%, #E0F7FA 50%, #F1F8E9 100%)'}}>
        <div className="text-center">
          <div className="relative">
            {/* Animated plant growing */}
            <div className="animate-bounce">
              <div className="text-6xl mb-4">🌱</div>
            </div>
            {/* Floating particles */}
            <div className="absolute -top-4 -left-4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-6 w-1 h-1 bg-emerald-400 rounded-full animate-ping animation-delay-200"></div>
            <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping animation-delay-400"></div>
          </div>
          <p className="text-[#00A844] font-medium animate-pulse">Growing your garden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
     <strong className="font-semibold">Oops! Something wilted</strong>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" >
      {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-7xl opacity-100 animate-float">🌿</div>
        <div className="absolute top-40 right-20 text-7xl opacity-100 animate-float animation-delay-200">🍃</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-30 animate-float animation-delay-400">🌺</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-float animation-delay-600">🦋</div>
        <div className="absolute top-60 left-1/2 text-2xl opacity-30 animate-float animation-delay-800">🌸</div>
      </div>

      {/* Header Section with enhanced animations */}
      <div className="py-16 px-4 text-center relative">
        <div className="relative inline-block">
          <h1 className="text-6xl font-light text-green-700 mb-6 relative z-10 animate-fade-in-up">
            Top Treanding Tips
          </h1>
          {/* Decorative elements around title */}
          <div className="absolute -top-2 -left-4 text-2xl animate-bounce animation-delay-300">🌱</div>
          <div className="absolute -top-2 -right-4 text-2xl animate-bounce animation-delay-500">🌱</div>
        </div>

        <p className="text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
          Discover beautiful gardening projects and nature-inspired designs
        </p>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group animate-fade-in-up ${
                activeCategory === category
                  ? 'bg-[#00A844] text-white shadow-lg shadow-[#00A844]/20'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-[#00A844]/10 hover:text-[#00A844] border border-gray-200 hover:border-[#00A844]/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <div className="absolute inset-0 bg-[#00A844] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Projects Grid */}
      <div className="px-6 pb-20 max-w-5xl mx-auto">
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip, index) => (
              <div
                key={tip._id}
                className="relative group overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-700 transform hover:scale-[1.05] hover:-translate-y-1 animate-fade-in-up border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(235,253,240,0.6) 50%, rgba(255,255,255,0.8) 100%)'
                }}
              >
                {/* Project Image with enhanced effects */}
                <div className="aspect-square overflow-hidden rounded-t-2xl relative">
                  <img
                    src={tip.imageUrl || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop'}
                    alt={tip.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating elements on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md">
                      <span className="text-sm">🌿</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Overlay Content */}
                <div
                  className="absolute inset-0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-3 text-center rounded-2xl"
                  style={{background: 'linear-gradient(135deg, rgba(235,253,240,0.95) 0%, rgba(255,255,255,0.90) 50%, rgba(232,245,232,0.95) 100%)'}}
                >
                  {/* Decorative top element */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5 opacity-60">
                    <div className="w-0.5 h-0.5 bg-[#00A844] rounded-full animate-pulse"></div>
                    <div className="w-0.5 h-0.5 bg-[#00A844] rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-0.5 h-0.5 bg-[#00A844] rounded-full animate-pulse animation-delay-400"></div>
                  </div>

                  {/* Title with animation */}
                  <h3 className="text-gray-800 text-sm font-bold mb-2 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 animation-delay-100">
                    {tip.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 animation-delay-200">
                    {tip.description || 'Discover the beauty of nature through this amazing gardening project.'}
                  </p>

                  {/* Compact Badges */}
                  <div className="flex flex-col gap-1 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 animation-delay-300">
                    {tip.category && (
                      <div className="bg-[#00A844]/10 text-[#00A844] text-xs px-2 py-0.5 rounded-full font-medium shadow-sm border border-[#00A844]/20">
                        🌱 {tip.category}
                      </div>
                    )}

                    {tip.difficulty && (
                      <div className={`text-xs px-2 py-0.5 rounded-full font-medium shadow-sm border transform hover:scale-105 transition-transform duration-300 ${
                        tip.difficulty.toLowerCase() === 'easy'
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200'
                          : tip.difficulty.toLowerCase() === 'medium'
                          ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-200'
                          : tip.difficulty.toLowerCase() === 'hard'
                          ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-200'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200'
                      }`}>
                        {tip.difficulty.toLowerCase() === 'easy' ? '🟢' :
                         tip.difficulty.toLowerCase() === 'medium' ? '🟡' :
                         tip.difficulty.toLowerCase() === 'hard' ? '🔴' : '⚪'} {tip.difficulty}
                      </div>
                    )}
                  </div>

                  {/* Compact Button */}
                  <button
                    onClick={() => handleViewPost(tip._id)}
                    className="bg-[#00A844] hover:bg-[#008A3A]  text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 mb-2 w-[100px] h-[30px] group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10 flex left-[10px] items-center">
                      <span className="mr-1 text-xs">🌿</span>
                      View
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>

                  {/* Compact Location */}
                  <div className="text-gray-500 text-xs flex items-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 animation-delay-500">
                    <span className="mr-1 text-xs">📍</span>
                    <span className="truncate">{tip.location || 'Garden'}</span>
                  </div>

                  {/* Decorative bottom element */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-[#00A844] to-transparent rounded-full"></div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-[#00A844]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">🌱</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">No gardens to explore yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Your garden is waiting to bloom. Check back soon for fresh projects and inspiration!
            </p>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }

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
  );
};

export default Toptreanding;