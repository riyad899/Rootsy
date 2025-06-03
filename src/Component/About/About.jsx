import React from 'react';

const About = () => {
  const timelineData = [
    {
      year: "1987",
      description: "Gardenly established in 1987, is an American landscape company based in NY City"
    },
    {
      year: "2005",
      description: "Gardenly established in 1987, is an American landscape company based in NY City"
    },
    {
      year: "2017",
      description: "Gardenly established in 1987, is an American landscape company based in NY City"
    }
  ];

  return (
    <div
      className="min-h-screen py-16 px-4"

    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left side - About Text */}
          <div className="space-y-8">
            {/* Decorative leaf element */}
            <div className="relative">
              <div className="absolute -top-4 -left-8 text-6xl opacity-20 animate-float">🌿</div>
              <h1 className="text-5xl lg:text-6xl font-light text-green-800 mb-6 relative z-10">
                About us
              </h1>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Gardenly offers a full-service garden design to clients.
            </p>

            {/* Timeline Section */}
            <div className="space-y-8 mt-12">
              <h2 className="text-2xl font-semibold text-[#00A844] mb-6">Since 1987!</h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00A844] to-transparent opacity-30"></div>

                {timelineData.map((item, index) => (
                  <div key={item.year} className="relative flex items-start space-x-6 mb-8">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10"
                         style={{background: 'linear-gradient(135deg, #EBFDF0 0%, #00A844 100%)'}}>
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="text-2xl font-bold text-[#00A844] mb-2">{item.year}</div>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Team Image and Craftsmanship */}
          <div className="space-y-6">
            {/* Team Image */}
            <div className="relative group">
              <div className="absolute -top-4 -right-4 text-4xl opacity-30 animate-float animation-delay-400">🍃</div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"
                  alt="Garden team working together"
                  className="w-full h-64 object-cover"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{background: 'linear-gradient(135deg, rgba(235,253,240,0.3) 0%, rgba(0,168,68,0.2) 100%)'}}
                ></div>
              </div>
            </div>

            {/* Craftsmanship Card */}
            <div
              className="rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden"
              style={{background: 'linear-gradient(135deg, #00A844 0%, #108c3d 50%, #0F7B35 100%)'}}
            >
              {/* Floating elements */}
              <div className="absolute top-4 right-4 text-3xl opacity-30">🌱</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-20">🌿</div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                <div className="text-3xl">🛠️</div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-4">Craftsmanship</h3>

              <p className="text-white/90 text-center leading-relaxed mb-6">
                We at The Gardenly are proud to offer carefully designed landscapes crafted to suit our commercial clients preferences, while prioritizing sustainability.
              </p>

              <div className="text-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30">
                  How we work
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-20 text-4xl opacity-10 animate-float">🦋</div>
          <div className="absolute bottom-32 left-16 text-3xl opacity-10 animate-float animation-delay-800">🌺</div>
          <div className="absolute top-1/2 left-1/4 text-2xl opacity-10 animate-float animation-delay-1000">🌸</div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
};

export default About;