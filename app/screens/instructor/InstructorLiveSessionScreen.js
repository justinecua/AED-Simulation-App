import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Play,
  Square,
  Pause,
  Activity,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

import styles from '../../styles/InstructorLiveSessionScreenStyle';
import Header from '../../components/Header';
import { useTcpServerContext } from '../../context/TcpServerContext';
import aedSequences from '../../data/aedSequences';

const InstructorLiveSessionScreen = ({ goBack }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [values, setValues] = useState({});
  const [controlMode, setControlMode] = useState(true);
  const [selectedRhythm, setSelectedRhythm] = useState('Sinus');

  const { connectionStatus, message, sendMessage, setIsServer } =
    useTcpServerContext();

  useEffect(() => {
    setIsServer(true);
  }, []);

  const flowControlData = [
    { label: 'Start Simulation', send: 'START_SIMULATION', icon: Play },
    { label: 'Stop Simulation', send: 'STOP_SIMULATION', icon: Square },
    { label: 'Pause Simulation', send: 'PAUSE_SIMULATION', icon: Pause },
  ];

  const rhythms = ['Sinus', 'VFib', 'VTach', 'Asystole'];

  const handleControlMode = () => {
    const mode = !controlMode;
    setControlMode(mode);
    sendMessage(mode ? 'CONTROL_MODE_ON' : 'CONTROL_MODE_OFF');
  };

  const handleRhythmSelect = rhythm => {
    setSelectedRhythm(rhythm);
    sendMessage(`SET_RHYTHM:${rhythm}`);
  };

  const handlePlayStep = (rhythm, stepIndex) => {
    const step = aedSequences[rhythm][stepIndex];
    if (step) {
      sendMessage(`PLAY_STEP:${rhythm}:${stepIndex}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header role="instructor" goBack={goBack} />

      {/* Connection */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>Student Connection:</Text>
        <Text style={{ color: '#475569' }}>{connectionStatus}</Text>
        <Text style={{ color: '#64748b' }}>Last message: {message}</Text>
      </View>

      {/* Control Mode */}
      <View style={styles.section}>
        <TouchableOpacity
          onPress={handleControlMode}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: controlMode ? '#10B981' : '#F59E0B',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Settings size={20} color="#fff" />
          <Text style={{ color: '#fff', marginLeft: 8 }}>
            {controlMode ? 'Instructor-Controlled' : 'Auto Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Flow Controls */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>Simulation Controls:</Text>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
          {flowControlData.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => sendMessage(item.send)}
              style={{
                backgroundColor: '#2563EB',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderRadius: 8,
              }}
            >
              <item.icon size={20} color="#fff" />
              <Text style={{ color: '#fff', marginLeft: 8 }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Rhythm Selection */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>Rhythms:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {rhythms.map(r => (
            <TouchableOpacity
              key={r}
              onPress={() => handleRhythmSelect(r)}
              style={{
                backgroundColor: selectedRhythm === r ? '#10B981' : '#475569',
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff' }}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AED Step Prompts */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>
          {selectedRhythm} Steps ({aedSequences[selectedRhythm].length})
        </Text>
        {aedSequences[selectedRhythm].map((s, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePlayStep(selectedRhythm, i)}
            style={{
              backgroundColor: '#6366F1',
              marginVertical: 4,
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '500' }}>
              {i + 1}. {s.text}
            </Text>
            <Text style={{ color: '#cbd5e1', fontSize: 12 }}>🎧 {s.audio}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default InstructorLiveSessionScreen;
