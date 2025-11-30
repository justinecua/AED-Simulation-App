import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import AEDWaveformLiveSession from '../../components/AEDWaveformLiveSession';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import ToneDisplayLiveSession from '../../components/ToneDisplayLiveSession';
import { Timer, Wifi, Info, Hand, ArrowRightLeft } from 'lucide-react-native';
import { useTcpServerContext } from '../../context/TcpServerContext';
import { useLiveAEDClientContext } from '../../context/LiveAEDClientContext';
import FinishDialog from '../../components/FinishDialog';

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
    setDisplayMessage,
    hasSkippedPowerStepRef,
    stopAudio,
    clearWaveform,
    lastPlayKeyRef,
    resetSequence,
  } = useLiveAEDClientContext();

  const { sendMessage, connectionStatus, message } = useTcpServerContext();
  const [input, setInput] = useState('');
  const [showFinishDialog, setShowFinishDialog] = useState(false);

  // Unified display text: show first step while OFF, current step after ON
  // const uiStepText = (() => {
  //   if (!instructorStarted || steps.length === 0) return '';
  //   if (!poweredOn) return steps[0]?.text || '';
  //   return steps[stepIndex]?.text || '';
  // })();

  const uiStepText = (() => {
    if (!instructorStarted || steps.length === 0) return '';

    // While AED is OFF, don't show any step prompt
    if (!poweredOn) {
      return stepIndex === 0 ? steps[0]?.text : '';
    }

    return steps[stepIndex]?.text || '';
  })();

  //  Send message to instructor
  const sendStudentMessage = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const resetSimulation = () => {
    //resetSequence();
    powerOffAED();
    pauseAED();

    stopAudio();

    setIsSwitchOpen(false);
    setPositions({
      'Pad 1': { x: 15, y: 10 },
      'Pad 2': { x: 10, y: 75 },
    });
    setPlacedPads({ 'Pad 1': false, 'Pad 2': false });

    setDisplayMessage('Waiting for instructor...');
  };

  const handleRetry = () => {
    setShowFinishDialog(false);

    sendMessage(JSON.stringify({ type: 'STUDENT_TRY_AGAIN' }));

    resetSimulation();
  };

  const handleBackHome = async () => {
    setShowFinishDialog(false);
    await saveLiveSession();
    resetSimulation();
    goHomeStudent();
  };

  useEffect(() => {
    if (!message) return;

    try {
      const parsed = JSON.parse(message);
      if (parsed.type === 'FINISH') {
        setShowFinishDialog(true);
      }
    } catch (e) {
      // ignore
    }
  }, [message]);
  const sessionStartRef = useRef(new Date().toISOString());
  const [hiddenTimer, setHiddenTimer] = useState(0);

  useEffect(() => {
    if (!currentRhythm) return;
    const key = currentRhythm.name || currentRhythm.label || currentRhythm.id;
    console.log('Current Rhythm:', key);
    console.log('Stroke color used:', strokeColors?.[key]);
    console.log('StrokeColors keys:', Object.keys(strokeColors));
  }, [currentRhythm, strokeColors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHiddenTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const saveLiveSession = async () => {
    try {
      const endTime = new Date().toISOString();

      const newSession = {
        type: 'Live Session',
        startTime: sessionStartRef.current,
        endTime,
        totalTime: hiddenTimer,
        step: steps[stepIndex]?.text || '',
        rhythm: currentRhythm?.name || currentRhythm?.label || '',
      };

      const existing = await AsyncStorage.getItem('aed_sessions_student');
      let sessions = existing ? JSON.parse(existing) : [];

      sessions.unshift(newSession);
      await AsyncStorage.setItem(
        'aed_sessions_student',
        JSON.stringify(sessions),
      );

      console.log('Live Session saved');
    } catch (e) {
      console.log('Error saving live session', e);
    }
  };

  return (
    <View style={style.container}>
      <Header
        goBack={async () => {
          await saveLiveSession();
          goHomeStudent();
        }}
        role="student"
      />

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

              {/* <TouchableOpacity style={style2.wifiButton}>
                <Info color={Colors.text} size={22} />
              </TouchableOpacity> */}
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

                    //  SEND A SIGNAL TO INSTRUCTOR
                    sendMessage(
                      JSON.stringify({
                        type: 'STUDENT_ACTION',
                        data: 'OPEN_PAD_PACKAGE',
                      }),
                    );

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
              <AEDWaveformLiveSession
                started={started}
                poweredOn={poweredOn}
                currentRhythm={currentRhythm}
                waveform={waveform}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                expectedAction={expectedAction}
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

                      // Only skip power step ONCE
                      if (!hasSkippedPowerStepRef.current && stepIndex === 0) {
                        nextStep();
                        hasSkippedPowerStepRef.current = true;
                      }
                    } else {
                      sendMessage(
                        JSON.stringify({
                          type: 'STUDENT_POWER_BEFORE_START',
                          data: null,
                        }),
                      );
                      setDisplayMessage(
                        'Instructor has not started the simulation yet',
                      );
                    }
                  } else {
                    // OFF logic
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
                onShockPress={() => {
                  handleAction('shock');

                  sendMessage(
                    JSON.stringify({
                      type: 'STUDENT_ACTION',
                      data: 'SHOCK_PRESSED',
                    }),
                  );
                }}
                flashing={expectedAction === 'shock'}
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
            marginTop: 27,
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
        {started && steps.length > 0 && (
          <ToneDisplayLiveSession text={uiStepText} />
        )}
      </View>
      <FinishDialog
        visible={showFinishDialog}
        onRetry={handleRetry}
        onHome={handleBackHome}
      />
    </View>
  );
};

export default StudentLiveSessionScreen;
