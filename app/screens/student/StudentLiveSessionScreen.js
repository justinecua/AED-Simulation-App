import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import ToneDisplay from '../../components/ToneDisplay';
import { Timer, Wifi, Info, Hand, ArrowRightLeft } from 'lucide-react-native';
import { useTcpServerContext } from '../../context/TcpServerContext';
import useLiveAEDClient from '../../hooks/useLiveAEDClient';
import SessionFlowControl from '../../components/SessionFlowControl';

const StudentLiveSessionScreen = ({ goHomeStudent, goApplyPads }) => {
  const {
    currentRhythm,
    steps,
    stepIndex,
    isPlaying,
    strokeColors,
    timer,
    started,
    poweredOn,
    paused,
    instructorStarted,
    waveform,
    expectedAction,
    handleAction,
    startAED,
    pauseAED,
    powerOnAED,
    powerOffAED,
    nextStep,
    setIsSwitchOpen,
    setPositions,
    setPlacedPads,
    displayMessage,
  } = useLiveAEDClient();

  const { sendMessage, connectionStatus, message } = useTcpServerContext();
  const [input, setInput] = useState('');

  // Unified display text: show first step while OFF, current step after ON
  const uiStepText = (() => {
    if (!instructorStarted || steps.length === 0) return '';
    if (!poweredOn) return steps[0]?.text || '';
    return steps[stepIndex]?.text || '';
  })();

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
            <View className={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text
                  style={{
                    fontSize: 13,
                    flexShrink: 1,
                    textAlign: 'right',
                  }}
                >
                  Live Session: {connectionStatus}
                </Text>
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
                waveform={currentRhythm?.waveform ?? []}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                expectedAction={expectedAction}
                // Single source of truth for displayed step text
                displayText={uiStepText}
              />
              <AEDControls
                started={poweredOn}
                onPowerPress={() => {
                  if (!poweredOn) {
                    if (instructorStarted) {
                      powerOnAED();
                      startAED();
                      sendMessage('Student powered on the AED');

                      // Always skip step 0 after powering ON
                      if (steps.length > 1) {
                        nextStep();
                      }
                    } else {
                      sendMessage(
                        'Instructor has not started the simulation yet',
                      );
                    }
                  } else {
                    powerOffAED();
                    pauseAED();
                    sendMessage('Student turned off the AED');
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
        <View
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: 12,
            padding: 10,
            marginVertical: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#959595ff',
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: 5,
            }}
          >
            <Wifi
              color={
                connectionStatus?.toLowerCase().includes('connected')
                  ? '#22c55e'
                  : connectionStatus?.toLowerCase().includes('connecting')
                  ? '#eab308'
                  : '#ef4444'
              }
              size={22}
            />
            <Text
              style={{
                marginLeft: 10,
                color: '#64748b',
                fontSize: 12.5,
                flexShrink: 1,
                textAlign: 'right',
                fontWeight: '900',
              }}
            >
              {displayMessage}
            </Text>
          </View>
        </View>
      </View>

      {/* Tone + Chat */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {started && steps.length > 0 && <ToneDisplay text={uiStepText} />}
      </View>
    </View>
  );
};

export default StudentLiveSessionScreen;
