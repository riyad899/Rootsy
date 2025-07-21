
import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { MostViralTip } from './components/MostViralTip';
import GardeningEvents from './components/GardeningEvents';
import CustomerTestimonials from './components/CustomerTestimonials';
import TopGardener from './components/Topgardener';
import AboutUs from './components/AboutUs';

// Import new components


export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const autoSlideRef = useRef(null);

  // InfoSection states and refs
  const yearsRef = useRef(null);
  const specialistsRef = useRef(null);
  const awardsRef = useRef(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [leavesAnimated, setLeavesAnimated] = useState(false);

    const slides = [
      {
        subtitle: 'Organic & Sustainable',
        title: 'For the love of',
        titleHighlight: 'homegrown',
        description: 'Grow your own vegetables and experience the joy of fresh harvests that nourish both body and soul',
        cta: 'Get Gardening Tips',
        link: '#guides',
        accent: '#059669'
      },
      {
        subtitle: 'Seasonal Gardening',
        title: 'Flavors Grown in',
        titleHighlight: 'Your Backyard',
        description: 'Learn what to plant each season for continuous harvests throughout the year',
        cta: 'Get Gardening Tips',
        link: '#calendar',
        accent: '#0d9488'
      },
      {
        subtitle: 'Garden to Table',
        title: 'Where every plant',
        titleHighlight: 'tells a story',
        description: 'Discover the magical journey from tiny seed to your dinner plate',
        cta: 'Get Gardening Tips',
        link: '#tips',
        accent: '#047857'
      }
    ];

    // Leaf SVG component for InfoSection
    const LeafSVG = ({ className, style }) => (
      <svg
        className={className}
        style={style}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 5C30 15 10 35 15 65C20 85 35 100 50 115C65 100 80 85 85 65C90 35 70 15 50 5Z"
          fill="url(#leafGradient)"
          stroke="#059669"
          strokeWidth="1"
        />
        <path
          d="M50 15L50 105"
          stroke="#0d9488"
          strokeWidth="2"
        />
        <path
          d="M50 25C45 30 40 40 42 50M50 35C55 40 60 50 58 60M50 45C45 50 40 60 42 70"
          stroke="#047857"
          strokeWidth="1"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
      </svg>
    );

    // Touch/swipe handling
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }
    };

    // Animation variants for hero section
    const slideVariants = {
      enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        rotateY: direction > 0 ? 25 : -25,
        scale: 0.8,
      }),
      center: {
        x: 0,
        opacity: 1,
        rotateY: 0,
        scale: 1,
      },
      exit: (direction) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        rotateY: direction < 0 ? 25 : -25,
        scale: 0.8,
      })
    };

    const titleVariants = {
      hidden: {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotateX: 45,
      },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.1
        }
      },
      exit: {
        y: -50,
        opacity: 0,
        scale: 1.1,
        rotateX: -30,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };

    const letterVariants = {
      hidden: {
        y: 50,
        opacity: 0,
        rotateX: 90,
      },
      visible: (i) => ({
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
          delay: i * 0.05,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      })
    };

    const subtitleVariants = {
      hidden: {
        x: -100,
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          delay: 0.2,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };

    const descriptionVariants = {
      hidden: {
        y: 30,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.8,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };

    const buttonVariants = {
      hidden: {
        scale: 0,
        opacity: 0,
        rotate: -180,
      },
      visible: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
          delay: 1.2,
          duration: 0.8,
          ease: [0.68, -0.55, 0.265, 1.55]
        }
      }
    };

    // InfoSection count-up animation function
    useEffect(() => {
      const animateCount = (element, target) => {
        if (!element) return;
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          element.textContent = Math.floor(current);
        }, 30);
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isInfoVisible) {
            setIsInfoVisible(true);
            // Trigger leaf animation first
            setTimeout(() => setLeavesAnimated(true), 200);

            // Then start counter animations
            setTimeout(() => {
              animateCount(yearsRef.current, 25);
              animateCount(specialistsRef.current, 50);
              animateCount(awardsRef.current, 12);
            }, 800);

            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });

      if (yearsRef.current && specialistsRef.current && awardsRef.current) {
        observer.observe(yearsRef.current.parentElement.parentElement);
      }

      return () => observer.disconnect();
    }, [isInfoVisible]);

    // Auto slide functionality
    useEffect(() => {
      const startAutoSlide = () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current);
        }

        if (!isHovered) {
          autoSlideRef.current = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          }, 6000);
        }
      };

      startAutoSlide();

      return () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current);
        }
      };
    }, [isHovered, slides.length]);

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

 return (
    <div className="relative w-full overflow-hidden">
      {/* Continuous Dynamic Animated Background for entire component */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #ffffff 0%, #ecfdf5 25%, #d1fae5 50%, #a7f3d0 75%, #6ee7b7 100%)',
            'radial-gradient(circle at 80% 20%, #ffffff 0%, #f0fdfa 25%, #ccfbf1 50%, #99f6e4 75%, #5eead4 100%)',
            'radial-gradient(circle at 40% 80%, #ffffff 0%, #ecfdf5 25%, #dcfce7 50%, #bbf7d0 75%, #86efac 100%)',
            'radial-gradient(circle at 20% 50%, #ffffff 0%, #ecfdf5 25%, #d1fae5 50%, #a7f3d0 75%, #6ee7b7 100%)'
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex items-center justify-center w-full h-screen overflow-hidden z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-full opacity-30 z-20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-teal-200 to-teal-400 opacity-25 z-20"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -120, -240, -360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-br from-green-200 to-green-400 opacity-40 z-20"
          style={{
            clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 25, 0],
            scale: [1, 1.4, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Sparkle Effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-60 z-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Content Slides */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.8 },
              rotateY: { duration: 0.8 },
              scale: { duration: 0.8 }
            }}
            className="absolute inset-0 flex items-center justify-center w-full h-full z-30"
            style={{ perspective: '1000px' }}
          >
            <div className="relative z-10 w-full max-w-5xl px-6 text-center">
              <motion.div
                key={`content-${currentSlide}`}
                className="space-y-8"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Main Title with Letter Animation */}
                <motion.div
                  variants={titleVariants}
                  className="space-y-2"
                >
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-8xl font-light leading-tight text-gray-800"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      textShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    <motion.div className="block mb-2">
                      {slides[currentSlide].title.split('').map((letter, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          variants={letterVariants}
                          className="inline-block"
                          whileHover={{
                            scale: 1.1,
                            color: slides[currentSlide].accent,
                            textShadow: '0 0 10px rgba(5, 150, 105, 0.5)'
                          }}
                        >
                          {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div
                      className="relative inline-block"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.span
                        className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          backgroundSize: '200% 200%'
                        }}
                      >
                        {slides[currentSlide].titleHighlight}
                      </motion.span>
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg opacity-20 blur-md"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </motion.h1>
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={descriptionVariants}
                  className="relative max-w-2xl mx-auto"
                >
                  <motion.p
                    className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-600"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent rounded-xl"
                    animate={{
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  variants={buttonVariants}
                  className="pt-6"
                >
                  <motion.a
                    href={slides[currentSlide].link}
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden font-semibold tracking-wide text-white rounded-full shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${slides[currentSlide].accent}, #0d9488)`
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 15px 30px ${slides[currentSlide].accent}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <span className="relative z-10 mr-2 text-sm md:text-base">
                      {slides[currentSlide].cta}
                    </span>

                    <motion.div
                      className="relative z-10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={20} />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/20"
                      initial={{ scale: 0, opacity: 1 }}
                      whileHover={{
                        scale: 1,
                        opacity: 0
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            x: 0
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: slides[currentSlide].accent,
            boxShadow: `0 10px 30px ${slides[currentSlide].accent}40`
          }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 left-4 md:left-8 z-50 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-xl"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            x: 0
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: slides[currentSlide].accent,
            boxShadow: `0 10px 30px ${slides[currentSlide].accent}40`
          }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 right-4 md:right-8 z-50 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-xl"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 space-x-2 md:space-x-4">
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative overflow-hidden rounded-full"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            >
              <motion.div
                className="h-2 md:h-3 rounded-full backdrop-blur-md border border-white/30"
                animate={{
                  width: currentSlide === index ? 40 : 12,
                  backgroundColor: currentSlide === index
                    ? slide.accent
                    : 'rgba(255,255,255,0.4)'
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              {currentSlide === index && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: slide.accent }}
                  animate={{
                    boxShadow: [`0 0 0px ${slide.accent}`, `0 0 15px ${slide.accent}`, `0 0 0px ${slide.accent}`]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Share Button */}
        <motion.a
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: 15,
            boxShadow: "0 10px 25px rgba(5, 150, 105, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          href="#share"
          className="absolute bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 text-white bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-xl backdrop-blur-md border border-white/20"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Share2 className="w-5 h-5" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.a>
      </section>

      {/* InfoSection - inherits the same background */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-30"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 bg-teal-200 rounded-full opacity-40"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-20"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Main heading section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
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
              We handle everything for you!
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
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              We at the <span className="font-semibold text-emerald-700 px-2 py-1 bg-emerald-100 rounded-md">Gawley</span> are proud of our carefully designed landscapes tailored to suit our commercial clients' preferences while providing sustainability.
            </motion.p>
          </motion.div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {/* Years of Experience */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <motion.div
                  ref={yearsRef}
                  className="text-6xl font-bold text-emerald-700 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-600"
                  whileHover={{ scale: 1.1 }}
                >
                  0
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-emerald-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-125"
                  whileHover={{ opacity: 0.2 }}
                />
              </div>
              <div className="text-lg font-semibold text-gray-800 uppercase mb-2 tracking-wider">YEARS</div>
              <div className="text-gray-600 mb-3 font-medium">Experience</div>
              <p className="text-gray-500 text-sm leading-relaxed">Delivering exceptional solutions for your garden with decades of expertise.</p>
            </motion.div>

            {/* Specialists */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <motion.div
                  ref={specialistsRef}
                  className="text-6xl font-bold text-emerald-700 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-600"
                  whileHover={{ scale: 1.1 }}
                >
                  0
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-emerald-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-125"
                  whileHover={{ opacity: 0.2 }}
                />
              </div>
              <div className="text-lg font-semibold text-gray-800 uppercase mb-2 tracking-wider">SPECIALISTS</div>
              <div className="text-gray-600 mb-3 font-medium">Expert Team</div>
              <p className="text-gray-500 text-sm leading-relaxed">Professional garden specialists ready to transform your outdoor space.</p>
            </motion.div>

            {/* Awards */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <motion.div
                  ref={awardsRef}
                  className="text-6xl font-bold text-emerald-700 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-teal-600"
                  whileHover={{ scale: 1.1 }}
                >
                  0
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-teal-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-125"
                  whileHover={{ opacity: 0.2 }}
                />
              </div>
              <div className="text-lg font-semibold text-gray-800 uppercase mb-2 tracking-wider">AWARDS</div>
              <div className="text-gray-600 mb-3 font-medium">Winning Company</div>
              <p className="text-gray-500 text-sm leading-relaxed">Award-winning garden design works that serve as inspiration for excellence.</p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-full hover:from-emerald-200 hover:via-teal-200 hover:to-emerald-200 transition-all duration-300 cursor-pointer group shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(5, 150, 105, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-emerald-700 font-medium">Discover Our Portfolio</span>
              <motion.svg
                className="w-5 h-5 text-emerald-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Smooth transition to white for next components */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none z-20"></div>
      </section>

      {/* Other Components with white background */}
      <div className="relative z-10 bg-white">
        {/* New Components */}

        <MostViralTip />
        <GardeningEvents />
        <CustomerTestimonials />
        <TopGardener />
        <AboutUs />

        {/* Commented out components - can be uncommented later */}
        {/* <Buyplants />
        <About /> */}
      </div>
    </div>
  );
}
