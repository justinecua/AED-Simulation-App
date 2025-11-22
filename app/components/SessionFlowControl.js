import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Colors from '../constants/colors';
import styles from '../styles/InstructorLiveSessionScreenStyle';

const SessionFlowControl = ({ label, Icon, onPress, disabled }) => (
  <TouchableOpacity
    onPress={disabled ? null : onPress}
    disabled={disabled}
    style={[
      styles.controlBox,
      disabled && {
        opacity: 0.4,
        backgroundColor: '#ffffffff',
      },
    ]}
  >
    <View style={styles.controlIcon}>
      <Icon
        color={disabled ? Colors.subText : Colors.subText}
        size={Dimensions.get('window').width * 0.05}
      />
    </View>

    <Text
      style={[
        styles.controlLabel,
        {
          fontSize: 13,
          marginTop: 6,
          color: disabled ? Colors.rhythmBackground : Colors.rhythmBackground,
        },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default SessionFlowControl;
