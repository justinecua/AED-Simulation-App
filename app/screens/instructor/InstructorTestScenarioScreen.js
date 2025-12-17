import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';

import { useTestScenario } from '../../context/TestScenarioContext';
import { useScenarioContext } from '../../context/ScenarioContext';

import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';

import { Timer, Hand, ArrowRightLeft } from 'lucide-react-native';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InstructorTestScenarioScreen = ({ goHomeInsctructor, goApplyPads }) => {
  const {
    steps,
    stepIndex,
    expectedAction,
    poweredOn,
    started,
    paused,
    timer,
    waveform,
    strokeColors,
    powerOnAED,
    powerOffAED,
    startAED,
    handleAction,
    nextStep,
    isSwitchOpen,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    loadTestScenario,
    currentScenario,
    setCurrentScenario,
  } = useTestScenario();

  const { scenarios } = useScenarioContext();
  const [modalVisible, setModalVisible] = useState(false);

  // ================== AUDIO PLAYER ======================
  const playAudio = (file, onFinish) => {
    if (!file) {
      if (onFinish) onFinish();
      return;
    }

    const sound = new Sound(file, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Sound load error:', error);
        if (onFinish) onFinish();
        return;
      }

      sound.play(success => {
        sound.release();
        if (onFinish) onFinish();
      });
    });
  };

  const saveInstructorSession = async () => {
    try {
      const newSession = {
        type: 'Test Scenario',
        startTime: new Date().toISOString(),
        totalTime: timer,
      };

      const data = await AsyncStorage.getItem('aed_sessions_instructor');
      const sessions = data ? JSON.parse(data) : [];

      sessions.unshift(newSession);

      await AsyncStorage.setItem(
        'aed_sessions_instructor',
        JSON.stringify(sessions),
      );

      console.log('Instructor session saved!');
    } catch (e) {
      console.log('Error saving instructor session:', e);
    }
  };

  // ======================================================

  const handleSelectScenario = scenario => {
    setCurrentScenario(scenario);
    loadTestScenario(scenario);
    powerOffAED();
    setModalVisible(false);
  };

  const handleActionWithAudio = action => {
    handleAction(action);

    const step = steps[stepIndex];
    if (step?.audio) playAudio(step.audio);
  };

  useEffect(() => {
    if (!started) return;

    const step = steps[stepIndex];
    if (!step) return;

    playAudio(step.audio, () => {
      if (!step.action || step.action === 'auto') {
        nextStep();
      }
    });
  }, [stepIndex, steps, started]);

  return (
    <View style={style.container}>
      <Header
        goBack={() => {
          saveInstructorSession();
          goHomeInsctructor();
        }}
        role="instructor"
      />

      {/* ===================== MODAL ===================== */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 15,
              maxHeight: '70%',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Select a Scenario
            </Text>

            <ScrollView>
              {scenarios.map(s => (
                <TouchableOpacity
                  key={s.id}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: '#f2f2f2',
                    marginBottom: 10,
                  }}
                  onPress={() => handleSelectScenario(s)}
                >
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>
                    {s.name || 'Untitled Scenario'}
                  </Text>
                  <Text style={{ opacity: 0.7 }}>{s.steps?.length} steps</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 15,
                padding: 12,
                backgroundColor: Colors.primary,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================================================= */}

      <View style={style.subContainer}>
        <View style={style.content}>
          {/* HEADER BUTTONS */}
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text>
                  Scenario: {currentScenario?.name || 'Test Scenario'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ zIndex: 9999, elevation: 9999 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[style.contentText, { zIndex: 9999 }]}
              >
                <Text>Change Scenario</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* TIMER + ACTIONS */}
          <View style={style2.studentWrapper2}>
            <View style={style.wrapper2Sub}>
              <TouchableOpacity style={style.timerBox}>
                <Timer color={Colors.text} size={20} />
                <Text style={style.timerText}>
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* REMOVE + OPEN */}
            <View style={style2.studentWrapper2SubRight}>
              <TouchableOpacity
                style={[
                  style2.handButton,
                  expectedAction !== 'remove' && { opacity: 0.5 },
                ]}
                disabled={expectedAction !== 'remove'}
                onPress={() => {
                  handleActionWithAudio('remove');
                  setIsSwitchOpen(true);
                }}
              >
                <Hand color={Colors.text} size={22} />
              </TouchableOpacity>

              {steps[stepIndex]?.action === 'open' && (
                <TouchableOpacity
                  style={style2.padPackageButton}
                  onPress={() => {
                    handleActionWithAudio('open');
                    setIsSwitchOpen(true);
                    goApplyPads();
                  }}
                >
                  <ArrowRightLeft color="#fff" size={22} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* AED DISPLAY */}
          <View style={style.contentCenter}>
            <View style={aedStyle.aedBox}>
              <AEDWaveform
                started={started}
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
                flashing={expectedAction === 'shock'}
                onPowerPress={() => {
                  if (!poweredOn) {
                    powerOnAED();

                    if (expectedAction === 'power') {
                      handleActionWithAudio('power');
                      nextStep();
                    }
                  } else {
                    saveInstructorSession();
                    powerOffAED();
                  }
                }}
                onShockPress={() => handleActionWithAudio('shock')}
              />
            </View>
          </View>
        </View>

        {/* MODE CONTROLS */}
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ModeControls
            started={started}
            paused={paused}
            onPowerPress={startAED}
            onPausePress={() => {}}
            onStopPress={() => {
              saveInstructorSession();
              powerOffAED();
            }}
          />
        </View>
      </View>

      {/* TONE DISPLAY */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {started && steps.length > 0 && (
          <ToneDisplay text={steps[stepIndex]?.text} />
        )}
      </View>
    </View>
  );
};

export default InstructorTestScenarioScreen;
