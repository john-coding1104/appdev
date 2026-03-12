import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const CustomButton = ({ label, onPress, containerStyle, textStyle, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[{ opacity: disabled || loading ? 0.7 : 1 }, containerStyle]}>
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 14 }}>
        {loading ? (
          <ActivityIndicator color={textStyle?.color || '#fff'} />
        ) : (
          <Text style={textStyle}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
