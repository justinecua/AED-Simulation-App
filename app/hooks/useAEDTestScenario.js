import { Dimensions } from 'react-native';
import heartRhythms from '../data/heartRhythms';
import useAEDTimer from './useAEDTimer';
import useWaveform from './useWaveform';
import strokeColors from '../data/strokeColors';
import { useState, useRef, useEffect, useCallback } from 'react';
import Sound from 'react-native-sound';

const screenWidth = Dimensions.get('window').width;
const aedWidth = screenWidth * 0.7;

export default function useAEDTestScenario() {
  Sound.setCategory?.('Playback');

  const { timer, startTimer, stopTimer, resetTimer } = useAEDTimer();
  const { waveform, drawWaveformPoint, clearWaveform, stopWaveform } =
    useWaveform(aedWidth);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const expectedAction = steps[stepIndex]?.action || null;
  const [poweredOn, setPoweredOn] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState(null);
  const soundRef = useRef(null);
  const genRef = useRef(0);
  const lastPlayedKeyRef = useRef(null);

  const stopAudio = useCallback(() => {
    genRef.current++;
    lastPlayedKeyRef.current = null;

    if (soundRef.current) {
      try {
        soundRef.current.stop(() => {
          soundRef.current?.release?.();
          soundRef.current = null;
        });
      } catch {
        try {
          soundRef.current?.release?.();
        } catch {}
        soundRef.current = null;
      }
    }
  }, []);

  const playStepAudioOnce = useCallback(
    step => {
      if (!step?.audio) return;

      const stepKey =
        step.id ??
        step.key ??
        `${stepIndex}:${step.action ?? ''}:${step.text ?? ''}`;
      if (lastPlayedKeyRef.current === stepKey) return;
      lastPlayedKeyRef.current = stepKey;
      stopAudio();

      const myGen = ++genRef.current;

      const s = new Sound(step.audio, Sound.MAIN_BUNDLE, err => {
        if (myGen !== genRef.current) return;
        if (err) return;

        soundRef.current = s;
        s.play(() => {
          if (myGen !== genRef.current) return;

          s.release();
          if (soundRef.current === s) soundRef.current = null;
          if (step.action === 'auto') {
            setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
          }
        });
      });
    },
    [stepIndex, steps.length, stopAudio],
  );

  useEffect(() => {
    if (!started) return;
    const step = steps?.[stepIndex];
    if (!step) return;

    playStepAudioOnce(step);
  }, [started, stepIndex, steps, playStepAudioOnce]);

  useEffect(() => {
    if (!started || paused) return;

    const step = steps?.[stepIndex];
    if (!step) return;

    if (step.action !== 'analyze') return;

    const ms = step.duration ?? 4000;
    const t = setTimeout(() => {
      setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
    }, ms);

    return () => clearTimeout(t);
  }, [started, paused, stepIndex, steps]);

  const randomizeRhythm = () => {
    const keys = Object.keys(heartRhythms);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const r = heartRhythms[key];
    return { name: key, bpm: r.bpm, pattern: r.generate() };
  };

  const loadTestScenario = scenario => {
    setSteps(scenario.steps || []);
    setStepIndex(0);

    resetTimer();
    stopWaveform();
    clearWaveform();
  };

  const nextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStepIndex(prev => Math.max(prev - 1, 0));
  };

  const handleAction = action => {
    const step = steps[stepIndex];
    if (!step) return;

    if (step.action === action) {
      nextStep();
    }
  };

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
    stopAudio();
  };

  const stopAED = () => {
    stopAudio();
    setStarted(false);
    setPaused(false);
    stopTimer();
    stopWaveform();
  };

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
    stopAED,
    stopAudio,
  };
}
