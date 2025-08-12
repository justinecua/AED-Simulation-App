import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // added Text
import Colors from '../constants/colors';
import { Volume2 } from 'lucide-react-native';

const ToneDisplay = () => {
  return (
    <View style={style.tone}>
      <View style={style.toneIcon}>
        <View style={style.boxTone}>
          <Volume2 color="white" size={16} />
        </View>
        <Text style={style.toneText}>Push to match the tone</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  tone: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  boxTone: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.button,
    marginRight: 8,
  },
  toneIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toneText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
});

export default ToneDisplay;
