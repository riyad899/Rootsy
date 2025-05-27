import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthContext';

export const Mytips = () => {
    const { user } = useContext(AuthContext);
    const [userTips, setUserTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState({ success: null, message: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tipToDelete, setTipToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setTipToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!tipToDelete) return;

        try {
            setDeleteStatus({ success: null, message: 'Deleting...' });
            const response = await fetch(`http://localhost:3000/tips/${tipToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete tip');
            }

            setUserTips(prevTips => prevTips.filter(tip => tip._id !== tipToDelete));
            setDeleteStatus({ success: true, message: 'Tip deleted successfully!' });
            setShowDeleteModal(false);
            setTipToDelete(null);

            // Clear status message after 3 seconds
            setTimeout(() => setDeleteStatus({ success: null, message: '' }), 3000);
        } catch (error) {
            console.error('Error deleting tip:', error);
            setDeleteStatus({ success: false, message: error.message });
            setShowDeleteModal(false);
        }
    };

  

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await fetch('http://localhost:3000/tips');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                // Filter tips by the current user
                const filteredTips = data.filter(tip =>
                    tip.userEmail === user?.email?.toLowerCase()
                );
                setUserTips(filteredTips);
            } catch (err) {
                console.error('Error fetching tips:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchTips();
        }
    }, [user]);

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

    return (
        <div className="container mx-auto mt-[100px] px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">My Gardening Tips</h2>

            {/* Delete status message */}
            {deleteStatus.message && (
                <div className={`mb-4 p-4 rounded ${deleteStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {deleteStatus.message}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-6">Are you sure you want to delete this tip? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {userTips.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {userTips.map(tip => {
                        const { _id, imageUrl, title, difficulty, description, plantType, category, availability, createdAt, userName } = tip;

                        return (
                            <div key={_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                            {difficulty}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            {plantType}
                                        </span>
                                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                            {category}
                                        </span>
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                            {availability}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{new Date(createdAt).toLocaleDateString()}</span>
                                        <span className="font-medium">{userName}</span>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(_id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
                    <p className="font-medium">No tips found. Create your first gardening tip!</p>
                </div>
            )}
        </div>
    );
};