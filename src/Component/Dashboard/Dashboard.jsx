import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Sample data
const tips = [
  { id: 1, title: 'Watering Techniques', user: 'User1', likes: 24, comments: 5 },
  { id: 2, title: 'Best Plants for Indoors', user: 'User2', likes: 18, comments: 3 },
];

const followers = [
  { id: 1, name: 'User1', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', online: true },
  { id: 2, name: 'User2', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: false },
  { id: 3, name: 'User3', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', online: true },
];

const leaderboard = [
  { id: 1, name: 'User1', tipsPosted: 5, points: 120 },
  { id: 2, name: 'User2', tipsPosted: 4, points: 95 },
  { id: 3, name: 'User3', tipsPosted: 3, points: 80 },
  { id: 4, name: 'User4', tipsPosted: 2, points: 65 },
  { id: 5, name: 'User5', tipsPosted: 1, points: 40 },
];

const userProfile = {
  name: 'Your Profile',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  stats: {
    posts: 13,
    followers: 3076,
    profileViews: 114,
    searchAppearances: 21,
    postImpressionsGrowth: 62.5,
    followersGrowth: 1.5,
  },
  weeklyActions: {
    posts: 0,
    comments: 0,
    goal: 3,
  },
};

const rankingData = [
  { week: 'Week 1', rank: 8 },
  { week: 'Week 2', rank: 6 },
  { week: 'Week 3', rank: 5 },
  { week: 'Week 4', rank: 4 },
  { week: 'Week 5', rank: 3 },
];

const engagementData = [
  { month: 'Jan', posts: 2, comments: 5, likes: 24 },
  { month: 'Feb', posts: 3, comments: 7, likes: 32 },
  { month: 'Mar', posts: 4, comments: 9, likes: 45 },
  { month: 'Apr', posts: 5, comments: 12, likes: 58 },
  { month: 'May', posts: 7, comments: 15, likes: 76 },
  { month: 'Jun', posts: 8, comments: 18, likes: 92 },
];

export const Dashboard = () => {
  const [followedUsers, setFollowedUsers] = useState(followers.map(f => f.id));
  const [activeTab, setActiveTab] = useState('analytics');
  const navigate = useNavigate();

  const toggleFollow = (id) => {
    if (followedUsers.includes(id)) {
      setFollowedUsers(followedUsers.filter(userId => userId !== id));
    } else {
      setFollowedUsers([...followedUsers, id]);
    }
  };

  // Handle button actions
  const handleStartPost = () => {
    navigate('/share-tips');
    toast.success('Redirecting to create a new post!');
  };

  const handleCommentOnFeed = () => {
    navigate('/all-tips');
    toast.info('Redirecting to browse tips and comment!');
  };

  const handleViewDetails = (tipId) => {
    navigate(`/tips/${tipId}`);
  };

  const handleViewAllTips = () => {
    navigate('/all-tips');
  };

  const handleViewAllFollowers = () => {
    navigate('/browse-gardeners');
  };

  const handleLearnMoreCreatorTools = () => {
    window.open('https://help.linkedin.com/app/answers/detail/a_id/149/~/creator-tools', '_blank');
    toast.info('Opening creator tools documentation...');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#089579]">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <img
            src={userProfile.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-[#089579]"
          />
          <span className="font-semibold">{userProfile.name}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'analytics' ? 'text-[#089579] border-b-2 border-[#089579]' : 'text-gray-600'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'community' ? 'text-[#089579] border-b-2 border-[#089579]' : 'text-gray-600'}`}
          onClick={() => setActiveTab('community')}
        >
          Community
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'performance' ? 'text-[#089579] border-b-2 border-[#089579]' : 'text-gray-600'}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
      </div>

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Analytics Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#089579]">
            <h2 className="text-2xl font-semibold mb-4 text-[#089579]">Analytics</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold">{userProfile.stats.posts}</div>
                <div className="text-gray-600">Post impressions</div>
                <div className="text-green-500 text-sm">▲{userProfile.stats.postImpressionsGrowth}% past 7 days</div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold">{userProfile.stats.followers.toLocaleString()}</div>
                <div className="text-gray-600">Followers</div>
                <div className="text-green-500 text-sm">▲{userProfile.stats.followersGrowth}% past 7 days</div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold">{userProfile.stats.profileViews}</div>
                <div className="text-gray-600">Profile viewers</div>
                <div className="text-gray-500 text-sm">Past 90 days</div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold">{userProfile.stats.searchAppearances}</div>
                <div className="text-gray-600">Search appearances</div>
                <div className="text-gray-500 text-sm">Previous week</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Weekly sharing tracker</h3>
              <p className="text-gray-600 mb-4">Increase your visibility by posting or commenting. We suggest taking 3 actions every week.</p>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Jun 23-Jun 29</span>
                  <span>{userProfile.weeklyActions.posts + userProfile.weeklyActions.comments} of {userProfile.weeklyActions.goal} actions</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#089579] h-2.5 rounded-full"
                    style={{ width: `${(userProfile.weeklyActions.posts + userProfile.weeklyActions.comments) / userProfile.weeklyActions.goal * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {userProfile.weeklyActions.posts + userProfile.weeklyActions.comments === 0 ?
                    'No actions yet. Take 3 actions to achieve the weekly sharing goal.' :
                    'Keep going! You\'re making progress.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="text-xl font-bold">{userProfile.weeklyActions.posts} posts</div>
                  <p className="text-gray-600 text-sm">Members who post once per week on average see up to 4x more profile views.</p>
                  <button
                    className="mt-2 text-[#089579] font-medium text-sm hover:underline cursor-pointer"
                    onClick={handleStartPost}
                  >
                    Start a post
                  </button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="text-xl font-bold">{userProfile.weeklyActions.comments} comments</div>
                  <p className="text-gray-600 text-sm">Members who comment once per week on average see up to 3x more profile views.</p>
                  <button
                    className="mt-2 text-[#089579] font-medium text-sm hover:underline cursor-pointer"
                    onClick={handleCommentOnFeed}
                  >
                    Comment on feed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Creator Tools Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#089579]">
            <h2 className="text-2xl font-semibold mb-4 text-[#089579]">Creator tools</h2>
            <p className="text-gray-600 mb-4">
              Creator mode gives you more ways to engage with your audience by enabling access to select tools.
            </p>

            <div className="border rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Content performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#8884d8" />
                    <Bar dataKey="comments" fill="#82ca9d" />
                    <Bar dataKey="likes" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <button
              className="bg-[#089579] text-white px-4 py-2 rounded-lg hover:bg-[#067a60] transition"
              onClick={handleLearnMoreCreatorTools}
            >
              Learn more about creator tools
            </button>
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gardening Tips Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#089579]">
            <h2 className="text-2xl font-semibold mb-4 text-[#089579]">Gardening Tips</h2>
            {tips.map(tip => (
              <div key={tip.id} className="border-b py-4">
                <h3 className="font-medium text-lg">{tip.title}</h3>
                <p className="text-gray-600">Posted by: <span className="font-semibold">{tip.user}</span></p>
                <div className="flex space-x-4 mt-2 text-sm">
                  <span className="text-gray-500">{tip.likes} likes</span>
                  <span className="text-gray-500">{tip.comments} comments</span>
                </div>
                <button
                  className="mt-2 text-[#089579] text-sm font-medium hover:underline cursor-pointer"
                  onClick={() => handleViewDetails(tip.id)}
                >
                  View details
                </button>
              </div>
            ))}
            <button
              className="mt-4 text-[#089579] font-medium hover:underline cursor-pointer"
              onClick={handleViewAllTips}
            >
              View all tips →
            </button>
          </div>

          {/* Followers Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#089579]">
            <h2 className="text-2xl font-semibold mb-4 text-[#089579]">Followers</h2>
            {followers.map(follower => (
              <div key={follower.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={follower.avatar} alt={follower.name} className="w-10 h-10 rounded-full" />
                    {follower.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <span className="font-medium">{follower.name}</span>
                </div>
                <button
                  onClick={() => toggleFollow(follower.id)}
                  className={`px-3 py-1 rounded-full text-sm ${followedUsers.includes(follower.id) ? 'bg-red-100 text-red-500' : 'bg-[#089579] text-white'}`}
                >
                  {followedUsers.includes(follower.id) ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            ))}
            <button
              className="mt-4 text-[#089579] font-medium hover:underline cursor-pointer"
              onClick={handleViewAllFollowers}
            >
              View all followers →
            </button>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Leaderboard Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#089579]">
            <h2 className="text-2xl font-semibold mb-4 text-[#089579]">Leaderboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ol className="list-decimal pl-5 space-y-4">
                  {leaderboard.map((user, index) => (
                    <li key={user.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center space-x-3">
                        <span className={`font-bold ${index < 3 ? 'text-xl' : ''}`}>
                          {index + 1}
                        </span>
                        <span className={`${index < 3 ? 'font-bold' : ''}`}>{user.name}</span>
                      </div>
                      <div className="flex space-x-4">
                        <span className="text-gray-600">Tips: <span className="font-semibold">{user.tipsPosted}</span></span>
                        <span className="text-[#089579] font-semibold">{user.points} pts</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 text-center text-gray-500">
                  Your current position: <span className="font-bold text-[#089579]">6th</span>
                </div>
              </div>

              <div className="h-64">
                <h3 className="font-semibold mb-4 text-center">Your Ranking Progress</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rankingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis reversed={true} domain={[1, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rank" stroke="#089579" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#089579]">
            <h2 className="text-2xl font-semibold mb-4 text-[#089579]">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#089579]">87%</div>
                <div className="text-gray-600">Engagement Rate</div>
                <div className="text-green-500 text-sm">▲5% from last month</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#089579]">24</div>
                <div className="text-gray-600">New Followers</div>
                <div className="text-green-500 text-sm">▲8 from last week</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#089579]">3.2K</div>
                <div className="text-gray-600">Content Views</div>
                <div className="text-green-500 text-sm">▲12% from last month</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};