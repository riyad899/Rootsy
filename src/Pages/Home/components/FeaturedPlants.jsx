import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Leaf, Droplets, Sun } from 'lucide-react';

const FeaturedPlants = () => {
  const [hoveredPlant, setHoveredPlant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const plants = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      category: 'indoor',
      price: '$45.99',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=400&fit=crop',
      care: { water: 'Weekly', light: 'Indirect', difficulty: 'Easy' },
      description: 'Beautiful split-leaf philodendron perfect for modern homes',
      features: ['Air Purifying', 'Low Maintenance', 'Fast Growing']
    },
    {
      id: 2,
      name: 'Snake Plant',
      category: 'indoor',
      price: '$28.99',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1593482892540-3d6830eddb28?w=400&h=400&fit=crop',
      care: { water: 'Monthly', light: 'Low', difficulty: 'Beginner' },
      description: 'Nearly indestructible plant that thrives on neglect',
      features: ['Drought Tolerant', 'Air Purifying', 'Pet Safe']
    },
    {
      id: 3,
      name: 'Fiddle Leaf Fig',
      category: 'indoor',
      price: '$65.99',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1509423350716-97f2360ead09?w=400&h=400&fit=crop',
      care: { water: 'Weekly', light: 'Bright', difficulty: 'Moderate' },
      description: 'Statement plant with large, glossy leaves',
      features: ['Statement Piece', 'Air Purifying', 'Instagram Worthy']
    },
    {
      id: 4,
      name: 'Peace Lily',
      category: 'flowering',
      price: '$32.99',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
      care: { water: 'Twice Weekly', light: 'Medium', difficulty: 'Easy' },
      description: 'Elegant flowering plant with white blooms',
      features: ['Flowering', 'Air Purifying', 'Low Light Tolerant']
    },
    {
      id: 5,
      name: 'Rubber Tree',
      category: 'indoor',
      price: '$38.99',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1586093650626-d0b9dc42c431?w=400&h=400&fit=crop',
      care: { water: 'Weekly', light: 'Bright', difficulty: 'Easy' },
      description: 'Glossy burgundy leaves add elegance to any space',
      features: ['Colorful Foliage', 'Easy Care', 'Air Purifying']
    },
    {
      id: 6,
      name: 'Lavender',
      category: 'outdoor',
      price: '$22.99',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1611909023032-2d4b3a2e7d82?w=400&h=400&fit=crop',
      care: { water: 'Weekly', light: 'Full Sun', difficulty: 'Easy' },
      description: 'Fragrant herb perfect for gardens and aromatherapy',
      features: ['Fragrant', 'Attracts Bees', 'Culinary Use']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Plants', icon: Leaf },
    { id: 'indoor', name: 'Indoor', icon: Sun },
    { id: 'outdoor', name: 'Outdoor', icon: Droplets },
    { id: 'flowering', name: 'Flowering', icon: Star }
  ];

  const filteredPlants = selectedCategory === 'all'
    ? plants
    : plants.filter(plant => plant.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Easy': return 'text-emerald-600 bg-emerald-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
            Featured Plants
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
            Discover our carefully curated collection of beautiful plants perfect for your home and garden
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md'
              }`}
            >
              <category.icon size={18} />
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Plants Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPlant(plant.id)}
                onMouseLeave={() => setHoveredPlant(null)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Plant Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredPlant === plant.id ? 1 : 0,
                      y: hoveredPlant === plant.id ? 0 : 20
                    }}
                    className="absolute top-4 right-4 flex flex-col space-y-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                    >
                      <Heart size={16} className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                    >
                      <ShoppingCart size={16} className="text-gray-600 hover:text-emerald-600 transition-colors duration-200" />
                    </motion.button>
                  </motion.div>

                  {/* Difficulty Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plant.care.difficulty)}`}>
                    {plant.care.difficulty}
                  </div>
                </div>

                {/* Plant Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                      {plant.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{plant.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {plant.description}
                  </p>

                  {/* Care Info */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <Droplets size={16} className="text-blue-500 mx-auto mb-1" />
                      <span className="text-xs text-gray-500">{plant.care.water}</span>
                    </div>
                    <div className="text-center">
                      <Sun size={16} className="text-yellow-500 mx-auto mb-1" />
                      <span className="text-xs text-gray-500">{plant.care.light}</span>
                    </div>
                    <div className="text-center">
                      <Leaf size={16} className="text-green-500 mx-auto mb-1" />
                      <span className="text-xs text-gray-500">Care</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {plant.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">{plant.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
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
            <span>View All Plants</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Leaf size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPlants;
