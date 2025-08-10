import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';
import style from '../styles/InstructorTestScenarioStyle';

const PlayButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={style.boxPlay}>
    <Play color="white" size={20} />
  </TouchableOpacity>
);

export default PlayButton;
