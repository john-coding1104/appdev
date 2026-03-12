import React from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={[{ marginBottom: 14 }, containerStyle]}>
      {label ? (
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#4B3F6B', marginBottom: 6 }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          {
            backgroundColor: '#F8F4FF',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 13,
            fontSize: 15,
            color: '#1E0A3C',
            borderWidth: 1.5,
            borderColor: '#EDE8FF',
            textAlignVertical: multiline ? 'top' : 'center',
          },
          inputStyle,
        ]}
      />
    </View>
  );
};

export default CustomTextInput;
