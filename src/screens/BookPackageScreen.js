import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform,
  ScrollView, Text, View, SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { ROUTES } from '../utils';
import { addBooking } from '../redux/bookingSlice';

const BookPackageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { package: pkg } = route.params;

  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [guestCount, setGuestCount] = useState('100');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    if (!eventDate || !venue) {
      Alert.alert('Missing Info', 'Please provide the event date and venue.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(addBooking({
        packageId: pkg.id,
        packageName: pkg.name,
        price: pkg.price,
        eventDate,
        venue,
        guestCount,
        notes,
        customerEmail: user?.email,
      }));
      Alert.alert(
        'Booking Submitted! 🎉',
        `Your ${pkg.name} has been submitted. We'll contact you at ${user?.email} within 24 hours.`,
        [{ text: 'View My Bookings', onPress: () => navigation.navigate(ROUTES.BOOKINGS) }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Package Summary */}
          <View style={{ backgroundColor: pkg.color, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>{pkg.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#1E0A3C', marginBottom: 2 }}>{pkg.name}</Text>
              <Text style={{ fontSize: 12, color: '#9E8FBF' }}>{pkg.details}</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '900', color: pkg.accent }}>₱{pkg.price.toLocaleString()}</Text>
          </View>

          {/* Form */}
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 }}>
            <Text style={{ fontSize: 17, fontWeight: '800', color: '#1E0A3C', marginBottom: 18 }}>Event Details</Text>

            <CustomTextInput
              label="Event Date *"
              placeholder="e.g. December 25, 2025"
              onChangeText={setEventDate}
              value={eventDate}
            />
            <CustomTextInput
              label="Venue / Location *"
              placeholder="e.g. Cebu City, Grand Ballroom"
              onChangeText={setVenue}
              value={venue}
            />
            <CustomTextInput
              label="Number of Guests"
              placeholder="100"
              onChangeText={setGuestCount}
              value={guestCount}
              keyboardType="numeric"
            />
            <CustomTextInput
              label="Special Requests / Notes"
              placeholder="Dietary requirements, special setup..."
              onChangeText={setNotes}
              value={notes}
              multiline
              numberOfLines={4}
            />

            {/* Price summary */}
            <View style={{ backgroundColor: '#F8F4FF', borderRadius: 14, padding: 16, marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1E0A3C', marginBottom: 12 }}>Price Summary</Text>
              {[
                { label: pkg.name, value: `₱${pkg.price.toLocaleString()}` },
                { label: 'Estimated Guests', value: `${guestCount} pax` },
              ].map(row => (
                <View key={row.label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontSize: 13, color: '#9E8FBF' }}>{row.label}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#1E0A3C' }}>{row.value}</Text>
                </View>
              ))}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#EDE8FF', paddingTop: 10, marginTop: 4 }}>
                <Text style={{ fontSize: 15, fontWeight: '800', color: '#1E0A3C' }}>Total</Text>
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#7C3AED' }}>₱{pkg.price.toLocaleString()}</Text>
              </View>
            </View>

            <CustomButton
              label="✓  Confirm Booking"
              onPress={handleBook}
              loading={loading}
              containerStyle={{ backgroundColor: '#7C3AED', borderRadius: 14, marginBottom: 12 }}
              textStyle={{ color: '#fff', fontSize: 16, fontWeight: '800' }}
            />

            <Text style={{ fontSize: 12, color: '#9E8FBF', textAlign: 'center', lineHeight: 18 }}>
              * Our team will contact you within 24 hours to confirm your booking.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BookPackageScreen;
