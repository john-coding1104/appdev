import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../components/CustomButton';
import { IMG, ROUTES } from '../utils';
import { logout } from '../redux/authSlice';

const QUICK_LINKS = [
  { icon: '📋', label: 'View Packages', route: ROUTES.PACKAGES },
  { icon: '📅', label: 'My Bookings', route: ROUTES.BOOKINGS },
  { icon: '👤', label: 'My Profile', route: ROUTES.PROFILE },
  { icon: '📞', label: 'Contact Us', route: ROUTES.CONTACT },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const bookings = useSelector(state => state.booking.bookings);
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={{ backgroundColor: '#7C3AED', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>
                Hello, {user?.email?.split('@')[0]} 👋
              </Text>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                Ready to plan your next event?
              </Text>
            </View>
            <CustomButton
              label="Logout"
              onPress={() => dispatch(logout())}
              containerStyle={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 4 }}
              textStyle={{ color: '#fff', fontSize: 13, fontWeight: '600' }}
            />
          </View>
        </View>

        {/* Banner */}
        <View style={{ marginHorizontal: 16, marginTop: -12, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
          <Image source={{ uri: IMG.BANNER }} style={{ width: '100%', height: 160 }} resizeMode="cover" />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(109,40,217,0.6)', padding: 18, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20, fontWeight: '900', color: '#fff', marginBottom: 4 }}>Premium Catering</Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>Weddings · Birthdays · Corporate · Events</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.PACKAGES)}
              style={{ backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 }}>
              <Text style={{ color: '#7C3AED', fontWeight: '800', fontSize: 13 }}>Explore Packages →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats - only show if bookings exist */}
        {bookings.length > 0 && (
          <View style={{ flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 24 }}>
            {[
              { label: 'Total', value: bookings.length, bg: '#EDE9FE', color: '#7C3AED' },
              { label: 'Pending', value: pending, bg: '#FFF7ED', color: '#F59E0B' },
              { label: 'Confirmed', value: confirmed, bg: '#F0FDF4', color: '#22C55E' },
            ].map(s => (
              <View key={s.label} style={{ flex: 1, backgroundColor: s.bg, borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '900', color: s.color }}>{s.value}</Text>
                <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Quick Access */}
        <Text style={{ fontSize: 17, fontWeight: '800', color: '#1E0A3C', paddingHorizontal: 16, marginBottom: 12 }}>Quick Access</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, marginBottom: 24 }}>
          {QUICK_LINKS.map(item => (
            <TouchableOpacity
              key={item.label}
              onPress={() => navigation.navigate(item.route)}
              style={{ width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 18, alignItems: 'center', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3 }}>
              <Text style={{ fontSize: 30, marginBottom: 8 }}>{item.icon}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E0A3C', textAlign: 'center' }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent booking */}
        {bookings.length > 0 && (
          <>
            <Text style={{ fontSize: 17, fontWeight: '800', color: '#1E0A3C', paddingHorizontal: 16, marginBottom: 12 }}>Recent Booking</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.BOOKINGS)}
              style={{ marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3, marginBottom: 30 }}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1E0A3C', marginBottom: 4 }}>{bookings[0].packageName}</Text>
                <Text style={{ fontSize: 13, color: '#9E8FBF' }}>📅 {bookings[0].eventDate}</Text>
              </View>
              <View style={{ backgroundColor: bookings[0].status === 'Pending' ? '#FFF7ED' : '#F0FDF4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: bookings[0].status === 'Pending' ? '#F59E0B' : '#22C55E' }}>{bookings[0].status}</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
