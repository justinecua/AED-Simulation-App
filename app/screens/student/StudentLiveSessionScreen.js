// screens/student/StudentLiveSessionScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import { useAEDContext } from '../../context/AEDContext';
import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';
import { Timer, Wifi, Info, Hand, ArrowRightLeft } from 'lucide-react-native';
import useTcpClient from '../../hooks/useTcpClient';

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
    stopAED,
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

  const { socket, readableId } = useTcpClient();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // ✅ receive instructor messages
  useEffect(() => {
    if (!socket) return;
    const onData = data => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'chat' && msg.from === 'instructor') {
          setMessages(prev => [
            ...prev,
            { from: 'instructor', text: msg.text },
          ]);
        }
      } catch {}
    };
    socket.on('data', onData);
    return () => socket.off?.('data', onData);
  }, [socket]);

  // ✅ send student message
  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    const payload = {
      type: 'chat',
      from: 'student',
      id: readableId,
      text: input.trim(),
    };
    socket.write(JSON.stringify(payload));
    setMessages(prev => [...prev, { from: 'student', text: input.trim() }]);
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
                    if (expectedAction === 'power') nextStep();
                  } else {
                    powerOffAED();
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
