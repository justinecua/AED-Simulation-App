import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Power, ChevronUp, ChevronDown, Zap } from 'lucide-react-native';
import style from '../styles/InstructorTestScenarioStyle';

const AEDControls = ({ started, onPowerPress }) => {
  return (
    <View style={style.aedControls}>
      <View style={style.controlBox}>
        <TouchableOpacity
          style={[style.powerBtn, started && { backgroundColor: '#09E979' }]}
          onPress={onPowerPress}
        >
          <Power color="#fff" size={17} />
        </TouchableOpacity>

        <View style={style.joulesBox}>
          <View style={style.joulesArrow}>
            <ChevronUp color="black" size={13} />
            <ChevronDown color="black" size={13} />
          </View>
          <Text style={style.jouleText}>150 J</Text>
        </View>
      </View>

      <View style={style.aedTextBox}>
        <Text style={style.aedText}>AED</Text>
        <View style={style.shockButton}>
          <Zap color="#fff" size={17} />
        </View>
      </View>
    </View>
  );
};

export default AEDControls;
