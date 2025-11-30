import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Colors from '../constants/colors';
import styles from '../styles/InstructorLiveSessionScreenStyle';

const RhythmButton = ({ label, Icon, fontSize, onPress, isSelected }) => (
  <TouchableOpacity
    style={[
      styles.rhythmBox,
      {
        backgroundColor: isSelected ? '#e2e9fbff' : '#ffffffff',
        width: '48%',
      },
    ]}
    onPress={onPress}
  >
    <View style={styles.controlIcon}>
      <Icon
        color={isSelected ? '#fff' : Colors.subText}
        size={Dimensions.get('window').width * 0.05}
      />
    </View>

    <Text
      style={[
        styles.controlLabel,
        {
          fontSize,
          color: Colors.heartRateBackground,
        },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default RhythmButton;
