import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

import AuthNav from './AuthNav';
import MainNav from './MainNav';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor('#7C3AED');
    }
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
