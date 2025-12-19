import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X, Timer, Hand, ArrowRightLeft } from 'lucide-react-native';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveformTestScenario from '../../components/AEDWaveformTestScenario';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';

import { useTestScenario } from '../../context/TestScenarioContext';
import { useScenarioContext } from '../../context/ScenarioContext';

import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';

Sound.setCategory?.('Playback');

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
    currentRhythm,
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
  const analyzeHandledRef = useRef(false);
  // ─────────────────────────────────────────────────────────────
  // Display text (single source of truth for AED + ToneDisplay)
  // ─────────────────────────────────────────────────────────────
  const currentStep = steps?.[stepIndex];
  const isAnalyzing =
    currentStep?.action === 'analyze' &&
    started &&
    currentRhythm &&
    waveform.length > 0;

  const currentDisplayText = currentStep?.text ?? '';
  // ─────────────────────────────────────────────────────────────
  // Audio: single-owner (this screen), safe against replays & races
  // ─────────────────────────────────────────────────────────────
  const playedStepKeyRef = useRef(null); // prevents replay of same step
  const soundRef = useRef(null); // current Sound instance
  const genRef = useRef(0);

  const stopAndReleaseSound = useCallback(() => {
    if (soundRef.current) {
      try {
        soundRef.current.stop(() => {
          soundRef.current?.release?.();
          soundRef.current = null;
        });
      } catch (e) {
        // fallback
        try {
          soundRef.current?.release?.();
        } catch {}
        soundRef.current = null;
      }
    }
  }, []);

  const playAudio = useCallback(
    (file, onFinish) => {
      stopAndReleaseSound();

      if (!file) {
        onFinish?.();
        return;
      }

      const myGen = ++genRef.current;

      const sound = new Sound(file, Sound.MAIN_BUNDLE, error => {
        if (myGen !== genRef.current) return;
        if (error) {
          console.log('Sound load error:', error);
          onFinish?.();
          return;
        }

        soundRef.current = sound;

        sound.play(() => {
          // ensure still current
          if (myGen !== genRef.current) return;

          sound.release();
          if (soundRef.current === sound) soundRef.current = null;
          onFinish?.();
        });
      });
    },
    [stopAndReleaseSound],
  );

  // Reset guards when scenario changes or simulation stops
  useEffect(() => {
    playedStepKeyRef.current = null;
    genRef.current++;
    stopAndReleaseSound();
  }, [currentScenario?.id, stopAndReleaseSound]);

  useEffect(() => {
    if (!started) {
      playedStepKeyRef.current = null;
      genRef.current++;
      stopAndReleaseSound();
    }
  }, [started, stopAndReleaseSound]);

  useEffect(() => {
    if (!started) return;

    const step = steps?.[stepIndex];
    if (!step) return;

    const stepKey =
      step.id ??
      step.key ??
      `${stepIndex}:${step.action ?? ''}:${step.text ?? ''}`;

    if (playedStepKeyRef.current === stepKey) return;
    playedStepKeyRef.current = stepKey;

    playAudio(step.audio, () => {
      if (step.action === 'auto') {
        nextStep();
      }
    });
  }, [stepIndex, started, playAudio, nextStep]);

  // ─────────────────────────────────────────────────────────────
  // Sessions
  // ─────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // Scenario selection
  // ─────────────────────────────────────────────────────────────
  const handleSelectScenario = scenario => {
    setCurrentScenario(scenario);
    loadTestScenario(scenario);

    // stopping/reset
    powerOffAED();
    setModalVisible(false);
  };

  // ─────────────────────────────────────────────────────────────
  // UI action dispatcher (NO AUDIO here)
  // ─────────────────────────────────────────────────────────────
  const doAction = useCallback(
    action => {
      handleAction(action);
      // no audio here; effect owns audio
    },
    [handleAction],
  );

  useEffect(() => {
    const step = steps?.[stepIndex];
    if (!started || !step) return;

    if (step.action !== 'analyze') return;
    if (!currentRhythm || waveform.length === 0) return;

    // AED analyze duration (realistic: 3–5 seconds)
    const ANALYZE_DURATION = step.duration ?? 4000;

    const t = setTimeout(() => {
      nextStep();
    }, ANALYZE_DURATION);

    return () => clearTimeout(t);
  }, [stepIndex, started, currentRhythm, waveform, steps, nextStep]);

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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '600' }}>
                Select a Scenario
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={18} color="#555" />
              </TouchableOpacity>
            </View>

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
                  <Text style={{ fontSize: 15, fontWeight: '500' }}>
                    {s.name || 'Untitled Scenario'}
                  </Text>
                  <Text style={{ opacity: 0.7, fontSize: 12 }}>
                    {s.steps?.length} steps
                  </Text>
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
            <View style={style2.studentWrapper2Sub}>
              <TouchableOpacity style={style.contentText}>
                <Text>
                  Status: {!poweredOn ? 'OFF' : paused ? 'PAUSED' : 'ON'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ zIndex: 9999, elevation: 9999 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[style.contentText, { zIndex: 9999 }]}
              >
                <Text>
                  {currentScenario?.name
                    ? `Scenario: ${currentScenario.name}`
                    : 'Change Scenario'}
                </Text>
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
                  doAction('remove');
                  setIsSwitchOpen(true);
                }}
              >
                <Hand color={Colors.text} size={22} />
              </TouchableOpacity>

              {steps?.[stepIndex]?.action === 'open' && (
                <TouchableOpacity
                  style={style2.padPackageButton}
                  onPress={() => {
                    doAction('open');
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
              <AEDWaveformTestScenario
                started={started}
                poweredOn={poweredOn}
                currentRhythm={currentRhythm}
                waveform={waveform}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                displayText={currentDisplayText}
              />

              <AEDControls
                started={poweredOn}
                flashing={expectedAction === 'shock'}
                onPowerPress={() => {
                  if (!poweredOn) {
                    powerOnAED();

                    if (expectedAction === 'power') {
                      doAction('power');
                    }
                  } else {
                    saveInstructorSession();
                    powerOffAED();
                  }
                }}
                onShockPress={() => doAction('shock')}
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
        {started && steps?.length > 0 && (
          <ToneDisplay text={currentDisplayText} />
        )}
      </View>
    </View>
  );
};

export default InstructorTestScenarioScreen;
