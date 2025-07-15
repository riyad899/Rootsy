# 🌱 Rootsy - Complete Gardening Platform

A comprehensive gardening social platform built with React, Firebase, and modern web technologies.

🔗 **Live Site:** [Rootsy](https://delightful-macaron-2d3619.netlify.app/)

---

## ✨ Features Completed

### 🛒 **E-commerce Functionality**
- **Plant Marketplace**: Browse and purchase plants from trusted sellers
- **Shopping Cart**: Full cart management with persistent storage
- **Plant Selling**: List your own plants for sale with detailed information
- **Search & Filters**: Advanced plant search with category filtering
- **Favorites System**: Save your favorite plants
- **Secure Checkout**: Integrated checkout process with order management

### 👥 **Social Features**
- **User Authentication**: Email/password and Google login
- **Profile Management**: Complete user profile system
- **Gardener Discovery**: Find and connect with other gardeners
- **Tips Sharing**: Share and browse gardening tips
- **Community Dashboard**: User statistics and leaderboards

### 📅 **Planning Tools**
- **Gardening Calendar**: Track planting and harvest schedules
- **Plant Care Guides**: Detailed care requirements for each plant
- **Growth Tracking**: Monitor your plants' progress

### 🤖 **AI Integration**
- **Copilot Chat**: AI-powered gardening assistant
- **Smart Recommendations**: Plant suggestions based on preferences

### 🎨 **User Experience**
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout
- **Toast Notifications**: User-friendly feedback system
- **Mobile Responsive**: Works perfectly on all devices

## � Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/riyad899/Rootsy.git
   cd Rootsy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠 Technologies Used

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library

### Backend & Services
- **Firebase Authentication** - User management
- **Firebase Firestore** - Database (ready for integration)
- **CopilotKit** - AI chat integration

### Additional Libraries
- **React Toastify** - Notification system
- **React Icons** - Icon components
- **Date-fns** - Date manipulation
- **Recharts** - Data visualization

## 🌟 Key Features Implementation

### Authentication System
- Email/password registration and login
- Google OAuth integration
- Protected routes
- User context management
- Persistent authentication state

### E-commerce Platform
- Product catalog with search and filtering
- Shopping cart with localStorage persistence
- Dynamic cart counter in navigation
- Checkout process simulation
- Seller dashboard for listing plants

### Social Features
- User profiles with avatars and bio
- Tips sharing system with categories
- Community gardener discovery
- Like and comment system (structure ready)

### Planning Tools
- Interactive gardening calendar
- Plant care tracking
- Seasonal planning guides
- Growth monitoring system

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage Guide

### For Plant Buyers
1. Browse the marketplace using search and filters
2. Add plants to your cart
3. Proceed to checkout when ready
4. Track your orders in your profile

### For Plant Sellers
1. Navigate to "Sell Plants"
2. Fill out the plant listing form
3. Upload photos and set pricing
4. Manage your listings in the seller dashboard

### For Gardening Enthusiasts
1. Share your gardening tips
2. Browse community tips for inspiration
3. Use the calendar for planning
4. Connect with other gardeners

## 🚀 Future Enhancements

- [ ] Real-time chat between users
- [ ] Plant disease identification
- [ ] Weather integration
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Riyad**
- GitHub: [@riyad899](https://github.com/riyad899)
- Project: Rootsy - Complete Gardening Platform

---

**Built with ❤️ for the gardening community**
