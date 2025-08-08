import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';
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
  FaPlus,
  FaUpload,
  FaTimes,
  FaSeedling,
  FaThermometerHalf,
  FaEye,
  FaHeart,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Sellplants = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sell'); // 'sell' or 'listings'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
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
    scientificName: '',
    price: '',
    category: 'Indoor Plants',
    condition: 'Excellent',
    size: 'Medium',
    age: '',
    description: '',
    location: '',
    contactMethod: 'message',
    phoneNumber: '',
    email: '',
    care: {
      light: 'Bright Indirect',
      water: 'Weekly',
      humidity: 'Normal',
      temperature: 'Room Temperature',
      soil: 'Well-draining',
      fertilizer: 'Monthly'
    },
    images: [],
    mainImage: '',
    healthStatus: 'Healthy',
    negotiable: false
  });

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // ImgBB API key - Get from environment variables
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const plantCategories = [
    'Indoor Plants',
    'Outdoor Plants',
    'Succulents & Cacti',
    'Herbs & Vegetables',
    'Flowering Plants',
    'Trees & Shrubs',
    'Hanging Plants',
    'Aquatic Plants',
    'Medicinal Plants',
    'Bonsai',
    'Air Plants',
    'Rare & Exotic'
  ];

  const plantSizes = [
    'Small (0-12 inches)',
    'Medium (12-24 inches)',
    'Large (24-48 inches)',
    'Extra Large (48+ inches)'
  ];

  const plantConditions = [
    'Excellent',
    'Very Good',
    'Good',
    'Fair',
    'Needs Care'
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
    'Statement Plant',
    'Fragrant',
    'Edible',
    'Climbing',
    'Colorful Foliage'
  ];

  const lightRequirements = [
    'Full Sun',
    'Partial Sun',
    'Bright Indirect',
    'Medium Light',
    'Low Light',
    'Shade'
  ];

  const wateringFrequency = [
    'Daily',
    'Every other day',
    'Weekly',
    'Bi-weekly',
    'Monthly',
    'When soil is dry',
    'Rarely'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name.includes('.')) {
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

  // Upload image to imgBB
  const uploadToImgBB = async (file) => {
    if (!IMGBB_API_KEY || IMGBB_API_KEY === 'your_imgbb_api_key_here') {
      throw new Error('ImgBB API key is not configured. Please add your API key to the .env file.');
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading to imgBB:', error);
      if (error.response?.status === 400) {
        throw new Error('Invalid API key or image format');
      }
      throw new Error('Failed to upload image');
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (selectedImages.length + files.length > 5) {
      toast.error('You can upload maximum 5 images');
      return;
    }

    setImageUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} is too large. Maximum size is 5MB.`);
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not a valid image file.`);
        }

        const imageUrl = await uploadToImgBB(file);
        return {
          id: Date.now() + Math.random(),
          url: imageUrl,
          name: file.name
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setSelectedImages(prev => [...prev, ...uploadedImages]);

      // Set first image as main image if none selected
      if (!formData.mainImage && uploadedImages.length > 0) {
        setFormData(prev => ({
          ...prev,
          mainImage: uploadedImages[0].url
        }));
      }

      toast.success(`${uploadedImages.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error(error.message || 'Failed to upload images');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => {
      const filtered = prev.filter(img => img.id !== imageId);

      // If removed image was main image, set new main image
      const removedImage = prev.find(img => img.id === imageId);
      if (removedImage && formData.mainImage === removedImage.url) {
        setFormData(prevForm => ({
          ...prevForm,
          mainImage: filtered.length > 0 ? filtered[0].url : ''
        }));
      }

      return filtered;
    });
  };

  const setMainImage = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      mainImage: imageUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to sell plants');
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      toast.error('Plant name is required');
      return;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error('Valid price is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }

    if (!formData.location.trim()) {
      toast.error('Location is required');
      return;
    }

    if (selectedImages.length === 0) {
      toast.error('At least one image is required');
      return;
    }

    if (formData.contactMethod === 'phone' && !formData.phoneNumber.trim()) {
      toast.error('Phone number is required for phone contact method');
      return;
    }

    if (formData.contactMethod === 'email' && !formData.email.trim()) {
      toast.error('Email is required for email contact method');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you'd submit to your backend API
      const newListing = {
        id: Date.now(),
        ...formData,
        images: selectedImages.map(img => img.url),
        mainImage: formData.mainImage || selectedImages[0]?.url,
        status: 'Active',
        views: 0,
        likes: 0,
        datePosted: new Date().toISOString().split('T')[0],
        seller: {
          name: user.displayName || user.email,
          email: user.email,
          userId: user.uid
        }
      };

      setMyListings(prev => [newListing, ...prev]);

      // Reset form
      setFormData({
        name: '',
        scientificName: '',
        price: '',
        category: 'Indoor Plants',
        condition: 'Excellent',
        size: 'Medium',
        age: '',
        description: '',
        location: '',
        contactMethod: 'message',
        phoneNumber: '',
        email: '',
        care: {
          light: 'Bright Indirect',
          water: 'Weekly',
          humidity: 'Normal',
          temperature: 'Room Temperature',
          soil: 'Well-draining',
          fertilizer: 'Monthly'
        },
        images: [],
        mainImage: '',
        healthStatus: 'Healthy',
        negotiable: false
      });
      setSelectedFeatures([]);
      setSelectedImages([]);

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

  const editListing = (listing) => {
    toast.info(`Edit functionality for ${listing.name} coming soon!`);
    // Could implement edit modal or navigate to edit page
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
            className="bg-white rounded-xl shadow-lg border p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaLeaf className="mr-2 text-emerald-600" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Plant Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                      placeholder="e.g., Monstera Deliciosa"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Scientific Name
                    </label>
                    <input
                      type="text"
                      name="scientificName"
                      value={formData.scientificName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                      placeholder="e.g., Monstera deliciosa"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaDollarSign className="mr-1 text-emerald-600" />
                      Price *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm pr-20"
                        placeholder="25.99"
                      />
                      <div className="absolute right-2 top-2 flex items-center space-x-1">
                        <input
                          type="checkbox"
                          name="negotiable"
                          checked={formData.negotiable}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-3 w-3"
                        />
                        <span className="text-xs text-gray-600">Neg.</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaTags className="mr-1 text-emerald-600" />
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    >
                      {plantCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Plant Size *
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    >
                      {plantSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Condition *
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    >
                      {plantConditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCamera className="mr-2 text-emerald-600" />
                  Plant Photos * (Max 5)
                </h3>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-3">
                  <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={imageUploading || selectedImages.length >= 5}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer px-4 py-2 rounded-lg transition-colors text-sm ${
                      imageUploading || selectedImages.length >= 5
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {imageUploading ? 'Uploading...' : 'Upload Photos'}
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    Max 5MB per image
                  </p>
                </div>

                {/* Image Preview Grid */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {selectedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className={`w-full h-20 object-cover rounded-lg border-2 cursor-pointer transition-all ${
                            formData.mainImage === image.url
                              ? 'border-emerald-500 ring-2 ring-emerald-200'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                          onClick={() => setMainImage(image.url)}
                        />

                        {/* Main image badge */}
                        {formData.mainImage === image.url && (
                          <div className="absolute top-1 left-1 bg-emerald-600 text-white text-xs px-1 py-0.5 rounded">
                            Main
                          </div>
                        )}

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          <FaTimes className="w-2 h-2" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description & Contact in same row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaInfoCircle className="mr-2 text-emerald-600" />
                    Description
                  </h3>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    placeholder="Describe your plant's condition and features..."
                  />
                </div>

                {/* Location & Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-emerald-600" />
                    Location & Contact
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                        placeholder="City, State or ZIP"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Contact Method *
                      </label>
                      <select
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                      >
                        <option value="message">Platform Messages</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>

                    {formData.contactMethod === 'phone' && (
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                          <FaPhone className="mr-1 text-emerald-600" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    )}

                    {formData.contactMethod === 'email' && (
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                          <FaEnvelope className="mr-1 text-emerald-600" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || imageUploading || selectedImages.length === 0}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors font-semibold inline-flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Listing...
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" />
                      List My Plant
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-600 mt-2">
                  By listing your plant, you agree to our terms of service
                </p>
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
                        src={listing.mainImage || listing.image || listing.images?.[0]}
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
                      {listing.negotiable && (
                        <div className="absolute top-3 left-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Negotiable
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{listing.name}</h3>
                      {listing.scientificName && (
                        <p className="text-sm text-gray-500 italic mb-2">{listing.scientificName}</p>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-2xl font-bold text-emerald-600">${listing.price}</p>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {listing.category}
                        </span>
                      </div>

                      {listing.size && (
                        <p className="text-sm text-gray-600 mb-2">Size: {listing.size}</p>
                      )}

                      {listing.features && listing.features.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {listing.features.slice(0, 3).map(feature => (
                              <span key={feature} className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                            {listing.features.length > 3 && (
                              <span className="text-xs text-gray-500">+{listing.features.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <FaEye className="w-3 h-3 mr-1" />
                          {listing.views} views
                        </span>
                        <span className="flex items-center">
                          <FaHeart className="w-3 h-3 text-red-400 mr-1" />
                          {listing.likes} likes
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          className="flex-1 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                          onClick={() => editListing(listing)}
                        >
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
