import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Power, ChevronUp, ChevronDown, Zap } from 'lucide-react-native';
import aedStyle from '../styles/aedBoxStyle';

const AEDControls = ({ started, onPowerPress }) => {
  return (
    <View style={aedStyle.aedControls}>
      <View style={aedStyle.controlBox}>
        <TouchableOpacity
          style={[aedStyle.powerBtn, started && { backgroundColor: '#09E979' }]}
          onPress={onPowerPress}
        >
          <Power color="#fff" size={17} />
        </TouchableOpacity>

        <View style={aedStyle.joulesBox}>
          <View style={aedStyle.joulesArrow}>
            <ChevronUp color="black" size={13} />
            <ChevronDown color="black" size={13} />
          </View>
          <Text style={aedStyle.jouleText}>150 J</Text>
        </View>
      </View>

      <View style={aedStyle.aedTextBox}>
        <Text style={aedStyle.aedText}>AED</Text>
        <View style={aedStyle.shockButton}>
          <Zap color="#fff" size={17} />
        </View>
      </View>
    </View>
  );
};

export default AEDControls;
