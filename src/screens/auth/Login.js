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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Invalid Credentials', 'Please enter your username and password.');
      return;
    }
    // Dispatched to redux — the auth saga intercepts this, calls the API, saves the token
    dispatch(loginRequest({ username, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F3F7F5' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">

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

          <CustomTextInput
            label="Username"
            placeholder="john_doe"
            onChangeText={val => setUsername(val)}
            value={username}
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
            containerStyle={{ backgroundColor: '#235A2f', borderRadius: 14, marginTop: 8, marginBottom: 20 }}
            textStyle={{ color: '#fff', fontSize: 16, fontWeight: '800' }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#5D8F75', fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
              <Text style={{ color: '#235A2f', fontWeight: '700', fontSize: 14 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
