import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Power, ChevronUp, ChevronDown, Zap } from 'lucide-react-native';
import aedStyle from '../styles/aedBoxStyle';

const AEDControls = ({ started, onPowerPress, onShockPress }) => {
  return (
    <View style={aedStyle.aedControls}>
      <View style={aedStyle.controlBox}>
        <TouchableOpacity style={aedStyle.powerBtn} onPress={onPowerPress}>
          <Power color="#fff" size={17} />
        </TouchableOpacity>

        <View style={aedStyle.joulesBox}>
          <ChevronUp color="black" size={13} />
          <ChevronDown color="black" size={13} />
          <Text style={aedStyle.jouleText}>150 J</Text>
        </View>
      </View>

      <View style={aedStyle.aedTextBox}>
        <Text style={aedStyle.aedText}>AED</Text>
        <TouchableOpacity style={aedStyle.shockButton} onPress={onShockPress}>
          <Zap color="#fff" size={17} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AEDControls;
