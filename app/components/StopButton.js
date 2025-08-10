import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Square } from 'lucide-react-native';
import style from '../styles/InstructorTestScenarioStyle';

const StopButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={style.boxStop}>
    <Square color="white" size={20} />
  </TouchableOpacity>
);

export default StopButton;
