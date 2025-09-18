import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Play,
  Square,
  Pause,
  Hand,
  Zap,
  Activity,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

import styles from '../../styles/InstructorLiveSessionScreenStyle';
import Header from '../../components/Header';
import SessionFlowControl from '../../components/SessionFlowControl';
import RhythmButton from '../../components/RhythmButton';

const InstructorLiveSessionScreen = ({ goBack }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [values, setValues] = useState({});

  const flowControlData = [
    { label: 'Start Simulation', icon: Play },
    { label: 'Stop Simulation', icon: Square },
    { label: 'Pause Simulation', icon: Pause },
    { label: 'Pads Advised', icon: Hand },
    { label: 'Shock Advised', icon: Zap },
    { label: 'No Shock Advised', icon: Zap },
  ];

  const rhythmControlData = [
    { label: 'Normal Sinus', icon: Activity },
    { label: 'Ventricular Fibrillation', icon: Activity },
    { label: 'Rhythm 3', icon: Activity },
    { label: 'Rhythm 4', icon: Activity },
  ];

  const prompts = [
    'Initial Response',
    'Pad Application',
    'Analysis',
    'Shock Delivery',
    'CPR Guidance',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header role="instructor" goBack={goBack} />

      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Student's Response</Text>
          <Text style={styles.student}>Connected to Student #</Text>
        </View>
        <View style={styles.responseBox}>
          <Text style={styles.response}>Student # Response</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Session Flow Controls:</Text>
        </View>
        <View style={styles.sessionFlowControls}>
          <View style={styles.controlRow}>
            {/* Map for flow control buttons */}
            {flowControlData.map((item, index) => (
              <SessionFlowControl
                key={index}
                label={item.label}
                Icon={item.icon}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Rhythms:</Text>
        </View>
        <View style={styles.rhythmContainer}>
          {/* Map for rhythm control buttons */}
          {rhythmControlData.map((item, index) => (
            <RhythmButton key={index} label={item.label} Icon={item.icon} />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Audio Prompts:</Text>
        </View>
        <View style={styles.promptContainer}>
          {prompts.map((label, index) => (
            <View key={label} style={styles.dropdownContainer}>
              <DropDownPicker
                open={openIndex === index}
                value={values[index]}
                items={[
                  { label: `${label} Prompt 1`, value: '1' },
                  { label: `${label} Prompt 2`, value: '2' },
                ]}
                setOpen={() => setOpenIndex(index === openIndex ? null : index)}
                setValue={val => setValues(prev => ({ ...prev, [index]: val }))}
                setItems={() => {}}
                placeholder={label}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownMenu}
                textStyle={styles.dropdownText}
                ArrowDownIconComponent={() => (
                  <ChevronDown size={20} color="#fff" />
                )}
                ArrowUpIconComponent={() => (
                  <ChevronUp size={20} color="#fff" />
                )}
                zIndex={5000 - index}
                zIndexInverse={1000 + index}
                dropDownDirection="BOTTOM"
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default InstructorLiveSessionScreen;
