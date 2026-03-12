import React, { useState } from 'react';
import {
  Alert, Image, KeyboardAvoidingView, Platform,
  ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { IMG, ROUTES } from '../../utils';

const Register = () => {
  const navigation = useNavigation();
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!emailAdd || !password || !confirm) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (!agreed) {
      Alert.alert('Terms Required', 'Please agree to the Terms & Conditions.');
      return;
    }
    setLoading(true);
    // Simulate Symfony /register API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Account Created! 🎉', 'You can now sign in.', [
        { text: 'Sign In', onPress: () => navigation.navigate(ROUTES.LOGIN) },
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={{ alignItems: 'center', marginVertical: 28 }}>
          <View style={{ width: 68, height: 68, borderRadius: 34, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Image source={{ uri: IMG.LOGO }} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </View>
          <Text style={{ fontSize: 22, fontWeight: '900', color: '#1E0A3C' }}>CaterEase</Text>
        </View>

        {/* Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 6 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#1E0A3C', marginBottom: 4 }}>Create Account</Text>
          <Text style={{ fontSize: 13, color: '#9E8FBF', marginBottom: 24 }}>Join us and start booking your event</Text>

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
            placeholder="Create a password"
            onChangeText={val => setPassword(val)}
            value={password}
            secureTextEntry
          />

          <CustomTextInput
            label="Confirm Password"
            placeholder="Repeat your password"
            onChangeText={val => setConfirm(val)}
            value={confirm}
            secureTextEntry
          />

          {/* Terms checkbox */}
          <TouchableOpacity
            onPress={() => setAgreed(!agreed)}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{
              width: 22, height: 22, borderRadius: 6, borderWidth: 2,
              borderColor: agreed ? '#7C3AED' : '#C4B5FD',
              backgroundColor: agreed ? '#7C3AED' : 'transparent',
              alignItems: 'center', justifyContent: 'center', marginRight: 10,
            }}>
              {agreed && <Text style={{ color: '#fff', fontSize: 13, fontWeight: '800' }}>✓</Text>}
            </View>
            <Text style={{ fontSize: 13, color: '#4B3F6B', flex: 1 }}>I agree to the Terms & Conditions</Text>
          </TouchableOpacity>

          <CustomButton
            label="Create Account"
            onPress={handleRegister}
            loading={loading}
            containerStyle={{ backgroundColor: '#7C3AED', borderRadius: 14, marginBottom: 20 }}
            textStyle={{ color: '#fff', fontSize: 16, fontWeight: '800' }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#9E8FBF', fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={{ color: '#7C3AED', fontWeight: '700', fontSize: 14 }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
