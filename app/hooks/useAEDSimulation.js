import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import useAEDSequence from './useAEDSequence';
import strokeColors from '../data/strokeColors';

const screenWidth = Dimensions.get('window').width;
const aedWidth = screenWidth * 0.7;

export default function useAEDSimulation() {
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

  // ---------------------------
  // NEW PAD STATES (REQUIRED)
  // ---------------------------
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);

  const [positions, setPositions] = useState({
    'Pad 1': { x: 15, y: 10 },
    'Pad 2': { x: 10, y: 75 },
  });

  const [placedPads, setPlacedPads] = useState({
    'Pad 1': false,
    'Pad 2': false,
  });

  const changeRhythm = rhythmKey => {
    stopAED();
    setCurrentRhythm(rhythmKey);

    loadSequence(rhythmKey);
    setStepIndex(0);
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
    clearWaveform();
    resetSequence();

    setCurrentRhythm(null);
  };

  const startAED = () => {
    if (!poweredOn) return;

    setStarted(true);
    setPaused(false);

    resetTimer();
    startTimer();

    if (currentRhythm) {
      const pattern = heartRhythms[currentRhythm].generate();
      const spacing = aedWidth / (pattern.length - 1);
      const patternIndex = { current: 0 };
      drawWaveformPoint(pattern, spacing, patternIndex);
    }
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
      const pattern = heartRhythms[currentRhythm].generate();
      const spacing = aedWidth / (pattern.length - 1);
      const patternIndex = { current: 0 };
      drawWaveformPoint(pattern, spacing, patternIndex);
    }

    resumeSequence();
  };

  const stopAED = () => {
    setStarted(false);
    setPaused(false);

    resetTimer();
    stopTimer();
    clearWaveform();
    resetSequence();
    setStepIndex(0);
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

    // 🔥 PAD STATES RETURNED HERE
    isSwitchOpen,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
  };
}
