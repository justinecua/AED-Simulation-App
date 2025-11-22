import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Play, Square, Pause, Hand, Zap, Activity } from 'lucide-react-native';

import styles from '../../styles/InstructorLiveSessionScreenStyle';
import Header from '../../components/Header';
import { useLiveInstructor } from '../../context/LiveInstructorContext';
import aedSequences from '../../data/aedSequences';
import SessionFlowControl from '../../components/SessionFlowControl';
import RhythmButton from '../../components/RhythmButton';

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
    studentPoweredOn,
    studentPaused,
  } = useLiveInstructor();

  const rhythmLabels = {
    Sinus: 'Normal Sinus',
    VFib: 'Ventricular Fibrillation',
    VTach: 'Ventricular Tachycardia',
    Asystole: 'Asystole',
  };

  const rhythms = Object.keys(rhythmLabels);
  const hasShockStep = aedSequences[selectedRhythm].some(
    step => step.action === 'shock',
  );

  const flowControlData = [
    { label: 'Start Simulation', icon: Play, send: 'START' },
    { label: 'Stop Simulation', icon: Square, send: 'STOP' },
    {
      label: studentPaused ? 'Resume Simulation' : 'Pause Simulation',
      icon: Pause,
      send: studentPaused ? 'RESUME' : 'PAUSE',
    },

    {
      label: 'Finish Simulation',
      icon: Zap,
      send: 'FINISH',
    },
    {
      label: 'Pads Advised',
      icon: Hand,
      send: 'PADS_ADVISED',
      disabled: !studentPoweredOn || studentPaused,
    },

    {
      label: 'Shock Advised',
      icon: Zap,
      send: 'SHOCK_ADVISED',
      disabled: !hasShockStep || !studentPoweredOn || studentPaused,
    },
  ];

  const readableMessage = message;

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
              disabled={item.disabled}
              onPress={() => {
                if (!item.disabled) sendSimulationControl(item.send);
              }}
            />
          ))}
        </View>
      </View>

      {/* Rhythm Selection */}
      <View style={styles.section}>
        <Text style={styles.mainTitle}>Rhythms:</Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          {rhythms.map(r => (
            <RhythmButton
              key={r}
              label={rhythmLabels[r]}
              Icon={Activity}
              fontSize={14}
              onPress={() => sendSetRhythm(r)}
              isSelected={selectedRhythm === r}
            />
          ))}
        </View>
      </View>

      {/* Manual Step Controls - Next, Previous, Reset - Optional*/}
      {/* <View style={styles.section}>
        <Text style={styles.mainTitle}>Step Control:</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            onPress={sendPrevStep}
            style={{ backgroundColor: '#475569', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!studentPoweredOn}
            onPress={sendNextStep}
            style={{
              backgroundColor: '#475569',
              padding: 10,
              borderRadius: 8,
              opacity: studentPoweredOn ? 1 : 0.4,
            }}
          >
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={sendStopAudio}
            style={{ backgroundColor: '#ef4444', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Stop Audio</Text>
          </TouchableOpacity> */}
      {/* <TouchableOpacity
            onPress={sendReset}
            style={{ backgroundColor: '#64748b', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View> */}

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
              disabled={isPowerStep || !studentPoweredOn || studentPaused}
              onPress={() => {
                if (!isPowerStep && studentPoweredOn && !studentPaused) {
                  sendPlayStep(selectedRhythm, i);
                }
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

                opacity:
                  isPowerStep || !studentPoweredOn || studentPaused ? 0.4 : 1,
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
