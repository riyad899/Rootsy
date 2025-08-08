import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const About = () => {
  const navigate = useNavigate();

  const handleViewProcess = () => {
    toast.info('Our process documentation coming soon!');
    // Could navigate to a process page when it exists
    // navigate('/our-process');
  };

  const timelineData = [
    {
      year: "1987",
      title: "Founding Roots",
      description: "Established in New York with a vision to blend nature and urban living through thoughtful design"
    },
    {
      year: "2005",
      title: "National Recognition",
      description: "Featured in Architectural Digest for our innovative rooftop garden designs"
    },
    {
      year: "2017",
      title: "Sustainability Focus",
      description: "Pioneered water-wise landscaping techniques now adopted industry-wide"
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
          {/* Left side - About Text */}
          <div className="space-y-12">
            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
                <span className="font-serif italic text-[#1a3a27]">About</span> Gardenly
              </h1>
              <div className="w-20 h-px bg-gray-300 mb-8"></div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-md font-light">
              We create living art that evolves with the seasons, combining horticultural expertise with architectural vision.
            </p>

            {/* Timeline Section */}
            <div className="space-y-12 mt-16">
              <h2 className="text-xl font-normal text-gray-500 tracking-widest mb-8">OUR JOURNEY</h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200"></div>

                {timelineData.map((item, index) => (
                  <div key={item.year} className="relative flex items-start space-x-8 mb-12 last:mb-0">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center relative z-10">
                      <div className="w-2 h-2 rounded-full bg-[#1a3a27]"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="text-xs font-medium text-gray-500 tracking-widest mb-1">{item.year}</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Team Image and Craftsmanship */}
          <div className="space-y-8">
            {/* Team Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-sm shadow-sm aspect-[4/3]">
                <img
                  src=" https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"
                  alt="Gardenly team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>

            {/* Craftsmanship Card */}
            <div className="border border-gray-200 p-8 bg-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-px bg-[#1a3a27] mr-4"></div>
                <h3 className="text-sm font-medium text-gray-500 tracking-widest">PHILOSOPHY</h3>
              </div>

              <h3 className="text-2xl font-light text-gray-900 mb-6 font-serif italic">"Precision meets nature"</h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">
                Our approach combines meticulous attention to detail with deep respect for natural systems, creating spaces that are both beautiful and ecologically responsible.
              </p>

              <div className="flex">
                <button
                  className="border border-[#1a3a27] text-[#1a3a27] px-6 py-3 text-sm tracking-wider hover:bg-[#1a3a27] hover:text-white transition-colors duration-300 cursor-pointer"
                  onClick={handleViewProcess}
                >
                  OUR PROCESS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-24 border-t border-gray-100 pt-12">
          <div className="text-gray-400 text-sm">Gardenly Landscapes • Established 1987</div>
        </div>
      </div>
    </div>
  );
};

export default About;