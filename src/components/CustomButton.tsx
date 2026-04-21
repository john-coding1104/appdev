import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  label, 
  onPress, 
  containerStyle, 
  textStyle, 
  loading = false, 
  disabled = false 
}) => {
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
