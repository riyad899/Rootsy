import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Heart, Award } from 'lucide-react';

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Home Gardener',
      location: 'Seattle, WA',
      rating: 5,
      text: "Rootsy transformed my black thumb into a green one! Their workshops are incredibly informative and the community is so supportive. I've gone from killing every plant to having a thriving garden that feeds my family.",
      image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      plantsPurchased: 24,
      memberSince: '2023',
      achievement: 'Garden Guru',
      favorite: 'Herb Gardens'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Urban Gardener',
      location: 'New York, NY',
      rating: 5,
      text: "Living in a small apartment, I thought gardening was impossible. Rootsy's urban gardening workshop changed everything. Now I have a beautiful balcony garden and even grow my own vegetables!",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      plantsPurchased: 18,
      memberSince: '2022',
      achievement: 'Space Maximizer',
      favorite: 'Vertical Gardens'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Master Gardener',
      location: 'Austin, TX',
      rating: 5,
      text: "As a certified master gardener, I can say Rootsy's approach is exceptional. They combine scientific knowledge with practical wisdom. The quality of their plants and advice is unmatched.",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      plantsPurchased: 47,
      memberSince: '2021',
      achievement: 'Plant Expert',
      favorite: 'Native Plants'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Beginner Gardener',
      location: 'Portland, OR',
      rating: 5,
      text: "I was intimidated by gardening until I found Rootsy. Their beginner-friendly approach and patient instructors made learning enjoyable. My first tomato harvest was incredible!",
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      plantsPurchased: 12,
      memberSince: '2024',
      achievement: 'Green Thumb',
      favorite: 'Vegetables'
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Organic Enthusiast',
      location: 'San Francisco, CA',
      rating: 5,
      text: "Rootsy's organic methods align perfectly with my values. Their composting workshop revolutionized how I think about waste and nutrition. My soil has never been healthier!",
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      plantsPurchased: 33,
      memberSince: '2022',
      achievement: 'Eco Warrior',
      favorite: 'Composting'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Community Leader',
      location: 'Denver, CO',
      rating: 5,
      text: "I started a community garden with Rootsy's guidance. They provided not just plants and knowledge, but ongoing support. Our neighborhood now has fresh produce and stronger connections.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      plantsPurchased: 89,
      memberSince: '2020',
      achievement: 'Community Builder',
      favorite: 'Community Gardens'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getAchievementColor = (achievement) => {
    switch (achievement) {
      case 'Garden Guru': return 'text-purple-600 bg-purple-100';
      case 'Space Maximizer': return 'text-blue-600 bg-blue-100';
      case 'Plant Expert': return 'text-emerald-600 bg-emerald-100';
      case 'Green Thumb': return 'text-green-600 bg-green-100';
      case 'Eco Warrior': return 'text-teal-600 bg-teal-100';
      case 'Community Builder': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent"
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
            What Our Community Says
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 mx-auto mb-6 rounded-full"
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
            Join thousands of happy gardeners who have transformed their spaces and lives with Rootsy
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-full translate-y-12 -translate-x-12 opacity-50" />

              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-8 left-8"
              >
                <Quote size={48} className="text-emerald-200" />
              </motion.div>

              <div className="relative z-10">
                {/* User Info */}
                <div className="flex items-start space-x-6 mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-emerald-100"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-2xl font-bold text-gray-800 mb-1"
                    >
                      {testimonials[currentTestimonial].name}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-gray-600 mb-2"
                    >
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                    </motion.p>

                    {/* Rating */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex items-center space-x-1 mb-3"
                    >
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </motion.div>

                    {/* Achievement Badge */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getAchievementColor(testimonials[currentTestimonial].achievement)}`}
                    >
                      <Award size={14} />
                      <span>{testimonials[currentTestimonial].achievement}</span>
                    </motion.span>
                  </div>
                </div>

                {/* Testimonial Text */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic"
                >
                  "{testimonials[currentTestimonial].text}"
                </motion.blockquote>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {testimonials[currentTestimonial].plantsPurchased}
                    </div>
                    <div className="text-sm text-gray-600">Plants Purchased</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {testimonials[currentTestimonial].memberSince}
                    </div>
                    <div className="text-sm text-gray-600">Member Since</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <div className="text-lg font-bold text-emerald-600 mb-1">
                      {testimonials[currentTestimonial].favorite}
                    </div>
                    <div className="text-sm text-gray-600">Favorite Topic</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 z-20"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 z-20"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index
                  ? 'bg-emerald-600 w-8'
                  : 'bg-emerald-200 hover:bg-emerald-300'
              }`}
            />
          ))}
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: '10,000+', label: 'Happy Customers', icon: Heart },
            { number: '4.9', label: 'Average Rating', icon: Star },
            { number: '500+', label: 'Workshops Completed', icon: Award },
            { number: '95%', label: 'Success Rate', icon: Quote }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4"
              >
                <stat.icon size={24} className="text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl"
          >
            <span>Join Our Community</span>
            <Heart size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
