import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import styles from '../styles/InstructorLiveSessionScreenStyle';

const SessionFlowControl = ({ label, Icon }) => (
  <TouchableOpacity style={styles.controlBox}>
    <View style={styles.controlIcon}>
      <Icon
        color={Colors.subText}
        size={Dimensions.get('window').width * 0.05}
      />
    </View>
    <Text style={styles.controlLabel}>{label}</Text>
  </TouchableOpacity>
);

export default SessionFlowControl;
