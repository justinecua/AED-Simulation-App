import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/colors';
import { AudioLines } from 'lucide-react-native';

const ToneDisplayLiveSession = ({ displayTop, text }) => {
  return (
    <View style={[style.tone, displayTop ? style.top : style.bottom]}>
      <View style={style.toneIcon}>
        <View style={style.boxTone}>
          <AudioLines color="white" size={20} />
        </View>
        <Text style={style.toneText}>{text}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  top: {
    top: 80,
  },
  bottom: {
    bottom: 75,
  },
  tone: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    zIndex: 1,
  },
  boxTone: {
    padding: 7,
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
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ToneDisplayLiveSession;
