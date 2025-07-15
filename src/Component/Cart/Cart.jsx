import React, { useState, useEffect, useContext } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Heart, Truck, Shield, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gardeningCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('gardeningCart', JSON.stringify(cartItems));
    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + shipping - discountAmount;

  const applyPromoCode = () => {
    const promoCodes = {
      'PLANT20': 20,
      'GREEN15': 15,
      'GARDEN10': 10
    };

    if (promoCodes[promoCode.toUpperCase()]) {
      setDiscount(promoCodes[promoCode.toUpperCase()]);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderPlaced(true);
    setIsCheckingOut(false);
    clearCart();

    toast.success('Order placed successfully!');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ShoppingBag className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase! Your plants will be delivered within 3-5 business days.
          </p>
          <Link
            to="/buy-plants"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any plants to your cart yet.
          </p>
          <Link
            to="/buy-plants"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Link
            to="/buy-plants"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">by {item.seller?.name}</p>
                      <p className="text-emerald-600 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart Button */}
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="text-green-600 text-sm mt-2">
                  {discount}% discount applied!
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {subtotal < 50 && (
                <p className="text-sm text-gray-500">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-2 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                Secure checkout
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2 text-green-500" />
                Free shipping on orders over $50
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || !user}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isCheckingOut ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Proceed to Checkout'
              )}
            </button>

            {!user && (
              <p className="text-sm text-gray-500 text-center mt-3">
                Please <Link to="/login" className="text-emerald-600 hover:underline">login</Link> to proceed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
