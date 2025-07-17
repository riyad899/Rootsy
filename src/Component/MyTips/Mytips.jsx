import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CopilotChat from '../CopilotChat.jsx/CopilotChat';
import { UseApiousSecure } from '../../hooks/UseApiousSecure';

export const Mytips = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Use centralized API hooks
    const { data: allTips = [], isLoading: loading, error: queryError, refetch } = UseApiousSecure.useTips();
    const updateTipMutation = UseApiousSecure.useUpdateTip();
    const deleteTipMutation = UseApiousSecure.useDeleteTip();
    const uploadImageMutation = UseApiousSecure.useUploadImage();

    const [deleteStatus, setDeleteStatus] = useState({ success: null, message: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tipToDelete, setTipToDelete] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [tipToUpdate, setTipToUpdate] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        title: '',
        plantType: '',
        difficulty: 'Easy',
        description: '',
        imageUrl: '',
        category: 'Plant Care',
        availability: 'Public'
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Filter user tips from all tips
    const userTips = allTips.filter(tip => tip.userEmail === user?.email);
    const error = queryError?.message;

    const handleDeleteClick = (id) => {
        setTipToDelete(id);
        setShowDeleteModal(true);
    };

    const handleUpdateClick = (tip) => {
        setTipToUpdate(tip._id);
        setUpdateFormData({
            title: tip.title,
            plantType: tip.plantType,
            difficulty: tip.difficulty,
            description: tip.description,
            imageUrl: tip.imageUrl,
            category: tip.category,
            availability: tip.availability
        });
        setPreviewImage(tip.imageUrl || null);
        setShowUpdateModal(true);
    };

    const handleCancelUpdate = () => {
        setShowUpdateModal(false);
        setTipToUpdate(null);
        setPreviewImage(null);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updateTips = Object.fromEntries(formData.entries());

        try {
            setIsUploading(true);

            await updateTipMutation.mutateAsync({
                id: tipToUpdate,
                data: updateTips
            });

            toast.success('Tip updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setShowUpdateModal(false);

            // Navigate to tips section after a short delay
            setTimeout(() => {
                navigate(`/tips/${tipToUpdate}`);
            }, 1000);
        } catch (error) {
            console.error('Error updating tip:', error);
            toast.error(`Error updating tip: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file.type.match('image.*')) {
            toast.error('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        setIsUploading(true);

        // Preview image
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload to imgBB
        const apiKey = 'd887aa1f55a982c1a6829f027d626c89';
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await uploadImageMutation.mutateAsync({
                formData,
                apiKey
            });

            const data = await response.json();

            if (data.success) {
                setUpdateFormData(prev => ({
                    ...prev,
                    imageUrl: data.data.url
                }));
            } else {
                throw new Error(data.error?.message || 'Image upload failed');
            }
        } catch (err) {
            setError(err.message);
            setPreviewImage(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleConfirmDelete = async () => {
        if (!tipToDelete) return;

        try {
            setDeleteStatus({ success: null, message: 'Deleting...' });

            await deleteTipMutation.mutateAsync(tipToDelete);

            setDeleteStatus({ success: true, message: 'Tip deleted successfully!' });
            setShowDeleteModal(false);
            setTipToDelete(null);

            // Show toast for delete success
            toast.success('Tip deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            console.error('Error deleting tip:', error);
            setDeleteStatus({ success: false, message: error.message });
            setShowDeleteModal(false);

            // Show toast for delete error
            toast.error(`Error deleting tip: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setTipToDelete(null);
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

    return (
        <div className="container mx-auto mt-[100px] px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">My Gardening Tips</h2>

            {/* Status message */}
            {deleteStatus.message && (
                <div className={`mb-4 p-4 rounded ${deleteStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {deleteStatus.message}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
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

            {/* Update Tip Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8 max-w-3xl w-full max-h-screen overflow-y-auto my-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-green-700">Update Your Garden Tip</h1>
                            <p className="mt-2 text-gray-600">Edit your gardening wisdom</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleUpdateSubmit}>
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tip Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={updateFormData.title}
                                    onChange={handleUpdateChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    required
                                />
                            </div>

                            {/* Plant Type and Difficulty */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Plant Type/Topic <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="plantType"
                                        value={updateFormData.plantType}
                                        onChange={handleUpdateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Difficulty Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={updateFormData.difficulty}
                                        onChange={handleUpdateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    value={updateFormData.description}
                                    onChange={handleUpdateChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tip Image (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition">
                                    {previewImage ? (
                                        <div className="mb-4">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="max-h-48 mx-auto rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="mt-2 text-sm text-red-600 hover:text-red-800"
                                                onClick={() => {
                                                    setPreviewImage(null);
                                                    setUpdateFormData(prev => ({ ...prev, imageUrl: '' }));
                                                }}
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <svg
                                                    className="w-12 h-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    ></path>
                                                </svg>
                                                <p className="text-sm text-gray-600">
                                                    Click to select a new image
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                id="image-upload-update"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileInput}
                                            />
                                            <label
                                                htmlFor="image-upload-update"
                                                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                                            >
                                                Select Image
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Category and Availability */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={updateFormData.category}
                                        onChange={handleUpdateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    >
                                        <option value="Plant Care">Plant Care</option>
                                        <option value="Composting">Composting</option>
                                        <option value="Vertical Gardening">Vertical Gardening</option>
                                        <option value="Container Gardening">Container Gardening</option>
                                        <option value="Indoor Gardening">Indoor Gardening</option>
                                        <option value="Pest Control">Pest Control</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Visibility <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="availability"
                                        value={updateFormData.availability}
                                        onChange={handleUpdateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    >
                                        <option value="Public">Public (Visible to everyone)</option>
                                        <option value="Hidden">Hidden (Only visible to you)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancelUpdate}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className={`px-4 py-2 text-white font-medium rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                                        isUploading
                                            ? 'bg-green-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {isUploading ? 'Uploading...' : 'Update Tip'}
                                </button>
                            </div>
                        </form>
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
                                            onClick={() => handleUpdateClick(tip)}
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

            {/* CopilotChat component for tips assistance */}
            <CopilotChat />
        </div>
    );
};