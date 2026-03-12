import React from 'react';
import { Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CONTACTS = [
  { icon: '📧', label: 'Email', value: 'info@caterease.ph', onPress: () => Linking.openURL('mailto:info@caterease.ph') },
  { icon: '📱', label: 'Phone', value: '+63 912 345 6789', onPress: () => Linking.openURL('tel:+639123456789') },
  { icon: '📍', label: 'Address', value: 'Cebu City, Philippines', onPress: null },
  { icon: '🕐', label: 'Business Hours', value: 'Mon–Sat, 8AM – 6PM', onPress: null },
];

const ContactScreen = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 28 }}>
        <Text style={{ fontSize: 56, marginBottom: 12 }}>📞</Text>
        <Text style={{ fontSize: 22, fontWeight: '900', color: '#1E0A3C', marginBottom: 8 }}>Get In Touch</Text>
        <Text style={{ fontSize: 14, color: '#9E8FBF', textAlign: 'center', lineHeight: 20 }}>
          We'd love to hear from you and help plan your perfect event.
        </Text>
      </View>

      {CONTACTS.map(c => (
        <TouchableOpacity
          key={c.label}
          onPress={c.onPress}
          disabled={!c.onPress}
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
          <Text style={{ fontSize: 28, marginRight: 14 }}>{c.icon}</Text>
          <View>
            <Text style={{ fontSize: 12, color: '#9E8FBF', marginBottom: 2 }}>{c.label}</Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: c.onPress ? '#7C3AED' : '#1E0A3C' }}>{c.value}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default ContactScreen;
