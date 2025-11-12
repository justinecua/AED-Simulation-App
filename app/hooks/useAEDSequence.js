import { useState, useRef, useEffect } from 'react';
import Sound from 'react-native-sound';
import aedSequences from '../data/aedSequences';

export default function useAEDSequence() {
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [expectedAction, setExpectedAction] = useState(null);
  const autoTimerRef = useRef(null);
  const soundRef = useRef(null);
  const genRef = useRef(0);
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    const currentStep = steps[stepIndex];
    setExpectedAction(currentStep?.action || null);

    const myGen = ++genRef.current;

    if (soundRef.current) {
      soundRef.current.stop(() => {
        soundRef.current?.release?.();
        soundRef.current = null;
      });
    }

    if (currentStep?.audio) {
      const s = new Sound(currentStep.audio, Sound.MAIN_BUNDLE, error => {
        if (myGen !== genRef.current) {
          s.release?.();
          return;
        }
        if (!error) {
          if (
            currentStep.action !== 'auto' &&
            currentStep.action !== 'analyze'
          ) {
            s.setNumberOfLoops(-1);
          }
          soundRef.current = s;
          s.play(success => {
            if (myGen !== genRef.current) {
              s.release?.();
              return;
            }
            if (
              (currentStep.action === 'auto' ||
                currentStep.action === 'analyze') &&
              !manualMode
            ) {
              s.release?.();
              soundRef.current = null;
              if (success) nextStep();
            }
          });
        } else {
          if (
            (currentStep.action === 'auto' ||
              currentStep.action === 'analyze') &&
            !manualMode
          ) {
            nextStep();
          }
        }
      });
    } else if (currentStep?.action === 'auto' && !manualMode) {
      autoTimerRef.current = setTimeout(() => {
        if (myGen === genRef.current) nextStep();
      }, 1000);
    }

    return () => {
      genRef.current++;
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
      if (soundRef.current) {
        soundRef.current.stop(() => {
          soundRef.current?.release?.();
          soundRef.current = null;
        });
      }
    };
  }, [stepIndex, steps]);

  const loadSequence = (rhythmKey, isManual = false) => {
    setManualMode(isManual);
    const seq = aedSequences[rhythmKey];
    setSteps(seq);
    setStepIndex(0);
  };

  const resetSequence = () => {
    setSteps([]);
    setStepIndex(0);
    setExpectedAction(null);

    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = null;

    if (soundRef.current) {
      const s = soundRef.current;
      soundRef.current = null;
      s.stop(() => s.release());
    }
  };

  const pauseSequence = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = null;
    if (soundRef.current) soundRef.current.pause();
  };

  const resumeSequence = () => {
    const currentStep = steps[stepIndex];
    if (currentStep?.action === 'auto') {
      autoTimerRef.current = setTimeout(nextStep, 1000);
    }
    if (soundRef.current) soundRef.current.play();
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      setExpectedAction(null);
    }
  };

  const prevStep = () => {
    setStepIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleAction = action => {
    if (expectedAction === action) {
      if (soundRef.current) {
        soundRef.current.stop(() => {
          soundRef.current.release();
          soundRef.current = null;
        });
      }
      nextStep();
    }
  };

  return {
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
  };
}
