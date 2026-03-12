import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../components/CustomButton';
import { IMG, ROUTES } from '../utils';
import { logout } from '../redux/authSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const bookings = useSelector(state => state.booking.bookings);

  const MENU = [
    { icon: '📅', label: 'My Bookings', route: ROUTES.BOOKINGS },
    { icon: '📋', label: 'Browse Packages', route: ROUTES.PACKAGES },
    { icon: '📞', label: 'Contact Us', route: ROUTES.CONTACT },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Avatar Header */}
        <View style={{ backgroundColor: '#7C3AED', alignItems: 'center', paddingVertical: 32 }}>
          <Image source={{ uri: IMG.LOGO }} style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)', marginBottom: 12 }} resizeMode="contain" />
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 4 }}>{user?.email}</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Customer Account</Text>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0EEFF', marginBottom: 12 }}>
          {[
            { label: 'Bookings', value: bookings.length },
            { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'Confirmed').length },
          ].map(s => (
            <View key={s.label} style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: '900', color: '#7C3AED' }}>{s.value}</Text>
              <Text style={{ fontSize: 12, color: '#9E8FBF', marginTop: 2 }}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        {MENU.map(item => (
          <TouchableOpacity
            key={item.label}
            onPress={() => navigation.navigate(item.route)}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F8F4FF' }}>
            <Text style={{ fontSize: 22, marginRight: 14 }}>{item.icon}</Text>
            <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: '#1E0A3C' }}>{item.label}</Text>
            <Text style={{ fontSize: 20, color: '#C4B5FD' }}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ margin: 20 }}>
          <CustomButton
            label="Log Out"
            onPress={() => dispatch(logout())}
            containerStyle={{ backgroundColor: '#FEF2F2', borderRadius: 14 }}
            textStyle={{ color: '#EF4444', fontSize: 15, fontWeight: '700' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
