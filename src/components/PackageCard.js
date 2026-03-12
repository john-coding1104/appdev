import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';

const PackageCard = ({ pkg, onBook, onToggle, expanded }) => {
  return (
    <View style={{
      backgroundColor: pkg.color,
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
    }}>
      {/* Image */}
      <Image source={{ uri: pkg.image }} style={{ width: '100%', height: 140, borderRadius: 12, marginBottom: 14 }} resizeMode="cover" />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: pkg.accent, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          <Text style={{ fontSize: 22 }}>{pkg.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#1E0A3C' }}>{pkg.name}</Text>
          <Text style={{ fontSize: 12, color: '#9E8FBF' }}>{pkg.details}</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '900', color: pkg.accent }}>
          ₱{pkg.price.toLocaleString()}
        </Text>
      </View>

      <Text style={{ fontSize: 13, color: '#4B5563', lineHeight: 20, marginBottom: 12 }}>{pkg.description}</Text>

      {/* Toggle inclusions */}
      <TouchableOpacity onPress={onToggle} style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: pkg.accent }}>
          {expanded ? 'Hide Details ▲' : 'View Inclusions ▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginBottom: 12 }}>
          {pkg.includes.map(item => (
            <View key={item} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{ color: pkg.accent, fontWeight: '800', marginRight: 8 }}>✓</Text>
              <Text style={{ fontSize: 13, color: '#374151' }}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      <CustomButton
        label="Book This Package"
        onPress={onBook}
        containerStyle={{ backgroundColor: pkg.accent, borderRadius: 12 }}
        textStyle={{ color: '#fff', fontSize: 15, fontWeight: '800' }}
      />
    </View>
  );
};

export default PackageCard;
