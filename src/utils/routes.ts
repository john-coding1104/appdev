export const ROUTES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
  PACKAGES: 'Packages',
  BOOK_PACKAGE: 'BookPackage',
  BOOKINGS: 'Bookings',
  PROFILE: 'Profile',
  CONTACT: 'Contact',
} as const;

export type RouteType = typeof ROUTES[keyof typeof ROUTES];

export default ROUTES;
