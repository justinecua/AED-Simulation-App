import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Home } from 'lucide-react-native';
import Colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

// Detect if screen matches 720 x 1600 pixels resolution (~360 x 800dp)
const screenSize = width === 360 && height === 800;

const FloatingHome = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.7}>
      <Home color={Colors.button} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: screenSize ? 60 : 30,
    right: 25,
    backgroundColor: '#ffffff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
});

export default FloatingHome;
