import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlantVideo from './4725561-hd_1920_1080_30fps.mp4'; // Correct path to video file
import {
  Users,
  Award,
  Heart,
  Leaf,
  Target,
  Globe,
  CheckCircle,
  ArrowRight,
  Quote,
  Play,
  Calendar,
  MapPin
} from 'lucide-react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [playingVideo, setPlayingVideo] = useState(false);

  // Video configuration - Add your video path here
  const videoConfig = {
    src: PlantVideo, // Add your video URL or path here (e.g., '/videos/our-story.mp4' or 'https://example.com/video.mp4')
    poster: '', // Optional: Add poster image URL (thumbnail shown before video plays)
    title: 'Our Story Video'
  };

  // Function to set video source
  const setVideoSource = (videoSrc, posterSrc = '', title = 'Our Story Video') => {
    videoConfig.src = videoSrc;
    videoConfig.poster = posterSrc;
    videoConfig.title = title;
  };

  const tabs = [
    { id: 'story', label: 'Our Story', icon: Heart },
    { id: 'mission', label: 'Mission & Vision', icon: Target },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'values', label: 'Our Values', icon: Award }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Green',
      role: 'Founder & Master Gardener',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a6?w=300&h=300&fit=crop&crop=face',
      bio: 'With over 15 years of experience, Sarah founded Rootsy to share her passion for sustainable gardening.',
      specialties: ['Organic Farming', 'Plant Breeding', 'Sustainable Design'],
      experience: '15+ years',
      certifications: ['Master Gardener', 'Permaculture Design', 'Organic Certification']
    },
    {
      id: 2,
      name: 'Dr. Michael Hart',
      role: 'Head of Research & Development',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Dr. Hart brings scientific expertise to our gardening methods with a PhD in Plant Biology.',
      specialties: ['Plant Science', 'Soil Health', 'Pest Management'],
      experience: '12+ years',
      certifications: ['PhD Plant Biology', 'Integrated Pest Management', 'Soil Science']
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Community Outreach Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Emma connects gardeners worldwide, building communities that grow together.',
      specialties: ['Community Building', 'Education', 'Urban Gardening'],
      experience: '8+ years',
      certifications: ['Community Development', 'Adult Education', 'Urban Planning']
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Sustainability Expert',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'James ensures all our practices contribute to a healthier planet for future generations.',
      specialties: ['Environmental Science', 'Renewable Energy', 'Conservation'],
      experience: '10+ years',
      certifications: ['Environmental Science', 'LEED Green Associate', 'Carbon Footprint Analyst']
    }
  ];

  const values = [
    {
      id: 1,
      title: 'Sustainability First',
      description: 'Every decision we make considers the long-term health of our planet.',
      icon: Globe,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      title: 'Community Driven',
      description: 'We believe in the power of gardeners coming together to share knowledge.',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      title: 'Education Focused',
      description: 'Knowledge sharing is at the heart of everything we do.',
      icon: Award,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 4,
      title: 'Innovation & Growth',
      description: 'We continuously evolve our methods to serve gardeners better.',
      icon: Leaf,
      color: 'text-emerald-600 bg-emerald-100'
    }
  ];

  const achievements = [
    { number: '50,000+', label: 'Happy Gardeners', icon: Heart },
    { number: '500+', label: 'Workshops Conducted', icon: Calendar },
    { number: '25+', label: 'Countries Reached', icon: Globe },
    { number: '15', label: 'Industry Awards', icon: Award }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Rootsy Founded',
      description: 'Started as a small community garden project'
    },
    {
      year: '2020',
      title: 'First Workshop',
      description: 'Launched our signature gardening workshops'
    },
    {
      year: '2021',
      title: 'Online Platform',
      description: 'Expanded to serve gardeners worldwide'
    },
    {
      year: '2022',
      title: 'Sustainability Award',
      description: 'Recognized for environmental impact'
    },
    {
      year: '2023',
      title: 'Community of 50K',
      description: 'Reached milestone of 50,000 active members'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Opened centers in 5 new countries'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Video Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                {videoConfig.src ? (
                  // Real video implementation
                  !playingVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        poster={videoConfig.poster}
                      >
                        <source src={videoConfig.src} type="video/mp4" />
                        <source src={videoConfig.src} type="video/webm" />
                        <source src={videoConfig.src} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setPlayingVideo(true)}
                          className="flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                        >
                          <Play size={32} className="text-emerald-600 ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      poster={videoConfig.poster}
                      onEnded={() => setPlayingVideo(false)}
                    >
                      <source src={videoConfig.src} type="video/mp4" />
                      <source src={videoConfig.src} type="video/webm" />
                      <source src={videoConfig.src} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  // Fallback placeholder when no video is set
                  !playingVideo ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPlayingVideo(true)}
                      className="flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                    >
                      <Play size={32} className="text-emerald-600 ml-1" />
                    </motion.button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-600">
                      <div className="text-center">
                        <Leaf size={48} className="mx-auto mb-4" />
                        <p className="text-lg">{videoConfig.title}</p>
                        <p className="text-sm opacity-75">No video source configured</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPlayingVideo(false)}
                          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                        >
                          Back to Thumbnail
                        </motion.button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Story Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">How It All Began</h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Rootsy began in 2019 when our founder, Sarah Green, noticed a growing disconnect between people and their food sources. In her small community garden, she witnessed the transformative power of growing your own plants.
                  </p>
                  <p>
                    What started as weekend workshops for neighbors quickly grew into something much bigger. People weren't just learning to garden – they were building connections, improving their health, and discovering a deeper relationship with nature.
                  </p>
                  <p>
                    Today, Rootsy serves gardeners worldwide, but our mission remains the same: to help people grow not just plants, but communities, knowledge, and a sustainable future.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Journey</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'mission':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To empower people worldwide to grow their own food, build sustainable communities, and create a healthier planet through accessible gardening education and innovative growing solutions.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mr-4">
                    <Globe size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A world where every person has the knowledge and tools to grow their own food sustainably, fostering healthier communities and a thriving planet for future generations.
                </p>
              </motion.div>
            </div>

            {/* What We Do */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">What We Do</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Education & Workshops',
                    description: 'Hands-on learning experiences for gardeners of all levels',
                    icon: Award,
                    color: 'text-purple-600 bg-purple-100'
                  },
                  {
                    title: 'Community Building',
                    description: 'Connecting gardeners worldwide to share knowledge and experiences',
                    icon: Users,
                    color: 'text-blue-600 bg-blue-100'
                  },
                  {
                    title: 'Sustainable Solutions',
                    description: 'Promoting eco-friendly gardening practices and techniques',
                    icon: Leaf,
                    color: 'text-green-600 bg-green-100'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <item.icon size={28} />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'team':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Expert Team</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our passionate team of gardening experts, scientists, and educators are dedicated to helping you grow successfully.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover shadow-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                        <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
                        <p className="text-sm text-gray-500">{member.experience} experience</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Specialties:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-700">Certifications:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.certifications.map((cert, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'values':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Core Values</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do and shape how we serve our gardening community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <value.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 p-8 rounded-2xl text-center relative"
            >
              <Quote size={48} className="text-emerald-400 mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl font-light text-gray-800 mb-6 italic leading-relaxed">
                "Gardening is not just about growing plants – it's about growing communities, growing knowledge, and growing a better future for all."
              </blockquote>
              <cite className="text-emerald-600 font-medium">- Sarah Green, Founder</cite>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
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
            About Rootsy
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
            Discover the story behind Rootsy and the passionate team dedicated to helping you grow
          </p>
        </motion.div>

        {/* Achievements Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4"
              >
                <achievement.icon size={24} className="text-white" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">{achievement.number}</div>
              <div className="text-gray-600 font-medium text-sm">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {renderTabContent()}
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
            Ready to Start Your Gardening Journey?
          </h3>
          <p className="text-gray-600 mb-6">
            Join our community of passionate gardeners and start growing today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
            >
              <span>Join Our Community</span>
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg border-2 border-emerald-600"
            >
              <span>Contact Our Team</span>
              <Users size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
