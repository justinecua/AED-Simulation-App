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
  const [started, setStarted] = useState(false);
  const [currentRhythm, setCurrentRhythm] = useState(null);
  const [waveform, setWaveform] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const startAED = useCallback(() => {
    const rhythmKeys = Object.keys(heartRhythms);
    const selectedRhythmKey =
      rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    const selectedRhythm = heartRhythms[selectedRhythmKey];
    const pattern = selectedRhythm.generate();

    const aedWidth = screenWidth * 0.7;
    const spacing = aedWidth / (pattern.length - 1);

    setCurrentRhythm({
      name: selectedRhythmKey,
      bpm: selectedRhythm.bpm,
    });

    setWaveform([]);
    setSteps(aedSequences[selectedRhythmKey] || []);
    setStepIndex(0);
    setStarted(true);

    let index = 0;
    const drawNextPoint = () => {
      setWaveform(prev => {
        const nextPoint = { value: pattern[index], spacing };
        index = (index + 1) % pattern.length;

        const maxPoints = Math.floor(aedWidth / spacing);
        const updated = [...prev, nextPoint];

        if (updated.length > maxPoints) updated.shift();

        return updated;
      });

      const variation = 1 + (Math.random() * 0.06 - 0.03);
      intervalRef.current = setTimeout(drawNextPoint, 50 * variation);
    };

    drawNextPoint();
  }, []);

  const stopAED = useCallback(() => {
    setStarted(false);
    setCurrentRhythm(null);
    setSteps([]);
    setStepIndex(0);

    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Move to next AED instruction
  const nextStep = useCallback(() => {
    setStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  }, [steps]);

  return {
    started,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    startAED,
    stopAED,
    nextStep,
  };
}
