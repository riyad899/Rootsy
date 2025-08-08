import React, { useState } from 'react';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

const GardenerCard = () => {
  const [selectedGardener, setSelectedGardener] = useState(null);

  // Use centralized API hook for plants data
  const { data: gardeners = [], isLoading: loading, error } = UseApiousSecure.usePlants();

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 text-center">
      Error: {error.message || 'Failed to load gardeners'}
    </div>
  );

  const duplicatedGardeners = [...gardeners, ...gardeners];

  return (
    <div className="w-full py-16 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 px-4">
          {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                      Meet Our Expert Gardeners

          </h2> */}
           <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
                <span className="font-serif italic text-[#1a3a27]">Meet</span> Our Expert Gardeners
              </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our passionate team of gardening professionals
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        <div className="flex animate-marquee hover:pause-marquee">
          {duplicatedGardeners.map((gardener, index) => (
            <div
              key={`${gardener._id}-${index}`}
              className="flex-shrink-0 mx-4 group cursor-pointer"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                {/* Avatar Container */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110"
                  onClick={() => setSelectedGardener(gardener)}
                >
                  <img
                    src={gardener.photoUrl}
                    alt={gardener.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>

                  {/* Centered View Profile Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white text-[#18AA4E] px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-200">
                      View Profile
                    </div>
                  </div>

                  {/* Status Badge */}

                </div>

                {/* Name Label */}
                <div className="text-center mt-3">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-[#18AA4E] transition-colors">
                    {gardener.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {gardener.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedGardener && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-modal-enter">
            {/* Modal Header */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                src={selectedGardener.photoUrl}
                alt={selectedGardener.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button
                onClick={() => setSelectedGardener(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold text-white">{selectedGardener.name}</h2>
                <p className="text-white/90">{selectedGardener.location}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedGardener.status}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-1 font-semibold">{selectedGardener.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Specialty</h3>
                  <p className="text-gray-600">{selectedGardener.specialty}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Experience</h3>
                    <p className="text-gray-600">{selectedGardener.experience} years</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Member Since</h3>
                    <p className="text-gray-600">{new Date(selectedGardener.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedGardener(null)}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Contact Gardener
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes modal-enter {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .pause-marquee {
          animation-play-state: paused;
        }

        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GardenerCard;