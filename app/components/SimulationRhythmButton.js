import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Colors from '../constants/colors';

const SimulationRhythmButton = ({
  label,
  Icon,
  fontSize = 10,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: '48%',
          paddingVertical: 12,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: isActive ? Colors.button : '#d0d4dc',
          backgroundColor: isActive ? Colors.button : '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          flexDirection: 'column',
        },
      ]}
    >
      {/* Icon */}
      <View style={{ marginBottom: 6 }}>
        <Icon size={22} color={isActive ? '#fff' : Colors.subText} />
      </View>

      {/* Label */}
      <Text
        style={{
          fontSize: fontSize,
          color: isActive ? '#fff' : Colors.text,
          fontWeight: isActive ? '700' : '500',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SimulationRhythmButton;
