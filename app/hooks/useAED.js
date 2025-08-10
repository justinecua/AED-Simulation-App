import { useState, useRef, useCallback } from 'react';
import { Dimensions } from 'react-native';
import heartRhythms from '../constants/heartRhythms';

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

  const startAED = useCallback(() => {
    const rhythmKeys = Object.keys(heartRhythms);
    const selectedRhythmKey =
      rhythmKeys[Math.floor(Math.random() * rhythmKeys.length)];
    const pattern = heartRhythms[selectedRhythmKey].generate();

    const aedWidth = screenWidth * 0.7;
    const spacing = aedWidth / (pattern.length - 1);

    setCurrentRhythm({
      name: selectedRhythmKey,
      bpm: heartRhythms[selectedRhythmKey].bpm,
    });
    setWaveform([]);
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
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return {
    started,
    currentRhythm,
    waveform,
    strokeColors,
    startAED,
    stopAED,
  };
}
