import React, { useState, useEffect } from 'react';

// Mock user data
const mockUserData = {
  id: 1,
  name: "Alex Johnson",
  username: "@alexj_tips",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=300&fit=crop",
  bio: "Passionate about sharing knowledge and helping others grow. Tech enthusiast & mentor.",
  level: 15,
  tipsShared: 247,
  ranking: 23,
  followers: 1250,
  following: 890,
  totalLikes: 3420,
  joinDate: "March 2022",
  socialLinks: {
    facebook: "https://facebook.com/alexjohnson",
    instagram: "https://instagram.com/alexj_tips",
    twitter: "https://twitter.com/alexj_tips",
    linkedin: "https://linkedin.com/in/alexjohnson",
    whatsapp: "+1234567890",
    youtube: null, // Will show as "Not Added"
    tiktok: null
  },
  rating: {
    average: 4.7,
    totalReviews: 156,
    breakdown: {
      5: 89,
      4: 45,
      3: 15,
      2: 5,
      1: 2
    }
  }
};

const mockPosts = [
  {
    id: 1,
    type: "tip",
    title: "10 JavaScript Tips That Will Make You a Better Developer",
    content: "Here are some advanced JavaScript techniques that every developer should know...",
    likes: 324,
    comments: 45,
    shares: 23,
    timestamp: "2 hours ago",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    type: "post",
    title: "My Journey Learning React",
    content: "Starting my React journey was challenging but rewarding. Here's what I learned...",
    likes: 189,
    comments: 28,
    shares: 12,
    timestamp: "1 day ago",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    type: "tip",
    title: "CSS Grid vs Flexbox: When to Use Which",
    content: "Understanding the differences and use cases for CSS Grid and Flexbox...",
    likes: 267,
    comments: 34,
    shares: 18,
    timestamp: "3 days ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  }
];

export const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [userData, setUserData] = useState(mockUserData);

  const SocialLink = ({ platform, url, icon }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-100">
      <div className="flex items-center space-x-3">
        <i className={`${icon} text-xl text-gray-600`}></i>
        <span className="font-medium text-gray-800 capitalize">{platform}</span>
      </div>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer"
           className="text-[#5D5CDE] hover:text-[#8B5CF6] transition-colors">
          <i className="fas fa-external-link-alt"></i>
        </a>
      ) : (
        <span className="text-gray-400 text-sm">Not Added</span>
      )}
    </div>
  );

  const RatingStars = ({ rating, size = "text-lg" }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className={`fas fa-star text-yellow-400 ${size}`}></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className={`fas fa-star-half-alt text-yellow-400 ${size}`}></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className={`far fa-star text-gray-300 ${size}`}></i>);
    }
    return <div className="flex">{stars}</div>;
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 border border-gray-200">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            post.type === 'tip'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {post.type === 'tip' ? 'Tip' : 'Post'}
          </span>
          <span className="text-gray-500 text-xs">{post.timestamp}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 hover:text-red-500 cursor-pointer transition-colors">
              <i className="far fa-heart"></i>
              <span>{post.likes}</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition-colors">
              <i className="far fa-comment"></i>
              <span>{post.comments}</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-green-500 cursor-pointer transition-colors">
              <i className="far fa-share"></i>
              <span>{post.shares}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Add Font Awesome */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-[#5D5CDE] to-[#8B5CF6]">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-fade-in">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mt-4">{userData.name}</h1>
                <p className="text-[#5D5CDE] font-medium">{userData.username}</p>
                <p className="text-gray-600 mt-2">{userData.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5D5CDE]">#{userData.ranking}</div>
                  <div className="text-sm text-gray-600">Tips Ranking</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B5CF6]">Lv.{userData.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">{userData.tipsShared}</div>
                  <div className="text-sm text-gray-600">Tips Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">{userData.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h3>
              <div className="space-y-3">
                <SocialLink platform="facebook" url={userData.socialLinks.facebook} icon="fab fa-facebook" />
                <SocialLink platform="instagram" url={userData.socialLinks.instagram} icon="fab fa-instagram" />
                <SocialLink platform="twitter" url={userData.socialLinks.twitter} icon="fab fa-twitter" />
                <SocialLink platform="linkedin" url={userData.socialLinks.linkedin} icon="fab fa-linkedin" />
                <SocialLink platform="whatsapp" url={userData.socialLinks.whatsapp} icon="fab fa-whatsapp" />
                <SocialLink platform="youtube" url={userData.socialLinks.youtube} icon="fab fa-youtube" />
                <SocialLink platform="tiktok" url={userData.socialLinks.tiktok} icon="fab fa-tiktok" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="text-gray-800">{userData.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Likes:</span>
                  <span className="text-gray-800">{userData.totalLikes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Following:</span>
                  <span className="text-gray-800">{userData.following}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rating Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Rating</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#5D5CDE]">{userData.rating.average}</div>
                  <RatingStars rating={userData.rating.average} size="text-xl" />
                  <div className="text-sm text-gray-600 mt-1">
                    {userData.rating.totalReviews} reviews
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center space-x-2 mb-1">
                      <span className="text-sm w-3">{star}</span>
                      <i className="fas fa-star text-yellow-400 text-xs"></i>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(userData.rating.breakdown[star] / userData.rating.totalReviews) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {userData.rating.breakdown[star]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'posts'
                        ? 'border-[#5D5CDE] text-[#5D5CDE]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    All Posts ({mockPosts.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('tips')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'tips'
                        ? 'border-[#5D5CDE] text-[#5D5CDE]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Tips ({mockPosts.filter(p => p.type === 'tip').length})
                  </button>
                </nav>
              </div>

              {/* Posts Grid */}
              <div className="p-6">
                <div className="grid gap-6">
                  {mockPosts
                    .filter(post => activeTab === 'posts' || post.type === activeTab)
                    .map(post => (
                      <PostCard key={post.id} post={post} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};