import React from 'react';
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../components/CustomButton';
import { ROUTES } from '../utils';
import { cancelBooking } from '../redux/bookingSlice';

const STATUS = {
  Pending:   { bg: '#FFF7ED', color: '#F59E0B' },
  Confirmed: { bg: '#F0FDF4', color: '#22C55E' },
  Cancelled: { bg: '#FEF2F2', color: '#EF4444' },
};

const BookingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.booking.bookings);

  const handleCancel = (id, name) => {
    Alert.alert('Cancel Booking', `Cancel your ${name} booking?`, [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, Cancel', style: 'destructive', onPress: () => dispatch(cancelBooking(id)) },
    ]);
  };

  if (bookings.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <Text style={{ fontSize: 64, marginBottom: 16 }}>📋</Text>
        <Text style={{ fontSize: 22, fontWeight: '800', color: '#1E0A3C', marginBottom: 8 }}>No Bookings Yet</Text>
        <Text style={{ fontSize: 14, color: '#9E8FBF', marginBottom: 24 }}>Start by browsing our packages</Text>
        <CustomButton
          label="Browse Packages"
          onPress={() => navigation.navigate(ROUTES.PACKAGES)}
          containerStyle={{ backgroundColor: '#7C3AED', borderRadius: 14, paddingHorizontal: 16 }}
          textStyle={{ color: '#fff', fontSize: 15, fontWeight: '700' }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ListHeaderComponent={
          <Text style={{ fontSize: 13, color: '#9E8FBF', marginBottom: 12 }}>
            {bookings.length} booking{bookings.length > 1 ? 's' : ''} found
          </Text>
        }
        renderItem={({ item }) => {
          const s = STATUS[item.status] || STATUS.Pending;
          return (
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3 }}>
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#1E0A3C', marginBottom: 6 }}>{item.packageName}</Text>
                  {[
                    { icon: '📅', val: item.eventDate },
                    { icon: '📍', val: item.venue },
                    { icon: '👥', val: `${item.guestCount} pax` },
                  ].map(r => (
                    <Text key={r.icon} style={{ fontSize: 13, color: '#6B7280', marginBottom: 3 }}>{r.icon} {r.val}</Text>
                  ))}
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <View style={{ backgroundColor: s.bg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: s.color }}>{item.status}</Text>
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: '#7C3AED' }}>₱{item.price.toLocaleString()}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F5F3FF', paddingTop: 10 }}>
                <Text style={{ fontSize: 12, color: '#9E8FBF' }}>Booked on {item.createdAt}</Text>
                {item.status === 'Pending' && (
                  <CustomButton
                    label="Cancel"
                    onPress={() => handleCancel(item.id, item.packageName)}
                    containerStyle={{ backgroundColor: '#FEF2F2', borderRadius: 20, paddingHorizontal: 8 }}
                    textStyle={{ fontSize: 12, fontWeight: '700', color: '#EF4444' }}
                  />
                )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;
