import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight, Star } from 'lucide-react';

const GardeningEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Spring Planting Workshop',
      date: 'March 15, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Rootsy Garden Center',
      attendees: 24,
      maxAttendees: 30,
      price: '$35',
      category: 'Workshop',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      description: 'Learn the basics of spring planting and get your garden ready for the growing season.',
      highlights: ['Seed starting techniques', 'Soil preparation', 'Companion planting', 'Free starter kit'],
      instructor: 'Sarah Green',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Organic Pest Control Masterclass',
      date: 'March 22, 2025',
      time: '1:00 PM - 4:00 PM',
      location: 'Community Garden Hub',
      attendees: 18,
      maxAttendees: 25,
      price: '$45',
      category: 'Masterclass',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
      description: 'Master natural pest control methods and keep your garden healthy without chemicals.',
      highlights: ['Natural pesticides', 'Beneficial insects', 'Disease prevention', 'DIY solutions'],
      instructor: 'Dr. Michael Hart',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Urban Gardening for Small Spaces',
      date: 'March 29, 2025',
      time: '11:00 AM - 3:00 PM',
      location: 'Downtown Learning Center',
      attendees: 32,
      maxAttendees: 35,
      price: '$40',
      category: 'Workshop',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      description: 'Transform small spaces into productive gardens with creative solutions and techniques.',
      highlights: ['Vertical gardening', 'Container growing', 'Space optimization', 'Plant selection'],
      instructor: 'Emma Rodriguez',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Herb Garden & Cooking Class',
      date: 'April 5, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Culinary Garden Studio',
      attendees: 15,
      maxAttendees: 20,
      price: '$60',
      category: 'Cooking',
      difficulty: 'All Levels',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      description: 'Grow herbs and learn to cook with them in this hands-on culinary gardening experience.',
      highlights: ['Herb cultivation', 'Harvest timing', 'Cooking techniques', 'Recipe collection'],
      instructor: 'Chef Maria Santos',
      rating: 5.0
    },
    {
      id: 5,
      title: 'Composting & Soil Health Seminar',
      date: 'April 12, 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Eco Learning Center',
      attendees: 28,
      maxAttendees: 40,
      price: '$30',
      category: 'Seminar',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      description: 'Learn to create nutrient-rich compost and understand soil health fundamentals.',
      highlights: ['Composting methods', 'Soil testing', 'Nutrient cycling', 'Troubleshooting'],
      instructor: 'Prof. James Wilson',
      rating: 4.6
    },
    {
      id: 6,
      title: 'Native Plant Landscaping',
      date: 'April 19, 2025',
      time: '10:00 AM - 3:00 PM',
      location: 'Native Plant Preserve',
      attendees: 20,
      maxAttendees: 25,
      price: '$50',
      category: 'Workshop',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      description: 'Design beautiful, sustainable landscapes using native plants that support local ecosystems.',
      highlights: ['Plant selection', 'Design principles', 'Wildlife support', 'Maintenance tips'],
      instructor: 'Dr. Lisa Park',
      rating: 4.9
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      case 'All Levels': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop': return 'text-emerald-600 bg-emerald-100';
      case 'Masterclass': return 'text-purple-600 bg-purple-100';
      case 'Seminar': return 'text-teal-600 bg-teal-100';
      case 'Cooking': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Upcoming Events
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-700 mx-auto mb-6 rounded-full"
            animate={{
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our community of passionate gardeners and learn from expert instructors in hands-on workshops and classes
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setSelectedEvent(event.id)}
              onMouseLeave={() => setSelectedEvent(null)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Category & Difficulty Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
                    {event.difficulty}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{event.rating}</span>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {event.price}
                  </span>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {event.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar size={16} className="text-emerald-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} className="text-emerald-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-emerald-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users size={16} className="text-emerald-500" />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Instructor: </span>
                  <span className="text-sm font-medium text-gray-700">{event.instructor}</span>
                </div>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: selectedEvent === event.id ? 1 : 0,
                    height: selectedEvent === event.id ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">What you'll learn:</span>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Attendance Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Spots filled</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Register Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md"
                >
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Don't see what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Suggest a workshop topic or request a private group session for your organization
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
          >
            <span>Request Custom Event</span>
            <Calendar size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GardeningEvents;
