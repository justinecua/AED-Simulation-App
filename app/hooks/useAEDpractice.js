import { useState } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import useAEDSequence from './useAEDSequence';
import useAEDSequencePractice from './useAEDSequencePractice';

const screenWidth = Dimensions.get('window').width;
const aedWidth = screenWidth * 0.7;

const strokeColors = {
  Sinus: '#ffffff',
  VFib: '#ffffff',
  VTach: '#ffffff',
  Asystole: '#ffffff',
};

export default function useAEDPractice() {
  const [poweredOn, setPoweredOn] = useState(false); // ✅ MOVE THIS UP
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [positions, setPositions] = useState({
    'Pad 1': { x: 15, y: 10 },
    'Pad 2': { x: 10, y: 75 },
  });

  const [placedPads, setPlacedPads] = useState({
    'Pad 1': false,
    'Pad 2': false,
  });

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
  } = useAEDSequencePractice(poweredOn);

  const powerOnAED = () => {
    setPoweredOn(true);
    startAED('Sinus');
    setStepIndex(0);
    nextStep();
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

  const startAED = (rhythmKey, isManual = manualMode) => {
    setManualMode(isManual);

    const rhythmKeys = Object.keys(heartRhythms);
    const selectedRhythmKey =
      rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    const selectedRhythm = heartRhythms[selectedRhythmKey];
    const pattern = selectedRhythm.generate();
    const spacing = aedWidth / (pattern.length - 1);

    setCurrentRhythm({ name: selectedRhythmKey, bpm: selectedRhythm.bpm });
    clearWaveform();
    loadSequence(rhythmKey, isManual);

    setStarted(true);
    setPaused(false);

    resetTimer();
    startTimer();

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

  const stopAED = () => {
    setPoweredOn(false);
    setStarted(false);
    setPaused(false);
    resetTimer();
    stopTimer();
    setCurrentRhythm(null);
    clearWaveform();
    resetSequence();
  };

  const changeRhythm = newRhythmName => {
    if (!started) return;

    setCurrentRhythm({
      name: newRhythmName,
      bpm: heartRhythms[newRhythmName].bpm,
    });

    clearWaveform();
    loadSequence(newRhythmName, manualMode);

    const pattern = heartRhythms[newRhythmName].generate();
    const spacing = aedWidth / (pattern.length - 1);
    const patternIndex = { current: 0 };

    drawWaveformPoint(pattern, spacing, patternIndex);
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
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
  };
}
