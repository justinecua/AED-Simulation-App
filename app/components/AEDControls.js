import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Power, ChevronUp, ChevronDown, Zap } from 'lucide-react-native';
import aedStyle from '../styles/aedBoxStyle';
import Colors from '../constants/colors';

const AEDControls = ({ started, onPowerPress, onShockPress, flashing }) => {
  const flashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (flashing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(flashAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(flashAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    } else {
      flashAnim.setValue(0);
    }
  }, [flashing]);

  const backgroundColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.heartRateBackground, '#FFA500'],
  });

  return (
    <View style={aedStyle.aedControls}>
      <View style={aedStyle.controlBox}>
        <TouchableOpacity style={aedStyle.powerBtn} onPress={onPowerPress}>
          <Power color="#fff" size={17} />
        </TouchableOpacity>

        <View style={aedStyle.joulesBox}>
          <ChevronUp color="black" size={13} />
          <ChevronDown color="black" size={13} />
          <Text style={aedStyle.jouleText}>0 J</Text>
        </View>
      </View>

      <View style={aedStyle.aedTextBox}>
        <Text style={aedStyle.aedText}>AED</Text>
        <Animated.View style={[aedStyle.shockButton, { backgroundColor }]}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={onShockPress}
          >
            <Zap color="#fff" size={17} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default AEDControls;
