import { useState } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import strokeColors from '../data/strokeColors';

const screenWidth = Dimensions.get('window').width;
const aedWidth = screenWidth * 0.7;

export default function useAEDTestScenario() {
  /** --------------------------------------------------------
   *  1. Timer
   * -------------------------------------------------------- */
  const { timer, startTimer, stopTimer, resetTimer } = useAEDTimer();

  /** --------------------------------------------------------
   *  2. Waveform
   * -------------------------------------------------------- */
  const { waveform, drawWaveformPoint, clearWaveform, stopWaveform } =
    useWaveform(aedWidth);

  /** --------------------------------------------------------
   *  3. Scenario Steps (coming from ScenarioBuilder)
   * -------------------------------------------------------- */
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const expectedAction = steps[stepIndex]?.action || null;

  /** --------------------------------------------------------
   *  4. AED State
   * -------------------------------------------------------- */
  const [poweredOn, setPoweredOn] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  /** --------------------------------------------------------
   *  5. FAKE RHYTHM (test mode still needs waveform)
   * -------------------------------------------------------- */
  const randomizeRhythm = () => {
    const rhythmKeys = Object.keys(heartRhythms);
    const key = rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    const rhythm = heartRhythms[key];

    return { name: key, pattern: rhythm.generate(), bpm: rhythm.bpm };
  };

  const [currentRhythm, setCurrentRhythm] = useState(null);

  /** --------------------------------------------------------
   *  6. Load scenario steps
   * -------------------------------------------------------- */
  const loadTestScenario = scenario => {
    setSteps(scenario.steps);
    setStepIndex(0);

    resetTimer();
    stopWaveform();
    clearWaveform();
  };

  /** --------------------------------------------------------
   *  7. ACTION HANDLER (remove, open, shock)
   * -------------------------------------------------------- */
  const handleAction = action => {
    const step = steps[stepIndex];
    if (!step?.action) return;

    const expected = step.action.toLowerCase().trim();
    const actual = action.toLowerCase().trim();

    if (expected === actual) {
      nextStep();
    }
  };

  /** --------------------------------------------------------
   *  8. Step navigation
   * -------------------------------------------------------- */
  const nextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStepIndex(prev => Math.max(prev - 1, 0));
  };

  /** --------------------------------------------------------
   *  9. Power logic — SAME AS USEAED
   * -------------------------------------------------------- */
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

    stopWaveform();
    clearWaveform();

    setStepIndex(0);
  };

  /** --------------------------------------------------------
   *  10. START TEST AED — SAME BEHAVIOR AS USEAED
   * -------------------------------------------------------- */
  const startAED = () => {
    if (started && !paused) return;
    if (started && paused) {
      resumeAED();
      return;
    }

    // Pick a random rhythm like normal AED
    const rhythm = randomizeRhythm();
    setCurrentRhythm({ name: rhythm.name, bpm: rhythm.bpm });

    const spacing = aedWidth / (rhythm.pattern.length - 1);

    clearWaveform();

    setStarted(true);
    setPaused(false);

    resetTimer();
    startTimer();

    const patternIndex = { current: 0 };
    drawWaveformPoint(rhythm.pattern, spacing, patternIndex);
  };

  /** --------------------------------------------------------
   *  11. Pause / Resume waveform
   * -------------------------------------------------------- */
  const pauseAED = () => {
    if (!started) return;
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
    const patternIndex = { current: 0 };

    drawWaveformPoint(pattern, spacing, patternIndex);
  };

  /** --------------------------------------------------------
   *  EXPORT EVERYTHING
   * -------------------------------------------------------- */
  return {
    // AED states
    poweredOn,
    started,
    paused,
    timer,

    // Waveform
    waveform,
    strokeColors,

    // Steps
    steps,
    stepIndex,
    expectedAction,
    loadTestScenario,
    nextStep,
    prevStep,

    // Controls
    powerOnAED,
    powerOffAED,
    startAED,
    pauseAED,
    resumeAED,
    handleAction,
  };
}
