import { useState, useRef, useCallback } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import aedSequences from '../data/aedSequences';

const screenWidth = Dimensions.get('window').width;

const strokeColors = {
  Sinus: '#ffffff',
  VFib: '#ffffff',
  VTach: '#ffffff',
  Asystole: '#ffffff',
};

export default function useAED() {
  const intervalRef = useRef(null);
  const autoTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const [timer, setTimer] = useState(0);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState(null);
  const [waveform, setWaveform] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [expectedAction, setExpectedAction] = useState(null);
  const aedWidth = screenWidth * 0.7;

  const startTimer = () => {
    if (timerIntervalRef.current) return;
    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  const resetTimer = () => setTimer(0);

  const drawWaveformPoint = useCallback(
    (pattern, spacing, patternIndex) => {
      if (!started || paused) return;

      setWaveform(prev => {
        const nextPoint = {
          value: pattern[patternIndex.current],
          spacing,
        };
        patternIndex.current = (patternIndex.current + 1) % pattern.length;

        const maxPoints = Math.floor(aedWidth / spacing);
        const updated = [...prev, nextPoint];
        if (updated.length > maxPoints) updated.shift();
        return updated;
      });

      const variation = 1 + (Math.random() * 0.06 - 0.03);
      intervalRef.current = setTimeout(
        () => drawWaveformPoint(pattern, spacing, patternIndex),
        50 * variation,
      );
    },
    [started, paused, aedWidth],
  );

  const startAED = useCallback(() => {
    if (started) return;

    const rhythmKeys = Object.keys(heartRhythms);
    const selectedRhythmKey =
      rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    const selectedRhythm = heartRhythms[selectedRhythmKey];
    const pattern = selectedRhythm.generate();
    const spacing = aedWidth / (pattern.length - 1);

    // Set initial state
    setCurrentRhythm({ name: selectedRhythmKey, bpm: selectedRhythm.bpm });
    setWaveform([]);
    const seq = aedSequences[selectedRhythmKey] || [];
    setSteps(seq);
    setStepIndex(0);
    setExpectedAction(seq[0]?.action || null);
    setStarted(true);
    setPaused(false);

    resetTimer();
    startTimer();

    // Start waveform drawing with pattern index reference
    const patternIndex = { current: 0 };
    drawWaveformPoint(pattern, spacing, patternIndex);

    // Set auto timer if needed
    if (seq.length > 0 && seq[0].action === 'auto') {
      autoTimerRef.current = setTimeout(nextStep, 5000);
    }
  }, [started, drawWaveformPoint, nextStep, aedWidth]);

  const pauseAED = useCallback(() => {
    setPaused(true);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    stopTimer(); // stop timer while paused
  }, []);

  const resumeAED = useCallback(() => {
    if (!paused || !started) return;
    setPaused(false);
    startTimer();

    if (currentRhythm) {
      const pattern = heartRhythms[currentRhythm.name].generate();
      const spacing = aedWidth / (pattern.length - 1);
      const patternIndex = { current: 0 }; // Create new pattern index
      drawWaveformPoint(pattern, spacing, patternIndex);
    }

    const currentStep = steps[stepIndex];
    if (currentStep?.action === 'auto') {
      autoTimerRef.current = setTimeout(nextStep, 5000);
    }
  }, [
    paused,
    started,
    currentRhythm,
    steps,
    stepIndex,
    drawWaveformPoint,
    nextStep,
    aedWidth,
  ]);

  const stopAED = useCallback(() => {
    setStarted(false);
    setPaused(false);
    resetTimer();
    stopTimer();
    setCurrentRhythm(null);
    setWaveform([]); // Clear waveform
    setSteps([]);
    setStepIndex(0);
    setExpectedAction(null);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    intervalRef.current = null;
    autoTimerRef.current = null;
  }, []);

  const nextStep = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      const next = steps[stepIndex + 1];
      setStepIndex(prev => prev + 1);
      setExpectedAction(next.action);

      if (next.action === 'auto') {
        if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        autoTimerRef.current = setTimeout(nextStep, 5000);
      }

      // 👇 NEW: If analyzing, auto-advance to "show" after a delay
      if (next.action === 'analyze') {
        setTimeout(() => {
          setStepIndex(prev => prev + 1);
          setExpectedAction(steps[stepIndex + 2]?.action || null);
        }, 3000); // 3 seconds analysis
      }
    }
  }, [steps, stepIndex]);

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
  };
}
