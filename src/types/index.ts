/**
 * Type definitions for the entire application
 */

// ==================== USER & AUTH TYPES ====================

export interface User {
  id?: string | number;
  username: string;
  email?: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  username: string;
}

// ==================== BOOKING TYPES ====================

export interface Booking {
  id: string;
  packageId: number;
  packageName: string;
  price: number;
  eventDate: string;
  venue: string;
  guestCount: string;
  notes?: string;
  customerUsername?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

// ==================== PACKAGE TYPES ====================

export interface Package {
  id: number;
  name: string;
  price: number;
  details: string;
  emoji: string;
  color: string;
  accent: string;
  image: string;
  description: string;
  includes: string[];
}

// ==================== API TYPES ====================

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export interface ApiError {
  message: string;
  status?: number;
}

// ==================== NAVIGATION TYPES ====================

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Packages: undefined;
  BookPackage: { package: Package };
  Bookings: undefined;
  Profile: undefined;
  Contact: undefined;
  TokenDebug: undefined;
};

// ==================== COMPONENT PROP TYPES ====================

import { ViewStyle, TextStyle } from 'react-native';

export interface CustomButtonProps {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

export interface CustomTextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

export interface PackageCardProps {
  pkg: Package;
  onBook: () => void;
  onToggle: () => void;
  expanded: boolean;
}

// ==================== REDUX STATE TYPES ====================

export interface RootState {
  auth: AuthState;
  booking: BookingState;
}

// ==================== TOKEN TYPES ====================

export interface DecodedToken {
  exp?: number;
  iat?: number;
  username?: string;
  sub?: string;
  [key: string]: unknown;
}

// ==================== ROUTES ====================

export enum ROUTES {
  LOGIN = 'Login',
  REGISTER = 'Register',
  HOME = 'Home',
  PACKAGES = 'Packages',
  BOOK_PACKAGE = 'BookPackage',
  BOOKINGS = 'Bookings',
  PROFILE = 'Profile',
  CONTACT = 'Contact',
}

// ==================== IMAGES ====================

export interface ImageSet {
  LOGO: string;
  BANNER: string;
  WEDDING: string;
  CORPORATE: string;
  BIRTHDAY: string;
  CASUAL: string;
}
