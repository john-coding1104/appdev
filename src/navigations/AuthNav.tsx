import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNav = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{
          title: 'Create Account',
          headerStyle: { backgroundColor: '#235A2f' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '800' as const },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNav;
