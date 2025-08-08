import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, MapPin, Truck, Shield, ArrowLeft, User, Calendar, Leaf, ArrowRight, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { storage } from '../../utils/localStorage';

const Buyplants = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'all-plants'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Plants');
  const [showAllPlants, setShowAllPlants] = useState(false);

  // Expanded plant data with 12 plants
  const plantsData = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 45.99,
      category: "Indoor Plants",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1545165229-a7dd4e45b80a?w=400&h=400&fit=crop",
      seller: {
        name: "Sarah Green",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        rating: 4.9,
        sales: 89
      },
      location: "New York, NY",
      description: "Beautiful Swiss Cheese Plant perfect for bright, indirect light.",
      stock: 12,
      features: ["Air Purifying", "Low Maintenance", "Pet Safe"]
    },
    {
      id: 2,
      name: "Fiddle Leaf Fig",
      price: 89.99,
      category: "Indoor Trees",
      rating: 4.6,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1586137119932-40507889b856?w=400&h=400&fit=crop",
      seller: {
        name: "Mike Forest",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        rating: 4.7,
        sales: 156
      },
      location: "Los Angeles, CA",
      description: "Stunning statement plant with large, glossy leaves.",
      stock: 5,
      features: ["Statement Plant", "Fast Growing", "Instagram Worthy"]
    },
    {
      id: 3,
      name: "Snake Plant",
      price: 28.99,
      category: "Succulents",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      seller: {
        name: "Emma Plant",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        rating: 5.0,
        sales: 234
      },
      location: "Austin, TX",
      description: "Nearly indestructible plant perfect for beginners.",
      stock: 25,
      features: ["Beginner Friendly", "Air Purifying", "Drought Tolerant"]
    },
    {
      id: 4,
      name: "Pothos Golden",
      price: 22.99,
      category: "Hanging Plants",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      seller: {
        name: "David Vine",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        rating: 4.8,
        sales: 98
      },
      location: "Seattle, WA",
      description: "Trailing vine with heart-shaped golden leaves.",
      stock: 18,
      features: ["Trailing Plant", "Fast Growing", "Propagates Easily"]
    },
    {
      id: 5,
      name: "Rubber Tree",
      price: 65.99,
      category: "Indoor Trees",
      rating: 4.5,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=400&fit=crop",
      seller: {
        name: "Lisa Bloom",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
        rating: 4.6,
        sales: 67
      },
      location: "Miami, FL",
      description: "Glossy, dark green leaves make this a stunning focal point.",
      stock: 8,
      features: ["Statement Plant", "Air Purifying", "Glossy Leaves"]
    },
    {
      id: 6,
      name: "Peace Lily",
      price: 35.99,
      category: "Flowering Plants",
      rating: 4.8,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      seller: {
        name: "Anna White",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
        rating: 4.9,
        sales: 123
      },
      location: "Denver, CO",
      description: "Elegant white blooms and glossy green leaves.",
      stock: 15,
      features: ["Flowering", "Air Purifying", "Low Light Tolerant"]
    },
    {
      id: 7,
      name: "ZZ Plant",
      price: 39.99,
      category: "Indoor Plants",
      rating: 4.7,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1586137119932-40507889b856?w=400&h=400&fit=crop",
      seller: {
        name: "Tom Green",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        rating: 4.8,
        sales: 145
      },
      location: "Chicago, IL",
      description: "Extremely low-maintenance plant with glossy leaves.",
      stock: 20,
      features: ["Drought Tolerant", "Low Light", "Air Purifying"]
    },
    {
      id: 8,
      name: "Bird of Paradise",
      price: 125.99,
      category: "Indoor Trees",
      rating: 4.4,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1545165229-a7dd4e45b80a?w=400&h=400&fit=crop",
      seller: {
        name: "Maria Tropics",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        rating: 4.6,
        sales: 45
      },
      location: "San Diego, CA",
      description: "Tropical statement plant with large paddle-like leaves.",
      stock: 3,
      features: ["Tropical", "Statement Plant", "Large Leaves"]
    },
    {
      id: 9,
      name: "Spider Plant",
      price: 19.99,
      category: "Hanging Plants",
      rating: 4.9,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      seller: {
        name: "Jenny Webb",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        rating: 4.9,
        sales: 312
      },
      location: "Portland, OR",
      description: "Easy-care plant that produces baby plantlets.",
      stock: 30,
      features: ["Baby Plants", "Air Purifying", "Pet Safe"]
    },
    {
      id: 10,
      name: "Aloe Vera",
      price: 24.99,
      category: "Succulents",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      seller: {
        name: "Desert Dan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        rating: 4.7,
        sales: 189
      },
      location: "Phoenix, AZ",
      description: "Medicinal succulent perfect for sunny windowsills.",
      stock: 22,
      features: ["Medicinal", "Drought Tolerant", "Easy Care"]
    },
    {
      id: 11,
      name: "Philodendron",
      price: 32.99,
      category: "Indoor Plants",
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=400&fit=crop",
      seller: {
        name: "Phil Green",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
        rating: 4.8,
        sales: 78
      },
      location: "Atlanta, GA",
      description: "Heart-shaped leaves and easy-going nature.",
      stock: 16,
      features: ["Heart Shaped", "Low Maintenance", "Fast Growing"]
    },
    {
      id: 12,
      name: "Jade Plant",
      price: 29.99,
      category: "Succulents",
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      seller: {
        name: "Jade Master",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
        rating: 4.9,
        sales: 167
      },
      location: "Las Vegas, NV",
      description: "Lucky money tree with thick, fleshy leaves.",
      stock: 14,
      features: ["Lucky Plant", "Thick Leaves", "Drought Tolerant"]
    }
  ];

  const toggleFavorite = (plantId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(plantId)) {
      newFavorites.delete(plantId);
    } else {
      newFavorites.add(plantId);
    }
    setFavorites(newFavorites);
  };

  const addToCart = (plant) => {
    // Add to local state
    setCart([...cart, plant]);

    // Use utility function to handle localStorage
    storage.addToCart(plant);

    // Show success message
    toast.success(`${plant.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleShowMorePlants = () => {
    setShowAllPlants(true);
    toast.info('Showing all available plants!');
  };

  const handleCartClick = () => {
    window.location.href = '/cart';
  };

  // Filter plants based on search query and category
  const filteredPlants = plantsData.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Plants' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const CompactPlantCard = ({ plant }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 border border-emerald-100">
      <div className="relative">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(plant.id);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
        >
          <Heart
            className={`w-4 h-4 ${favorites.has(plant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute top-2 left-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
          {plant.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={plant.seller.avatar}
            alt={plant.seller.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-medium text-gray-900">{plant.seller.name}</p>
            <div className="flex items-center gap-1">
              {renderStars(plant.seller.rating)}
              <span className="text-xs text-gray-500">({plant.seller.sales})</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">{plant.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(plant.rating)}
          <span className="text-xs text-gray-600 ml-1">({plant.reviews})</span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-600 truncate">{plant.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">${plant.price}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(plant);
            }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const RegularPlantCard = ({ plant }) => (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 border border-emerald-100">
      <div className="relative">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(plant.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
        >
          <Heart
            className={`w-5 h-5 ${favorites.has(plant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
          {plant.category}
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={plant.seller.avatar}
            alt={plant.seller.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{plant.seller.name}</p>
            <div className="flex items-center gap-1">
              {renderStars(plant.seller.rating)}
              <span className="text-xs text-gray-500">({plant.seller.sales})</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{plant.name}</h3>

        <div className="flex items-center gap-1 mb-4">
          {renderStars(plant.rating)}
          <span className="text-sm text-gray-600 ml-1">({plant.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{plant.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-6">{plant.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">${plant.price}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(plant);
            }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="min-h-screen bg-white px-[60px] pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            <span className="font-serif italic bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Plant</span> Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover beautiful plants from trusted sellers in your community
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {['All Plants', 'Indoor Plants', 'Indoor Trees', 'Succulents', 'Hanging Plants', 'Flowering Plants'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border-2 font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Plants - Show more if showAllPlants is true */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlants.slice(0, showAllPlants ? filteredPlants.length : 9).map((plant) => (
            <CompactPlantCard key={plant.id} plant={plant} />
          ))}
        </div>

        {/* Show More Button - Only show if there are more than 9 plants and not showing all */}
        {filteredPlants.length > 9 && !showAllPlants && (
          <div className="text-center">
            <button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={handleShowMorePlants}
            >
              Show More Plants
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div
            className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={handleCartClick}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">{cart.length} items in cart</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return <HomeView />;
};

export default Buyplants;