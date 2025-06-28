import { useRef, useEffect, useState } from 'react';

const InfoSection = () => {
  // Refs for the number elements
  const yearsRef = useRef(null);
  const specialistsRef = useRef(null);
  const awardsRef = useRef(null);

  // State for controlling animations
  const [isVisible, setIsVisible] = useState(false);
  const [leavesAnimated, setLeavesAnimated] = useState(false);

  // Leaf SVG component for better control
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

  // Count-up animation function
  useEffect(() => {
    const animateCount = (element, target) => {
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
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Trigger leaf animation first
          setTimeout(() => setLeavesAnimated(true), 200);

          // Then start counter animations
          setTimeout(() => {
            animateCount(yearsRef.current, 40);
            animateCount(specialistsRef.current, 30);
            animateCount(awardsRef.current, 15);
          }, 800);

          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (yearsRef.current && specialistsRef.current && awardsRef.current) {
      observer.observe(yearsRef.current.parentElement.parentElement);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div className="relative overflow-hidden">
      {/* Gradient background that flows from Home section */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-100 via-emerald-50 to-white"></div>

      {/* Additional gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-100/30 to-transparent"></div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated background circles - updated colors */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-20 animate-ping" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Main heading section with fade-in animation */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
              We handle everything for you!
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 mx-auto mb-6 rounded-full"></div>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              We at the <span className="font-semibold text-emerald-700 px-2 py-1 bg-emerald-100 rounded-md">Gawley</span> are proud of our carefully designed landscapes tailored to suit our commercial clients' preferences while providing sustainability.
            </p>
          </div>

          {/* Stats section with enhanced animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {/* Years of Experience */}
            <div className={`text-center transform transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
              <div className="relative group">
                <div ref={yearsRef} className="text-6xl font-bold text-emerald-700 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-600">0</div>
                <div className="absolute inset-0 bg-emerald-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-125"></div>
              </div>
              <div className="text-lg font-semibold text-gray-800 uppercase mb-2 tracking-wider">YEARS</div>
              <div className="text-gray-600 mb-3 font-medium">Experience</div>
              <p className="text-gray-500 text-sm leading-relaxed">Delivering exceptional solutions for your garden with decades of expertise.</p>
            </div>

            {/* Specialists with animated leaves */}
            <div className={`text-center relative transform transition-all duration-800 delay-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
              {/* Left leaf with bottom-to-top animation */}
              <div className={`absolute -left-32 md:-left-30 rotate--30 -top-8 w-48 h-46 transition-all duration-1500 ease-out ${leavesAnimated ? 'transform translate-y-0 opacity-100 rotate-12' : 'transform translate-y-20 opacity-0 rotate-45'}`}>
                <LeafSVG
                  className="w-full h-full filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 animate-pulse"
                  style={{
                    animationDelay: '0.5s',
                    transform: 'rotate(3deg)',
                  }}
                />
              </div>

              {/* Content with enhanced styling */}
              <div className="z-10 relative group">
                <div className="relative">
                  <div ref={specialistsRef} className="text-6xl font-bold text-emerald-700 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-teal-600">0</div>
                  <div className="absolute inset-0 bg-emerald-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-125"></div>
                </div>
                <div className="text-lg font-semibold text-gray-800 uppercase mb-2 tracking-wider">SPECIALISTS</div>
                <div className="text-gray-600 mb-3 font-medium">In landscaping design</div>
                <p className="text-gray-500 text-sm leading-relaxed">We gather the finest talent, creating the most skilled specialist team in the industry.</p>
              </div>

              {/* Right leaf with bottom-to-top animation */}
              <div className={`absolute -right-20 rotate-[-60] md:-right-30 -top-8 w-48 h-46 transition-all duration-1500 ease-out ${leavesAnimated ? 'transform translate-y-0 opacity-100 -rotate-12' : 'transform translate-y-20 opacity-0 -rotate-45'}`} style={{animationDelay: '0.8s'}}>
                <LeafSVG
                  className="w-full h-full filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 animate-pulse"
                  style={{
                    animationDelay: '0.8s',
                    transform: 'scaleX(-1) rotate(15deg)',
                  }}
                />
              </div>
            </div>

            {/* Awards */}
            <div className={`text-center transform transition-all duration-800 delay-900 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
              <div className="relative group">
                <div ref={awardsRef} className="text-6xl font-bold text-emerald-700 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-teal-600">0</div>
                <div className="absolute inset-0 bg-teal-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-125"></div>
              </div>
              <div className="text-lg font-semibold text-gray-800 uppercase mb-2 tracking-wider">AWARDS</div>
              <div className="text-gray-600 mb-3 font-medium">Winning Company</div>
              <p className="text-gray-500 text-sm leading-relaxed">Award-winning garden design works that serve as inspiration for excellence.</p>
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-full hover:from-emerald-200 hover:via-teal-200 hover:to-emerald-200 transition-all duration-300 cursor-pointer group shadow-lg">
              <span className="text-emerald-700 font-medium">Discover Our Portfolio</span>
              <svg className="w-5 h-5 text-emerald-700 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom gradient for smooth transition to white background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>

        {/* Custom CSS for additional animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default InfoSection;