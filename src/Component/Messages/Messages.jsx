import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaSearch, FaPaperPlane, FaEllipsisV, FaArrowLeft, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Messages = () => {
  const { user } = useContext(AuthContext);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleMoreOptions = () => {
    toast.info('More options coming soon!');
  };

  // Extended sample messages data
  const allMessages = [
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Hey! I saw your post about the fiddle leaf fig. Do you have any care tips?',
      time: '2 min ago',
      unread: true,
      online: true,
      conversation: [
        {
          id: 1,
          sender: 'Sarah Chen',
          message: 'Hey! I saw your post about the fiddle leaf fig. Do you have any care tips?',
          time: '2 min ago',
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      sender: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Thanks for the succulent care guide! My plants are thriving now.',
      time: '1 hour ago',
      unread: true,
      online: false,
      conversation: [
        {
          id: 1,
          sender: 'You',
          message: 'Here\'s a detailed guide on succulent care that I think will help you!',
          time: '2 hours ago',
          isOwn: true,
          status: 'read'
        },
        {
          id: 2,
          sender: 'Mike Johnson',
          message: 'Thanks for the succulent care guide! My plants are thriving now.',
          time: '1 hour ago',
          isOwn: false
        }
      ]
    },
    {
      id: 3,
      sender: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Are you still selling the monstera plant?',
      time: '3 hours ago',
      unread: false,
      online: true,
      conversation: [
        {
          id: 1,
          sender: 'Emma Wilson',
          message: 'Hi! I saw your monstera listing. Is it still available?',
          time: '4 hours ago',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          message: 'Yes, it\'s still available! Would you like to know more details?',
          time: '3 hours ago',
          isOwn: true,
          status: 'read'
        },
        {
          id: 3,
          sender: 'Emma Wilson',
          message: 'Are you still selling the monstera plant?',
          time: '3 hours ago',
          isOwn: false
        }
      ]
    },
    {
      id: 4,
      sender: 'Garden Club',
      avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=40&h=40&fit=crop&crop=center',
      lastMessage: 'Welcome to our monthly newsletter! Check out this month\'s featured plants.',
      time: '1 day ago',
      unread: false,
      online: false,
      conversation: [
        {
          id: 1,
          sender: 'Garden Club',
          message: 'Welcome to our monthly newsletter! Check out this month\'s featured plants.',
          time: '1 day ago',
          isOwn: false
        }
      ]
    },
    {
      id: 5,
      sender: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Your tomato growing tips were amazing! Got any advice for peppers?',
      time: '2 days ago',
      unread: false,
      online: false,
      conversation: [
        {
          id: 1,
          sender: 'Alex Rodriguez',
          message: 'Your tomato growing tips were amazing! Got any advice for peppers?',
          time: '2 days ago',
          isOwn: false
        }
      ]
    }
  ];

  const filteredMessages = allMessages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedMessage) {
      // In a real app, this would send the message to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timeString) => {
    // Simple time formatting - in real app, use proper date library
    return timeString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex h-[600px]">
            {/* Messages Sidebar */}
            <div className="w-1/3 border-r border-gray-200">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Messages List */}
              <div className="overflow-y-auto h-full">
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-emerald-50 ${
                      selectedMessage?.id === message.id ? 'bg-emerald-100 border-emerald-200' : ''
                    } ${message.unread ? 'bg-blue-50/50' : ''}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={message.avatar}
                          alt={message.sender}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {message.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {message.sender}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{message.time}</span>
                            {message.unread && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${message.unread ? 'text-gray-900' : 'text-gray-600'} truncate mt-1`}>
                          {message.lastMessage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedMessage ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={selectedMessage.avatar}
                            alt={selectedMessage.sender}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedMessage.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedMessage.sender}</h3>
                          <p className="text-sm text-gray-500">
                            {selectedMessage.online ? 'Online' : 'Last seen recently'}
                          </p>
                        </div>
                      </div>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                        onClick={handleMoreOptions}
                      >
                        <FaEllipsisV className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    <AnimatePresence>
                      {selectedMessage.conversation.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.isOwn
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <div className={`flex items-center justify-between mt-1 text-xs ${
                              msg.isOwn ? 'text-emerald-100' : 'text-gray-500'
                            }`}>
                              <span>{formatTime(msg.time)}</span>
                              {msg.isOwn && msg.status && (
                                <div className="ml-2">
                                  {msg.status === 'sent' && <FaCheck className="w-3 h-3" />}
                                  {msg.status === 'read' && <FaCheckDouble className="w-3 h-3" />}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        <FaPaperPlane className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaEnvelope className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a message from the list to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
