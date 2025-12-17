import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

import Colors from '../../constants/colors';
import Header from '../../components/Header';
import AEDWaveformPractice from '../../components/AEDWaveformPractice';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import { Picker } from '@react-native-picker/picker';
import ToneDisplayPractice from '../../components/ToneDisplayPractice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ArrowLeft,
  ArrowRight,
  X,
  Square,
  Pause,
  Timer,
  Hand,
  ArrowRightLeft,
} from 'lucide-react-native';

import style2 from '../../styles/StudentAutoModeStyle';
import style from '../../styles/InstructorTestScenarioStyle';
import { AEDPracticeContext } from '../../context/AEDPracticeContext';

const PracticeModeScreen = ({ goHomeStudent, goPracticeApplyPads }) => {
  const [rhythm, setRhythm] = useState('Sinus');
  const sessionStartRef = useRef(null);

  const savePracticeSession = async () => {
    try {
      const endTime = new Date().toISOString();

      const startTime = sessionStartRef.current ?? endTime;

      const newSession = {
        type: 'Practice Mode',
        startTime,
        endTime,
        totalTime: timer,
        rhythm,
      };

      const existing = await AsyncStorage.getItem('aed_sessions_student');
      const sessions = existing ? JSON.parse(existing) : [];

      sessions.unshift(newSession);

      await AsyncStorage.setItem(
        'aed_sessions_student',
        JSON.stringify(sessions),
      );
    } catch (e) {
      console.log('Error saving session', e);
    }
  };

  const aed = useContext(AEDPracticeContext);
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
    startAED,
    stopAED,
    pauseAED,
    resumeAED,
    nextStep,
    prevStep,
    timer,
    setStepIndex,
    changeRhythm,
    powerOnAED,
    powerOffAED,
    handleAction,
  } = aed;

  const handlePowerPress = () => {
    if (!poweredOn) powerOnAED();
    else powerOffAED();
  };

  const controlsDisabled = !started;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />

      <View style={{ marginTop: 12 }}>
        <Header goBack={goHomeStudent} />
      </View>

      <View style={styles.subContainer}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <View style={style2.studentWrapper2Sub}>
              <TouchableOpacity style={style.contentText}>
                <Text>Practice Mode</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timerIcon}>
              <Timer color={Colors.text} size={20} />
              <Text style={styles.timerText}>
                {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          </View>

          {/* STATUS + ACTION BUTTONS */}
          <View style={style2.studentWrapper3}>
            {/* STATUS */}
            <View style={style2.studentWrapper2Sub}>
              <TouchableOpacity style={style.contentText}>
                <Text>
                  Status: {!poweredOn ? 'OFF' : paused ? 'PAUSED' : 'ON'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ACTION BUTTONS */}
            <View style={style2.studentWrapper2SubRight}>
              {/* REMOVE PADS */}
              <TouchableOpacity
                style={[
                  style2.handButton,
                  expectedAction !== 'remove' && { opacity: 0.5 },
                ]}
                disabled={expectedAction !== 'remove'}
                onPress={() => handleAction('remove')}
              >
                <Hand color={Colors.text} size={22} />
              </TouchableOpacity>

              {/* OPEN PACKAGE */}
              {expectedAction === 'open' && (
                <TouchableOpacity
                  style={style2.padPackageButton}
                  onPress={() => {
                    handleAction('open');
                    goPracticeApplyPads();
                  }}
                >
                  <ArrowRightLeft color="#fff" size={22} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* AED + WAVEFORM */}
          <View style={styles.contentCenter}>
            <View style={aedStyle.aedBox}>
              <AEDWaveformPractice
                poweredOn={poweredOn}
                started={started}
                paused={paused}
                currentRhythm={currentRhythm}
                waveform={waveform}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                expectedAction={expectedAction}
              />

              <AEDControls
                started={started}
                disabledPower={!started}
                onShockPress={() => handleAction('shock')}
                onPowerPress={handlePowerPress}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {started && steps.length > 0 && (
              <ToneDisplayPractice text={steps[stepIndex]?.text} />
            )}
          </View>
          <View style={styles.controlsContainer}>
            {/* Start Button */}
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => {
                sessionStartRef.current = new Date().toISOString();
                startAED(rhythm, true);
                setStepIndex(0);
              }}
            >
              <View style={styles.iconBox}>
                <Timer color="black" size={16} />
              </View>
              <Text style={[styles.controlText, { color: 'black' }]}>
                Start Practice
              </Text>
            </TouchableOpacity>

            {/* Rhythm Picker */}
            <View style={{ marginBottom: 10, width: '100%' }}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={rhythm}
                  onValueChange={val => {
                    setRhythm(val);
                    changeRhythm(val);
                    setStepIndex(0);
                  }}
                  style={{
                    height: 55,
                    color: !started ? 'gray' : '#000',
                  }}
                  enabled={started}
                >
                  <Picker.Item
                    style={{
                      fontSize: 14,
                    }}
                    label="Sinus"
                    value="Sinus"
                  />
                  <Picker.Item
                    style={{
                      fontSize: 14,
                    }}
                    label="V-Fib"
                    value="VFib"
                  />
                  <Picker.Item
                    style={{
                      fontSize: 14,
                    }}
                    label="V-Tach"
                    value="VTach"
                  />
                  <Picker.Item
                    style={{
                      fontSize: 14,
                    }}
                    label="Asystole"
                    value="Asystole"
                  />
                </Picker>
              </View>
            </View>

            {/* Row 1: Back / Pause / Next */}
            <View style={styles.row}>
              <TouchableOpacity
                disabled={controlsDisabled}
                onPress={prevStep}
                style={[
                  styles.controlBtn,
                  controlsDisabled && { backgroundColor: '#E5E7EB' },
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    controlsDisabled && {
                      borderColor: '#d1d5db',
                      backgroundColor: '#E5E7EB',
                    }, // lighter border
                  ]}
                >
                  <ArrowLeft
                    color={controlsDisabled ? '#9CA3AF' : 'black'}
                    size={16}
                  />
                </View>

                <Text
                  style={[
                    styles.controlText,
                    controlsDisabled && { color: '#9CA3AF' },
                  ]}
                >
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={controlsDisabled}
                onPress={() => (paused ? resumeAED() : pauseAED())}
                style={[
                  styles.controlBtn,
                  controlsDisabled && { backgroundColor: '#E5E7EB' },
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    controlsDisabled && {
                      borderColor: '#d1d5db',
                      backgroundColor: '#E5E7EB',
                    },
                  ]}
                >
                  <Pause
                    color={controlsDisabled ? '#9CA3AF' : 'black'}
                    size={16}
                  />
                </View>

                <Text
                  style={[
                    styles.controlText,
                    controlsDisabled && { color: '#9CA3AF' },
                  ]}
                >
                  {paused ? 'Resume' : 'Pause'}
                </Text>
              </TouchableOpacity>

              {/* NEXT */}
              <TouchableOpacity
                disabled={controlsDisabled}
                onPress={nextStep}
                style={[
                  styles.controlBtn,
                  controlsDisabled && { backgroundColor: '#E5E7EB' },
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    controlsDisabled && {
                      borderColor: '#D1D5DB',
                      backgroundColor: '#E5E7EB',
                    },
                  ]}
                >
                  <ArrowRight
                    color={controlsDisabled ? '#9CA3AF' : 'black'}
                    size={16}
                  />
                </View>
                <Text
                  style={[
                    styles.controlText,
                    controlsDisabled && { color: '#9CA3AF' },
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>

            {/* Row 2: Stop / Close */}
            {/* STOP */}
            <TouchableOpacity
              disabled={controlsDisabled}
              onPress={async () => {
                await savePracticeSession();
                stopAED();
              }}
              style={[
                styles.controlBtn,
                controlsDisabled && { backgroundColor: '#E5E7EB' },
              ]}
            >
              <View
                style={[
                  styles.iconBox,
                  controlsDisabled && {
                    borderColor: '#D1D5DB',
                    backgroundColor: '#E5E7EB',
                  },
                ]}
              >
                <Square
                  color={controlsDisabled ? '#9CA3AF' : 'black'}
                  size={16}
                />
              </View>
              <Text
                style={[
                  styles.controlText,
                  controlsDisabled && { color: '#9CA3AF' },
                ]}
              >
                Stop
              </Text>
            </TouchableOpacity>

            {/* CLOSE */}
            <TouchableOpacity
              disabled={controlsDisabled}
              onPress={async () => {
                await savePracticeSession();
                goHomeStudent();
              }}
              style={[
                styles.controlBtn,
                controlsDisabled && { backgroundColor: '#E5E7EB' },
              ]}
            >
              <View
                style={[
                  styles.iconBox,
                  controlsDisabled && {
                    borderColor: '#D1D5DB',
                    backgroundColor: '#E5E7EB',
                  },
                ]}
              >
                <X color={controlsDisabled ? '#9CA3AF' : 'black'} size={16} />
              </View>
              <Text
                style={[
                  styles.controlText,
                  controlsDisabled && { color: '#9CA3AF' },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PracticeModeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: Colors.background,
    position: 'relative',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerText: {
    color: Colors.rhythmBackground,
    backgroundColor: '#F4F6FA',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },
  timerIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
    height: 40,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FA4C17',
    marginLeft: 5,
  },
  pickerTitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    color: 'black',

    overflow: 'hidden',
  },
  contentCenter: {
    marginTop: 16,
    alignItems: 'center',
  },

  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#ffffffff',
    marginBottom: 10,
  },
  controlText: {
    fontSize: 13,
    marginLeft: 10,
    color: '#111827',
  },
  iconBox: {
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  controlsContainer: {
    marginTop: 40,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});
