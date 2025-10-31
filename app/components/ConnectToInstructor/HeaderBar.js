import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, BadgeInfo } from 'lucide-react-native';
import styles from '../../styles/connectToInstructorStyles';
import Colors from '../../constants/colors';

const HeaderBar = ({ goBack }) => {
  return (
    <View style={styles.topDisplay}>
      <TouchableOpacity style={styles.boxIcon} onPress={goBack}>
        <ChevronLeft color={Colors.button} size={22} />
      </TouchableOpacity>
      <Text style={styles.topText}>Nearby Devices</Text>
      <View style={styles.boxIcon}>
        <BadgeInfo color={Colors.button} size={22} />
      </View>
    </View>
  );
};

export default HeaderBar;
