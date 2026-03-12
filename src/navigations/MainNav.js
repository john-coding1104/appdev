import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';

import HomeScreen from '../screens/HomeScreen';
import PackagesScreen from '../screens/PackagesScreen';
import BookPackageScreen from '../screens/BookPackageScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactScreen from '../screens/ContactScreen';

const Stack = createStackNavigator();

const HEADER_STYLE = {
  headerStyle: { backgroundColor: '#7C3AED' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '800' },
};

const MainNav = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.PACKAGES} component={PackagesScreen} options={{ ...HEADER_STYLE, title: 'Our Packages' }} />
      <Stack.Screen name={ROUTES.BOOK_PACKAGE} component={BookPackageScreen} options={{ ...HEADER_STYLE, title: 'Book Package' }} />
      <Stack.Screen name={ROUTES.BOOKINGS} component={BookingsScreen} options={{ ...HEADER_STYLE, title: 'My Bookings' }} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ ...HEADER_STYLE, title: 'My Profile' }} />
      <Stack.Screen name={ROUTES.CONTACT} component={ContactScreen} options={{ ...HEADER_STYLE, title: 'Contact Us' }} />
    </Stack.Navigator>
  );
};

export default MainNav;
