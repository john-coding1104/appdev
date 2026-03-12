import React, { useState } from 'react';
import {
  Alert, Image, KeyboardAvoidingView, Platform,
  ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { IMG, ROUTES } from '../../utils';
import { loginRequest } from '../../redux/authSlice';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (emailAdd === '' || password === '') {
      Alert.alert('Invalid Credentials', 'Please enter your email address and password.');
      return;
    }
    // Dispatched to redux — the auth saga intercepts this, calls the API, saves the token
    dispatch(loginRequest({ email: emailAdd, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: 36 }}>
          <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center', marginBottom: 14, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 10 }}>
            <Image source={{ uri: IMG.LOGO }} style={{ width: 50, height: 50 }} resizeMode="contain" />
          </View>
          <Text style={{ fontSize: 28, fontWeight: '900', color: '#1E0A3C', letterSpacing: -0.5 }}>CaterEase</Text>
          <Text style={{ fontSize: 13, color: '#9E8FBF', marginTop: 4 }}>Premium Catering Services</Text>
        </View>

        {/* Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 6 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#1E0A3C', marginBottom: 4 }}>Welcome Back</Text>
          <Text style={{ fontSize: 13, color: '#9E8FBF', marginBottom: 24 }}>Sign in to manage your bookings</Text>

          <CustomTextInput
            label="Email Address"
            placeholder="you@email.com"
            onChangeText={val => setEmailAdd(val)}
            value={emailAdd}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            label="Password"
            placeholder="••••••••"
            onChangeText={val => setPassword(val)}
            value={password}
            secureTextEntry
          />

          <CustomButton
            label="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            containerStyle={{ backgroundColor: '#7C3AED', borderRadius: 14, marginTop: 8, marginBottom: 20 }}
            textStyle={{ color: '#fff', fontSize: 16, fontWeight: '800' }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#9E8FBF', fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
              <Text style={{ color: '#7C3AED', fontWeight: '700', fontSize: 14 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
