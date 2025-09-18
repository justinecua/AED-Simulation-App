import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import useAEDSequence from './useAEDSequence';

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
    expectedAction,
    loadSequence,
    pauseSequence,
    resumeSequence,
    resetSequence,
    nextStep,
    handleAction,
  } = useAEDSequence();

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState(null);

  const changeRhythm = rhythmKey => {
    // Stop AED if running
    stopTimer();
    stopWaveform();
    resetSequence();

    setStarted(false);
    setPaused(false);

    // call startAED again with the new rhythm
    startAED(rhythmKey);
  };

  const startAED = rhythmKey => {
    // prevent restarting if already started
    if (started && !paused) return;

    // if resuming from pause, call resumeAED
    if (started && paused) {
      resumeAED();
      return;
    }

    // brand-new start
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
    setStarted(false);
    setPaused(false);
    resetTimer();
    stopTimer();
    setCurrentRhythm(null);
    clearWaveform();
    resetSequence();
  };

  return {
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    expectedAction,
    changeRhythm,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    timer,
    handleAction,
  };
}
