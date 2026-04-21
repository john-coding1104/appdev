/**
 * Pre-configured API endpoints for your Symfony backend
 * Import and use these throughout your app
 */

import { apiClient } from '../api/apiClient';
import { Booking, Package } from '../types';

// Authentication endpoints
export const authAPI = {
  // Login already handled in saga, but here's the structure
  login: (username: string, password: string) =>
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
    apiClient.get('/api/bookings') as Promise<{ bookings: Booking[] }>,

  // Get specific booking
  getOne: (bookingId: string) =>
    apiClient.get(`/api/bookings/${bookingId}`) as Promise<Booking>,

  // Create new booking
  create: (bookingData: Partial<Booking>) =>
    apiClient.post('/api/bookings', bookingData as Record<string, unknown>),

  // Update booking
  update: (bookingId: string, bookingData: Partial<Booking>) =>
    apiClient.put(`/api/bookings/${bookingId}`, bookingData as Record<string, unknown>),

  // Delete booking
  delete: (bookingId: string) =>
    apiClient.delete(`/api/bookings/${bookingId}`),
};

// Packages endpoints
export const packagesAPI = {
  // Get all packages
  getAll: () =>
    apiClient.get('/api/packages') as Promise<{ packages: Package[] }>,

  // Get specific package
  getOne: (packageId: string | number) =>
    apiClient.get(`/api/packages/${packageId}`) as Promise<Package>,

  // Search packages
  search: (query: string) =>
    apiClient.get(`/api/packages/search?q=${query}`) as Promise<{ packages: Package[] }>,
};

// User profile endpoints
export const userAPI = {
  // Get current user profile
  getProfile: () =>
    apiClient.get('/api/user/profile') as Promise<{ user: unknown }>,

  // Update user profile
  updateProfile: (profileData: Record<string, unknown>) =>
    apiClient.put('/api/user/profile', profileData),

  // Change password
  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/api/user/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    }),
};

// Contact endpoints
export const contactAPI = {
  // Submit contact form
  submitForm: (contactData: Record<string, unknown>) =>
    apiClient.post('/api/contact', contactData),

  // Get contact info
  getContactInfo: () =>
    apiClient.get('/api/contact-info') as Promise<Record<string, unknown>>,
};

/**
 * Example Usage in components:
 *
 * import { bookingsAPI } from '../../utils/apiEndpoints';
 *
 * const BookingsScreen = () => {
 *   const [bookings, setBookings] = useState<Booking[]>([]);
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
