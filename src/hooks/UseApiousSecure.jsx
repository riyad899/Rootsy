import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints configuration
const API_ENDPOINTS = {
  BACKEND_BASE: 'https://backend-test-blush.vercel.app',
  LOCAL_BASE: 'https://myserver-coral.vercel.app',
  IMGBB_BASE: 'https://api.imgbb.com/1',
};

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Tips endpoints
  getTips: () => apiClient.get(`${API_ENDPOINTS.BACKEND_BASE}/tips`),
  getTipById: (id) => apiClient.get(`${API_ENDPOINTS.BACKEND_BASE}/tips/${id}`),
  createTip: (tipData) => apiClient.post(`${API_ENDPOINTS.BACKEND_BASE}/tips`, tipData),
  updateTip: (id, tipData) => apiClient.put(`${API_ENDPOINTS.BACKEND_BASE}/tips/${id}`, tipData),
  deleteTip: (id) => apiClient.delete(`${API_ENDPOINTS.BACKEND_BASE}/tips/${id}`),

  // Users endpoints
  getUsers: () => apiClient.get(`${API_ENDPOINTS.BACKEND_BASE}/users`),
  getUserById: (id) => apiClient.get(`${API_ENDPOINTS.BACKEND_BASE}/users/${id}`),
  createUser: (userData) => apiClient.post(`${API_ENDPOINTS.BACKEND_BASE}/users`, userData),
  updateUser: (id, userData) => apiClient.put(`${API_ENDPOINTS.BACKEND_BASE}/users/${id}`, userData),

  // Alternative API user endpoints
  createApiUser: (userData) => apiClient.post(`${API_ENDPOINTS.BACKEND_BASE}/api/users`, userData),

  // Plants endpoints
  getPlants: () => apiClient.get(`${API_ENDPOINTS.BACKEND_BASE}/plants`),
  getPlantById: (id) => apiClient.get(`${API_ENDPOINTS.BACKEND_BASE}/plants/${id}`),

  // Local endpoints (for likes and other local operations)
  getLikes: () => apiClient.get(`${API_ENDPOINTS.LOCAL_BASE}/like`),
  createLike: (likeData) => apiClient.post(`${API_ENDPOINTS.LOCAL_BASE}/like`, likeData),
  updateLike: (likeData) => apiClient.put(`${API_ENDPOINTS.LOCAL_BASE}/like`, likeData),

  // Local tips (alternative endpoint)
  getLocalTips: () => apiClient.get(`${API_ENDPOINTS.LOCAL_BASE}/tips`),

  // Image upload to ImgBB
  uploadImage: (formData, apiKey) =>
    apiClient.post(`${API_ENDPOINTS.IMGBB_BASE}/upload?key=${apiKey}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

// Custom hooks using TanStack Query
export const UseApiousSecure = {
  // Tips hooks
  useTips: (options = {}) => {
    return useQuery({
      queryKey: ['tips'],
      queryFn: () => apiService.getTips().then(res => res.data),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      ...options,
    });
  },

  useTipById: (id, options = {}) => {
    return useQuery({
      queryKey: ['tip', id],
      queryFn: () => apiService.getTipById(id).then(res => res.data),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      ...options,
    });
  },

  useCreateTip: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiService.createTip,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tips'] });
      },
      ...options,
    });
  },

  useUpdateTip: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => apiService.updateTip(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['tips'] });
        queryClient.invalidateQueries({ queryKey: ['tip', id] });
      },
      ...options,
    });
  },

  useDeleteTip: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiService.deleteTip,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tips'] });
      },
      ...options,
    });
  },

  // Users hooks
  useUsers: (options = {}) => {
    return useQuery({
      queryKey: ['users'],
      queryFn: () => apiService.getUsers().then(res => res.data),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      ...options,
    });
  },

  useUserById: (id, options = {}) => {
    return useQuery({
      queryKey: ['user', id],
      queryFn: () => apiService.getUserById(id).then(res => res.data),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      ...options,
    });
  },

  useCreateUser: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiService.createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      ...options,
    });
  },

  useCreateApiUser: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiService.createApiUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      ...options,
    });
  },

  // Plants hooks
  usePlants: (options = {}) => {
    return useQuery({
      queryKey: ['plants'],
      queryFn: () => apiService.getPlants().then(res => res.data),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      ...options,
    });
  },

  usePlantById: (id, options = {}) => {
    return useQuery({
      queryKey: ['plant', id],
      queryFn: () => apiService.getPlantById(id).then(res => res.data),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      ...options,
    });
  },

  // Likes hooks
  useLikes: (options = {}) => {
    return useQuery({
      queryKey: ['likes'],
      queryFn: () => apiService.getLikes().then(res => res.data),
      staleTime: 2 * 60 * 1000, // 2 minutes for more dynamic data
      cacheTime: 5 * 60 * 1000,
      ...options,
    });
  },

  useCreateLike: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiService.createLike,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['likes'] });
      },
      ...options,
    });
  },

  useUpdateLike: (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiService.updateLike,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['likes'] });
      },
      ...options,
    });
  },

  // Image upload hook
  useUploadImage: (options = {}) => {
    return useMutation({
      mutationFn: ({ formData, apiKey }) => apiService.uploadImage(formData, apiKey),
      ...options,
    });
  },

  // Combined hooks for multiple data sources
  useTipsAndUsers: (options = {}) => {
    const tipsQuery = useQuery({
      queryKey: ['tips'],
      queryFn: () => apiService.getTips().then(res => res.data),
      staleTime: 5 * 60 * 1000,
      ...options,
    });

    const usersQuery = useQuery({
      queryKey: ['users'],
      queryFn: () => apiService.getUsers().then(res => res.data),
      staleTime: 5 * 60 * 1000,
      ...options,
    });

    return {
      tips: tipsQuery,
      users: usersQuery,
      isLoading: tipsQuery.isLoading || usersQuery.isLoading,
      isError: tipsQuery.isError || usersQuery.isError,
      error: tipsQuery.error || usersQuery.error,
    };
  },

  useTipsUsersAndLikes: (options = {}) => {
    const tipsQuery = useQuery({
      queryKey: ['tips'],
      queryFn: () => apiService.getLocalTips().then(res => res.data),
      staleTime: 5 * 60 * 1000,
      ...options,
    });

    const usersQuery = useQuery({
      queryKey: ['users'],
      queryFn: () => apiService.getUsers().then(res => res.data),
      staleTime: 5 * 60 * 1000,
      ...options,
    });

    const likesQuery = useQuery({
      queryKey: ['likes'],
      queryFn: () => apiService.getLikes().then(res => res.data),
      staleTime: 2 * 60 * 1000,
      ...options,
    });

    return {
      tips: tipsQuery,
      users: usersQuery,
      likes: likesQuery,
      isLoading: tipsQuery.isLoading || usersQuery.isLoading || likesQuery.isLoading,
      isError: tipsQuery.isError || usersQuery.isError || likesQuery.isError,
      error: tipsQuery.error || usersQuery.error || likesQuery.error,
    };
  },
};

// Export the axios instance for direct use if needed
export { apiClient };
