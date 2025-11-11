import { useState } from 'react';
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
  const [scenarioOverride, setScenarioOverride] = useState(null);

  const sanitizeScenario = scenario => {
    if (!scenario) return null;

    const sanitizedSteps = Array.isArray(scenario.steps)
      ? scenario.steps.map(step => ({
          text: step?.text ?? '',
          action: step?.action ?? 'auto',
          flashing:
            typeof step?.flashing === 'boolean' ? step.flashing : undefined,
          audio: step?.audio ?? '',
        }))
      : [];

    return {
      ...scenario,
      rhythm: scenario.rhythm || 'VFib',
      steps: sanitizedSteps,
    };
  };

  const applyScenarioOverride = scenario => {
    const sanitized = sanitizeScenario(scenario);
    setScenarioOverride(sanitized);
  };

  const clearScenarioOverride = () => {
    setScenarioOverride(null);
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

  const startAED = () => {
    if (started && !paused) return;
    if (started && paused) {
      resumeAED();
      return;
    }

    const rhythmKeys = Object.keys(heartRhythms);

    let selectedRhythmKey = scenarioOverride?.rhythm;
    let overrideSteps = scenarioOverride?.steps;

    if (!selectedRhythmKey || !heartRhythms[selectedRhythmKey]) {
      selectedRhythmKey =
        rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    }

    if (!Array.isArray(overrideSteps)) {
      overrideSteps = null;
    }

    const selectedRhythm =
      heartRhythms[selectedRhythmKey] || heartRhythms[rhythmKeys[0]];
    const pattern = selectedRhythm.generate();
    const spacing = aedWidth / (pattern.length - 1);

    setCurrentRhythm({ name: selectedRhythmKey, bpm: selectedRhythm.bpm });
    clearWaveform();
    loadSequence(selectedRhythmKey, overrideSteps);

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
    scenarioOverride,
    setScenarioOverride: applyScenarioOverride,
    clearScenarioOverride,
  };
}
