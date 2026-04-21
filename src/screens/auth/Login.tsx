import React, { useState, useEffect } from 'react';
import {
  Alert, Image, KeyboardAvoidingView, Platform,
  ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { IMG, ROUTES } from '../../utils';
import { loginRequest } from '../../redux/authSlice';
import { RootStackParamList, RootState } from '../../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
    }
  }, [error]);

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Invalid Credentials', 'Please enter your username and password.');
      return;
    }
    dispatch(loginRequest({ username, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F3F7F5' }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }} 
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: 36 }}>
          <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: '#235A2f', alignItems: 'center', justifyContent: 'center', marginBottom: 14, shadowColor: '#235A2f', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 10 }}>
            <Image source={{ uri: IMG.LOGO }} style={{ width: 50, height: 50 }} resizeMode="contain" />
          </View>
          <Text style={{ fontSize: 28, fontWeight: '900', color: '#1E1E1E', letterSpacing: -0.5 }}>EveryEvent</Text>
          <Text style={{ fontSize: 13, color: '#5D8F75', marginTop: 4 }}>Premium Catering Services</Text>
        </View>

        {/* Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#235A2f', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 6 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#1E1E1E', marginBottom: 4 }}>Welcome Back</Text>
          <Text style={{ fontSize: 13, color: '#5D8F75', marginBottom: 24 }}>Sign in to manage your bookings</Text>

          <View style={{ opacity: isLoading ? 0.6 : 1 }}>
            <CustomTextInput
              label="Username"
              placeholder="Enter your username"
              onChangeText={(val: string) => setUsername(val)}
              value={username}
              autoCapitalize="none"
            />

            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              onChangeText={(val: string) => setPassword(val)}
              value={password}
              secureTextEntry
            />
          </View>

          <CustomButton
            label="Sign In"
            onPress={handleLogin}
            // loading={isLoading}
            // disabled={isLoading} // Ensures double-taps do nothing
            containerStyle={{ backgroundColor: '#235A2f', borderRadius: 14, marginTop: 8, marginBottom: 20 }}
            textStyle={{ color: '#fff', fontSize: 16, fontWeight: '800' }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', opacity: isLoading ? 0.6 : 1 }}>
            <Text style={{ color: '#5D8F75', fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate(ROUTES.REGISTER)}
              disabled={isLoading} // Prevents navigating away during an active request
            >
              <Text style={{ color: '#235A2f', fontWeight: '700', fontSize: 14 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;