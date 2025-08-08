import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthContext';
import CopilotChat from '../CopilotChat.jsx/CopilotChat';

export const SingleTip = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await fetch(`https://backend-test-blush.vercel.app/tips/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTip(data);
      } catch (err) {
        console.error('Error fetching tip:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch('https://myserver-coral.vercel.app/like');
        if (!response.ok) {
          throw new Error('Failed to fetch likes');
        }
        const data = await response.json();

        // Count likes for this tip
        const tipLikes = data.filter(like => like.id === id);
        setLikeCount(tipLikes.length);

        // Check if current user has liked this tip
        if (user) {
          const userLike = data.find(like => like.id === id && like.email === user.email);
          setIsLiked(!!userLike);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [id, user?.email]);


const handleLike = async () => {
  if (!user) {
    navigate('/login');
    return;
  }

  try {
    // Determine if we're liking or unliking
    const endpoint = isLiked ? 'unlike' : 'like';
    const method = isLiked ? 'DELETE' : 'POST';

    const response = await fetch(`https://myserver-coral.vercel.app/like`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        email: user.email
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'}`);
    }

    // Update UI immediately
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

  } catch (error) {
    console.error('Error:', error);
  }
};

// Separate function specifically for deleting a like
const deleteLike = async () => {
  if (!user) {
    navigate('/login');
    return;
  }

  try {
    const response = await fetch(`https://myserver-coral.vercel.app/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        email: user.email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to delete like');
    }

    // Update UI
    setIsLiked(false);
    setLikeCount(prev => prev - 1);

  } catch (error) {
    console.error('Error deleting like:', error);
  }
};

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );

  if (!tip) return (
    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
      <p className="font-medium">Tip not found</p>
    </div>
  );

  return (
    <div className="container mx-auto mt-[100px] px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Tips
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {tip.imageUrl && (
          <img
            src={tip.imageUrl}
            alt={tip.title}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{tip.title}</h1>

            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                {tip.difficulty}
              </span>

              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                aria-label={isLiked ? 'Unlike this tip' : 'Like this tip'}
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span>{likeCount}</span>
              </button>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600 mb-6">
            <p>{tip.description}</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tip.plantType}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {tip.category}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {tip.availability}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                <span className="font-medium">Posted by: </span>
                <span>{tip.userName}</span>
              </div>
              <div>
                <span className="font-medium">Posted on: </span>
                <span>{new Date(tip.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            {user?.email === tip.userEmail && (
              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`/tips/${id}/edit`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit Tip
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* CopilotChat component for tips assistance */}
        <CopilotChat />
      </div>
    </div>
  );
};