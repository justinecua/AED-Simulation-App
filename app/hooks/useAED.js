import { useState } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import useAEDSequence from './useAEDSequence';

import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const aedWidth = screenWidth * 0.7;

const strokeColors = {
  Sinus: '#ffffff',
  VFib: '#ffffff',
  VTach: '#ffffff',
  Asystole: '#ffffff',
};

export default function useAED() {
  const { timer, startTimer, stopTimer, resetTimer } = useAEDTimer();
  const { waveform, drawWaveformPoint, clearWaveform, stopWaveform } =
    useWaveform(aedWidth);
  const {
    steps,
    stepIndex,
    setStepIndex,
    expectedAction,
    loadSequence,
    pauseSequence,
    resumeSequence,
    resetSequence,
    nextStep,
    prevStep,
    handleAction,
  } = useAEDSequence();

  const [poweredOn, setPoweredOn] = useState(false);
  const [started, setStarted] = useState(false);

  const [paused, setPaused] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [sessionType, setSessionType] = useState('Simulation');

  const saveSession = async (sessionType, totalTime, startTime) => {
    try {
      const newSession = {
        type: sessionType,
        startTime,
        totalTime,
      };

      const existing = await AsyncStorage.getItem('aed_sessions');
      const sessions = existing ? JSON.parse(existing) : [];

      // newest session at top
      sessions.unshift(newSession);
      await AsyncStorage.setItem('aed_sessions', JSON.stringify(sessions));
    } catch (error) {
      console.log('Error saving session:', error);
    }
  };

  const changeRhythm = rhythmKey => {
    stopAED(`${rhythmKey} Simulation`);

    setSessionType(`${rhythmKey} Simulation`);

    // Restart AED with the new rhythm
    startAED(rhythmKey);
  };

  const powerOnAED = () => {
    setPoweredOn(true);
  };

  const powerOffAED = () => {
    setPoweredOn(false);
    setStarted(false);
    setPaused(false);
    resetTimer();
    stopTimer();
    setCurrentRhythm(null);
    clearWaveform();
    resetSequence();
  };

  const startAED = rhythmKey => {
    if (started && !paused) return;
    if (started && paused) {
      resumeAED();
      return;
    }

    const rhythmKeys = rhythmKey || Object.keys(heartRhythms);
    const selectedRhythmKey =
      rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    const selectedRhythm = heartRhythms[rhythmKey || selectedRhythmKey];
    const pattern = selectedRhythm.generate();
    const spacing = aedWidth / (pattern.length - 1);

    setCurrentRhythm({ name: rhythmKey, bpm: selectedRhythm.bpm });
    clearWaveform();
    loadSequence(rhythmKey || selectedRhythmKey);

    setStarted(true);
    setPaused(false);

    resetTimer();
    startTimer();

    setStartTime(new Date().toISOString());

    const patternIndex = { current: 0 };
    drawWaveformPoint(pattern, spacing, patternIndex);
  };

  const pauseAED = () => {
    setPaused(true);
    stopTimer();
    stopWaveform();
    pauseSequence();
  };

  const resumeAED = () => {
    if (!paused || !started) return;
    setPaused(false);
    startTimer();

    if (currentRhythm) {
      const pattern = heartRhythms[currentRhythm.name].generate();
      const spacing = aedWidth / (pattern.length - 1);
      const patternIndex = { current: 0 };
      drawWaveformPoint(pattern, spacing, patternIndex);
    }
    resumeSequence();
  };

  const stopAED = async (type = sessionType) => {
    if (started && startTime) {
      await saveSession(type, timer, startTime);
    }

    setPoweredOn(false);
    setStarted(false);
    setPaused(false);
    resetTimer();
    stopTimer();
    setCurrentRhythm(null);
    clearWaveform();
    resetSequence();
    setStartTime(null);
  };

  return {
    poweredOn,
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    setStepIndex,
    expectedAction,
    powerOnAED,
    powerOffAED,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    prevStep,
    timer,
    handleAction,
    changeRhythm,
    sessionType,
  };
}
