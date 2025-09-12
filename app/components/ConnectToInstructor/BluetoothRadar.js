import React, { useEffect, useRef } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { BluetoothSearching, Wifi } from 'lucide-react-native';
import styles from '../../styles/connectToInstructorStyles';

const BluetoothRadar = ({ isSearching, onToggleSearch }) => {
  const fade1 = useRef(new Animated.Value(1)).current;
  const fade2 = useRef(new Animated.Value(1)).current;
  const fade3 = useRef(new Animated.Value(1)).current;
  const fade4 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation;

    if (isSearching) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(fade1, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fade2, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fade3, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fade4, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),

          Animated.delay(300),

          Animated.timing(fade4, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fade3, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fade2, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fade1, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
    } else {
      fade1.setValue(1);
      fade2.setValue(1);
      fade3.setValue(1);
      fade4.setValue(1);
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [isSearching]);

  return (
    <View style={styles.bluetoothContainer}>
      <Animated.View style={[styles.firstLayer, { opacity: fade1 }]}>
        <Animated.View style={[styles.secondLayer, { opacity: fade2 }]}>
          <Animated.View style={[styles.thirdLayer, { opacity: fade3 }]}>
            <Animated.View style={[styles.fourthLayer, { opacity: fade4 }]} />
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <TouchableOpacity
        onPress={onToggleSearch}
        style={[
          styles.iconCircle,
          {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        activeOpacity={0.7}
      >
        <Wifi color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default BluetoothRadar;
