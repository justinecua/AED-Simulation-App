import { useState, useRef } from 'react';
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

  const patternIndexRef = useRef({ current: 0 });

  /**
   * Start AED - can take a specific rhythm (for Practice Mode)
   * or fall back to random rhythm (for normal mode).
   */
  const startAED = pickedRhythm => {
    if (started && !paused) return;

    if (started && paused) {
      resumeAED();
      return;
    }

    // pick provided rhythm OR fallback to random
    const rhythmKeys = Object.keys(heartRhythms);
    const selectedRhythmKey =
      (pickedRhythm && heartRhythms[pickedRhythm] && pickedRhythm) ||
      rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];

    const selectedRhythm = heartRhythms[selectedRhythmKey];
    const pattern = selectedRhythm.generate();
    const spacing = aedWidth / (pattern.length - 1);

    setCurrentRhythm({ name: selectedRhythmKey, bpm: selectedRhythm.bpm });
    clearWaveform();
    loadSequence(selectedRhythmKey);

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
      // continue from where we left off
      drawWaveformPoint(pattern, spacing, patternIndexRef.current);
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

  const changeRhythm = pickedRhythm => {
    if (!started) return; // only allow changing while AED is running

    if (pickedRhythm && heartRhythms[pickedRhythm]) {
      const selectedRhythm = heartRhythms[pickedRhythm];
      const pattern = selectedRhythm.generate();
      const spacing = aedWidth / (pattern.length - 1);

      setCurrentRhythm({ name: pickedRhythm, bpm: selectedRhythm.bpm });
      clearWaveform();
      loadSequence(pickedRhythm);

      const patternIndex = { current: 0 };
      drawWaveformPoint(pattern, spacing, patternIndex);
    }
  };

  const shockAED = () => {
    handleAction('shock');
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
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    timer,
    handleAction,
    changeRhythm,
    shockAED,
  };
}
