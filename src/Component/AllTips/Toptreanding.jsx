import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Toptreanding = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch('http://localhost:3000/tips');
        if (!response.ok) {
          throw new Error('Failed to fetch tips');
        }
        const data = await response.json();
        // Filter tips with status: public
        const publicTips = data.filter(tip => tip.availability === 'Public');
        setTips(publicTips);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleSeeMore = (tipId) => {
    navigate(`/tips/${tipId}`);
  };

  // Function to render difficulty badge with appropriate styling
  const renderDifficultyBadge = (difficulty) => {
    let bgColor = '';
    let textColor = '';

    switch(difficulty.toLowerCase()) {
      case 'easy':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'medium':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'hard':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }

    return (
      <span className={`inline-block ${bgColor} ${textColor} text-xs px-2 py-1 rounded-full capitalize`}>
        {difficulty}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Public Tips</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Image</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Title</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Category</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Difficulty</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tips.length > 0 ? (
              tips.map((tip) => (
                <tr key={tip._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    {tip.imageUrl && (
                      <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64'; // Fallback image
                        }}
                      />
                    )}
                    {!tip.imageUrl && (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-medium">{tip.title}</td>
                  <td className="py-4 px-4 text-gray-600">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {tip.difficulty ? renderDifficultyBadge(tip.difficulty) : '-'}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleSeeMore(tip._id)}
                      className="text-blue-600 hover:text-green-600 transition-colors cursor-pointer"
                      title="View details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No public tips available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>


  );
};