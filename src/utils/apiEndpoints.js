/**
 * Pre-configured API endpoints for your Symfony backend
 * Import and use these throughout your app
 */

import { apiClient } from '../api/apiClient';

// Authentication endpoints
export const authAPI = {
  // Login already handled in saga, but here's the structure
  login: (username, password) =>
    apiClient.post('/api/login', { username, password }),

  logout: () =>
    apiClient.post('/api/logout', {}),

  // Refresh token if needed
  refreshToken: () =>
    apiClient.post('/api/refresh-token', {}),
};

// Bookings endpoints
export const bookingsAPI = {
  // Get all bookings for logged-in user
  getAll: () =>
    apiClient.get('/api/bookings'),

  // Get specific booking
  getOne: (bookingId) =>
    apiClient.get(`/api/bookings/${bookingId}`),

  // Create new booking
  create: (bookingData) =>
    apiClient.post('/api/bookings', bookingData),

  // Update booking
  update: (bookingId, bookingData) =>
    apiClient.put(`/api/bookings/${bookingId}`, bookingData),

  // Delete booking
  delete: (bookingId) =>
    apiClient.delete(`/api/bookings/${bookingId}`),
};

// Packages endpoints
export const packagesAPI = {
  // Get all packages
  getAll: () =>
    apiClient.get('/api/packages'),

  // Get specific package
  getOne: (packageId) =>
    apiClient.get(`/api/packages/${packageId}`),

  // Search packages
  search: (query) =>
    apiClient.get(`/api/packages/search?q=${query}`),
};

// User profile endpoints
export const userAPI = {
  // Get current user profile
  getProfile: () =>
    apiClient.get('/api/user/profile'),

  // Update user profile
  updateProfile: (profileData) =>
    apiClient.put('/api/user/profile', profileData),

  // Change password
  changePassword: (oldPassword, newPassword) =>
    apiClient.post('/api/user/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    }),
};

// Contact endpoints
export const contactAPI = {
  // Submit contact form
  submitForm: (contactData) =>
    apiClient.post('/api/contact', contactData),

  // Get contact info
  getContactInfo: () =>
    apiClient.get('/api/contact-info'),
};

/**
 * Example Usage in components:
 * 
 * import { bookingsAPI } from '../../utils/apiEndpoints';
 * 
 * const BookingsScreen = () => {
 *   const [bookings, setBookings] = useState([]);
 *   
 *   useEffect(() => {
 *     const fetchBookings = async () => {
 *       try {
 *         const data = await bookingsAPI.getAll();
 *         setBookings(data.bookings);
 *       } catch (error) {
 *         Alert.alert('Error', error.message);
 *       }
 *     };
 *     fetchBookings();
 *   }, []);
 * };
 */
