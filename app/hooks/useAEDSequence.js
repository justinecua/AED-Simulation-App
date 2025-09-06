import { useState, useRef, useEffect } from 'react';
import aedSequences from '../data/aedSequences';

export default function useAEDSequence() {
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [expectedAction, setExpectedAction] = useState(null);
  const autoTimerRef = useRef(null);

  useEffect(() => {
    const currentStep = steps[stepIndex];
    setExpectedAction(currentStep?.action || null);

    if (currentStep?.action === 'auto') {
      autoTimerRef.current = setTimeout(() => {
        nextStep();
      }, 1000);
    }

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    };
  }, [stepIndex, steps]);

  const loadSequence = rhythmKey => {
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
  };

  const pauseSequence = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = null;
  };

  const resumeSequence = () => {
    const currentStep = steps[stepIndex];
    if (currentStep?.action === 'auto') {
      autoTimerRef.current = setTimeout(nextStep, 1000);
    }
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
