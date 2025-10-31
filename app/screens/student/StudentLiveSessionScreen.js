import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import { useAEDContext } from '../../context/AEDContext';
import ToneDisplay from '../../components/ToneDisplay';
import { Timer, Wifi, Info, Hand, ArrowRightLeft } from 'lucide-react-native';
import { useTcpServerContext } from '../../context/TcpServerContext';

const StudentLiveSessionScreen = ({ goHomeStudent, goApplyPads }) => {
  const {
    poweredOn,
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    expectedAction,
    powerOnAED,
    powerOffAED,
    startAED,
    pauseAED,
    nextStep,
    timer,
    handleAction,
    isSwitchOpen,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
  } = useAEDContext();

  const { sendMessage, connectionStatus, message } = useTcpServerContext();
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('📩 Incoming message:', message);

    if (message.startsWith('SET_RHYTHM:')) {
      const rhythm = message.split(':')[1];
      console.log('🫀 Set rhythm to:', rhythm);
      setCurrentRhythm({ name: rhythm, bpm: heartRhythms[rhythm].bpm });
      return;
    }

    switch (message) {
      case 'START_SIMULATION':
        startAED();
        break;
      case 'STOP_SIMULATION':
        powerOffAED();
        break;
      case 'PAUSE_SIMULATION':
        pauseAED();
        break;
    }
  }, [message]);

  //  Send message to instructor
  const sendStudentMessage = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <View style={style.container}>
      <Header goBack={goHomeStudent} role="student" />

      <View style={style.subContainer}>
        <View style={style.content}>
          {/* Header Row */}
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text>Live Session</Text>
              </TouchableOpacity>
            </View>
            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <Text
                  style={{
                    marginLeft: 2,
                    color: '#ed1313ff',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </Text>
              </View>

              <TouchableOpacity style={style2.wifiButton}>
                <Wifi color={Colors.text} size={22} />
              </TouchableOpacity>
              <TouchableOpacity style={style2.wifiButton}>
                <Info color={Colors.text} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Status + Action buttons */}
          <View style={style2.studentWrapper2}>
            <View style={style2.studentWrapper2Sub}>
              <TouchableOpacity style={style.contentText}>
                <Text>
                  Status: {!poweredOn ? 'OFF' : paused ? 'PAUSED' : 'ON'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={style2.studentWrapper2SubRight}>
              <TouchableOpacity
                style={[
                  style2.handButton,
                  steps[stepIndex]?.action !== 'remove' && { opacity: 0.5 },
                ]}
                disabled={steps[stepIndex]?.action !== 'remove'}
                onPress={() => {
                  handleAction('remove');
                  setIsSwitchOpen(true);
                }}
              >
                <Hand color={Colors.text} size={22} />
              </TouchableOpacity>

              {steps[stepIndex]?.text === 'Open pad package' && (
                <TouchableOpacity
                  style={[style2.padPackageButton]}
                  onPress={() => {
                    handleAction('open');
                    if (expectedAction === 'open') {
                      setIsSwitchOpen(true);
                      goApplyPads();
                    }
                  }}
                >
                  <ArrowRightLeft color="#fff" size={22} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* AED Display */}
          <View style={style.contentCenter}>
            <View style={aedStyle.aedBox}>
              <AEDWaveform
                started={started}
                currentRhythm={currentRhythm}
                waveform={waveform}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                expectedAction={expectedAction}
                displayText={
                  steps.some((s, i) => i <= stepIndex && s.action === 'analyze')
                    ? ''
                    : steps[stepIndex]?.text ?? ''
                }
              />
              <AEDControls
                started={poweredOn}
                onPowerPress={() => {
                  if (!poweredOn) {
                    powerOnAED();
                    startAED();
                    if (expectedAction === 'power') nextStep();
                  } else {
                    powerOffAED();
                    pauseAED();
                    setIsSwitchOpen(false);
                    setPositions({
                      'Pad 1': { x: 15, y: 10 },
                      'Pad 2': { x: 10, y: 75 },
                    });
                    setPlacedPads({ 'Pad 1': false, 'Pad 2': false });
                  }
                }}
                onShockPress={() => handleAction('shock')}
                flashing={
                  steps[stepIndex]?.text === 'Press flashing shock button'
                }
              />
            </View>
          </View>
        </View>
        {/* Connection Status */}
        <Text style={{ color: '#475569', marginVertical: 6 }}>
          {connectionStatus}
        </Text>
        <Text style={{ color: '#64748b' }}>Last message: {message}</Text>
      </View>

      {/* Tone + Chat */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {started && steps.length > 0 && (
          <ToneDisplay text={steps[stepIndex]?.text} />
        )}
      </View>
    </View>
  );
};

export default StudentLiveSessionScreen;
