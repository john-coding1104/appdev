import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { apiClient } from '../../utils/apiClient';
import { decodeToken } from '../../utils/tokenStorage';

/**
 * Example component showing token usage and debugging
 * Delete this file when no longer needed
 */
const TokenDebugScreen = () => {
  const { token, user, isLoggedIn } = useSelector(state => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings using authenticated API call
  const fetchBookings = async () => {
    try {
      setLoading(true);
      console.log('📚 Fetching bookings with token...');
      
      const data = await apiClient.get('/api/bookings');
      setBookings(data.bookings || []);
      
      Alert.alert('Success', 'Bookings fetched successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Display token info
  const tokenPayload = token ? decodeToken(token) : null;

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
        🔐 Token Debug Info
      </Text>

      {/* Login Status */}
      <View style={{ marginBottom: 20, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <Text style={{ fontWeight: '600', marginBottom: 8 }}>Login Status</Text>
        <Text>Is Logged In: {isLoggedIn ? '✅ Yes' : '❌ No'}</Text>
        <Text>User Username: {user?.username || 'N/A'}</Text>
        <Text>User ID: {user?.id || 'N/A'}</Text>
      </View>

      {/* Token Info */}
      {token && (
        <View style={{ marginBottom: 20, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>Token Info</Text>
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            Length: {token.length} characters
          </Text>
          <Text style={{ fontSize: 11, fontFamily: 'monospace', color: '#333' }}>
            {token.substring(0, 50)}...
          </Text>
        </View>
      )}

      {/* Token Payload */}
      {tokenPayload && (
        <View style={{ marginBottom: 20, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>Token Payload (Decoded)</Text>
          <Text style={{ fontSize: 12 }}>
            {JSON.stringify(tokenPayload, null, 2)}
          </Text>
          {tokenPayload.exp && (
            <Text style={{ fontSize: 12, marginTop: 8, color: '#666' }}>
              Expires: {new Date(tokenPayload.exp * 1000).toLocaleString()}
            </Text>
          )}
        </View>
      )}

      {/* Test API Call */}
      <View style={{ marginBottom: 20 }}>
        <Text 
          style={{ 
            padding: 12, 
            backgroundColor: '#235A2f', 
            color: '#fff', 
            borderRadius: 8,
            textAlign: 'center',
            fontWeight: '600'
          }}
          onPress={fetchBookings}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Test API Call (Fetch Bookings)'}
        </Text>
        <Text style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          ℹ️ This will make an authenticated API call. Check console logs to see token being sent.
        </Text>
      </View>

      {/* Bookings List */}
      {bookings.length > 0 && (
        <View style={{ marginBottom: 20, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>Bookings ({bookings.length})</Text>
          {bookings.map((booking, index) => (
            <Text key={index} style={{ fontSize: 12, marginBottom: 4 }}>
              • {booking.id} - {booking.status}
            </Text>
          ))}
        </View>
      )}

      {/* Console Instructions */}
      <View style={{ marginBottom: 20, padding: 12, backgroundColor: '#fff3cd', borderRadius: 8 }}>
        <Text style={{ fontWeight: '600', marginBottom: 8 }}>📋 Console Logs</Text>
        <Text style={{ fontSize: 12 }}>
          {`Open DevTools to see detailed logs:\n\n`}
          {`1. Press 'D' in terminal running Metro\n`}
          {`2. Select 'Debug in Chrome'\n`}
          {`3. Open Chrome DevTools (F12)\n`}
          {`4. Open Console tab\n`}
          {`5. Look for logs with 🔐 🌐 📨 ✅ symbols`}
        </Text>
      </View>
    </ScrollView>
  );
};

export default TokenDebugScreen;
