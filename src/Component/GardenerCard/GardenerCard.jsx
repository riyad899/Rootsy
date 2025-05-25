import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GardenerCard = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch('http://localhost:3000/plants');
        if (!response.ok) {
          throw new Error('Failed to fetch gardeners');
        }
        const data = await response.json();
        setGardeners(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 text-red-500 text-center"
    >
      Error: {error}
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Active Gardeners</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our passionate team of gardening experts is ready to help you cultivate your dream garden.
          Each with unique specialties and years of experience to guide your gardening journey.
        </p>
      </motion.div>

      {/* Gardeners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gardeners.map((gardener, index) => (
          <motion.div
            key={gardener._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Gardener Image with Parallax Effect */}
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={gardener.photoUrl}
                alt={gardener.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white">{gardener.name}</h3>
                <p className="text-white/90">{gardener.location}</p>
              </div>
            </div>

            {/* Gardener Details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {gardener.status}
                  </motion.span>
                  <p className="text-gray-500 text-sm mt-2">{gardener.specialty}</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-800 font-medium">{gardener.rating}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <div>
                  <p className="font-medium">Experience</p>
                  <p>{gardener.experience} years</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Member since</p>
                  <p>{new Date(gardener.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                View Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activities Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-16 bg-green-50 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Gardeners' Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-green-600 text-4xl mb-3">🌱</div>
            <h3 className="font-semibold text-lg mb-2">Planting Workshops</h3>
            <p className="text-gray-600">Learn the best techniques from our experts</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-green-600 text-4xl mb-3">✂️</div>
            <h3 className="font-semibold text-lg mb-2">Pruning Sessions</h3>
            <p className="text-gray-600">Keep your plants healthy and thriving</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-green-600 text-4xl mb-3">🌿</div>
            <h3 className="font-semibold text-lg mb-2">Organic Care</h3>
            <p className="text-gray-600">Sustainable gardening practices</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GardenerCard;