import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Play, Square, Pause, Hand, Zap } from 'lucide-react-native';

import styles from '../../styles/InstructorLiveSessionScreenStyle';
import Header from '../../components/Header';
import { useLiveInstructor } from '../../context/LiveInstructorContext';
import aedSequences from '../../data/aedSequences';
import SessionFlowControl from '../../components/SessionFlowControl';

const InstructorLiveSessionScreen = ({ goBack }) => {
  const {
    connectionStatus,
    message,
    selectedRhythm,
    sendSetRhythm,
    sendPlayStep,
    sendNextStep,
    sendPrevStep,
    sendStopAudio,
    sendReset,
    sendSimulationControl,
    currentStepIndex,
  } = useLiveInstructor();

  const rhythms = ['Sinus', 'VFib', 'VTach', 'Asystole'];

  const flowControlData = [
    { label: 'Start Simulation', icon: Play, send: 'START' },
    { label: 'Stop Simulation', icon: Square, send: 'STOP' },
    { label: 'Pause Simulation', icon: Pause, send: 'PAUSE' },
    { label: 'Pads Advised', icon: Hand, send: 'PADS_ADVISED' },
    { label: 'Shock Advised', icon: Zap, send: 'SHOCK_ADVISED' },
    { label: 'No Shock Advised', icon: Zap, send: 'NO_SHOCK' },
  ];

  const readableMessage = useMemo(() => {
    if (!message) return 'No response yet.';

    const cleanMessage = message.replace(/^Student:\s*/, '').trim();

    try {
      const obj = JSON.parse(cleanMessage);
      const { type, data } = obj;

      switch (type) {
        case 'SET_RHYTHM':
          return `Rhythm set to ${data}`;
        case 'PLAY_STEP':
          return `Played step ${data?.index + 1 || 1} (${
            data?.rhythm || 'Unknown Rhythm'
          }).`;
        case 'SIM_CONTROL':
          if (data === 'START') return '';
          if (data === 'STOP') return 'Simulation stopped';
          if (data === 'PAUSE') return 'Simulation paused';
          return `Simulation control: ${data}`;
        case 'NEXT_STEP':
          return 'Advanced to the next step';
        case 'PREV_STEP':
          return 'Returned to the previous step';
        case 'STOP_AUDIO':
          return 'Audio stopped';
        case 'RESET_AED':
          return 'AED reset';
        case 'CONTROL_MODE':
          return `Control mode changed to ${data}`;
        default:
          return 'Received a new signal';
      }
    } catch {
      return cleanMessage;
    }
  }, [message]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header role="instructor" goBack={goBack} />

      {/* Connection */}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Student's Response</Text>
          <Text
            style={[
              styles.student,
              {
                color: connectionStatus?.toLowerCase().includes('connected')
                  ? '#22c55e'
                  : connectionStatus?.toLowerCase().includes('connecting')
                  ? '#eab308'
                  : '#ef4444',
              },
            ]}
          >
            {connectionStatus}
          </Text>
        </View>
        <View style={styles.responseBox}>
          <Text style={styles.response}>{readableMessage}</Text>
        </View>
      </View>

      {/* Flow Controls */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>Session Flow Controls:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {flowControlData.map((item, i) => (
            <SessionFlowControl
              key={i}
              label={item.label}
              Icon={item.icon}
              onPress={() => sendSimulationControl(item.send)}
            />
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
              onPress={() => sendSetRhythm(r)}
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

      {/* Manual Step Controls */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>Step Control:</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            onPress={sendPrevStep}
            style={{ backgroundColor: '#475569', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sendNextStep}
            style={{ backgroundColor: '#475569', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sendStopAudio}
            style={{ backgroundColor: '#ef4444', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Stop Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sendReset}
            style={{ backgroundColor: '#64748b', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AED Step Prompts */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>
          {selectedRhythm} Steps ({aedSequences[selectedRhythm].length})
        </Text>
        {aedSequences[selectedRhythm].map((s, i) => {
          const isCurrent = i === currentStepIndex;
          const isPowerStep = s.action === 'power';

          return (
            <TouchableOpacity
              key={i}
              disabled={isPowerStep} // Instructor cannot turn on AED
              onPress={() => {
                if (!isPowerStep) sendPlayStep(selectedRhythm, i);
              }}
              style={{
                marginVertical: 4,
                padding: 20,
                borderRadius: 8,
                backgroundColor: isPowerStep
                  ? '#e2e8f0'
                  : isCurrent
                  ? '#bbf7d0'
                  : '#f8fafc',
                opacity: isPowerStep ? 0.4 : 1,
              }}
            >
              <Text style={{ color: '#334155', fontWeight: '500' }}>
                {i + 1}. {s.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default InstructorLiveSessionScreen;
