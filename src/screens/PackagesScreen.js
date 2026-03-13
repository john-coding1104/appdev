import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PackageCard from '../components/PackageCard';
import { IMG, ROUTES } from '../utils';

// Mirrors Symfony PackagesController data
const PACKAGES = [
  {
    id: 1,
    name: 'Wedding Package',
    price: 80000,
    details: 'Good for 100 pax',
    emoji: '💍',
    color: '#F5F3FF',
    accent: '#235A2f',
    image: IMG.WEDDING,
    description: 'Make your dream wedding unforgettable with our premium 5-course catering, elegant table setup, dedicated waitstaff, and personalized menu consultation.',
    includes: ['5-Course Plated Dinner', 'Cocktail Hour Appetizers', 'Wedding Cake Cutting', 'Dedicated Event Coordinator', 'Full Table Setup & Linen', 'Professional Waitstaff'],
  },
  {
    id: 2,
    name: 'Corporate Package',
    price: 50000,
    details: 'Good for 100 pax',
    emoji: '💼',
    color: '#EFF6FF',
    accent: '#2563EB',
    image: IMG.CORPORATE,
    description: 'Professional catering for corporate events, conferences, and company gatherings with full buffet, beverages, and on-site coordination.',
    includes: ['Full Buffet Setup', 'Free-flowing Drinks', 'Coffee & Tea Station', 'On-site Coordinator', 'Serving Equipment', 'Cleanup Service'],
  },
  {
    id: 3,
    name: 'Birthday Package',
    price: 40000,
    details: 'Good for 100 pax',
    emoji: '🎂',
    color: '#FFF7ED',
    accent: '#EA580C',
    image: IMG.BIRTHDAY,
    description: 'Celebrate your special day with a festive feast! Fun, customizable menu options perfect for birthday parties of all ages.',
    includes: ['Themed Buffet Setup', 'Birthday Cake', 'Free-flowing Softdrinks', 'Party Favors Setup', 'Dedicated Server', 'Fun Dessert Station'],
  },
  {
    id: 4,
    name: 'Casual Event Package',
    price: 30000,
    details: 'Good for 100 pax',
    emoji: '🎉',
    color: '#F0FDF4',
    accent: '#16A34A',
    image: IMG.CASUAL,
    description: 'Perfect for reunions, fiestas, and casual gatherings. Great food, relaxed atmosphere, and flexible menu options for any occasion.',
    includes: ['Buffet Setup', 'Free-flowing Drinks', 'Basic Table Setting', 'Food Warmers', 'Serving Utensils', 'Cleanup Service'],
  },
];

const PackagesScreen = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F4FF' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={{ fontSize: 14, color: '#9E8FBF', marginBottom: 20, lineHeight: 20 }}>
          Choose the perfect package for your event. All packages are good for 100 pax.
        </Text>
        {PACKAGES.map(pkg => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            expanded={expanded === pkg.id}
            onToggle={() => setExpanded(expanded === pkg.id ? null : pkg.id)}
            onBook={() => navigation.navigate(ROUTES.BOOK_PACKAGE, { package: pkg })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackagesScreen;
