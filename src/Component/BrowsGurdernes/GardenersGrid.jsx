import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const GardenersGrid = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of gardeners');
        }

        setGardeners(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  if (loading) {
    return (
      <div className="flex  justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        <span className="ml-3">Loading gardeners...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4  border-red-500 p-4 max-w-md mx-auto mt-[100px]">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading gardeners</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gardeners.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No gardeners</h3>
        <p className="mt-1 text-sm text-gray-500">There are currently no gardeners to display.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[100px]">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Our Gardening Community</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gardeners.map((gardener) => (
          <div key={gardener.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src={gardener.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                alt={`${gardener.name}, gardener`}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                }}
              />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{gardener.name}</h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    gardener.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {gardener.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>Age: {gardener.age}</span>
                  <span>{gardener.gender}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Experience:</span> {gardener.experiences}
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">
                    Shared {gardener.totalSharedTips || 0} gardening tips
                  </p>
                </div>
              </div>
              {gardener.otherInfo && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 italic">{gardener.otherInfo}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

GardenersGrid.propTypes = {
  gardeners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      experiences: PropTypes.string.isRequired,
      image: PropTypes.string,
      totalSharedTips: PropTypes.number,
      otherInfo: PropTypes.string
    })
  )
};

export default GardenersGrid;