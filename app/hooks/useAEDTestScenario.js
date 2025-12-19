import { useState } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import strokeColors from '../data/strokeColors';

const screenWidth = Dimensions.get('window').width;
const aedWidth = screenWidth * 0.7;

export default function useAEDTestScenario() {
  /* ---------------- TIMER ---------------- */
  const { timer, startTimer, stopTimer, resetTimer } = useAEDTimer();

  /* ---------------- WAVEFORM ---------------- */
  const { waveform, drawWaveformPoint, clearWaveform, stopWaveform } =
    useWaveform(aedWidth);

  /* ---------------- STEPS ---------------- */
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const expectedAction = steps[stepIndex]?.action || null;

  /* ---------------- AED STATE ---------------- */
  const [poweredOn, setPoweredOn] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  /* ---------------- RHYTHM ---------------- */
  const [currentRhythm, setCurrentRhythm] = useState(null);

  const randomizeRhythm = () => {
    const keys = Object.keys(heartRhythms);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const r = heartRhythms[key];
    return { name: key, bpm: r.bpm, pattern: r.generate() };
  };

  /* ---------------- LOAD SCENARIO ---------------- */
  const loadTestScenario = scenario => {
    setSteps(scenario.steps || []);
    setStepIndex(0);

    resetTimer();
    stopWaveform();
    clearWaveform();
  };

  /* ---------------- STEP NAV ---------------- */
  const nextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStepIndex(prev => Math.max(prev - 1, 0));
  };

  /* ---------------- ACTION HANDLER ---------------- */
  const handleAction = action => {
    const step = steps[stepIndex];
    if (!step) return;

    if (step.action === action) {
      nextStep();
    }
  };

  /* ---------------- POWER ---------------- */
  const powerOnAED = () => setPoweredOn(true);

  const powerOffAED = () => {
    setPoweredOn(false);
    setStarted(false);
    setPaused(false);

    resetTimer();
    stopTimer();

    stopWaveform();
    clearWaveform();
    setCurrentRhythm(null);
    setStepIndex(0);
  };

  /* ---------------- START / PAUSE ---------------- */
  const startAED = () => {
    if (started && !paused) return;

    if (paused) {
      resumeAED();
      return;
    }

    const rhythm = randomizeRhythm();
    setCurrentRhythm({ name: rhythm.name, bpm: rhythm.bpm });

    const spacing = aedWidth / (rhythm.pattern.length - 1);

    clearWaveform();
    setStarted(true);
    setPaused(false);

    resetTimer();
    startTimer();

    drawWaveformPoint(rhythm.pattern, spacing, { current: 0 });
  };

  const pauseAED = () => {
    setPaused(true);
    stopTimer();
    stopWaveform();
  };

  const resumeAED = () => {
    if (!paused || !currentRhythm) return;

    setPaused(false);
    startTimer();

    const pattern = heartRhythms[currentRhythm.name].generate();
    const spacing = aedWidth / (pattern.length - 1);
    drawWaveformPoint(pattern, spacing, { current: 0 });
  };

  return {
    poweredOn,
    started,
    paused,
    timer,

    waveform,
    strokeColors,
    currentRhythm,

    steps,
    stepIndex,
    expectedAction,

    loadTestScenario,
    nextStep,
    prevStep,

    powerOnAED,
    powerOffAED,
    startAED,
    pauseAED,
    resumeAED,

    handleAction,
  };
}
