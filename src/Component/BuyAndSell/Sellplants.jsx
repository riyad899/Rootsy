import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaCamera,
  FaMapMarkerAlt,
  FaDollarSign,
  FaTags,
  FaInfoCircle,
  FaShoppingBag,
  FaStar,
  FaEdit,
  FaTrash,
  FaPlus
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Sellplants = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sell'); // 'sell' or 'listings'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myListings, setMyListings] = useState([
    // Mock data - in real app, this would come from API
    {
      id: 1,
      name: "Snake Plant",
      price: 25.99,
      category: "Indoor Plants",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      status: "Active",
      views: 45,
      likes: 12,
      datePosted: "2024-01-15"
    },
    {
      id: 2,
      name: "Monstera Deliciosa",
      price: 45.99,
      category: "Indoor Plants",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1545165229-a7dd4e45b80a?w=400&h=400&fit=crop",
      status: "Sold",
      views: 89,
      likes: 23,
      datePosted: "2024-01-10"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Indoor Plants',
    condition: 'Excellent',
    description: '',
    location: '',
    contactMethod: 'message',
    phoneNumber: '',
    features: [],
    care: {
      light: 'Bright Indirect',
      water: 'Weekly',
      humidity: 'Normal',
      temperature: 'Room Temperature'
    }
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const plantCategories = [
    'Indoor Plants',
    'Outdoor Plants',
    'Succulents',
    'Herbs',
    'Vegetables',
    'Flowers',
    'Trees',
    'Hanging Plants'
  ];

  const plantFeatures = [
    'Air Purifying',
    'Low Maintenance',
    'Pet Safe',
    'Fast Growing',
    'Flowering',
    'Medicinal',
    'Rare Variety',
    'Drought Tolerant',
    'Low Light Tolerant',
    'Statement Plant'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to sell plants');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you'd upload the image and submit to API
      const newListing = {
        id: Date.now(),
        ...formData,
        features: selectedFeatures,
        image: imagePreview,
        status: 'Active',
        views: 0,
        likes: 0,
        datePosted: new Date().toISOString().split('T')[0],
        seller: {
          name: user.displayName || user.email,
          email: user.email
        }
      };

      setMyListings(prev => [newListing, ...prev]);

      // Reset form
      setFormData({
        name: '',
        price: '',
        category: 'Indoor Plants',
        condition: 'Excellent',
        description: '',
        location: '',
        contactMethod: 'message',
        phoneNumber: '',
        features: [],
        care: {
          light: 'Bright Indirect',
          water: 'Weekly',
          humidity: 'Normal',
          temperature: 'Room Temperature'
        }
      });
      setSelectedFeatures([]);
      setImagePreview(null);

      toast.success('Plant listed successfully!');
      setActiveTab('listings');

    } catch (error) {
      console.error('Error listing plant:', error);
      toast.error('Error listing plant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteListing = (id) => {
    setMyListings(prev => prev.filter(listing => listing.id !== id));
    toast.success('Listing deleted successfully');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sell Your Plants</h1>
          <p className="text-gray-600 mb-8">
            Join our community of plant sellers and turn your green thumb into income!
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Login to Start Selling
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sell Your Plants
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Share your plant passion and earn money from your green collection
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-sm border">
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'sell'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              <FaPlus className="inline mr-2" />
              List New Plant
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              <FaShoppingBag className="inline mr-2" />
              My Listings ({myListings.length})
            </button>
          </div>
        </div>

        {activeTab === 'sell' ? (
          /* Sell Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaLeaf className="mr-2 text-emerald-600" />
                    Plant Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Monstera Deliciosa"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaDollarSign className="mr-2 text-emerald-600" />
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="25.99"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaTags className="mr-2 text-emerald-600" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {plantCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-emerald-600" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaCamera className="mr-2 text-emerald-600" />
                  Plant Photo *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FaCamera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Upload Photo
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Plant Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {plantFeatures.map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleFeatureToggle(feature)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                        selectedFeatures.includes(feature)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-300'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaInfoCircle className="mr-2 text-emerald-600" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe your plant's condition, care requirements, and any special features..."
                />
              </div>

              {/* Care Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Requirements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Light</label>
                    <select
                      name="care.light"
                      value={formData.care.light}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Bright Direct</option>
                      <option>Bright Indirect</option>
                      <option>Medium Light</option>
                      <option>Low Light</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Watering</label>
                    <select
                      name="care.water"
                      value={formData.care.water}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Daily</option>
                      <option>Every few days</option>
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Humidity</label>
                    <select
                      name="care.humidity"
                      value={formData.care.humidity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>High</option>
                      <option>Normal</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Temperature</label>
                    <select
                      name="care.temperature"
                      value={formData.care.temperature}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Warm</option>
                      <option>Room Temperature</option>
                      <option>Cool</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors text-lg font-semibold"
                >
                  {isSubmitting ? 'Listing Plant...' : 'List My Plant'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* My Listings */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {myListings.length === 0 ? (
              <div className="text-center py-12">
                <FaShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-6">Start by listing your first plant!</p>
                <button
                  onClick={() => setActiveTab('sell')}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  List Your First Plant
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map(listing => (
                  <div key={listing.id} className="bg-white rounded-xl shadow-lg border overflow-hidden">
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
                        listing.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.status}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.name}</h3>
                      <p className="text-2xl font-bold text-emerald-600 mb-3">${listing.price}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{listing.views} views</span>
                        <span className="flex items-center">
                          <FaStar className="w-3 h-3 text-yellow-400 mr-1" />
                          {listing.likes} likes
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm">
                          <FaEdit className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteListing(listing.id)}
                          className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <FaTrash className="inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
