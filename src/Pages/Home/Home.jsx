import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';
import { Navbar } from '../../Component/Navbar/Navbar';
import GardenerCard from '../../Component/GardenerCard/GardenerCard';
import GardenersGrid from '../../Component/BrowsGurdernes/GardenersGrid';
import { Toptreanding } from '../../Component/AllTips/Toptreanding';
import InfoSection from '../../Component/StatsSection/InfoSection';
import About from '../../Component/About/About';
import CopilotChat from '../../Component/CopilotChat.jsx/CopilotChat';
import '@copilotkit/react-ui/styles.css';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const autoSlideRef = useRef(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1651827684507-12e7c6675ea3?q=80&w=&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      subtitle: 'Organic & Sustainable',
      title: 'For the love of homegrown',
      description: 'Grow your own vegetables and experience the joy of fresh harvests',
      cta: 'View Planting Guide',
      link: '#guides'
    },
    {
      image: 'https://images.unsplash.com/photo-1581578021450-fbd19fba0e63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      subtitle: 'Seasonal Gardening',
      title: 'Flavors Grown in Your Backyard',
      description: 'Learn what to plant each season for continuous harvests',
      cta: 'Seasonal Planting Calendar',
      link: '#calendar'
    },
    {
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2',
      subtitle: 'Garden to Table',
      title: 'Where every plant tells a story',
      description: 'Discover the journey from seed to plate',
      cta: 'Get Gardening Tips',
      link: '#tips'
    }
  ];

  // Optimized slide variants for smooth performance
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    })
  };

  // Optimized text animation variants
  const textVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    })
  };

  // Optimized background image variants
  const imageVariants = {
    initial: {
      scale: 1.1,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Continue even if some images fail
      }
    };

    loadImages();
  }, []);

  // Auto slide functionality with smooth direction tracking
  useEffect(() => {
    if (!imagesLoaded) return;

    const startAutoSlide = () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }

      if (!isHovered) {
        autoSlideRef.current = setInterval(() => {
          setDirection(1);
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds as requested
      }
    };

    startAutoSlide();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [imagesLoaded, isHovered, slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-green-50 to-green-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-900 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <section
        id="home"
        className="relative flex items-center justify-center w-full h-screen overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...swipeHandlers}
      >
        {/* Slides with Optimized Framer Motion */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.6 },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            {/* Background Image with smooth zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative w-full h-full"
              >
                <motion.img
                  src={slides[currentSlide].image}
                  alt={`Garden scene - ${slides[currentSlide].subtitle}`}
                  className="object-cover w-full h-full will-change-transform"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 15,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
                  }}
                />
                {/* Simplified gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
              </motion.div>
            </div>

            {/* Content with sophisticated staggered animations */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
              <motion.div
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Subtitle with elegant styling */}
                <motion.p
                  custom={0}
                  variants={textVariants}
                  className="relative top-6 inline-block mb-6 text-sm font-light tracking-[0.3em] text-green-300 uppercase md:text-base"
                >
                  <span className="relative z-10 px-6 py-2 backdrop-blur-sm bg-white/10 rounded-full border border-white/20">
                    {slides[currentSlide].subtitle}
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-green-300 to-transparent"
                  />
                </motion.p>

                {/* Main title with optimized typography */}
                <motion.h1
                  custom={1}
                  variants={textVariants}
                  className="mb-8 text-4xl top-6 font-light leading-[1.1] tracking-wide md:text-6xl lg:text-7xl xl:text-8xl will-change-transform"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Description with optimized styling */}
                <motion.p
                  custom={2}
                  variants={textVariants}
                  className="mb-10 text-lg font-light leading-relaxed text-gray-200 md:text-xl lg:text-2xl max-w-3xl mx-auto will-change-transform"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Button with premium styling */}
                <motion.div
                  custom={3}
                  variants={textVariants}
                >
                  <motion.a
                    href={slides[currentSlide].link}
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden font-medium tracking-[0.2em] text-white uppercase border-2 border-white/30 backdrop-blur-sm bg-white/10 md:px-12 md:py-5 will-change-transform"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(12, 84, 44, 0.9)",
                      borderColor: "#0C542C"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <span className="relative z-10 flex items-center">
                      {slides[currentSlide].cta}
                      <motion.svg
                        className="w-5 h-5 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Optimized Navigation Arrows */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            x: 0
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 left-5 z-50 flex items-center justify-center w-14 h-14 text-2xl text-white backdrop-blur-sm bg-white/10 rounded-full border border-white/20 hover:border-green-500 hover:bg-green-900/80 transition-all duration-200 md:left-10"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <IoChevronBack />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            x: 0
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 right-5 z-50 flex items-center justify-center w-14 h-14 text-2xl text-white backdrop-blur-sm bg-white/10 rounded-full border border-white/20 hover:border-green-500 hover:bg-green-900/80 transition-all duration-200 md:right-10"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <IoChevronForward />
        </motion.button>

        {/* Optimized Booking Button */}
        <motion.a
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 25px rgba(12, 84, 44, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          href="#reservation"
          className="absolute bottom-8 right-8 z-50 flex flex-col items-center justify-center w-24 h-24 p-3 text-xs font-bold tracking-widest text-white uppercase bg-green-900 rounded-full shadow-lg md:w-28 md:h-28 md:text-sm hover:shadow-xl hover:bg-green-800 transition-all duration-200"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 mb-1 md:w-10 md:h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </motion.svg>
          <span className="leading-tight">Share</span>
        </motion.a>

        {/* Optimized Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative overflow-hidden rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                className="h-3 rounded-full border border-white/30"
                animate={{
                  width: currentSlide === index ? 32 : 12,
                  backgroundColor: currentSlide === index
                    ? '#0C542C'
                    : 'rgba(255,255,255,0.3)'
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Subtle floating decorative elements */}
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-32 w-1 h-1 bg-green-300/40 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      <InfoSection />
      <Toptreanding />
      <GardenerCard />
      <About />
    </div>
  );
};